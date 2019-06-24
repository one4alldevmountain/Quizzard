import React, {useEffect} from 'react';
import routes from './routes';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from './actions';
import { HashRouter } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = (props) => {

  useEffect(() => {
    axios.get('http://localhost:7000/auth/userassign').then(user => {

      props.updateUser(user.data)
    }, [])
  })


  toast.configure({
    autoClose: 2000,
    position: 'top-center',
  })
  return (


    <div>
      <HashRouter>
           {routes}
      </HashRouter>
    </div>
  );
}



export default connect(null, { updateUser })(App) 
