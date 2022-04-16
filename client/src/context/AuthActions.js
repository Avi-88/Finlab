export const LoginStart = (userCredentials) => ({
    type: "Login_START"
});

export const LoginSuccess = (user) => ({
    type:"LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = (error) => ({
    type: "LOGIM_FAILURE",
    payload: error
});

export const Logout = () => ({
    type: "LOGOUT",
});