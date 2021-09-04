import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './styles.scss';

import { signUpUserStart } from './../../redux/User/user.action';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput/index';
import Button from './../forms/Button/index';

const mapState = ({user}) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const SignUp = props => {
    const dispatch = useDispatch();

    const history = useHistory();

    const { currentUser, userErr } = useSelector(mapState);

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setError] = useState([]);

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push('/');
        }
    }, [currentUser]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setError(userErr);
        }
    }, [userErr]);

    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError([]);
    }

   const handleSubmit= (e)=>{
        e.preventDefault();
       dispatch(signUpUserStart({displayName, email, password, confirmPassword}))
    }

    const configAuthWrapper = {
        headline: 'Registration'
    };

        return ( 
            <AuthWrapper {...configAuthWrapper}>
                    <div className="formwrap">

                        {errors.length > 0 && (
                            <ul>
                                {errors.map((err, index) => (
                                    <li key={index}>{err}</li>
                                ))}
                            </ul>
                        )}

                    <form onSubmit={handleSubmit}>

                        <FormInput
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full name"
                            handleChange={e => setDisplayName(e.target.value)}
                        />

                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={e => setEmail(e.target.value)}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={e => setPassword(e.target.value)}
                        />

                        <FormInput
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            handleChange={e => setConfirmPassword(e.target.value)}
                        />
                        
                        <Button type="submit">
                            Register
                        </Button>
                    </form>
                    </div>
            </AuthWrapper>
        );
}
 
export default SignUp;