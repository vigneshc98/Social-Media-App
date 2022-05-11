const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return {
                user:null,
                isFetching:true,
                error:false
            };
        case "LOGIN_SUCCESS":  
            return {
                user: action.payload,
                isFetching:false,
                error:false
            };
        case "LOGIN_FAILURE" :
            return {
                user: null,
                isFetching:false,
                error:action.payload
            };
        case "FOLLOW" :

            const followTemp = localStorage.getItem('c_user');
            let followUser = JSON.parse(followTemp);
            followUser.followings.push(action.payload);
            followUser.followings = [...new Set(followUser.followings)];
            localStorage.setItem('c_user', JSON.stringify(followUser));

            return {
                ...state,
                user:{
                    ...state.user,
                    // followings:[...state.user.followings, action.payload]
                    followings: followUser.followings
                }
            };
        case "UNFOLLOW" :

            const unfollowtemp = localStorage.getItem('c_user');
            let unfollowUser = JSON.parse(unfollowtemp);
            const index = unfollowUser.followings.indexOf(action.payload);
            index>=0 && unfollowUser.followings.splice(index,1);
            localStorage.setItem('c_user', JSON.stringify(unfollowUser));

            return {
                ...state,
                user:{
                    ...state.user,
                    // followings: state.user.followings.filter((following)=> following !== action.payload)  
                    followings: unfollowUser.followings
                }
            };
        default:
            return state;
    }
};

export default AuthReducer;