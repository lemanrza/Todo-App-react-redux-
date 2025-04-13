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
      description: Yup.string().required("Description is required"),
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
    <div className="bg-green-200 min-h-screen flex items-center">
      <div className="bg-white p-10 md:w-2/3 lg:w-1/2 mx-auto h-70 rounded">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="flex items-center mb-5">
            <label className="w-20 inline-block text-right mr-4 text-gray-500">To-Do</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} name="title" id="name" type="text" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400" />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            )}
          </div>

          <div className="flex items-center mb-10">
            <label className="w-20 inline-block text-right mr-4 text-gray-500">Description</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} type="text" name="description" id="description" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400" />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm">{formik.errors.description}</div>
            )}
          </div>
          <div className="text-right">
            <button type="submit" className="py-3 px-8 bg-green-500 text-green-100 font-bold rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
