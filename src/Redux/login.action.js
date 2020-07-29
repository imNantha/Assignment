export const loginAction = (user) => ({
    type: 'LOGIN',
    payload: user
});

export const logoutAction = (user) => ({
    type: 'LOGOUT',
    payload: user
});