import React from "react";
// import addictional libraries
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function ThemTaiLieu(props) {
  const { accessRights, userlogin } = props.location.state;
  const [files, setFiles] = React.useState({});

  const initialValues = {
    tailieu_name: "",
  };
  const validationSchema = Yup.object({
    tailieu_name: Yup.string().required("Tên tài liệu không được bỏ trống"),
  });

  const onChangeFile = (e) => {
    setFiles(e.target.files[0]);
  };
  const onSubmit = async (values) => {
    const { tailieu_name } = values;
    let active = null;
    userlogin.group === "gv" ? (active = true) : (active = false);

    const formdata = new FormData();
    formdata.append("file", files);
    formdata.append("tentailieu", tailieu_name);
    formdata.append("class_id", userlogin.malop);
    formdata.append("mauser", userlogin.mauser);
    formdata.append("active", active);

    const response = await axios.post("/api/tao-tai-lieu", formdata);
    if (response.data.status) {
      alert("Thêm tài liệu thành công");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { handleChange, handleSubmit, handleBlur } = formik;

  const form_them_tailieu = () => (
    <form style={{ marginTop: "140px" }} onSubmit={handleSubmit}>
      <div className="form-group row">
        <label htmlFor="tailieu_name" className="col-sm-2 col-form-label">
          Tên tài liệu
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            name="tailieu_name"
            id="tailieu_name"
            className="form-control"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {formik.errors.tailieu_name ? (
            <p className="text-danger">{formik.errors.tailieu_name}</p>
          ) : null}
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="file" className="col-sm-2 col-form-label">
          Chọn file
        </label>
        <div className="col-sm-10">
          <input type="file" name="file" id="file" onChange={onChangeFile} />
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-block mt-3">
        Thêm tài liệu
      </button>
    </form>
  );
  return (
    <div>
      {accessRights.allowAdd ? (
        <>{form_them_tailieu()}</>
      ) : (
        <h5>Bạn không có quyền thêm tài liệu</h5>
      )}
    </div>
  );
}

export default ThemTaiLieu;
