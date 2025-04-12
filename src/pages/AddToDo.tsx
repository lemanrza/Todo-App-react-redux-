// import  { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addTodo } from '../features/todos/todosSlice';


// const AddTodo = () => {
//   const [todo, setTodo] = useState('');
//   const dispatch = useDispatch();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (todo.trim() !== '') {
//       dispatch(addTodo({ id: Date.now(), description: todo }));
//       setTodo(''); 
//     }
//   };

//   return (
//     <div className="add-todo flex justify-center mt-8">
//       <form onSubmit={handleSubmit} className="flex items-center space-x-2">
//         <input
//           type="text"
//           value={todo}
//           onChange={(e) => setTodo(e.target.value)}
//           placeholder="Enter new todo"
//           className="px-4 py-2 border rounded"
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add Todo
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTodo;
// src/pages/AddTodo.tsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../features/todos/todosSlice";
import { AppDispatch } from "../app/store";
import { Todo } from "../types/todo.types";

const AddTodo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      const newTodo: Todo = {
        id: uuidv4(),
        title: values.title,
        description: values.description,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };

      dispatch(addTodo(newTodo));
      navigate("/");
    },
  });

  return (
    <div className="mt-40 max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Todo</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm">{formik.errors.title}</div>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm">{formik.errors.description}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
