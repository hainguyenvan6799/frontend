import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import ImportUsersForm from "./components/import_users/ImportUsersForm";
import Cap_nhat_thong_tin from "./components/page/User/cap_nhat_thong_tin";
// import Login from './components/Login';
import ChangePassword from "./components/page/User/ChangePassword";
import ChangePasswordAfterLogin from "./components/page/User/ChangePasswordAfterLogin";
import Forgot from "./components/page/User/Forgot";
import LoginForm from "./components/page/User/LoginForm";
import MyPrivateHome from "./components/page/User/MyPrivateHome";
import ResetPassword from "./components/page/User/ResetPassword";
import DSSV from "./components/page/GiaoVien/DSSV";
import NoiDungDienDan from "./components/page/User/NoiDungDienDan";
import ThemDienDan from "./components/page/User/ThemDienDan";
import QuanLyLopHoc from "./components/page/GiaoVien/QuanLyLopHoc";
// import QuanLyNguoiDung from './components/page/Admin/QuanLyNguoiDung';

import ThamGiaPhongChat from "./components/page/Admin/ThamGiaPhongChat";
import PhongChat from "./components/page/User/PhongChat";
import AdminOnly from "./components/page/Admin/AdminOnly";
import PhanQuyen from "./components/page/Admin/PhanQuyen";
import VaiTro from "./components/page/Admin/QuanLyVaiTro";
import TestSchedule from "./components/page/GiaoVien/TestSchedule";
import VaiTroTaiNguyen from "./components/page/Admin/VaiTroTaiNguyen";
import ImportFileAws from "./components/page/User/Private/import_file_to_aws";
import TestUnion from "./TestUnion";
import { userContext } from "./Store";
import FilesManagement from "./components/page/User/Private/FilesManagement";
import ClassFiles from "./components/page/User/TaiLieu/ClassFiles";
import DienDan from "./components/page/User/DienDan/index";
import XinChaoTaiLieu from "./components/page/User/XinChaoTaiLieu";
import GuiThongBao from "./components/page/GiaoVien/GuiThongBao";
import Login from "./components/page/User/Login1";
import Test2 from "./test";

function App() {
  const [user, setUser] = React.useContext(userContext);

  return (
    <div className="App">
      {/* <Index/> */}
      <Router>
        {/* <Switch> */}
        <Route exact path="/abc" component={Test2} />
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={() => <Login user={user} />} />
        {/* Nếu muốn nhiều trang thì thêm ở đây: */}
        {/* Trang chủ */}
        <Switch>
          <Route exact path="/nha-cua-toi" component={MyPrivateHome} />

          <Route
            path="/files-management"
            render={(props) => (
              <MyPrivateHome
                {...props}
                path={"/files-management"}
                component={FilesManagement}
                user={[user, setUser]}
              />
            )}
          />

          <Route
            path="/class-files"
            render={(props) => (
              <MyPrivateHome
                {...props}
                path={"/class-files"}
                component={ClassFiles}
                user={[user, setUser]}
              />
            )}
          />

          <Route
            exact
            path="/forum"
            render={(props) => (
              <MyPrivateHome
                {...props}
                path={"/forum"}
                component={DienDan}
                user={[user, setUser]}
              />
            )}
          />
        </Switch>
        {/* User */}

        {/* <Route path="/signin" component={LoginForm} /> */}
        <Route path="/forgot_password" component={Forgot} />
        <Route path="/reset_password" component={ResetPassword} />
        <Route path="/change-password" component={ChangePassword} />
        <Route
          path="/change-password-after-login"
          component={ChangePasswordAfterLogin}
        />
        <Route
          path="/trang_cap_nhat_thong_tin"
          component={Cap_nhat_thong_tin}
        />
        <Route path="/noidungdiendan" component={NoiDungDienDan} />

        {/* Sinh viên */}

        {/* Giảng viên */}
        {/* Admin */}
        
        <Route path="/DSSV" component={DSSV} />
        <Route path="/themdiendan" component={ThemDienDan} />
        <Route path="/quanlylophoc" component={QuanLyLopHoc} />
        {/* <Route path="/quanlynguoidung" component={QuanLyNguoiDung} /> */}
        <Route path="/import-users" component={ImportUsersForm} />
        {/* try { */}
        <Route exact path="/tham-gia-phong-chat" component={ThamGiaPhongChat} />
        <Route
          exact
          path="/tham-gia-phong-chat/:email"
          component={(props) => (
            <ThamGiaPhongChat {...props} email={props.match.params.email} />
          )}
        />
        {/* } catch (error) {
            console.log("Set credentials fail")
          } */}

        <Route exact path="/phong-chat" component={PhongChat} />
        <Route
          exact
          path="/test-schedule"
          component={(props) => (
            <TestSchedule {...props} user={[user, setUser]} />
          )}
        />
        <Route exact path="/testuploadaws" component={ImportFileAws} />

        <Route exact path="/testunion" component={TestUnion} />
        <Route exact path="/testaxios" component={XinChaoTaiLieu} />
        <Route
          exact
          path="/gui-thong-bao"
          component={(props) => <GuiThongBao {...props} user={user} />}
        />

        {/* admin only */}
        <Switch>
          <Route exact path="/admin" component={AdminOnly} />
          {/* <Route path="/admin/roles" component={VaiTro} /> */}
          <Route
            path="/admin/roles"
            render={(props) => (
              <AdminOnly {...props} path={"/admin/roles"} component={VaiTro} />
            )}
          />
          <Route
            path="/admin/users-roles"
            render={(props) => (
              <AdminOnly
                {...props}
                path={"/admin/users-roles"}
                component={PhanQuyen}
              />
            )}
          />
          <Route
            path="/admin/roles-resources"
            render={(props) => (
              <AdminOnly
                {...props}
                path={"/admin/roles-resources"}
                component={VaiTroTaiNguyen}
              />
            )}
          />
        </Switch>

        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
