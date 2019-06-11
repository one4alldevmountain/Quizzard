import React from 'react';
import routes from './routes';
import './App.css';
import { HashRouter } from 'react-router-dom';





function App() {
  return (


    <div className="App">
      <HashRouter>
           {routes}
      </HashRouter>
    </div>
  );
}

export default App;
