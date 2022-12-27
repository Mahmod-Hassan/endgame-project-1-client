import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router/Router";


function App() {
  return (
    <div className="w-10/12 mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
