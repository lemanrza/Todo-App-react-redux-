import Home from "../pages/Home";
import Completed from "../pages/Completed";
import Pending from "../pages/Pending";
import AddToDo from "../pages/AddToDo";
import NotFound from "../pages/NotFound";
import Layout from "../layout";


const Routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "completed",
                element: <Completed />
            },
            {
                path: "pending",
                element: <Pending />
            },
            {
                path: "addtodo",
                element: <AddToDo />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
];
export default Routes;