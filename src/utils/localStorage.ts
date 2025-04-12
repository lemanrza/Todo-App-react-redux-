import { Todo } from "../types/todo.types";
const LOCAL_STORAGE = "todos"

export const saveTodos = (todos: Todo[]) => {
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(todos))
}
export const getTodos = (): Todo[] => {
    const data = localStorage.getItem(LOCAL_STORAGE);
    return data ? JSON.parse(data) : [];
}
