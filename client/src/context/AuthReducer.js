const AuthReducer = (state, action) =>{
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: false,
                error: false,
                isLoggedIn:false,
            };

    case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
                isLoggedIn:true,
                };
                
    case "LOGIN_FAILURE":
        return {
                user: null,
                isFetching: false,
                error:action.payload,
                isLoggedIn:false,
            };            
            
    case "LOGOUT":
        return {
                user: null,
                isFetching: false,
                error:false,
                isLoggedIn:false,
            };

        default:
            return state;
    }
};

export default AuthReducer;