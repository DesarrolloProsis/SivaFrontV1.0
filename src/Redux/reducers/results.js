const defaultState = true;
function reducer(state = defaultState, {type, payload}) {
    switch(type){
        case 'authLogin':{
            return {
                auth:payload
            }
        }
        default:
            return state
            ;
    }
}
export default reducer;