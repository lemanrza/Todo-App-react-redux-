import Routes from "./routes/Route";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(Routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
