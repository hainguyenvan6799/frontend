import React from 'react'

// import addictional libraries
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomSelect from '../CustomSelect';
import { Link, Redirect } from 'react-router-dom'

import { allClasses } from '../AdminOnly';

function ChinhSuaNguoiDung(props) {
    const isMountedVal = React.useRef(1);

    // nhận dữ liệu chuyển từ Danh sách người dùng sang
    const valueString = props.location.state;
    const valueObject = JSON.parse(valueString);
    const [old_data, setNewData] = React.useState(valueObject);

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
        // axios.get('/api/get-all-classes').then(res => {
        //     const newarr = res.data.classes.map(item => {
        //         return {
        //             value: item.malop,
        //             label: item.tenlop,
        //         }
        //     })
        //     setOptionClasses((optionClasses) => [...optionClasses, ...newarr]);
        // }).catch(err => console.log(err));
        allClasses().then(res => {
            const newarr = res.data.classes.map(item => {
                return {
                    value: item.malop,
                    label: item.tenlop,
                }
            })
            setOptionClasses((optionClasses) => [...optionClasses, ...newarr]);
        }).catch(err => console.log(err))
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
    const { mauser, name, email, password, sdt, malop, group, active, sex } = old_data;
    const initialValues = {
        mauser,
        name,
        email,
        password: "",
        sdt,
        malop,
        group,
        active,
        sex,
    }

    const validationSchema = Yup.object({
        mauser: Yup
            .string()
            .required("Mã người dùng không được để trống"),
            // .matches(/^[0-9]{8,20}$/g, 'Mã người dùng cần có ít nhất 8 chữ số'),
        email: Yup.string().email("Invalid email format").required("Email can not be empty"),
        name: Yup
            .string()
            .required("Tên người dùng không được để trống."),
        sdt: Yup
            .string()
            .required("Số điện thoại không được để trống.")
            .matches(/^[0-9]{10}$/g, 'Số điện thoại cần có 10 chữ số'),
        password: Yup
            .string()
            .matches(/^[a-zA-Z0-9]{6,20}$/g, 'Password có thể là chữ thường hoặc in hoa hoặc số và có độ dài ít nhất 6 ký tự, nhiều nhất là 20 ký tự.'),
    });

    const onSubmit = async (values) => {
        const { mauser,
            name,
            email,
            password,
            sdt,
            malop,
            group,
            active,
            sex, } = values;
        const data = {
            mauser,
            name,
            email,
            password,
            sdt,
            malop,
            group,
            active,
            sex,
        }
        axios.post('/api/update-user', data).then(res => {
            if (res.data.status === true) {
                if (password !== "") {
                    // request đến server chat để thay đổi password chatengine
                }
                alert(res.data.message);
                return <Redirect to='/admin/users' />
            }
            else {
                alert(res.data.message);
            }
        }).catch(err => {
            console.log(err)
        })
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
                        <label htmlFor="mauser" >Mã người dùng</label>
                        <input
                            type="text"
                            name="mauser"
                            id="mauser"
                            placeholder={old_data.mauser}
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={formik.values.mauser}
                            disabled
                        />
                        {formik.errors.mauser ? (<p className="text-danger">{formik.errors.mauser}</p>) : null}

                    </div>

                    <div className="form-group">
                        <label htmlFor="name" >Tên người dùng</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder={old_data.name}
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={formik.values.name}
                        />
                        {formik.errors.name ? (<p className="text-danger">{formik.errors.name}</p>) : null}

                    </div>

                    <div className="form-group">
                        <label htmlFor="email" >Tên tài khoản</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder={old_data.email}
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={formik.values.email}
                            disabled
                        />
                        {formik.errors.email ? (<p className="text-danger">{formik.errors.email}</p>) : null}

                    </div>

                    <div className="form-group">
                        <label htmlFor="password" >Nhập mật khẩu mới</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder={old_data.password}
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {formik.errors.password ? (<p className="text-danger">{formik.errors.password}</p>) : null}

                    </div>

                    {/* <div className="form-group">
                <label htmlFor="password" >Mật khẩu</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {formik.errors.password ? (<p className="text-danger">{formik.errors.password}</p>) : null}

            </div> */}

                    <div className="form-group">
                        <label htmlFor="email" >Số điện thoại</label>
                        <input
                            type="text"
                            name="sdt"
                            id="sdt"
                            placeholder={old_data.sdt}
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={formik.values.sdt}
                        />
                        {formik.errors.sdt ? (<p className="text-danger">{formik.errors.sdt}</p>) : null}

                    </div>

                    <div className="form-group">
                        <label htmlFor="malop" >Mã lớp</label>
                        {/* <input
                    type="text"
                    name="malop"
                    id="malop"
                    value={old_data.malop}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {formik.errors.malop ? (<p className="text-danger">{formik.errors.malop}</p>) : null} */}
                        <CustomSelect options={optionClasses} value={formik.values.malop} onChange={value => formik.setFieldValue('malop', value.value)} />


                    </div>

                    <div className="form-group">
                        <label htmlFor="group" >Nhóm</label>
                        {/* <input
                    type="text"
                    name="group"
                    id="group"
                    value={old_data.group}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {formik.errors.group ? (<p className="text-danger">{formik.errors.group}</p>) : null} */}
                        <CustomSelect options={optionGroup} value={formik.values.group} onChange={value => formik.setFieldValue('group', value.value)} />

                    </div>

                    <div className="form-group">
                        <label htmlFor="room_chat_id" >ID phòng chat</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Đến menu phòng chat để quản lý users."
                            disabled='disable'
                        />

                    </div>

                    <div className="form-group">
                        <label htmlFor="active" >Hoạt động</label>
                        {/* <input
                    type="text"
                    name="active"
                    id="active"
                    value={old_data.active}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                /> */}
                        <CustomSelect options={optionActive} value={formik.values.active} onChange={value => formik.setFieldValue('active', value.value)} />
                        {formik.errors.active ? (<p className="text-danger">{formik.errors.active}</p>) : null}

                    </div>

                    <div className="form-group">
                        <label htmlFor="sex" >Giới tính</label>
                        {/* <input
                    type="text"
                    name="sex"
                    id="sex"
                    value={old_data.sex}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {formik.errors.sex ? (<p className="text-danger">{formik.errors.sex}</p>) : null} */}
                        <CustomSelect options={optionsSex} value={formik.values.sex} onChange={value => formik.setFieldValue('sex', value.value)} />
                    </div>



                    <button type="submit" className="btn btn-primary btn-block mt-3">Sửa thông tin</button>
                </form>


            </div> : "Loading..."}
        </div>

    )
}

export default ChinhSuaNguoiDung
