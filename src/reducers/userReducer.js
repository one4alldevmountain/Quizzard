const initialState = {
    _id: 0,
    username: 'Guest',
    email: 'guest',
};



export function userReducer(state = initialState, action) {
    
       switch(action.type){
           case 'user':

               return {
                   ...state,
                   ...action.payload
               }
            default: return state;  
               
       }

    };

    


