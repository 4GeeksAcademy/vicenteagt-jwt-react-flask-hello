"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from api.models import User
from flask_cors import CORS




# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object

#JWT

CORS(app)

app.config["JWT_SECRET_KEY"] = "super-secret-key"
jwt = JWTManager(app)



@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code



# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

#registrar 

@app.route('/register', methods = ['POST'])
def register():

    body = request.get_json(silent=True)
    if body is None:
        return jsonify ({'msg': 'Necesitas llenar los campos'}), 400
    if 'name' not in body:
        return jsonify ({'msg': 'Necesitas agregar tu nombre completo'}), 400
    if 'email' not in body:
        return jsonify ({'msg': 'Necesitas agregar tu correo'}), 400
    if 'password' not in body:
        return jsonify ({'msg': 'Necesitas agregar una contraseña'}), 400
    
    new_user = User(
        name=body['name'],
        email=body['email'],
        password=body['password']
           
        )

    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=body['email'])

    return jsonify ({'msg': 'registro exitoso', 'token': token}),200

#loguearse

@app.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)

    if body is None:
        return jsonify({'msg': 'Necesitas llenar los campos'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'Necesitas agregar tu correo'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'Necesitas agregar una contraseña'}), 400

    user = User.query.filter_by(email=body['email']).first()

    if user is None or user.password != body['password']:
        return jsonify({'msg': 'Usuario o contraseña incorrecto'}), 401

    token = create_access_token(identity=user.email)

    return jsonify({
        'msg': 'login exitoso','token': token}), 200

#get privado

@app.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_email = get_jwt_identity()

    user = User.query.filter_by(email=current_email).first()

    if user is None:
        return jsonify({'msg': 'Usuario no encontrado'}), 404

    return jsonify({
        "name": user.name,
        "email": user.email
    }), 200