import { Link} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {removeUser} from '../store/slices/userSlice'
import { useAppDispatch } from '../hooks/reduxHooks';

 const HomePage = () => {
    const dispatch = useAppDispatch();

    const { email} = useAuth();

    return <div>
            <h1>Welcome</h1>

            <Link to="/sessions" >To session page</Link>
            <br/>

            <button
                onClick={()=> dispatch(removeUser())}
            >Log out from {email}</button>
        </div>
}

export default HomePage;

