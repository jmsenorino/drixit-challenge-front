import axios from "axios";
import { toast } from "react-toastify";

const getUser = async (userId) => {
  try {
    const response = await axios({
      url: "http://localhost:3001/api/getUser",
      method: "POST",
      data: {
        id: userId,
      },
    });

    return response ? response.data : "Id does not match any user";
  } catch (error) {
    if (error.message) {
      toast.error("Id from user not Found");
    }
  }
};

export { getUser };
