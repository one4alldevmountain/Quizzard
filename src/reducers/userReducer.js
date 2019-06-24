const initialState = {
    username: '',
    email: '',
    _id: null,
};



export function userReducer(state = initialState, action) {
    
       switch(action.type){
           case 'user':

               return {
                   ...state,
                   ...action.payload
               }
               
       }

    };

    


