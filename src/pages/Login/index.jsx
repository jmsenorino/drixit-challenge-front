import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import LogoDrixit from "../../images/logo_drixit_black.png";
import "./login.css";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { login } = useUser();
  const title = "LogIn | Drixit Challenge";
  const navigate = useNavigate();

  //Formik for validations
  const {
    handleSubmit,
    handleChange,
    touched,
    errors,
    handleBlur,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      isValid: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email requerido"),
      // password: Yup.string().required("Password requerido")
    }),
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate("/user-info");
      } catch (error) {
        toast.error("User or password missing");
      }
    },
  });

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <div className="login-box d-flex justify-content-center align-content-center">
        <div className="col-xs">
          <img className="login-logo" src={LogoDrixit} alt="Drixit Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="login-box__email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? (
            <div>{errors.email}</div>
          ) : (
            <input
              hidden={!isValid || !dirty}
              type="password"
              placeholder="Password"
              name="password"
              className="login-box__password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}

          {touched.password && errors.password ? (
            <div>{errors.password}</div>
          ) : null}
          <button className="btn btn-primary" type="submit">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
