export const EventReducer = (state, action) =>{
    switch(action.type){
        case 'UPDATE_EVENT':
            return{...state, eventId:action.payload};
        default:
            return state;
    }
}