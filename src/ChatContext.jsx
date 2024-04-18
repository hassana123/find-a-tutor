import {
    createContext,
    useContext,
    useReducer,
  } from "react";
  import { UserContext} from "./UserContext";
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    const  user = useContext(UserContext);
    const INITIAL_STATE = {
      chatId: "null",
      chatUser: {},
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            chatUser: action.payload,
            chatId:
              user.id > action.payload.uid
                ? user.id + action.payload.uid
                : action.payload.uid + user.id,
          };
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };