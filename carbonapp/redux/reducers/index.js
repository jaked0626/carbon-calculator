import { combineReducers } from 'redux'; // combines reducers defined across multiple files
import { user } from './user';

const Reducers = combineReducers({
    userState: user
})

export default Reducers