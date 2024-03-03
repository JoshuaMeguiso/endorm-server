import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLoginCard = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const [new_user, setNewUser] = useState(false);

  const loginCard = async (rfid) => {
    setIsLoading(true);
    setError(null);

    axios.get(`/user/uid/${rfid}`).then((response) => {
      setIsLoading(false);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.uid_key));
        dispatch({ type: "LOGIN", payload: response.data.uid_key });
        return;
      }
      setNewUser(true);
    });
  };

  return { loginCard, isLoading, error, new_user, setNewUser };
};