import React from "react";

// import addictional libraries
import { useFormik } from "formik";
import * as Yup from "yup";
import { mahoadulieu_postform } from "../../security";

function ThemDienDan(props) {
  const { userlogin } = props;
  console.log(userlogin);
  const [files, setFiles] = React.useState([]);
  const [mota, setMota] = React.useState("");
  const [noidung, setNoiDung] = React.useState("");

  const onChangeFile = (e) => {
    setFiles(e.target.files);
  };

  // const renderFiles = (files) => {
  //     return files.map(file => {
  //         return <img className="p-2" src={file} style={{width: "20%", height: "180px"}}/>
  //     })
  // }

  // const onSubmit = async (values) => {
  //     const { mota, noidung } = values;

  //     const formdata = new FormData();
  //     formdata.append('mota', mota)
  //     formdata.append('noidung', noidung);
  //     formdata.append('mauser', mahoadulieu_postform(props.location.state.userlogin.mauser));
  //     formdata.append('resource_id', mahoadulieu_postform(`chude_${props.location.state.userlogin.malop}`))
  //     // const can_add = props.location.state.accessRights.allowAdd;
  //     // can_add === true ? formdata.append('active', true) : formdata.append('active', false);
  //     props.handleCreate(formdata);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(mota === "" || noidung === "") {
      alert("Mô tả hoặc nội dung không được để trống."); 
    }
    else {
      const formdata = new FormData();
      formdata.append('mota', mota)
      formdata.append('noidung', noidung);
      formdata.append('mauser', mahoadulieu_postform(userlogin.mauser));
      formdata.append('resource_id', mahoadulieu_postform(`chude_${userlogin.malop}`))
      // if(files.length > 0)
      // {
      //     for (let i = 0; i < files.length; i++) {
      //         formdata.append('files[' + i + ']', files[i]);
      //     }
      // }


      let active = null;
      if(userlogin.group === "gv")
      {
          active = true;
      }
      else
      {
          active = false;
      }
      formdata.append('active', active);

      props.handleCreate(formdata, active);
    }
    
  };

  const form_them_diendan = () => {
    return (
      <form style={{ marginTop: "140px" }} onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group row">
          <label htmlFor="mota" className="col-sm-2 col-form-label">
            Mô tả
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="mota"
              id="mota"
              className="form-control"
              onChange={(e) => setMota(e.target.value)}
            />
          </div>
        </div>
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

        {/* <div className="form-group row">
          <label htmlFor="file" className="col-sm-2 col-form-label">
            Chọn file
          </label>
          <div className="col-sm-10">
            <input
              type="file"
              name="file"
              id="file"
              onChange={onChangeFile}
              multiple
            />
            <div className="result">{renderFiles(files)}</div>
          </div>
        </div> */}

        <button type="submit" className="btn btn-primary btn-block mt-3">
          Thêm chủ đề
        </button>
      </form>
    );
  };

  return props.accessRights.allowAdd === true ? (
    <div className="container">{form_them_diendan()}</div>
  ) : (
    <h5>Bạn không có quyền thêm diễn đàn.</h5>
  );
}

export default ThemDienDan;
