import axios from 'axios';
import React, { useContext } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';

// import addictional libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { giaimadulieu, mahoadulieu_postform } from '../security';

// import basic component
import Footer from '../../basic_components/Footer';
import Header from '../../basic_components/Header';

// import addictional components:
import ClipLoader from "react-spinners/ClipLoader";
import { userContext } from '../../../Store';

export const get_magiaovien = (arr, checkGroup, CheckMaLop) => {
    const user = arr.find(( {group, malop} ) => group === checkGroup && malop === CheckMaLop);
    if(user)
    {
        return user.mauser;
    }
    else
    {
        return null;
    }
}

function Login() {
    
    const [isLoading, setLoading] = React.useState(false);

    const [user, setUser] = useContext(userContext);

    const history = useHistory();

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().required("Email không được để trống").email("Bạn cần nhập đúng định dạng Email"),
        password: Yup.string()
            .required("Password không được bỏ trống")
            .matches(/^[a-zA-Z0-9]{6,20}$/g, 'Password có thể là chữ thường hoặc in hoa hoặc số và có độ dài ít nhất 6 ký tự, nhiều nhất là 10 ký tự.'),
    });

    const login = async (userInfo) => {
        setLoading(true);
        const encryptedEmail = mahoadulieu_postform(userInfo.email);
        const encryptedPassword = mahoadulieu_postform(userInfo.password);
        const datasTransform = { email: encryptedEmail, password: encryptedPassword };
        const response = await axios.post('/api/login', datasTransform);
        if (response.data.status) {

            const { name, email, is_updated_info, mauser, sex, group, malop, active, user_chat_id } = giaimadulieu(response.data.data);
            const magiaovien = giaimadulieu(response.data.magiaovien)
            const token = 'Bearer ' + response.data.token;
            setUser(
                {
                    ...user,
                    name: name,
                    email: email,
                    is_updated_info,
                    mauser,
                    sex,
                    group,
                    malop,
                    magiaovien: magiaovien,
                    active,
                    user_chat_id
                });

            localStorage.setItem('token', token);

            const encoded_email = mahoadulieu_postform(userInfo.email);
            const encoded_password = mahoadulieu_postform(userInfo.password);

            localStorage.setItem('email', encoded_email);
            localStorage.setItem('password', encoded_password);

            if (!active) {
                alert("Tài khoản chưa được kích hoạt, vui lòng liên hệ người quản trị.");
            }
            else {
                if (!is_updated_info) {
                    history.push('/trang_cap_nhat_thong_tin');
                }
                else {
                    history.push('/');
                }
            }
            setLoading(false)
        }
        else {
            alert(response.data.message);
            window.location.href = "/signin";
    }
    }

    const onSubmit = async (values) => {
        const { email, password } = values;
        // login({ email: encryptedEmail, password: encryptedPassword });
        login({email: email, password: password});
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    const { handleChange, handleSubmit, handleBlur } = formik;

    const back_ground_form = () => {
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
                                                            {form()}
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

    const form = () => {
        return (
            <form className="mt-3" onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {formik.errors.email ? (<p className="text-danger">{formik.errors.email}</p>) : null}
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {formik.errors.password ? (<p className="text-danger">{formik.errors.password}</p>) : null}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3" id="loginbtn">Đăng nhập</button>
                <p className="forgot-password text-center">
                    <Link to="/forgot_password">Forgot Password</Link>
                </p>
            </form>
        )
    }

    const full_page = () => {
        return (
            <div>
                <Header />
                {back_ground_form()}
                <Footer />
            </div>
        )

    }

    React.useEffect(() => {

        return () => {
            "đã chạy"
            setLoading(false);
        }
    }, []);

    return (
        // isLoading ? <ClipLoader size={100} color={"green"} /> : (user.name === "" && user.email === "") ? full_page() : <Redirect to="/trang_cap_nhat_thong_tin" />
        <div>
            { isLoading ? <ClipLoader size={100} color={"green"} /> : (user.name === "" && user.email === "") ? full_page() : <Redirect to="/trang_cap_nhat_thong_tin" />}
        </div>
    )
}

export default Login
