import React from 'react'

// import addictional libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ThemTaiNguyen(props) {
    const {handleCreate} = props;

    const initialValues = {
        resource_name: "",
    }

    const validationSchema = Yup.object({
        resource_name: Yup.string().required("Resource name can not be empty"),
    });

    const onSubmit = async (values) => {
        const { resource_name } = values;
        handleCreate({ resource_name });
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    const { handleChange, handleSubmit, handleBlur } = formik;

    const form_them_tainguyen = () => {
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
                    />
                    {formik.errors.resource_name ? (<p className="text-danger">{formik.errors.resource_name}</p>) : null}

                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">Thêm tài nguyên </button>
            </form>

        )
    }

    return (
        <div className="container">
            {form_them_tainguyen()}
        </div>
    )
}

export default ThemTaiNguyen
