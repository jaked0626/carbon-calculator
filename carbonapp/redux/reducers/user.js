// contains all variables regarding state of user

const initialState = { //init
    currentUser: null
}

export const user = (state = initialState, action) => { // default state is initial state.
    // action will fetch data from database, send it to reducer which will update userstate
    return {
        ...state, // initial state
        currentUser: action.currentUser // update whenever action is received
    }
}