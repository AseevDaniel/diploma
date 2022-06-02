import { SignUp } from 'components/auth/SignUp';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    return (
        <div>
            <h1>Register</h1>
            <SignUp />
            <p>
                Already have an account? <Link to="/login">Sign in</Link>   
            </p>            
        </div>
    )
}
