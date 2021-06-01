import React from 'react'

// import addictional libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ChinhSuaTaiLieu(props) {
    const [files, setFiles] = React.useState({})

    const [initialValues, setInitialValues] = React.useState({
        tailieu_name: props.location.state.item.tentailieu,
    })

    const validationSchema = Yup.object({
        tailieu_name: Yup.string().required("Tên tài liệu không được bỏ trống"),
    });

    const onChangeFile = (e) => {
        setFiles(e.target.files[0]);
    }

    const onSubmit = (values) => {
        const { tailieu_name } = values;
        let active = null;
        const formdata = new FormData();
        if(files.name)
        {
            formdata.append('file', files);
        }
        formdata.append('tentailieu', tailieu_name)
        formdata.append('_id', props.location.state.item._id);
        if(props.location.state.item.mauser = props.location.state.userlogin.mauser)
        {
            active = false;
        }
        else
        {
            active = true;
        }
        formdata.append('active', active);
        props.handleEdit(formdata, active);

        
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    const { handleChange, handleSubmit, handleBlur } = formik;

    const form_them_vaitro = () => {
        return (
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="tailieu_name" >Tên tài liệu</label>
                    <input
                        type="text"
                        name="tailieu_name"
                        id="tailieu_name"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={props.location.state.item.tentailieu}
                    />
                    {formik.errors.tailieu_name ? (<p className="text-danger">{formik.errors.tailieu_name}</p>) : null}

                </div>

                <div className="form-group">
                    <label htmlFor="tailieu_name" >Chọn file</label>
                    <input type="file" name="file" id="file" onChange={onChangeFile} />
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">Sửa tài liệu</button>
            </form>

        )
    }

    return (
        <div className="container">
            {form_them_vaitro()}
        </div>
    )
}

export default ChinhSuaTaiLieu
