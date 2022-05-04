import "./home.css";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";

export function Home() {
  const title = "User | Drixit Challenge";
  const navigate = useNavigate();
  const { logOut, getUserData } = useUser();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data);
    };
    fetchData();
  }, [getUserData]);

  const onLogOut = () => {
    logOut();
    navigate("/login");
  };

  return (
    <div className="app-child">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <div className="data-card">
        {/* <div className="img-container"> */}
        <img
          src={
            userData?.avatar ||
            "https://c.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
          }
          alt="Img"
        />
        {/* </div> */}
        <div className="user-info">
          <h1>User Info</h1>
          <div>
            <h2>Id</h2>
            <p>{userData?.id}</p>
          </div>
          <div>
            <h2>Email</h2>
            <p>{userData?.email}</p>
          </div>
          <div>
            <h2>Name</h2>
            <p>{userData?.name}</p>
          </div>
          <div>
            <h2>Surname</h2>
            <p>{userData?.surname}</p>
          </div>
          <div>
            <h2>Age</h2>
            <p>{userData?.age}</p>
          </div>
          <div>
            <h2>Role</h2>
            <p>{userData?.role}</p>
          </div>
        </div>
        <button className="btn btn-warning" onClick={onLogOut}>
          LogOut
        </button>
      </div>
    </div>
  );
}
