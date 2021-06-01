import axios from 'axios';
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom';
import Footer from '../../basic_components/Footer';
import Header from '../../basic_components/Header';

function ResetPassword() {
    let history = useHistory();
    const [maxacnhan, setMaxacnhan] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let email = localStorage.getItem('email_reset_password');
        const data = {email, maxacnhan};
        axios.post('/api/xacthucemail_reset_password', data)
        .then(
            res => {
                const {status, message} = res.data;
                if(status === "success")
                {
                    history.push('/change-password');
                }
                else
                {
                    console.log("Bạn nhập sai token.");
                }
                // console.log(status)
            }
        )
        .catch(
            err => console.log(err)
        )
    }

    const handleChange = (e) => {
        setMaxacnhan({
            ...maxacnhan,
            [e.target.name]: e.target.value,
        })
    }

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
                                                            <form className="mt-3" onSubmit={handleSubmit}>
                                                            
                                                                {/* ERROR */}
                                                                {/* {notice_all_error()}
                                                                {error_alert()} */}

                                                                {/* ERROR */}
                                                                <div className="form-group">
                                                                    <label htmlFor="maxacnhan" className="sr-only">Nhập mã xác nhận</label>
                                                                    <input
                                                                        type="text"
                                                                        name="maxacnhan"
                                                                        id="maxacnhan"
                                                                        className="form-control"
                                                                        placeholder="Nhập mã xác nhận được gửi qua email"
                                                                        // onChange={e => setMaxacnhan(e.target.value)}
                                                                        onChange={handleChange}
                                                                    />
                                                                    {/* <p className="text-danger">{notice_email}</p> */}
                                                                </div>
                                                                

                                                                <button className="btn btn-primary btn-block mt-3">Xác nhận</button>
                                                                
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

    const reset_password_form = () => {
        return (
            <div>
                <Header/>
                {main_content()}
                <Footer/>
            </div>
        )
    }
    return (
        reset_password_form()
    )
}

export default ResetPassword
