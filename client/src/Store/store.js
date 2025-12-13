import React, { createContext, useContext, useReducer } from "react";
import { userReducer, initialUserState } from "../Features/UserSlice";
import eventReducer, { initialEventState } from "../Features/eventSlice";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [eventState, eventDispatch] = useReducer(eventReducer, initialEventState);

  const value = {
    user: userState.user,
    isLoggedIn: userState.isLoggedIn,
    userDispatch,
    events: eventState.events,
    eventDispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
