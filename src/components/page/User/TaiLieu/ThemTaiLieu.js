import React from 'react'

// import addictional libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ThemTaiLieu(props) {
    console.log(props.location.state.accessRights)
    const [files, setFiles] = React.useState({})

    const initialValues = {
        tailieu_name: "",
    }

    const validationSchema = Yup.object({
        tailieu_name: Yup.string().required("Tên tài liệu không được bỏ trống"),
    });

    const onChangeFile = (e) => {
        console.log(e.target.files[0])
        setFiles(e.target.files[0]);
    }

    const onSubmit = async (values) => {
        const { tailieu_name } = values;
        // console.log(files)
        const formdata = new FormData();
        formdata.append('file', files);
        formdata.append('tentailieu', tailieu_name)
        formdata.append('class_id', props.location.state.malop);
        formdata.append('mauser', props.location.state.mauser)
        // const can_add = props.location.state.accessRights.allowAdd;
        const userlogin = props.location.state.userlogin;
        let active = null;
        userlogin.group === "gv" ? (active = true) : (active = false)
        formdata.append('active', active);
        props.handleCreate(formdata, active);
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    const { handleChange, handleSubmit, handleBlur } = formik;

    const form_them_vaitro = () => {
        return (
            // <form onSubmit={handleSubmit}>

            //     <div className="form-group">
            //         <label htmlFor="tailieu_name" >Tên tài liệu</label>
            //         <input
            //             type="text"
            //             name="tailieu_name"
            //             id="tailieu_name"
            //             className="form-control"
            //             onChange={handleChange}
            //             onBlur={handleBlur}
            //         />
            //         {formik.errors.tailieu_name ? (<p className="text-danger">{formik.errors.tailieu_name}</p>) : null}

            //     </div>

            //     <div className="form-group">
            //         <label htmlFor="tailieu_name" >Chọn file</label>
            //         <input type="file" name="file" id="file" onChange={onChangeFile} />
            //     </div>

            //     <button type="submit" className="btn btn-primary btn-block mt-3">Thêm tài liệu</button>
            // </form>

            <form style={{ marginTop: '140px'}} onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="tailieu_name" className="col-sm-2 col-form-label">Tên tài liệu</label>
                    <div className="col-sm-10">
                    <input
                        type="text"
                        name="tailieu_name"
                        id="tailieu_name"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {formik.errors.tailieu_name ? (<p className="text-danger">{formik.errors.tailieu_name}</p>) : null}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="file" className="col-sm-2 col-form-label">Chọn file</label>
                    <div className="col-sm-10">
                    <input type="file" name="file" id="file" onChange={onChangeFile} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">Thêm tài liệu</button>
            </form>

        )
    }

    return ( 
        props.location.state.accessRights.allowAdd ?
        <div className="container">
            {form_them_vaitro()}
        </div> : <h5>Bạn không có quyền thêm tài liệu</h5>
        )
}

export default ThemTaiLieu
