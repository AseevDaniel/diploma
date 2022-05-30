import {Redirect, useLocation} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {removeUser} from '../store/slices/userSlice'
import { useAppDispatch } from '../hooks/reduxHooks';
import {useEffect} from "react";
import {getSessions} from "../services/sessionService";
import {CreateSession} from "../components/CreateSession";



const getSession = async () => {
    const data = await getSessions()
    data.forEach((doc) => {
        console.log(doc.data().startDate)
        console.log(doc.data().endDate)
    });
}




const HomePage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        getSession()

    }, [location.pathname])


    const {isAuth, email} = useAuth();
    console.log(email)

    return isAuth ? (
        <div>
            <h1>Welcome</h1>

            <CreateSession/>

            <button
                onClick={()=> dispatch(removeUser())}
            >Log out from {email}</button>
        </div>
    ) : (
        <Redirect to="/login" />
    )
}

export default HomePage
