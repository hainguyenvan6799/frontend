import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Them from "../../Admin/VaiTroTaiNguyen/Them";
import DanhSachBinhLuan from "./DanhSachBinhLuan";
import ThemBinhLuan from "./ThemBinhLuan";

function ChiTietChuDe(props) {
    const {userlogin, machude} = props.location.state
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
                <Link className="nav-link" to="/forum/xem/binhluan">
                  Xem danh sách bình luận
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/forum/xem/thembinhluan">
                  Thêm bình luận
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/forum/xem/binhluan" component={() => <DanhSachBinhLuan machude={machude} userlogin={userlogin} /> } />
          <Route path="/forum/xem/thembinhluan" component={() => <ThemBinhLuan machude={machude} userlogin={userlogin} /> } />
        </Switch>
      </Router>
    </div>
  );
}

export default ChiTietChuDe;
