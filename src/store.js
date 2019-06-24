import { createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer} from './reducers/userReducer';


    
    



export const store = createStore(userReducer, composeWithDevTools());




