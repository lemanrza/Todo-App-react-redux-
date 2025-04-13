import { useSelector } from 'react-redux'
import { selectTodosByStatus } from '../features/todos/todosSlice'
import { TodoStatus } from '../types/todo.types'
const Completed = () => {
  const todos=useSelector(selectTodosByStatus(TodoStatus.COMPLETED))
  return (
    <>
     <div className="min-h-screen  bg-green-200 text-black p-6">
      <h1 className="text-3xl font-bold text-center mb-6">✅ Completed Todos</h1>
      {todos.length === 0 ? (
        <p className="text-center text-gray-600">No completed todos yet.</p>
      ) : (
        <ul className="space-y-4 max-w-4xl mx-auto">
          {todos.map((todo) => (
            <li key={todo.id} className="bg-white p-4 rounded-lg shadow flex flex-col">
              <div className="font-bold">{todo.title}</div>
              <div className="text-sm text-gray-600">{todo.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  )
}

export default Completed