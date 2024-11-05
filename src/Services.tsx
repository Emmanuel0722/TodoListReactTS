import ITodo from "./ITodo";

const Services = {

  getData: (): ITodo[] => {
    const todoes = localStorage.getItem("todos");
    return todoes ? JSON.parse(todoes) : [];
  },

  postData: (text:string): ITodo => {

    const todos = Services.getData();
    // const newTodos: ITodo = { id: todos.length + 1, todo: text, completed: false }
    const newTodos: ITodo = { id: crypto.randomUUID(), todo: text, completed: false }
    const updateTodos = [...todos, newTodos];
    localStorage.setItem('todos', JSON.stringify(updateTodos));
    return newTodos;

  },

  putData: (todo:ITodo): ITodo => {
    const todos = Services.getData();
    const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    localStorage.setItem('todos', JSON.stringify(updateTodos));
    return todo;
  },

  deleteData: (id:any): void => {
    const todos = Services.getData();

    const updateTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(updateTodos));
  },

  putSaveData: (todo:ITodo[]): ITodo[] => {
    
    localStorage.setItem('todos', JSON.stringify(todo));
    return todo;
  },

  // getDataNumber: (): number => {
  //   const todoes = localStorage.getItem("todos");

  //   for (let i = 0; i < todoes.length; i++) {
  //     const element = todoes[i];
      
  //   }

  //   return todoes ? JSON.parse(todoes) : 0;
  // }

}

export default Services;