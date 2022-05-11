import {createContext, useReducer} from 'react';
import AuthReducer from './AuthReducer';

const hold = localStorage.getItem('c_user');
const currentUser = JSON.parse(hold);


const INITIAL_STATE = {
    user: currentUser ? currentUser : null,
    isFetching:false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE);
    return(
        <AuthContext.Provider value={{user:state.user, isFetching:state.isFetching, error:state.error, dispatch}} >
            {children}
        </AuthContext.Provider>
    )
}
