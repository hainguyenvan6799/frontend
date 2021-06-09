import React from 'react'

// import addictional libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Footer from '../../basic_components/Footer';
import Header from '../../basic_components/Header';

function GuiThongBao(props) {

    const initialValues = {
        chude: "",
        noidung: "",
    }

    const validationSchema = Yup.object({
        chude: Yup.string().required("Chủ đề không được bỏ trống"),
        noidung: Yup.string().required("Nội dung không được bỏ trống"),
    });

    const onSubmit = async (values) => {
        const { chude, noidung } = values;
        const data = {
            chude, noidung, 
            malop: props.user.malop,
        }
        const response = await axios.post('/api/gui-thong-bao', data);
        alert("Gửi thông báo thành công.");
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    const { handleChange, handleSubmit, handleBlur } = formik;

    const form_them_vaitro = () => {
        return (
            <div>
            <Header />
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="chude" >Nhập chủ đề</label>
                    <input
                        type="text"
                        name="chude"
                        id="chude"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {formik.errors.chude ? (<p className="text-danger">{formik.errors.chude}</p>) : null}

                </div>

                <div className="form-group">
                    <label htmlFor="noidung" >Nhập nội dung</label>
                    <input
                        type="text"
                        name="noidung"
                        id="noidung"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {formik.errors.noidung ? (<p className="text-danger">{formik.errors.noidung}</p>) : null}

                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">Gửi thông tin</button>
            </form>
            <Footer/>
            </div>
        )
    }

    return (
        <div className="container">
            {form_them_vaitro()}
        </div>
    )
}

export default GuiThongBao
