import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { channel } from "../../../Store";

// import State store
import { userContext } from "../../../Store";

// import addictional components:
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { css } from "@emotion/core";

// import basic components:
import Header from "../../basic_components/Header";
import Footer from "../../basic_components/Footer";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import FilesManagement from "./Private/FilesManagement";
import ClassFiles from "./TaiLieu/ClassFiles";
import ClassInfo from "./ClassInfo";
import LoadingClassFile from "./TaiLieu/LoadingClassFile";
import DienDan from "./DienDan/index";
import DanhSachSinhVien from "./Class/index";

import LoadingCheckIsCreateResource from "./DienDan/LoadingCheckIsCreateResource";
import LoadingAccessRightsForum from "./DienDan/LoadingAccessRights";
import TaiLieu from "./TaiLieuNew";

export const overide = css`
  margin-top: 300px;
  width: 150px;
  height: 150px;
`;

function MyPrivateHome(props) {
  const history = useHistory();

  // declare context
  const [user, setUser] = useContext(userContext);

  const [accessRights, setAccessRights] = React.useState({});
  const [accessRightsForum, setAccessRightsForum] = React.useState({});

  const [privateInfo, setPrivateInfo] = React.useState({
    tenlop: "",
    nienkhoa: "",
    malop: "",
    tengiangvien: "",
    sodienthoai: "",
    emailgiaovien: "",
  });

  // declare this component state:
  const [files, setFiles] = useState([]);
  const [tailieu, setTaiLieu] = useState([]);
  const [tailieuPending, setTaiLieuPending] = useState([]);
  const [isCreateResource, setIsCreateResource] = useState(null);
  const [isCreateTopicResource, setIsCreateTopicResource] = useState(null);

  // destructuring
  const { mauser, is_updated_info } = user;

  const handleDelete = async (filename) => {
    const response = await axios.post("/api/update-private-file-of-user", {
      filename: filename,
      mauser: mauser,
    });
    console.log(response.data.status);
    console.log(response.data.message);
    const new_data = files.filter((item) => item.filename !== filename);
    setFiles(new_data);
  };

  const handleUploadFile = async (formdata) => {
    const result = await axios.post("/api/upload-file-aws", formdata);
    if (result.data.status) {
      const new_files = result.data.result.original.files;
      setFiles([...new_files]);
    } else {
      console.log(result.data.message);
    }
  };

  const handleDeleteTaiLieu = async (id, pending) => {
    // alert(id);
    const result = await axios.delete(`/api/xoa-tai-lieu/${id}`);
    // if (result.data.status) {
    // if (pending === "pending") {
    //   const new_data = tailieuPending.filter((item) => item._id !== id);

    //   setTaiLieuPending(new_data);
    // } else {
    //   // thực hiện lại setTaiLieu
    //   const new_data = tailieu.filter((item) => item._id !== id);

    //   setTaiLieu(new_data);
    // }
    // }
  };

  const handleApprove = async (id) => {
    const data = {
      id: id,
    };
    const result = await axios.post("/api/chap-nhan-tai-lieu", data);
    // if (result.data.status) {
    //   const item = result.data.data;
    //   setTaiLieu((tailieu) => [...tailieu, item]);

    //   const new_data_pending = tailieuPending.filter((item) => item._id !== id);
    //   setTaiLieuPending(new_data_pending);
    // }
  };

  // React.useEffect(() => {
  //   console.log(tailieu);
  //   channel.bind("App\\Events\\MyEvent", function (data) {
  //     const a = JSON.parse(JSON.stringify(data));
  //     if (a.data.isDeleting) {
  //       alert("đang ở trong delete");
  //       if (a.data.active === false) {
  //         console.log(tailieuPending);
  //         const new_data = tailieuPending.filter(
  //           (item) => item._id !== a.data._id
  //         );

  //         setTaiLieuPending(new_data);
  //       } else {
  //         const new_data = tailieu.filter((item) => item._id !== a.data._id);

  //         setTaiLieu(new_data);
  //       }
  //     }

  //     if (a.data.isApprove) {
  //       alert("đang trong duyệt");
  //       setTaiLieu((tailieu) => [...tailieu, a.data]);

  //       const newDataTaiLieuPending = tailieuPending.filter(
  //         (item) => item._id !== a.data._id
  //       );
  //       setTaiLieuPending(newDataTaiLieuPending);
  //     }

  //     if (a.data.isUpdate) {
  //       console.log(tailieu);
  //       alert("đang ở trong update");
  //       if (a.data.active === true) {
  //         alert("active true");
  //         let newTaiLieu = tailieu.map((item) =>
  //           item._id === a.data._id ? a.data : item
  //         );
  //         setTaiLieu(newTaiLieu);
  //       } else {
  //         alert("active false");

  //         console.log(a.data._id);
  //         const new_tai_lieu = tailieu.filter(
  //           (item) => item._id !== a.data._id
  //         );
  //         setTaiLieu(new_tai_lieu);
  //         setTaiLieuPending((tailieu) => [...tailieu, a.data]);
  //       }
  //     }

  //     if (a.data.isAdd) {
  //       alert("đang ở trong add");
  //       if (a.data.active) {
  //         setTaiLieu((tailieu) => [
  //           ...tailieu,
  //           { ...a.data, _id: a.data._id["$oid"] },
  //         ]);
  //       } else {
  //         setTaiLieuPending((tailieu) => [
  //           ...tailieu,
  //           { ...a.data, _id: a.data._id["$oid"] },
  //         ]);
  //       }
  //     }
  //   });
  //   return () => {};
  // }, []);

  const handleCreate = async (formdata, active) => {
    const result = await axios.post("/api/tao-tai-lieu", formdata);

    // sau này kiểm tra phân quyền để set tailieu hay setTaiLieuPending cho đúng
    // if (result.data.status) {

    //   if (active) {
    //     setTaiLieu((tailieu) => [
    //       ...tailieu,
    //       { ...result.data.data, _id: result.data.data._id["$oid"] },
    //     ]);
    //   } else {
    //     setTaiLieuPending((tailieu) => [
    //       ...tailieu,
    //       { ...result.data.data, _id: result.data.data._id["$oid"] },
    //     ]);
    //   }
    // }
  };

  const handleEdit = async (formdata, active) => {
    console.log(formdata);
    const result = await axios.post("/api/sua-tai-lieu", formdata);
    // console.log(result);
    // if (result.data.status) {
    //   if (active) {
    //     setTaiLieu(
    //       tailieu.map((item) =>
    //         item._id === result.data.data._id ? result.data.data : item
    //       )
    //     );
    //   } else {
    //     const new_tai_lieu = tailieu.filter(
    //       (item) => item._id !== result.data.data._id
    //     );
    //     setTaiLieu(new_tai_lieu);
    //     setTaiLieuPending((tailieu) => [...tailieu, result.data.data]);
    //   }

    //   // history.push('/class-files')
    // }
  };

  const CreateANewResourceTaiLieu = async (malop, nameOfResource) => {
    if (user.group === "gv") {
      const data = {
        resource_id: `tl_${malop}`,
        resource_name: nameOfResource,
      };
      const response = await axios.post("/api/create-new-resource", data);
      if (response.data.status) {
        setIsCreateResource(true);
      }
    } else {
      alert("Bạn không có quyền tạo.");
    }
  };

  const CreateANewTopicResource = async (malop, nameOfResource) => {
    console.log("đã click lần 2");
    const data = {
      resource_id: `chude_${malop}`,
      resource_name: nameOfResource,
    };
    const response = await axios.post("/api/create-new-resource", data);
    console.log(response);
    if (response.data.status) {
      setIsCreateTopicResource(true);
    }
  };

  const main_content = () => {
    return (
      <div>
        <Router>
          <div id="page" className="container-fluid mt-0">
            <div id="page-content" className="row">
              <div id="region-main-box" className="col-12">
                <section id="region-main" className="col-12">
                  <span
                    className="notifications"
                    id="user-notifications"
                  ></span>
                  <div role="main">
                    <span id="maincontent"></span>
                    <div className="my-1 my-sm-5"></div>
                    <div className="row justify-content-center">
                      <div className="col-xl-12 col-sm-8 ">
                        <ClassInfo
                          {...props}
                          mauser={user.mauser}
                          magiaovien={user.magiaovien}
                          setFiles={setFiles}
                          private_info={[privateInfo, setPrivateInfo]}
                        />

                        <hr />
                        <div className="col-md-12">
                          <ul
                            className="nav nav-pills flex-row"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <Link
                                id="user"
                                name="user"
                                className={"linkcustom nav-link"}
                                id="home-tab"
                                data-toggle="tab"
                                to="/files-management"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                              >
                                Quản lý tệp riêng tư
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                id="class"
                                name="class"
                                className={"linkcustom nav-link"}
                                id="profile-tab"
                                data-toggle="tab"
                                to="/class-files"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                              >
                                Xem tệp của lớp học
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link
                                id="users_roles"
                                name="users_roles"
                                className={"linkcustom nav-link"}
                                id="profile-tab"
                                data-toggle="tab"
                                to="/forum"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                              >
                                Diễn đàn lớp học
                              </Link>
                            </li>
                            {/* {user.group === "gv" ? */}
                            <li className="nav-item">
                              <Link
                                id="students"
                                name="students"
                                className={"linkcustom nav-link"}
                                id="profile-tab"
                                data-toggle="tab"
                                to="/students"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                              >
                                Sinh viên
                              </Link>
                            </li>
                            {/* : null */}
                            {/* } */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div id="region-main-box" className="col-12">
            <section id="region-main">
              <div className="course-content">
                <ul className="topics">
                  <li id="section-0" className="section main clearfix">
                    <div className="content">
                      <Switch>
                        <Route
                          path="/files-management"
                          render={(props) => (
                            <FilesManagement
                              {...props}
                              files={files}
                              handleDelete={handleDelete}
                              handleUploadFile={handleUploadFile}
                            />
                          )}
                        />
                        {/* {privateInfo.malop ? */}
                        <Route
                          path="/class-files"
                          render={(props) => (
                            // <ClassFiles
                            //   {...props}
                            //   handleDelete={handleDeleteTaiLieu}
                            //   handleApprove={handleApprove}
                            //   handleCreate={handleCreate}
                            //   handleEdit={handleEdit}
                            //   setTaiLieu={setTaiLieu}
                            //   setTaiLieuPending={setTaiLieuPending}
                            //   tailieu={tailieu}
                            //   tailieuPending={tailieuPending}
                            //   privateInfo={privateInfo}
                            //   accessRights={accessRights}
                            //   isCreateResource={isCreateResource}
                            //   CreateANewResourceTaiLieu={
                            //     CreateANewResourceTaiLieu
                            //   }
                            //   user={user}
                            // />
                            <TaiLieu
                              {...props}
                              privateInfo={privateInfo}
                              accessRights={accessRights}
                              isCreateResource={isCreateResource}
                              CreateANewResourceTaiLieu={
                                CreateANewResourceTaiLieu
                              }
                              userlogin={user}
                            />
                          )}
                        />
                        {/* : null} */}

                        <Route
                          path="/forum"
                          render={(props) => (
                            <DienDan
                              {...props}
                              isCreateTopicResource={isCreateTopicResource}
                              CreateANewTopicResource={CreateANewTopicResource}
                              accessRightsForum={accessRightsForum}
                              user={user}
                              privateInfo={privateInfo}
                            />
                          )}
                        />

                        <Route
                          path="/students"
                          component={(props) => (
                            <DanhSachSinhVien {...props} userlogin={user} />
                          )}
                        />
                        {/* <Route path={props.path} component={props.component} user={user} /> */}
                      </Switch>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </Router>
      </div>
    );
  };

  const full_page = () => {
    return (
      <div>
        {/* <Router> */}
        <Header />
        {main_content()}
        <Footer />
        {/* </Router> */}
      </div>
    );
  };

  return (
    <div>
      {!user.name && !privateInfo.malop ? (
        <ClipLoader color={"green"} css={overide} />
      ) : (
        full_page()
      )}

      {privateInfo.tenlop ? (
        <div>
          <LoadingClassFile
            {...props}
            setAccessRights={setAccessRights}
            setIsCreateResource={setIsCreateResource}
            userlogin={user}
          />
        </div>
      ) : null}

      {user.name ? (
        <div>
          <LoadingCheckIsCreateResource
            userlogin={user}
            setIsCreateTopicResource={setIsCreateTopicResource}
          />
          <LoadingAccessRightsForum
            userlogin={user}
            setAccessRightsForum={setAccessRightsForum}
          />
        </div>
      ) : null}
    </div>
  );
}

export default MyPrivateHome;
