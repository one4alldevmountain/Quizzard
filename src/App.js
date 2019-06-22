import React from 'react';
import routes from './routes';
import './App.css';
import { QuizFormView } from './Components';
import { HashRouter } from 'react-router-dom';





function App() {
  return (


    <div className="App">
      QUIZZARD
      <HashRouter>
           {routes}
      </HashRouter>
    </div>
  );
}

export default App;
