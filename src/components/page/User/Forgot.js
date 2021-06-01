import React from 'react'
import { useHistory } from 'react-router-dom';

// import basic component 
import Header from '../../basic_components/Header';
import Footer from '../../basic_components/Footer';

// import addictional libraries
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Forgot() {
    // use history to redirect to another page
    const history = useHistory();


    const initialValues = {
        email: "",
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email can not be empty")
    });

    const onSubmit = async (values) => {
        const { email } = values;
        const data = { email };
        localStorage.setItem('email_reset_password', email);

        const result = await axios.post('/api/forgot', data)
        const { state, message } = await result.data;
        console.log(state)
        if( state === "success")
        {
            history.push('/reset_password');
        }
        else
        {
            console.log(message);
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    const { handleChange, handleSubmit, handleBlur } = formik;

    // thành phần giao diện của form
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
                                                            <div className="mt-3">
                                                                {/* onSubmit={submitHandler} */}
                                                                {/* ERROR */}
                                                                {/* {notice_all_error()}
                                                                {error_alert()} */}

                                                                {/* ERROR */}
                                                                <form onSubmit={handleSubmit}>
                                                                    <div className="form-group">
                                                                        <label htmlFor="email" className="sr-only">Tên tài khoản</label>
                                                                        <input
                                                                            type="email"
                                                                            name="email"
                                                                            id="email"
                                                                            className="form-control"
                                                                            placeholder="Tên tài khoản"
                                                                            autoComplete="email"
                                                                            // onChange={e => setEmail(e.target.value)}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                        />
                                                                        { formik.errors.email ? (<p className="text-danger">{formik.errors.email}</p>) : null}
                                                                        
                                                                    </div>


                                                                    <button type="submit" className="btn btn-primary btn-block mt-3">Gửi yêu cầu lấy lại mật khẩu</button>
                                                                </form>
                                                            </div>

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

    // Giao diện form hoàn chỉnh
    const forgot_password_form = () => {
        return (
            <div>
                <Header />
                {main_content()}
                <Footer />
            </div>
        )
    }

    return (
        forgot_password_form()
    )
}

export default Forgot
