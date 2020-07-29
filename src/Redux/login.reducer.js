export const loginReducer = (state = { login: false, user: null }, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { login: true, user: action.payload };
        case 'LOGOUT':
            return { login: false, user: null };
        default:
            return state;
    }
};