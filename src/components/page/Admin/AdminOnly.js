import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch, useHistory } from 'react-router-dom'
import DanhSachLopHoc from './LopHoc/DanhSachLopHoc'
import DanhSachNguoiDung from './Users/DanhSachNguoiDung_1'
import ThemNguoiDung from './Users/ThemNguoiDung'
import ChinhSuaNguoiDung from './Users/ChinhSuaNguoiDung';


import Header from '../../basic_components/Header';
import Footer from '../../basic_components/Footer';
import axios from 'axios'
import XinChaoAdmin from './Users/XinChaoAdmin'

import PhanQuyen from './PhanQuyen/index';
import VaiTro from './QuanLyVaiTro/index';
import TaiNguyen from './QuanLyTaiNguyen'
import VaiTroTaiNguyen from './VaiTroTaiNguyen'

import { createBrowserHistory } from 'history';
import ImportUsersForm from '../../import_users/ImportUsersForm'
import Index from './LopHoc/index'

export const history = createBrowserHistory();

export const allClasses = async () => {
    try {
        const result = await axios.get('/api/get-all-classes');
        // return result.data;
        return result;
    } catch (err) {
        console.log(err)
    }
}

export const buttonStyle = {
    border: 'none',
    cursor: 'pointer',
    background: 'none',
    color: 'green',
    textDecoration: 'underline',
}

export const CryptoJS = require("crypto-js");
require('dotenv').config()

export const CryptoJSAesJson = {
    /**
     * Encrypt any value
     * @param {*} value
     * @param {string} password
     * @return {string}
     */
    'encrypt': function (value, password) {
        return CryptoJS.AES.encrypt(JSON.stringify(value), password, { format: CryptoJSAesJson }).toString()
    },
    /**
     * Decrypt a previously encrypted value
     * @param {string} jsonStr
     * @param {string} password
     * @return {*}
     */
    'decrypt': function (jsonStr, password) {
        return JSON.parse(CryptoJS.AES.decrypt(jsonStr, password, { format: CryptoJSAesJson }).toString(CryptoJS.enc.Utf8))
    },
    /**
     * Stringify cryptojs data
     * @param {Object} cipherParams
     * @return {string}
     */
    'stringify': function (cipherParams) {
        var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) }
        if (cipherParams.iv) j.iv = cipherParams.iv.toString()
        if (cipherParams.salt) j.s = cipherParams.salt.toString()
        return JSON.stringify(j).replace(/\s/g, '')
    },
    /**
     * Parse cryptojs data
     * @param {string} jsonStr
     * @return {*}
     */
    'parse': function (jsonStr) {
        var j = JSON.parse(jsonStr)
        var cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) })
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        return cipherParams
    }
}
export const key = process.env.REACT_APP_KeyAdminOnly;

export const mahoadulieu_postform = (value) => {
    return CryptoJSAesJson.encrypt(value, key)
}

export const giaimadulieu = (value) => {
    return CryptoJSAesJson.decrypt(value, key);
}

