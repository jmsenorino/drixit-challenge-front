import { useEffect, useContext, useMemo, useCallback } from "react";
import { AppContext } from "../context/UserContext";
import axios from "axios";
import jwtDecode from "jwt-decode";

export function useUser() {
  const { token, setToken } = useContext(AppContext);

  // Checks if user is already logged in
  useEffect(() => {
    const tokenData = window.localStorage.getItem("DrixitToken");
    if (tokenData) {
      setToken(tokenData);
    }
  }, [setToken]);

  // Extracts user id from Token
  const userId = useMemo(() => {
    if (!token) return;
    const tokenData = jwtDecode(token);
    return tokenData.id;
  }, [token]);

  const logOut = () => {
    window.localStorage.removeItem("DrixitToken");
    setToken("");
  };

  // Logs In and store Token on LocalStorage and Context
  const login = async (email, password) => {
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
        window.localStorage.setItem("DrixitToken", response.data.token);
        setToken(response.data.token);
      }
    } catch (error) {
      throw error.message;
    }
  };

  // Retrieves user data from Back-end
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
    login,
    user: userId,
    getUserData,
  };
}
