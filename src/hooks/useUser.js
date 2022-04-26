import { useEffect, useContext, useMemo, useCallback } from "react";
import { AppContext } from "../context/UserContext";
import axios from "axios";
import jwtDecode from "jwt-decode";

export function useUser() {
  const { token, setToken } = useContext(AppContext);

  //Usar token para comparar
  useEffect(() => {
    const tokenData = window.localStorage.getItem("DrixitToken");
    if (tokenData) {
      setToken(tokenData);
    }
  }, [setToken]);

  const userId = useMemo(() => {
    if (!token) return;
    const tokenData = jwtDecode(token);
    return tokenData.id;
  }, [token]);

  const logOut = () => {
    window.localStorage.removeItem("DrixitToken", JSON.stringify(""));
    setToken("");
  };

  const login2 = async (email, password) => {
    try {
      const response = await axios({
        url: "http://localhost:3001/api/login",
        method: "POST",
        data: {
          email: email,
          password: password,
        },
      });

      if (response) {
        window.localStorage.setItem(
          "DrixitToken",
          JSON.stringify(response.data.token)
        );
        setToken(response.data.token);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const getUserData = useCallback(async () => {
    const response = await axios({
      url: "http://localhost:3001/api/getUser",
      method: "POST",
      data: {
        id: userId,
      },
    });
    return response ? response.data : "Id does not match any user";
  }, [userId]);

  return {
    logOut,
    login2,
    user: userId,
    getUserData,
  };
}
