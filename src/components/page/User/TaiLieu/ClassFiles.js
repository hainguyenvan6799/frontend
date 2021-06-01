import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { mahoadulieu_postform } from "../../security";
import ChinhSuaTaiLieu from "./ChinhSuaTaiLieu";
import TaiLieu from "./TaiLieu";
import TaiLieuPending from "./TaiLieuPending";
import ThemTaiLieu from "./ThemTaiLieu";
import ClipLoader from "react-spinners/ClipLoader";

function ClassFiles(props) {
  const [isLoading, setIsLoading] = React.useState(true);
  var isMounted = true;

  const handleDelete = async (id, pending) => {
    props.handleDelete(id, pending);
  };

  const handleApprove = (id) => {
    props.handleApprove(id);
  };

  const handleCreate = (formdata, active) => {
    props.handleCreate(formdata, active);
  };

  const handleEdit = (formdata, active) => {
    props.handleEdit(formdata, active);
  };

  const CreateANewResourceTaiLieu = (malop, nameOfResource) => {
    props.CreateANewResourceTaiLieu(malop, nameOfResource);
  };

  const get_username_of_user = (arr, checkMauser) => {
    const user = arr.find(({ mauser }) => mauser === checkMauser);
    return user.name;
  };

  const get_url_of_file = (arr, checkMatailieu) => {
    const tailieu = arr.find(({ matailieu }) => matailieu === checkMatailieu);
    return tailieu.url;
  };

  const get_tailieu = async () => {
    const data = {
      // resource_id: mahoadulieu_postform(props.user.malop),
      resource_id: mahoadulieu_postform(`tl_${props.user.malop}`),
    };
    const response = await axios.post(
      "/api/get-tailieu-of-specific-class",
      data
    );
    console.log("t đang ở trang classfiles", response);
    if (response.data.status) {
      const users = response.data.users;
      const urls = response.data.urls;
      response.data.data.map((item) => {
        if (isMounted) {
          item.username = get_username_of_user(users, item.mauser);
          item.url = get_url_of_file(urls, item.matailieu);

          if (item.active) {
            props.setTaiLieu((tailieu) => [...tailieu, item]);
          } else {
            props.setTaiLieuPending((tailieuPending) => [
              ...tailieuPending,
              item,
            ]);
          }
          setIsLoading(false);
        }
      });
    }
  };

  React.useEffect(() => {
    get_tailieu();

    return () => {
      isMounted = false;
      setIsLoading(false);
    };
  }, [props.user.malop]);

  return isLoading ? (
    <ClipLoader />
  ) : props.isCreateResource !== null ? (
    props.isCreateResource === true ? (
      <>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={{
                      pathname: `/them-tai-lieu`,
                      state: {
                        malop: props.privateInfo.malop,
                        accessRights: props.accessRights,
                        mauser: props.user.mauser,
                        userlogin: props.user,
                      },
                    }}
                  >
                    Thêm tài liệu
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="row">
            <div className="col-md-12">
              {props.tailieu.length !== 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên tài liệu</th>
                      <th>Tên file</th>
                      <th>Download</th>
                      <th>Người đăng</th>
                      {props.accessRights.allowUpdate ||
                      props.accessRights.allowDelete ? (
                        <th>Hành động</th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {props.tailieu.map((item, index) => {
                      return (
                        <TaiLieu
                          {...props}
                          key={index}
                          index={index}
                          item={item}
                          handleDelete={handleDelete}
                          accessRights={props.accessRights}
                          userlogin={props.user}
                        />
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h5>Hiện tại chưa có tệp nào</h5>
              )}

              {props.tailieuPending.length !== 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên tài liệu</th>
                      <th>Tên file</th>
                      <th>Người đăng</th>
                      <th>Tình trạng</th>

                      {props.accessRights.allowUpdate ||
                      props.accessRights.allowDelete ? (
                        <th>Hành động</th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {props.tailieuPending.map((item, index) => {
                      return (
                        <TaiLieuPending
                          {...props}
                          key={index}
                          index={index}
                          item={item}
                          handleDelete={handleDelete}
                          handleApprove={handleApprove}
                          accessRights={props.accessRights}
                          userlogin={props.user}
                        />
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h5>Hiện tại chưa có tệp nào cần được approve</h5>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <Switch>
              <Route
                exact
                path="/them-tai-lieu"
                component={(props) => (
                  <ThemTaiLieu
                    {...props}
                    handleCreate={handleCreate}
                    privateInfo={props.privateInfo}
                  />
                )}
              />
              <Route
                exact
                path="/chinh-sua-tai-lieu"
                component={(props) => (
                  <ChinhSuaTaiLieu {...props} handleEdit={handleEdit} />
                )}
              />
            </Switch>
          </div>
        </Router>
      </>
    ) : (
      <button
        className="btn btn-primary"
        onClick={() =>
          CreateANewResourceTaiLieu(
            props.privateInfo.malop,
            `Tài liệu của lớp ${props.privateInfo.tenlop}`
          )
        }
      >
        Nhấn vào đây để tạo mới một resource
      </button>
    )
  ) : (
    "...Loading..."
  );
}

export default ClassFiles;
