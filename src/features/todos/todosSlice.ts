import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoStatus } from '../../types/todo.types';
import { getTodos, saveTodos } from '../../utils/localStorage';
import { RootState } from "../../app/store";


interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: getTodos(),
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      saveTodos(state.todos);
    },

    toggleComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
        saveTodos(state.todos);
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      saveTodos(state.todos);
    },

    editTodo: (state, { payload }: PayloadAction<Todo>) => {
        const index = state.todos.findIndex((x) => x.id === payload.id);
        if (index !== -1) {
          state.todos[index] = payload;
          saveTodos(state.todos);
        }
      }      
  },
});

export const selectTodosByStatus=(status: TodoStatus)=>(state: {todos: TodosState})=>{
    switch(status){
        case TodoStatus.COMPLETED:
        return state.todos.todos.filter((todo)=> todo.isCompleted);
        case TodoStatus.PENDING:
            return state.todos.todos.filter((todo)=>!todo.isCompleted);
            default:
                return state.todos.todos
    }
}
export const selectFilteredTodos = (
    state: RootState,
    status: TodoStatus,
    searchQuery: string = ''
  ) => {
    const normalizedQuery = searchQuery?.toLowerCase?.() || '';
  
    return state.todos.todos.filter((todo: Todo) => {
      const matchesStatus =
        status === TodoStatus.ALL ||
        (status === TodoStatus.COMPLETED && todo.isCompleted) ||
        (status === TodoStatus.PENDING && !todo.isCompleted);
  
      const matchesSearch = todo.title.toLowerCase().includes(normalizedQuery);
  
      return matchesStatus && matchesSearch;
    });
  };
  
  
export const { addTodo, toggleComplete, deleteTodo, editTodo } = todosSlice.actions;
export const selectTodos = (state: { todos: TodosState }) => state.todos.todos;

export default todosSlice.reducer;
