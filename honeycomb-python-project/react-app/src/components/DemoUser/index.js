import React from 'react';
import { login } from '../../store/session';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

export default DemoUser = async () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const logDemoUser = (e) => {
        e.preventDefault();

        const user = {
            email: 'demo@aa.io',
            password: 'password'
        }

        await dispatch(login(user))
        history.push('/')
    }

    return (
        <>

        </>
    )
}
