import {Redirect} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {removeUser} from '../store/slices/userSlice'
import { useAppDispatch } from '../hooks/reduxHooks';





const HomePage = () => {
    const dispatch = useAppDispatch();


    const {isAuth, email} = useAuth();

    return isAuth ? (
        <div>
            <h1>Welcome</h1>

            <button
                onClick={()=> dispatch(removeUser())}
            >Log out from {email}</button>
        </div>
    ) : (
        <Redirect to="/login" />
    )
}

export default HomePage
