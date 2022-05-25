import {Switch, Route, useLocation} from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {app } from 'firebase'
import {useEffect} from "react";
const db = getFirestore(app)

const getData = async  () => {
    try {
        const querySnapshot = await getDocs(collection(db, "sessions"));
        querySnapshot.forEach((doc) => {
            console.log(new Date(doc.data().time.seconds * 1000))
        });
    }
    catch(error) {
        alert(error)
    }


}



function App() {
    const location = useLocation();

    useEffect(() => {
        getData()
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
