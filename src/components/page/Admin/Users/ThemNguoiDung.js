import React from 'react'

// import addictional libraries
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomSelect from '../CustomSelect';
import ClipLoader from "react-spinners/ClipLoader";


import { giaimadulieu } from '../AdminOnly';
import { Link } from 'react-router-dom';

function ThemNguoiDung(props) {
    const isMountedVal = React.useRef(1);

    const optionsSex = [
        { value: "male", label: "Nam" },
        { value: "female", label: "Nữ" }
    ];
    const optionGroup = [
        { value: "sv", label: "Sinh viên" },
        { value: "gv", label: "Giảng viên" }
    ]

    const optionActive = [
        { value: true, label: "Cho phép hoạt động" },
        { value: false, label: "Không cho phép hoạt động" }
    ]

    const [optionClasses, setOptionClasses] = React.useState([]);

    const get_all_classes = () => {
        axios.get('/api/get-all-classes').then(res => {
            const newarr = res.data.classes.map(item => {
                return {
                    value: item.malop,
                    label: item.tenlop,
                }
            })
            setOptionClasses((optionClasses) => [...optionClasses, ...newarr]);
        }).catch(err => console.log(err));
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
        }
    }, [isMountedVal])

    // lấy param trên url, ví dụ admin/edit-user/:email, thì email sẽ được get bằng useParams
    // const { email } = useParams();
    const initialValues = {
        name: "",
        email: "",
        sdt: "",
        malop: "",
        group: "",
        sex: "",
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email can not be empty"),
        name: Yup
            .string()
            .required("Tên người dùng không được để trống."),
        sdt: Yup
            .string()
            .required("Số điện thoại không được để trống.")
            .matches(/^[0-9]{10}$/g, 'Số điện thoại cần có 10 chữ số'),
    });

    const onSubmit = async (values) => {
        const data =
        {
            name: values.name,
            email: values.email,
            sdt: values.sdt,
            malop: values.malop,
            group: values.group,
            sex: values.sex,
        };

        try {
            const result = await axios.post('/api/create-new-user', data);
            if(!result.data.status)
            {
                alert(result.data.message);
            }
            else
            {
                const firstName = result.data.firstName;
                const lastName = result.data.lastName;
                const username_chatlogin = await giaimadulieu(result.data.email);
                const password = await giaimadulieu(result.data.password);
                const password_chatlogin = password;
                const mauser = await giaimadulieu(result.data.mauser);
    
    
                const formData = new FormData;
                formData.append('username', username_chatlogin)
                formData.append('secret', password_chatlogin);
                formData.append('first_name', firstName);
                formData.append('last_name', lastName);
    
                const config_chatengine_request = {
                    method: 'POST',
                    url: 'https://api.chatengine.io/users/',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'PRIVATE-KEY': process.env.REACT_APP_PrivateKey_ChatRoom,
                    },
                    data: formData,
                }
    
                const response_chat = await axios(config_chatengine_request);
                if (response_chat.status === 201) {
                    const user_chat_id = response_chat.data.id;
                    const update_user = axios.post('/api/update-user-chat-id', {
                        'mauser': mauser,
                        'user_chat_id': user_chat_id,
                    }).then(res => {
                        alert("Thêm người dùng thành công.");
                    })
                }
            }
            

        } catch (err) {
            alert(err)
        }

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    const { handleChange, handleSubmit, handleBlur } = formik;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to='/admin/users'>Quay lại danh sách</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {optionClasses.length !== 0 ? <div style={{ 'width': '700px', 'marginLeft': '240px' }}>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="name" >Tên người dùng</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {formik.errors.name ? (<p className="text-danger">{formik.errors.name}</p>) : null}

                    </div>

                    <div className="form-group">
                        <label htmlFor="email" >Tên tài khoản</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {formik.errors.email ? (<p className="text-danger">{formik.errors.email}</p>) : null}

                    </div>

                    <div className="form-group">
                        <label htmlFor="email" >Số điện thoại</label>
                        <input
                            type="text"
                            name="sdt"
                            id="sdt"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {formik.errors.sdt ? (<p className="text-danger">{formik.errors.sdt}</p>) : null}

                    </div>

                    <div className="form-group">
                        <label htmlFor="malop" >Mã lớp</label>
                        <CustomSelect options={optionClasses} value={formik.values.malop} onChange={value => formik.setFieldValue('malop', value.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="group" >Nhóm</label>
                        <CustomSelect options={optionGroup} value={formik.values.group} onChange={value => formik.setFieldValue('group', value.value)} />

                    </div>

                    <div className="form-group">
                        <label htmlFor="sex" >Giới tính</label>
                        <CustomSelect options={optionsSex} value={formik.values.sex} onChange={value => formik.setFieldValue('sex', value.value)} />
                    </div>



                    <button type="submit" className="btn btn-primary btn-block mt-3">Thêm người dùng</button>
                </form>


            </div> : <ClipLoader />}

        </div>

    )
}

export default ThemNguoiDung
