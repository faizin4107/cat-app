export const getTokenFromLocalStorage = () => {
    let accessToken = '';
    const user = JSON.parse(localStorage.getItem("user"));
    if(user !== null){
        accessToken = user.accessToken;
    }else{
        accessToken = '';
    }
    // console.log('token', accessToken)
    return accessToken;
};