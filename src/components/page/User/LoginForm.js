
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
// require('dotenv').config()

// thư viện để mã hóa
import {mahoadulieu_postform, giaimadulieu} from '../security';
import { check_validate_email, check_validate_password } from '../../conditions/general_conditions';



// import State store
import { loadingContext, userContext, validationContext } from '../../../Store';

// import basic component
import Footer from '../../basic_components/Footer';
import Header from '../../basic_components/Header';

// import addictional components:
import ClipLoader from "react-spinners/ClipLoader";

// import cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const CryptoJS = require("crypto-js");
require('dotenv').config()

function LoginForm() {
    // import history to redirect to another page
    const history = useHistory();

    const [details, setDetails] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    // declare state from store
    const [user, setUser] = useContext(userContext);
    const [general_validation, setGeneralValidation] = React.useContext(validationContext);
    const [loading, setLoading] = useContext(loadingContext);

    // destructuring object to easy get value
    const { validation_email, validation_password } = general_validation;
    const { name, email } = user;

    const submitHandler = event => {
        event.preventDefault();
        if (check_before_submit(details)) {
            setGeneralValidation({
                ...setGeneralValidation,
                validation_email: "",
                validation_password: "",
            })
            setLoading(true)
            Login({
                email: mahoadulieu_postform(details.email),
                password: mahoadulieu_postform(details.password)
            });
        }
    }

    const Login = (userinfo) => {
        axios.post("/api/login", userinfo)
            .then(res => {
                console.log(res)
                const { status } = res.data;
                if (status === "failure") {
                    setError("Email hoac password khong dung.");
                }
                else if (status === "success") {
                    const { name, email, is_updated_info, mauser, sex, group, malop } = giaimadulieu(res.data.user);
                    const token = 'Bearer ' + res.data.token;

                    console.log(giaimadulieu(res.data.user))
                    console.log(giaimadulieu(res.data.magiaovien))

                    setUser({ ...user, 
                                name: name,
                                email: email,
                                is_updated_info, 
                                mauser,
                                sex, 
                                group,
                                malop,
                                magiaovien: giaimadulieu(res.data.magiaovien),
                             });
                    setGeneralValidation({
                        ...general_validation,
                        validation_email: {
                            status: null,
                            message: "",
                        },
                        validation_password: {
                            status: null,
                            message: "",
                        }
                    })
                    localStorage.setItem('token', token)

                    // lưu lại thông tin đăng nhập được mã hóa: sử dụng cho việc thông tin để vào phòng chat

                    // var encoded_email = CryptoJS.AES.encrypt(details.email, process.env.REACT_APP_Chatroom_API).toString();
                    // var encoded_password = CryptoJS.AES.encrypt(details.password, process.env.REACT_APP_Chatroom_API).toString();
                    const encoded_email = mahoadulieu_postform(details.email);
                    const encoded_password = mahoadulieu_postform(details.password)

                    localStorage.setItem('email', encoded_email)
                    localStorage.setItem('password', encoded_password)

                    // console.log(is_updated_info);

                    if (is_updated_info === 1) {
                        // console.log(user);
                        history.push('/');
                    }
                    else if (is_updated_info === 0) {
                        // console.log(user);
                        history.push('/trang_cap_nhat_thong_tin');
                    }
                }
                else {
                    alert(res.data.message);
                }
                setLoading(false);
            })
            .catch(error => console.log(error))
    };

    const show_validation = (field) => {
        const { status, message } = field;
        return (
            status === null ? "" : status ? (
                <p className="text-success text-left">{message}</p>
            ) : (
                <p className="text-danger text-left">{message}</p>
            )
        )
    }

    const show_errors = (error) => {
        return (
            error !== "" ? (
                <div className="alert alert-danger">
                    <p className="text-danger text-center">{error}</p>
                </div>
            ) : null
        )
    }

    const check_before_submit = ({ email, password }) => {
        const result1 = check_validate_email(email);
        const result2 = check_validate_password(password);

        setGeneralValidation({
            ...general_validation,
            validation_email: {
                status: result1.status,
                message: result1.message,
            },
            validation_password: {
                status: result2.status,
                message: result2.message,
            },
        });

        if (result1.status && result2.status) {
            return true;
        }
    }

    const handleChange = e => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value,
        })
    }

    // thành phần giao diện
    const main_content = () => {
        return (
            <div id="page" className="container-fluid mt-0">
                <div id="page-content" className="row">
                    <div id="region-main-box" className="col-12">
                        <section id="region-main" className="col-12">
                            <span className="notifications" id="user-notifications"></span>
                            <div role="main"><span id="maincontent"></span><div className="my-1 my-sm-5"></div>
                                <div className="row justify-content-center">
                                    <div className="col-xl-6 col-sm-8 ">
                                        <div className="card">
                                            <div className="card-block">
                                                <h2 className="card-header text-center">Hệ Thống Liên Lạc Trực Tuyến - IUH</h2>
                                                <div className="card-body">


                                                    <div className="row justify-content-md-center">
                                                        <div className="col-md-8">
                                                            <form className="mt-3" onSubmit={submitHandler}>
                                                                {/* ERROR */}
                                                                {show_errors(error)}

                                                                {/* ERROR */}
                                                                <div className="form-group">
                                                                    <label htmlFor="email" className="sr-only">Tên tài khoản</label>
                                                                    <input
                                                                        type="text"
                                                                        name="email"
                                                                        id="email"
                                                                        className="form-control"
                                                                        placeholder="Tên tài khoản"
                                                                        autoComplete="email"
                                                                        // onChange={event => setDetails({ ...details, email: event.target.value })} value={email}
                                                                        onChange={handleChange}
                                                                    />
                                                                    {show_validation(validation_email)}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="password" className="sr-only">Mật khẩu</label>
                                                                    <input
                                                                        type="password"
                                                                        name="password"
                                                                        id="password"
                                                                        className="form-control"
                                                                        placeholder="Mật khẩu"
                                                                        autoComplete="current-password"
                                                                        onChange={handleChange}
                                                                    // onChange={event => setDetails({ ...details, password: event.target.value })} value={password} 
                                                                    />
                                                                    {show_validation(validation_password)}
                                                                </div>

                                                                <button type="submit" className="btn btn-primary btn-block mt-3" id="loginbtn">Đăng nhập</button>
                                                                <p className="forgot-password text-center">
                                                                    <Link to="/forgot_password">Forgot Password</Link>
                                                                </p>
                                                            </form>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>

                        </section>
                    </div>
                </div>
            </div>
        )
    }
    // kết thúc thành phần giao diện

    const form_login = () => {
        return (
            <div>

                <Header />
                {main_content()}
                <Footer />

            </div>
        )

    }

    return (
        <div>
            { loading ? <ClipLoader size={100} color={"green"} /> : (name === "" && email === "") ? form_login() : <Redirect to="/trang_cap_nhat_thong_tin" />}
        </div>
    )
}

export default LoginForm
