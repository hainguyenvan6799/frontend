import React, { useContext } from 'react';
import { useHistory } from 'react-router';

//import basic components
import Header from '../../basic_components/Header';
import Footer from '../../basic_components/Footer';

// import addictional components
import * as Yup from 'yup';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { private_key_chatroom } from '../security'


// import Context
import { loadingContext, userContext } from '../../../Store';

// import form:
import { change_password_after_login_form } from '../../basic_components/allform/FormManagement';

function ChangePasswordAfterLogin() {
    // declare history to redirect to another page
    const history = useHistory();

    // declare context
    const [ user, setUser ] = useContext(userContext)
    const [ loading, setLoading ] = useContext(loadingContext)

    const initialValues = {
        "old_password": "",
        "password": "",
        "confirm_password": "",
    }

    const onSubmit = (values) => {
        const data = {
            request_from_user: "change-password-after-login",
            ...values,
            email: user.email,
        }
        axios.post('/api/change_password', data)
            .then(
                response => {
                    const { status } = response.data;
                    if(status === "Success")
                    {
                        var config = {
                            method: 'patch',
                            url: `https://api.chatengine.io/users/${user.user_chat_id}/`,
                            headers: {
                                'PRIVATE-KEY': private_key_chatroom,
                            },
                            data: {
                                secret: values.password
                            }
                        }
                        axios(config).then(res => {
                            alert("Đổi mật khẩu thành công.");
                            localStorage.clear();
                            history.push('/signin');
                        }).catch(err => console.log(err))
                        
                    }
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    const validationSchema = Yup.object({
        old_password: Yup
            .string()
            .required("Password can not be empty")
            .matches(/^[a-zA-Z0-9]{6,20}$/g, 'Password có thể là chữ thường hoặc in hoa hoặc số và có độ dài ít nhất 6 ký tự, nhiều nhất là 10 ký tự.'),
        password: Yup
            .string()
            .required("Password can not be empty")
            .matches(/^[a-zA-Z0-9]{6,20}$/g, 'Password có thể là chữ thường hoặc in hoa hoặc số và có độ dài ít nhất 6 ký tự, nhiều nhất là 10 ký tự.'),
        confirm_password: Yup
            .string()
            .oneOf([Yup.ref('password'), null], 'Trường này phải có giá trị giống với New Password'),

    })

    const main_content = () => {
        return (change_password_after_login_form(initialValues, onSubmit, validationSchema));
    }

    const full_page = () => {
        return (
            <div>
                <Header />
                {main_content()}
                <Footer />
            </div>
        )
    }
    return (
        loading ? <ClipLoader/> : user.name !== "" ? full_page() : <ClipLoader/>
    )
}

export default ChangePasswordAfterLogin
