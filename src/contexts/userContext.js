import { createContext } from "react";
const UserContext = createContext(null);
// export UserContext
import { useContext } from "react";
import { useState } from "react";

const test = "test"

function state(params) {
    const [user, setUser] = useState("No user")
    return {user, setUser}
}

export const AppWrapper = ({children}) => {

    const {user, setUser} = state()
    console.log(user);
    // console.log(user);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(UserContext)
}