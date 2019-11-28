import {createStore, combineReducers} from 'redux';
import results from "./reducers/results";
const reducer = combineReducers({
    results
});

const store = createStore(reducer);
export default store;