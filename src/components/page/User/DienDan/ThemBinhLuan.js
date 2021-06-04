import React from "react";

// import addictional libraries
import { useFormik } from "formik";
import * as Yup from "yup";
import { mahoadulieu_postform } from "../../security";
import axios from "axios";

function ThemBinhLuan(props) {
  const { userlogin, machude } = props;
  console.log(userlogin);
  const [files, setFiles] = React.useState([]);
  const [noidung, setNoiDung] = React.useState("");

  const handleChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("đã bấm click");
    const formdata = new FormData();
    formdata.append("noidung", noidung);
    formdata.append("mauser", userlogin.mauser);
    formdata.append("machude", machude);
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formdata.append("files[" + i + "]", files[i]);
      }
    }

    const response = await axios.post("/api/tao-binh-luan", formdata);
  };

  const form_them_diendan = () => {
    return (
      <form style={{ marginTop: "140px" }} onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group row">
          <label htmlFor="noidung" className="col-sm-2 col-form-label">
            Nội dung
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="noidung"
              id="noidung"
              className="form-control"
              onChange={(e) => setNoiDung(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="file" className="col-sm-2 col-form-label">
            Chọn file
          </label>
          <div className="col-sm-10">
            <input type="file" name="file" multiple onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-3">
          Thêm bình luận
        </button>
      </form>
    );
  };

  return <div className="container">{form_them_diendan()}</div>;
}

export default ThemBinhLuan;
