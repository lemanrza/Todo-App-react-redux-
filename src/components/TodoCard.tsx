import { useSelector } from 'react-redux';
import { selectTodos } from '../features/todos/todosSlice';
const TodoList = () => {
    const todos = useSelector(selectTodos);

    return (
        <div className="todo-list mt-4">
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="py-2 px-4 border-b">
                        {todo.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
