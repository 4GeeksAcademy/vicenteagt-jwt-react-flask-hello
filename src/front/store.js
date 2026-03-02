export const initialStore=()=>{
  return{
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") || null,
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case "setAuth":
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user
      };


    case "logout":
      return {
    ...store,
    token: null,
    user: null
  };

    default:
      return store;
  }    
}
