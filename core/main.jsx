import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingOutlet }  from '@core/outlets';
import Error from '@pages/home/Error';
import Home from '@pages/home/Home';
import store from '@core/store';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LandingOutlet /> }>
          <Route index element={ <Home /> } />
          <Route path="*" element={ <Error /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <Provider store={ store }>
    <App />
  </Provider>
)