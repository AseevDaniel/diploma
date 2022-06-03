import { Link} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {removeUser} from '../store/slices/userSlice'
import { useAppDispatch } from '../hooks/reduxHooks';
import {Header} from "../components/Layout/Header";

 const HomePage = () => {
    const dispatch = useAppDispatch();

    const { email} = useAuth();


    return <div>
        <Header/>
            <h1>Welcome</h1>

            <Link to="/sessions" >To session page</Link>
            <br/>

            <button
                onClick={()=> dispatch(removeUser())}
            >Log out from {email}</button>
        </div>
}

export default HomePage;

