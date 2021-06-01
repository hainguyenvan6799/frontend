import React from 'react'

// import addictional libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import CustomSelect from '../CustomSelect';

function ChinhSuaVaiTro(props) {
    const item = props.location.state.item;
    const { handleUpdate } = props;

    const initialValues = {
        resource_name: item.resource_name,
    }

    const validationSchema = Yup.object({
        resource_name: Yup.string().required("Resource name can not be empty"),
    });

    const onSubmit = async (values) => {
        const { resource_name } = values;
        handleUpdate({ resource_name, resource_id: item.resource_id });
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    const { handleChange, handleSubmit, handleBlur } = formik;

    const form_sua_tainguyen = () => {
        return (
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="resource_name" >Tên tài nguyên</label>
                    <input
                        type="text"
                        name="resource_name"
                        id="resource_name"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={formik.values.resource_name}
                    />
                    {formik.errors.resource_name ? (<p className="text-danger">{formik.errors.resource_name}</p>) : null}

                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">Chỉnh sửa tài nguyên</button>
            </form>

        )
    }

    return (
        <div className="container">
            {form_sua_tainguyen()}
        </div>
    )
}

export default ChinhSuaVaiTro
