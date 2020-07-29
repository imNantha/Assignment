const assignmentReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ASSIGNMENT_LIST':
            return state = { list: action.payload };
        default:
            return state;
    }
}

export default assignmentReducer;