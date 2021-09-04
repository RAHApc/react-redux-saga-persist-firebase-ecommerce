import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './styles.scss';

import { resetPasswordStart, resetUserState } from '../../redux/User/user.action';

import AuthWrapper from './../AuthWrapper/index';
import FormInput from './../forms/FormInput/index';
import Button from './../forms/Button/index';

const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});

const EmailPassword = props => {
    const dispatch = useDispatch();

    const history = useHistory();

    const {resetPasswordSuccess, userErr} = useSelector(mapState);

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/login');
        }
    }, [resetPasswordSuccess])

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr])

    const handleSubmit= (e)=>{
        e.preventDefault();
        dispatch(resetPasswordStart({email}));        
    }

    const configAuthWrapper = {
        headline: 'Email Password'
    };

        return ( 
            <AuthWrapper {...configAuthWrapper}>
                <div className="formwrap">

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) =>(
                            <li key={index}>
                                {err}
                            </li>
                            ))}
                        </ul>
                    )}

                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Button type="submit">
                            Email Password
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
        );
    }
 
export default EmailPassword;