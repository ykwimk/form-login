import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Header from './components/Header/Header';
import Service from './components/Service/Service';
import Signup from './components/Signup/Signup';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Route path="/" exact={true} component={Service} />
        <Route path="/sign-up" component={Signup} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
