import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import About from "../../pages/About/About";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Media from "../../pages/Media/Media/Media";
import PostDetails from "../../pages/PostDetails/PostDetails";
import Register from "../../pages/Register/Register";
import PrivateRouter from "../PrivateRouter/PrivateRouter";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/media',
                element: <PrivateRouter><Media></Media></PrivateRouter>
            },
            {
                path: '/media/:id',
                element: <PrivateRouter><PostDetails></PostDetails></PrivateRouter>,
                loader: async () => {
                    return fetch('https://endgame-project-1-server.vercel.app/post')
                }
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/about',
                element: <PrivateRouter><About></About></PrivateRouter>
            },
        ]
    }
])
export default router;