import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import Header from '../../basic_components/Header';
import Footer from '../../basic_components/Footer';
import { userContext } from '../../../Store';
import { private_key_chatroom } from '../security'


function ChangePassword() {
    // const [require, setRequire] = useState("reset_password")
    const [user, setUser] = React.useContext(userContext)
    let history = useHistory();
    const [doublePassword, setDoublePassword] = useState({
        'password': "",
        'confirm_password': "",
    })
    const [validate, setValidate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (check_double_password(doublePassword)) {
            const data = {
                request_from_user: "reset_password",
                email: localStorage.getItem('email_reset_password'),
                password: doublePassword.password,
            }
            axios.post('/api/change_password', data)
            .then(res => {
                const {status, message} = res.data;
                if(status === "Success")
                {
                    var config = {
                        method: 'patch',
                        url: `https://api.chatengine.io/users/${user.user_chat_id}/`,
                        headers: {
                            'PRIVATE-KEY': private_key_chatroom,
                        },
                        data: {
                            secret: data.password
                        }
                    }
                    axios(config).then(res => {
                        alert("Đổi mật khẩu thành công. Vui lòng đăng nhập.");
                        history.push('/signin');
                    }).catch(err => console.log(err))
                    
                }
                else
                {
                    alert(message);
                }

            })
            .catch(err => console.log(err))
        }
        // console.log(doublePassword);
    }

    const check_double_password = () => {
        const { password, confirm_password } = doublePassword;
        if (confirm_password === password) {
            return true;
        }
        else {
            setValidate("Nhập lại mật khẩu không khớp với mật khẩu");
        }
    }

    const show_validate_double_password = () => {
        return (
            validate !== "" ? (
                <div className="alert alert-danger">
                    <p className="text text-danger">{validate}</p>
                </div>
            ) : (
                ""
            )
        )
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
                                                        <form className="mt-3" onSubmit={handleSubmit}>

                                                            {/* ERROR */}
                                                                {show_validate_double_password()}

                                                            {/* ERROR */}
                                                            <div className="form-group">
                                                                <label htmlFor="password" className="sr-only">Nhập Password</label>
                                                                <input
                                                                    type="password"
                                                                    name="password"
                                                                    id="password"
                                                                    className="form-control"
                                                                    placeholder="Nhập password của bạn"
                                                                    onChange={e => setDoublePassword({ ...doublePassword, password: e.target.value })}
                                                                />
                                                                {/* <p className="text-danger">{notice_email}</p> */}
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="confirm_password" className="sr-only">Confirm Password Again</label>
                                                                <input
                                                                    type="password"
                                                                    name="confirm_password"
                                                                    id="confirm_password"
                                                                    className="form-control"
                                                                    placeholder="Nhập lại mật khẩu của bạn"
                                                                    onChange={e => setDoublePassword({ ...doublePassword, confirm_password: e.target.value })}
                                                                />
                                                                {/* <p className="text-danger">{notice_email}</p> */}
                                                            </div>


                                                            <button className="btn btn-primary btn-block mt-3">Xác nhận đổi mật khẩu</button>

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

    //  Giao diện hoàn chỉnh
    const change_password_form = () => {
        return (
            <div>
                <Header/>
                {main_content()}
                <Footer/>
            </div>
        )
    }

    return (
        change_password_form()
    )
}

export default ChangePassword
