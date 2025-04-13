import { useSelector, useDispatch } from "react-redux";
import {
  editTodo,
  toggleComplete,
  deleteTodo,
  selectFilteredTodos,
  selectTodosByStatus
} from "../features/todos/todosSlice";
import { useState } from "react";
import { RootState } from "../app/store";
import { Todo, TodoStatus } from "../types/todo.types";
import { useOutletContext } from "react-router-dom";
import PieChart from "../components/PieChart";
import StatsChart from "../components/StatsChart";

const Home = () => {
  const { search, status } = useOutletContext<{ search: string; status: TodoStatus }>();

  const filteredTodos = useSelector((state: RootState) =>
    selectFilteredTodos(state, status, search)
  );
  const dispatch = useDispatch();
  
  const completedTodos = useSelector((state: RootState) => selectTodosByStatus(TodoStatus.COMPLETED)(state));
  const pendingTodos = useSelector((state: RootState) => selectTodosByStatus(TodoStatus.PENDING)(state));
  const todos = useSelector((state: RootState) =>
    selectFilteredTodos(state, TodoStatus.ALL, search)
  );
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const startEdit = (todo: any) => {
    setEditingId(todo.id);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const saveEdit = () => {
    dispatch(
      editTodo({
        id: editingId!,
        title: editedTitle,
        description: editedDescription,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      })
    );
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-green-200 text-gray-900 flex justify-center flex-col items-center min-w-full p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-10">📋 All Todos</h1>

        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-600">No todos found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredTodos.map((todo: Todo) => (
              <li
                key={todo.id}
                className="bg-white p-4 rounded-lg flex flex-col gap-4 md:flex-row md:items-center justify-between shadow-md"
              >
                {editingId === todo.id ? (
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                    />
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                  </div>
                ) : (
                  <div className="flex-1">
                    <p
                      className={`text-lg font-medium ${todo.isCompleted ? "line-through text-gray-500" : ""
                        }`}
                    >
                      {todo.title}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 mt-2 md:mt-0 md:ml-4">
                  {editingId === todo.id ? (
                    <button
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 hover:bg-yellow-400 text-white px-3 py-1 rounded"
                      onClick={() => startEdit(todo)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => dispatch(toggleComplete(todo.id))}
                  >
                    {todo.isCompleted ? "Undo" : "Complete"}
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-around items-center gap-25">
        <PieChart completedCount={completedTodos.length} pendingCount={pendingTodos.length} />
        <StatsChart todos={todos} />
      </div>
    </div>
  );
};

export default Home;
