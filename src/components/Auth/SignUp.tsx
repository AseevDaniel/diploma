import React from "react";
import {useHistory} from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {Form} from './Form';
import {setUser} from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import {writeUserData} from "../../services/userService";

const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const {push} = useHistory();

    const handleRegister = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }));

                writeUserData({
                    email: user.email!,
                    uid: user.uid
                })

                push('/');
            })
            .catch(console.error)
    }

    return (
        <Form
            title="register"
            handleClick={handleRegister}
        />
    )
}

export {SignUp}
