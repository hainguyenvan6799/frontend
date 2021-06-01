import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {useHistory, Redirect} from 'react-router-dom';
import LoginForm from './components/page/User/LoginForm';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

// create context area
export const userContext = React.createContext({ name: "", email: "", is_updated_info: 0, mauser: "", sex: "" });
export const loadingContext = React.createContext(false);
export const validationContext = React.createContext({
    validation_all: {
        status: null,
        message: "",
    },
    validation_email: {
        status: null,
        message: "",
    },
    validation_password: {
        status: null,
        message: "",
    },
})

function Store({ children }) {
    const [user, setUser] = useState(userContext._currentValue);
    const [loading, setLoading] = useState(loadingContext._currentValue);
    const [general_validation, setGeneralValidation] = useState(validationContext._currentValue);

    const history = useHistory();

    useEffect(() => {
        let isMounted = true;
        check_login(isMounted);

        return () => {
            isMounted = false
        };
    }, [])

    const check_login = (isMounted) => {
        let token = localStorage.getItem('token')

        if (token !== null) {
            setLoading(true)
            axios.get('/api/user')
                .then(
                    res => {
                        if (isMounted) {
                            // console.log(res);
                            if (res.data.status === "success") {
                                // console.log("success");
                                let { name, email, is_updated_info, mauser, sex, group } = res.data.user;
                                
                                setUser({
                                    ...user,
                                    name: name,
                                    email: email,
                                    is_updated_info: is_updated_info,
                                    mauser: mauser,
                                    sex: sex,
                                    group: group,
                                    magiaovien: res.data.magiaovien,
                                })
                            }

                        }
                        setLoading(false);
                    }
                )
                .catch(
                    error => {
                        if(token)
                        {
                            localStorage.clear();
                            alert("Đã hết thời gian đăng nhập. Vui lòng tải lại trang.") 
                            return <Redirect to="/signin" />                        
                        }
                    }
                )
        }

    }
    return (
        <div>
            <userContext.Provider value={[user, setUser]}>
                <loadingContext.Provider value={[loading, setLoading]}>
                    <validationContext.Provider value={[general_validation, setGeneralValidation]}>
                            {children}
                    </validationContext.Provider>
                </loadingContext.Provider>
            </userContext.Provider>
        </div>
    )
}

export default Store
