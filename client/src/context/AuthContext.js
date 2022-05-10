import {createContext, useReducer} from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    user:{
        "_id": "62729515900873283452ccbd",
        "username": "raj",
        "email": "raj@gmail.com",
        "password": "$2b$10$YFe7xwB6hWXQaAlGxrBaAO6oDGuIBR/gulU.n7N1t3Lnm2JpguTzO",
        "profilePicture": "/person/2.jpeg",
        "coverPicture": "/post/9.jpeg",
        "followers": [],
        "isAdmin": false,
        "createdAt": "2022-05-04T15:00:37.158Z",
        "updatedAt": "2022-05-06T16:04:10.481Z",
        "__v": 0,
        "followings": [
            "6272bdaa6e3a55c695ba751e",
            "6272951d900873283452ccbf",
            "6277cebf8c864b85304216e8"
        ],
        "city": "mangalore",
        "desc": "Hey its my updated description",
        "from": "Karnataka",
        "relationship": 2
    },
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
