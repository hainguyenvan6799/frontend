import React from 'react'

// import addictional libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomSelect from '../CustomSelect';

function ChinhSuaVaiTro(props) {
    const item = props.location.state.item;
    const { handleUpdate } = props;

    const optionsActive = [
        { value: true, label: "Cho phép hoạt động" },
        { value: false, label: "Không cho phép hoạt động" }
    ]

    const initialValues = {
        role_name: item.role_name,
        active: item.active,
    }

    const validationSchema = Yup.object({
        role_name: Yup.string().required("Role name can not be empty"),
    });

    const onSubmit = async (values) => {
        const { role_name, active } = values;
        handleUpdate({ role_name, active, role_id: item.role_id });
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
                    <label htmlFor="role_name" >Tên vai trò</label>
                    <input
                        type="text"
                        name="role_name"
                        id="role_name"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={formik.values.role_name}
                    />
                    {formik.errors.role_name ? (<p className="text-danger">{formik.errors.role_name}</p>) : null}

                </div>

                <div className="form-group">
                    <label htmlFor="active" >Hoạt động</label>
                    <CustomSelect name="active" id="active"
                        options={optionsActive} value={formik.values.active} onChange={value => formik.setFieldValue('active', value.value)} />
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">Chỉnh sửa vai trò</button>
            </form>

        )
    }

    return (
        <div className="container">
            {form_them_vaitro()}
        </div>
    )
}

export default ChinhSuaVaiTro
