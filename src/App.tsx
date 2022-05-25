import {Switch, Route, useLocation} from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {useEffect} from "react";
import {getData} from "./services/firebaseDataService";

const getSession = async () => {
    const data = await getData('sessions')
    data.forEach((doc) => {
        console.log(new Date(doc.data().time.seconds * 1000))
    });
}


function App() {
    const location = useLocation();

    useEffect(() => {
        getSession()
    }, [location.pathname])

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
    </Switch>
  );
}

export default App;
