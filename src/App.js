import React, {useEffect} from 'react';
import routes from './routes';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from './actions';
import { HashRouter, Route } from 'react-router-dom';
import { toast } from 'react-toastify'
import HeaderView from './Components/Header/HeaderView';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import './cssReset.css';

const App = (props) => {

  useEffect(() => {
    axios.get('/auth/userassign').then(user => {

      props.updateUser(user.data)
    }, [])
  })


  toast.configure({
    autoClose: 2000,
    position: 'top-center',
  })
  return (


    <div >
      
      <HashRouter>
        <HeaderView/>
        <div className='pageContainer'>

           {routes}
        </div>
      </HashRouter>
    </div>
  );
}

// const mapStateToProps = (reduxState) => {
//   const {
//       _id,
//   } = reduxState;
//   return{
//       _id,
//   }
// }

export default connect(null, { updateUser })(App) 
