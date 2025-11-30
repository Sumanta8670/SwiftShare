import { useAuth } from "@clerk/clerk-react";
import { createContext, useCallback, useEffect } from "react";
import { apiEndPoints } from "../utils/apiEndPoints.js";
import axios from "axios";
import { useState } from "react";


export const UserCreditsContext = createContext();

export const UserCreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(5);
  const [loading, setLoading] = useState(false);
  const {getToken, isSignedIn} = useAuth();

  //Function to fetch the user credits that can be called from anywhere
  const fetchUserCredits = useCallback(async () => {
    if (!isSignedIn) return;
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(apiEndPoints.GET_CREDITS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setCredits(response.data.credits);
      } else {
        console.error("Failed to fetch user credits");
      }
    } catch (error) {
      console.error("Error fetching user credits:", error);
    } finally {
      setLoading(false);
    }
  }, [getToken, isSignedIn]);

  useEffect(() => {
    if (isSignedIn) {
      fetchUserCredits();
    }
  }, [isSignedIn, fetchUserCredits]);

  const updateCredits = useCallback((newCredits) => {
    console.log("Updating credits to:", newCredits);
    setCredits(newCredits);
  }, []);
  const contextValue = {
    credits,
    setCredits,
    updateCredits,
    fetchUserCredits,
  };

  return (
    <UserCreditsContext.Provider value={contextValue}>
      {children}
    </UserCreditsContext.Provider>
  );
};
