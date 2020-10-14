import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Header from './components/Header/Header';
import Service from './components/Service/Service';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Order from './components/Order/Order';
import OrderContent from './components/OrderContent/OrderContent';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route component={Header} />
        <Route path="/" exact={true} component={Service} />
        <Route path="/sign-up" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/mypage/order" exact={true} component={Order} />
        <Route path="/mypage/order/:id" exact={true} component={OrderContent} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
