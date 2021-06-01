import React from 'react'

// import addictional libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ChinhSuaDienDan(props) {
    const {userlogin, accessRights} = props;

    const initialValues = {
        mota: props.location.state.item.mota,
        noidung: props.location.state.item.noidung,
    }

    const validationSchema = Yup.object({

    });

    const onSubmit = (values) => {
        const { mota, noidung } = values;
        let active = null;
        if(userlogin.group === "gv")
        {
            active = true;
        }
        else
        {
            active = false;
        }

        const data = {
            mota, noidung, active
        }

        props.handleEdit(data, props.location.state.item._id, active);
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    const { handleChange, handleSubmit, handleBlur } = formik;

    const form_chinhsua_vaitro = () => {
        return (
            <form style={{ marginTop: '140px' }} onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="mota" className="col-sm-2 col-form-label">Mô tả</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            name="mota"
                            id="mota"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={props.location.state.item.mota}
                            value={formik.values.mota}
                        />
                        {formik.errors.mota ? (<p className="text-danger">{formik.errors.mota}</p>) : null}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="noidung" className="col-sm-2 col-form-label">Nội dung</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            name="noidung"
                            id="noidung"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={props.location.state.item.noidung}
                            value={formik.values.noidung}
                        />
                        {formik.errors.noidung ? (<p className="text-danger">{formik.errors.noidung}</p>) : null}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">Sửa chủ đề</button>
            </form>

        )
    }

    return (

        <div className="container">
            {form_chinhsua_vaitro()}
        </div>

    )
}

export default ChinhSuaDienDan
