import axios from 'axios';
import React from 'react'
import { useHistory } from 'react-router-dom';
import {buttonStyle} from '../AdminOnly';

var CryptoJS = require("crypto-js");
require('dotenv').config()



function DanhSachLopHoc(props) {
    console.log(props.location.state)
    const [classes, setClasses] = React.useState([]);
    const colorRed = {'color': 'red'}
    const colorBlack = {'color': 'black'};
    const isMountedVal = React.useRef(1);
    const history = useHistory();

    const get_all_classes = () => {
        axios.get('/api/get-all-classes').then(res => {
            setClasses((data) => [...data, ...res.data.classes])
        }).catch(err => {
            console.log(err)
        })
    }

    const updateState = (callback) => {
        isMountedVal.current = 1;
        if (isMountedVal.current === 1) {
            callback();
        }
    }

    React.useEffect(() => {
        updateState(get_all_classes);

        return () => {
            isMountedVal.current = 0;
            setClasses([]);
        }
    }, [isMountedVal]);

    const handleEdit = (e) => {
        e.preventDefault();
        const valueString = e.target.value;
        // const valueObject = JSON.parse(valueString);
        history.push({
            pathname: '/admin/edit-user',
            state: valueString
          });
        
    }

    const mahoadulieu_postform = (value) => {
        var CryptoJSAesJson = {
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
          return CryptoJSAesJson.encrypt(value, key)
    }

    const handleDelete = (e) => {
        e.preventDefault();   
        const data_encode = mahoadulieu_postform(e.target.value)
        axios({
            url: '/api/delete-user',
            method: 'post',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
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


    const danh_sach_lop_hoc = (classes) => {
        return (
            <div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Mã lớp</th>
                            <th>Tên lớp</th>
                            <th>Niên khóa</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((item, key) => {
                            return (
                                <tr key={key} style={item.malop === props.location.state ? colorRed : colorBlack}>
                                    <th scope="row">{item.malop}</th>
                                    <td>{item.tenlop}</td>
                                    <td>{item.nienkhoa}</td>
                                    
                                    <td>
                                        <button style={buttonStyle} onClick={handleEdit} value={JSON.stringify(item)}>Edit</button> / 
                                        <button style={buttonStyle} value={item.mauser} onClick={handleDelete}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            {danh_sach_lop_hoc(classes)}
        </div>
    )
}

export default DanhSachLopHoc
