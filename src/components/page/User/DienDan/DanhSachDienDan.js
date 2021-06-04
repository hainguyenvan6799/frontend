import React from "react";
import DienDan from "./DienDan";
import DienDanPending from "./DienDanPending";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ThemDienDan from "./ThemDienDan";
import ChinhSuaDienDan from "./ChinhSuaDienDan";
import ChiTietChuDe from "./ChiTietChuDe";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function DanhSachDienDan(props) {
  const { accessRights, userlogin } = props;

  const handleDelete = (id, type) => {
    props.handleDelete(id, type);
  };

  const handleCreate = (topic, active) => {
    props.handleCreate(topic, active);
  };

  const handleEdit = (topic, id, active) => {
    props.handleEdit(topic, id, active);
  };

  const handleApprove = (id) => {
    props.handleApprove(id);
  };

  return (
    <div>
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to={{ pathname: `/forum` }}>
                  Thêm chủ đề
                </Link>
              </li>
<li className="nav-item">
                <Popup
                  trigger={
                    <button className="button">
                      Xem thông báo
                      {props.notification.length ? (
                        <span>
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "red",
                              paddingTop: "8px",
                              float: "right",
                              marginTop: "-50px",
                              marginRight: "-25px",
                            }}
                          >
                            New
                          </div>
                        </span>
                      ) : null}
                    </button>
                  }
                  modal
                >
                  <span>
                    {props.notification.length > 0
                      ? props.notification.map((item) => {
                          return (
                            <p>
                              {item.username} có 1 bình luận trên{" "}
                              {item.tenchude}
                            </p>
                          );
                        })
                      : "Không có thông báo mới."}
                  </span>
                </Popup>
              </li>
            </ul>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mô tả</th>
                  <th>Nội dung</th>
                  <th>Người đăng</th>
                  {/* {props.accessRights.allowUpdate || props.accessRights.allowDelete ? <th>Hành động</th> : null} */}
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {props.topics.length !== 0
                  ? props.topics.map((item, index) => {
                      return (
                        <DienDan
                          {...props}
                          key={index}
                          item={item}
                          index={index}
                          handleDelete={handleDelete}
                          handleApprove={handleApprove}
                          accessRights={accessRights}
                          userlogin={userlogin}
                          getUserNameOfUser={props.getUserNameOfUser}
                        />
                      );
                    })
                  : null}
              </tbody>
            </table>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mô tả</th>
                  <th>Nội dung</th>
                  <th>Người đăng</th>
                  <th>Trạng thái</th>
                  {/* {props.accessRights.allowUpdate || props.accessRights.allowDelete ? <th>Hành động</th> : null} */}
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {props.topicsPending.length !== 0
                  ? props.topicsPending.map((item, index) => {
                      return (
                        <DienDanPending
                          {...props}
                          key={index}
                          item={item}
                          index={index}
                          handleDelete={handleDelete}
                          accessRights={accessRights}
                          userlogin={userlogin}
                          getUserNameOfUser={props.getUserNameOfUser}
                        />
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>

          <div className="col-md-12">
            <Switch>
              <Route
                exact
                path="/forum"
                component={(props) => (
                  <ThemDienDan
                    {...props}
                    handleCreate={handleCreate}
                    accessRights={accessRights}
                    userlogin={userlogin}
                  />
                )}
              />
              {/* <Route path="/forum/add-topic" component={(props) => <ThemDienDan {...props} handleCreate={handleCreate} />} /> */}
              <Route
                path="/forum/edit-topic"
                component={(props) => (
                  <ChinhSuaDienDan
                    {...props}
                    handleEdit={handleEdit}
                    accessRights={accessRights}
                    userlogin={userlogin}
                  />
                )}
              />
              <Route path="/forum/xem" component={ChiTietChuDe} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default DanhSachDienDan;
