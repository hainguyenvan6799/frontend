import React, { useContext, useState } from 'react'

// import basic components
import Footer from '../../basic_components/Footer'
import Header from '../../basic_components/Header'

// import context
import { loadingContext, userContext } from '../../../Store'

// import addictional libraries
import ClipLoader from "react-spinners/ClipLoader";
import { Redirect } from 'react-router';
import axios from 'axios';


function Cap_nhat_thong_tin() {
    // use context
    const [loading] = useContext(loadingContext);
    const [user] = useContext(userContext);
    const [ data, setData ] = useState({
        email: "",
        sdt: "",
        mauser: "",
    })
    const [ message_update_info, setMessage ] = useState("")

    const {email, name, mauser, is_updated_info } = user;

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]:event.target.value,
            mauser: mauser,
        });  
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/update-private-info', data)
            .then(res => {
                const { message } = res.data;
                setMessage(message);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const content_cap_nhat_thong_tin = () => {
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
                                                <h2 className="card-header text-center">Thông tin liên lạc</h2>
                                                <div className="card-body">


                                                    <div className="row justify-content-md-center">
                                                        <div className="col-md-8">
                                                            <form onSubmit={handleSubmit}>
                                                                { message_update_info !== "" ? <p className="text-success">{message_update_info}</p> : null}

                                                                <div className="form-group">
                                                                    <label htmlFor="username" className="sr-only">Email</label>
                                                                    <input type="text"
                                                                        name="email"
                                                                        className="form-control"
                                                                        placeholder="Email"
                                                                        onChange={handleChange} />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="password" className="sr-only">Số điện thoại</label>
                                                                    <input type="text"
                                                                        name="sdt"
                                                                        className="form-control"
                                                                        placeholder="Số điện thoại"
                                                                        onChange={handleChange} />
                                                                </div>


                                                                <button type="submit" className="btn btn-primary btn-block mt-3" id="loginbtn">Cập nhật thông tin liên lạc</button>
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

    const form_cap_nhat_thong_tin = () => {
        return (
            <div>
                <Header />
                {content_cap_nhat_thong_tin()}
                <Footer />
            </div>
        )
    }

    return (
            loading ? <ClipLoader /> : (email !== "" && name !== "") ? form_cap_nhat_thong_tin() : <Redirect to="/signin"/>
    )
}

export default Cap_nhat_thong_tin
