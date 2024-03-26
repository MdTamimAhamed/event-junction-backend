import { useReducer } from "react";
import { createContext, useContext } from "react";

import { EventReducer } from "./EventReducer";

const initialState = {
    eventId:'',
}

const EventContext = createContext();

export const useEventContext = ()=>{
    return useContext(EventContext)
}

export const EventContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(EventReducer, initialState)
    return(
        <EventContext.Provider value={{state, dispatch}}>
            {children}
        </EventContext.Provider>
    )
}



