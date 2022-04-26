import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useUser } from "./hooks/useUser";

function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <div className="app d-flex justify-content-center align-items-center">
        <Routes>
          <Route
            path="*"
            element={
              user ? <Navigate to="/user-info" /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/user-info"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/user-info" />}
          />
        </Routes>
        <ToastContainer
          theme="dark"
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
