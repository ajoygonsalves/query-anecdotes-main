import { useContext } from "react";
import { useCallback } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const notificationContextReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useViewNotification = () => {
  const notification = useContext(NotificationContext);
  return notification[0];
};

export const useCreateNotification = () => {
  const [, dispatch] = useContext(NotificationContext);
  return useCallback(
    (message, duration = 2000) => {
      dispatch({ type: "SET", payload: message });
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, duration);
    },
    [dispatch]
  );
};

export const NotificationContentProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationContextReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
