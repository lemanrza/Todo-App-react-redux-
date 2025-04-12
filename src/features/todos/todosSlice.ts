import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types/todo.types';

interface TodosState {
    todos: Todo[]
}
const initialState: TodosState = {
    todos: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        completedTodo: (state, { payload }: PayloadAction<string>) => {
            const todo = state.todos.find((t) => t.id === payload);
            if (todo) todo.isCompleted = !todo.isCompleted;
        },

        deleteTodo: (state, { payload }: PayloadAction<string>) => {
            state.todos = state.todos.filter((t) => t.id !== payload);
        },
    },
});

export const { addTodo, completedTodo, deleteTodo } = todosSlice.actions;
export const selectTodos = (state: { todos: TodosState }) => state.todos.todos;

export default todosSlice.reducer;