function AdminOnly(props) {
    const { path, component } = props
    // const [allClasses, setAllClasses] = React.useState([]);
    // const [users_roles, setUsersRoles] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [paginationInfo, setPaginationInfo] = React.useState({
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 3,
    })

    const history = useHistory();

    const [condition, setCondition] = React.useState({
        type: "",
        value: "",
    });

    const isMountedVal = React.useRef(1);

    // Lấy thông tin từ bảng users_roles
    // const get_roles_users = async () => {
    //     const result = await axios.get('/api/get-all-users-roles');
    //     if(result.data.status === true) {
    //         setUsersRoles([...result.data.data]);
    //     }
    // }

    const get_all_users = () => {
        axios.get('/api/get-all-users').then(res => {
            const users = res.data.users.data;
            const filterUsers = users.filter((item) => {
                if (condition.type === "") {
                    setPaginationInfo({
                        ...paginationInfo,
                        activePage: res.data.users.current_page,
                        itemsCountPerPage: res.data.users.per_page,
                        totalItemsCount: res.data.users.total
                    })
                    return item.name !== "";
                }
                else {
                    if (condition.type === "followClass") {
                        return item.malop === condition.value;
                    }
                }
            })
            setUsers([...filterUsers]);

        }).catch(err => {
            console.log(err)
        })
    }

    const updateState = (callback) => {
        if (isMountedVal.current === 1) {
            callback();
        }
    }

    React.useEffect(() => {
        // updateState(get_roles_users);
        updateState(get_all_users);

        isMountedVal.current = 0;

        return () => {
            isMountedVal.current = 0;
        }
    }, [isMountedVal])

    // action for danh sách người dùng
    const handleClick = (e) => {
        e.preventDefault();
        history.push({
            pathname: '/admin/classes',
            state: e.target.value
        });
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const valueString = e.target.value;
        // const valueObject = JSON.parse(valueString);
        history.push({
            pathname: '/admin/edit-user',
            state: valueString
        });

    }

    const handleDelete = (e) => {
        e.preventDefault();
        const data_encode = mahoadulieu_postform(e.target.value)
        axios({
            url: '/api/delete-user',
            method: 'post',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            data: {
                mauser: data_encode
            }
        }).then(res => console.log(res)).catch(err => console.log(err))

        // axios.post('/api/delete-user', data).then(res => {
        //     console.log(res)
        //     // if(res.data.status === true)
        //     // {
        //     //     alert(res.data.message)
        //     // }
        //     // else
        //     // {
        //     //     alert(res.data.message)
        //     // }
        // }).catch(err => {
        //     console.log(err)
        // })
    }

    const handlePageChange = (pageNumber) => {

        axios.get('/api/get-all-users?page=' + pageNumber).then(res => {
            const users = res.data.users.data;
            // setUsers((old_arr_users) => [...old_arr_users, ...users]);
            setUsers([...users]);
            setPaginationInfo({
                ...paginationInfo,
                activePage: res.data.users.current_page,
                itemsCountPerPage: res.data.users.per_page,
                totalItemsCount: res.data.users.total
            })
        }).catch(err => {
            console.log(err)
        })
    }

    const handleActive = (event) => {
        console.log(event.target.name)
        // event.preventDefault();
        // let nameClicked = event.target.name;
        // let idClicked = document.getElementById(nameClicked);
        // // clear all class
        // let classCLicked = document.getElementsByClassName("linkcustom");
        // for(let i = 0; i < classCLicked.length; i++)
        // {
        //     classCLicked[i].className = "linkcustom nav-link";
        // }

        // idClicked.className = "linkcustom nav-link active";
    }
    //  action cho danh sách người dùng

    const main_content = () => {
        return (
            <div className="container-fluid" style={{ 'height': 'auto', 'marginBottom': '25px' }}>
                <hr />
                <Router history={history}>
                    <div >
                        <div className="row">
                            <div className="col-md-2 mb-3">
                                <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <Link onClick={handleActive} id="user" name="user" className={"linkcustom nav-link"}
                                            // id="home-tab"
                                            data-toggle="tab" to="/admin/users" role="tab" aria-controls="home" aria-selected="true">Users</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={handleActive} id="class" name="class" className={"linkcustom nav-link"}
                                            // id="profile-tab" 
                                            data-toggle="tab" to="/admin/classes" role="tab" aria-controls="profile" aria-selected="false">Classes</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link onClick={handleActive} id="users_roles" name="users_roles" className={"linkcustom nav-link"}
                                            // id="profile-tab"
                                            data-toggle="tab" to="/admin/users-roles" role="tab" aria-controls="profile" aria-selected="false">Quản lý phân quyền</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link onClick={handleActive} id="roles_resources" name="roles_resources" className={"linkcustom nav-link"}
                                            // id="profile-tab" 
                                            data-toggle="tab" to="/admin/roles-resources" role="tab" aria-controls="profile" aria-selected="false">Quản lý vai trò - tài nguyên</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link onClick={handleActive} id="roles" name="roles" className={"linkcustom nav-link"}
                                            // id="profile-tab"
                                            data-toggle="tab" to="/admin/roles" role="tab" aria-controls="profile" aria-selected="false">Quản lý vai trò</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link onClick={handleActive} id="resources" name="resources" className={"linkcustom nav-link"}
                                            // id="profile-tab"
                                            data-toggle="tab" to="/admin/resources" role="tab" aria-controls="profile" aria-selected="false">Quản lý tài nguyên</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-10">
                                <Switch>
                                    <Route exact path="/admin" component={XinChaoAdmin} />
                                    <Route exact path="/admin/users" component={DanhSachNguoiDung}>
                                        <DanhSachNguoiDung users={users} paginationInfo={paginationInfo} handleClick={handleClick} handleEdit={handleEdit}
                                            handleDelete={handleDelete} handlePageChange={handlePageChange} />
                                    </Route>
                                    <Route exact path="/admin/import-users-using-file" component={ImportUsersForm} />

                                    {/* <Route exact path="/admin/classes" component={DanhSachLopHoc} /> */}
                                    <Route exact path="/admin/add-user" component={ThemNguoiDung} />
                                    <Route exact path="/admin/edit-user" component={ChinhSuaNguoiDung}/>
                                    <Route exact path="/admin/classes" component={Index} />


                                    <Route exact path="/admin/users-roles" component={PhanQuyen} />
                                    <Route exact path="/admin/roles" component={VaiTro} />
                                    <Route exact path="/admin/resources" component={TaiNguyen} />
                                    <Route exact path="/admin/roles-resources" component={VaiTroTaiNguyen} />
                                    <Route exact path={path} component={component} />

                                </Switch>
                            </div>
                        </div>
                    </div>
                </Router>
            </div>

        )
    }

    const admin_page = () => {
        return (
            <div className="container-fluid">
                <Header />
                {main_content()}
                <Footer />
            </div>
        )
    }

    return (
        admin_page()
    )
}

export default AdminOnly
