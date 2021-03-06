import axios from 'axios';
import React from 'react'
import { Link, useHistory } from 'react-router-dom';

import { allClasses } from '../AdminOnly';

import Pagination from 'react-js-pagination';

var CryptoJS = require("crypto-js");
require('dotenv').config()

export const buttonStyle = {
    border: 'none',
    cursor: 'pointer',
    background: 'none',
    color: 'green',
    textDecoration: 'underline',
}

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
const key = process.env.REACT_APP_KeyAdminOnly;

export const mahoadulieu_postform = (value) => {
    return CryptoJSAesJson.encrypt(value, key)
}

export const giaimadulieu = (value) => {
    return CryptoJSAesJson.decrypt(value, key);
}

function DanhSachNguoiDung() {
    const [users, setUsers] = React.useState([]);
    const [optionClasses, setOptionClasses] = React.useState([]);

    const [condition, setCondition] = React.useState({
        type: "",
        value: "",
    });

    const [paginationInfo, setPaginationInfo] = React.useState({
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 3,
    })
    const isMountedVal = React.useRef(1);
    const history = useHistory();

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

    const get_all_classes = () => {
        allClasses().then(res => {
            const newarr = res.data.classes.map(item => {
                return {
                    value: item.malop,
                    label: item.tenlop,
                }
            })
            setOptionClasses((optionClasses) => [...optionClasses, ...newarr]);
        })
    }

    const updateState = (callback) => {
        isMountedVal.current = 1;
        if (isMountedVal.current === 1) {
            callback();
        }
    }

    React.useEffect(() => {
        updateState(get_all_users);

        return () => {
            isMountedVal.current = 0;
            setUsers([]);
        }
    }, [isMountedVal, condition.value]);

    React.useEffect(() => {
        updateState(get_all_classes);
        return () => {
            setOptionClasses([]);
        }
    }, [isMountedVal])

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

        axios.post('/api/delete-user', data_encode).then(res => {
            if(res.data.status === true)
            {
                const newData = users.filter(item => item.mauser !== e.target.value);
                setUsers(newData);
                alert(res.data.message)
            }
            else
            {
                alert(res.data.message)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        history.push({
            pathname: '/admin/classes',
            state: e.target.value
        });
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

    const handleClickEditCondition = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setCondition({
            type: e.target.name,
            value: e.target.value,
        })
    }

    const danh_sach_nguoi_dung = (users) => {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Trang ch??? <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/add-user'>Th??m ng?????i d??ng</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/import-users-using-file'>Th??m ng?????i d??ng b???ng file</Link>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Ph??n lo???i theo l???p
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {optionClasses.map((item, key) => {
                                        return <button name="followClass" onClick={handleClickEditCondition} className="dropdown-item" value={item.value}>{item.label}</button>
                                    })}
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Ph??n lo???i theo nh??m ng?????i d??ng
        </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li> */}

                        </ul>
                    </div>
                </nav>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>M?? ng?????i d??ng</th>
                            <th>T??n</th>
                            <th>Email</th>
                            <th>Gi???i t??nh</th>
                            <th>S??? ??i???n tho???i</th>
                            <th>M?? l???p</th>
                            <th>M?? ph??ng chat</th>
                            <th>T??nh tr???ng c???p nh???t</th>
                            <th>???? ???????c k??ch ho???t b???i ng?????i d??ng</th>
                            <th>H??nh ?????ng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, key) => (
                            <tr key={key}>
                                <th scope="row">{item.mauser}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.sex}</td>
                                <td>{item.sdt}</td>
                                <td>{item.malop !== undefined ? <button style={buttonStyle} value={item.malop} onClick={handleClick}>{item.malop}</button> : null}</td>
                                <td>{item.room_chat_id}</td>
                                <td>{item.is_updated_info === "1" ? "???? c???p nh???t" : "Ch??a c???p nh???t"}</td>
                                <td>{item.active === true ? "???? k??ch ho???t" : "Ch??a k??ch ho???t"}</td>
                                <td>
                                    {/* <button value={item.mauser} onClick={handleEdit}>Edit</button> */}
                                    {/* <Link to={`/admin/edit-user/${item.email}`}>Edit</Link> */}
                                    <button style={buttonStyle} onClick={handleEdit} value={JSON.stringify(item)}>Edit</button>/
                                    <button style={buttonStyle} value={item.mauser} onClick={handleDelete}>Delete</button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
                <div className='d-flex justify-content-center'>
                    <Pagination
                        activePage={paginationInfo.activePage}
                        itemsCountPerPage={paginationInfo.itemsCountPerPage}
                        totalItemsCount={paginationInfo.totalItemsCount}
                        pageRangeDisplayed={paginationInfo.pageRangeDisplayed}
                        onChange={handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            </div>
        
        )
    }

    return (
        <div>
            {danh_sach_nguoi_dung(users)}
        </div>
    )
}

export default DanhSachNguoiDung
