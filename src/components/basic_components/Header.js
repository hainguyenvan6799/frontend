import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../../Store";
import axios from "axios";

function Header() {
  const [user, setUser] = useContext(userContext);
  const { name, email } = user;

  const history = useHistory();

  const Logout = () => {
    axios
      .get("/api/logout")
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    setUser({
      name: "",
      email: "",
    });

    // clear localStorage
    localStorage.clear();
    history.push("/");
  };

  const login_or_notlogin = () => {
    return name !== "" && email !== "" ? (
      <div
        className="menubar d-flex "
        id="action-menu-1-menubar"
        role="menubar"
      >
        <div className="action-menu-trigger">
          <div className="dropdown">
            <a
              href="/"
              tabIndex="0"
              className=" dropdown-toggle icon-no-margin"
              id="dropdown-1"
              aria-label="User menu"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              aria-controls="action-menu-1-menu"
            >
              <span className="userbutton">
                <span className="usertext mr-1">{name}</span>
                <span className="avatars">
                  <span className="avatar current">
                    <img
                      src="https://lms.iuh.edu.vn/theme/image.php/academi/core/1600662090/u/f2"
                      alt=""
                      className="userpicture defaultuserpic"
                      width="35"
                      height="35"
                      role="presentation"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </span>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right menu align-tr-br"
              data-rel="menu-content"
              aria-labelledby="action-menu-toggle-1"
              role="menu"
              data-align="tr-br"
              id="dropdown-menu-1"
            >
              <Link to="/nha-cua-toi" className="dropdown-item menu-action">
                <span className="menu-action-text" id="actionmenuaction-1">
                  Nh?? c???a t??i
                </span>
              </Link>

              <Link
                to="/tham-gia-phong-chat"
                className="dropdown-item menu-action"
              >
                <span className="menu-action-text" id="actionmenuaction-1">
                  Ph??ng Chat
                </span>
              </Link>
              {user.group === "admin" ? (
                <Link to="/admin" className="dropdown-item menu-action">
                  <span className="menu-action-text" id="actionmenuaction-1">
                    Qu???n tr??? Admin
                  </span>
                </Link>
              ) : null}

              

              {/* <Link to="/test-schedule" className="dropdown-item menu-action">

                                    <span className="menu-action-text" id="actionmenuaction-1">

                                            </span>
                                </Link> */}

              {user.magiaovien !== null && user.group !== "admin" ? (
                user.group !== "" ? (
                  user.group === "gv" ? (
                    <div>
                      <Link
                        to="/test-schedule"
                        className="dropdown-item menu-action"
                      >
                        <span
                          className="menu-action-text"
                          id="actionmenuaction-1"
                        >
                          Ch???nh s???a l???ch c???a t??i
                        </span>
                      </Link>

                      <Link
                        to="/gui-thong-bao"
                        className="dropdown-item menu-action"
                      >
                        <span
                          className="menu-action-text"
                          id="actionmenuaction-1"
                        >
                          G???i th??ng b??o
                        </span>
                      </Link>
                    </div>
                  ) : (
                    <Link
                      to="/test-schedule"
                      className="dropdown-item menu-action"
                    >
                      <span
                        className="menu-action-text"
                        id="actionmenuaction-1"
                      >
                        Xem l???ch gi???ng vi??n
                      </span>
                    </Link>
                  )
                ) : (
                  "Loading..."
                )
              ) : null}

              {/* <div className="dropdown-divider" role="presentation"><span className="filler">&nbsp;</span></div>
                                <a href="/" className="dropdown-item menu-action" >
                                    <span className="menu-action-text" id="actionmenuaction-2">
                                        H??? s?? li??n l???c
                                            </span>
                                </a> */}
              <div className="dropdown-divider" role="presentation">
                <span className="filler">&nbsp;</span>
              </div>
              <a
                href="/change-password-after-login"
                className="dropdown-item menu-action"
              >
                <span className="menu-action-text" id="actionmenuaction-2">
                  ?????i m???t kh???u
                </span>
              </a>
              <div className="dropdown-divider" role="presentation">
                <span className="filler">&nbsp;</span>
              </div>
              <a href="" onClick={Logout} className="dropdown-item menu-action">
                <span className="menu-action-text" id="actionmenuaction-6">
                  ????ng xu???t
                </span>
              </a>

              {/* <button onClick={Logout} className="dropdown-item menu-action" >

                                    <span className="menu-action-text" id="actionmenuaction-6">
                                        ????ng xu???t
                                            </span>
                                </button> */}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="usermenu">
        <span className="login">
          B???n ch??a ????ng nh???p. (<Link to="/signin">????ng Nh???p</Link>)
        </span>
      </div>
    );
    // (name !== "" && email !== "") ?
    // (
    // <div className="usermenu"><span className="login">Xin ch??o {name}. (<a onClick={Logout}>????ng Xu???t</a>)</span></div>) : (
    // <div className="usermenu"><span className="login">B???n ch??a ????ng nh???p. (<Link to="/signin">????ng Nh???p</Link>)</span></div>
    // )
  };

  return (
    <div>
      <nav
        id="header"
        className="fixed-top navbar navbar-light bg-faded navbar-static-top navbar-expand moodle-has-zindex"
      >
        <div className="container navbar-nav">
          <div data-region="drawer-toggle" className="d-inline-block mr-3">
            <nav className="nav navbar-nav hidden-md-down address-head">
              <span>??T : 0283.8940 390 - ext 168</span>
              <span>
                E-mail : <a href="mailto:sac@iuh.edu.vn">sac@iuh.edu.vn</a>
              </span>
            </nav>
          </div>
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item d-flex align-items-center">
              {login_or_notlogin()}
            </li>
          </ul>
        </div>
      </nav>
      <div className="header-main">
        <div className="container">
          <nav className="navbar navbar-light bg-faded">
            <a href="/" className="navbar-brand has-logo">
              <span className="logo">
                <img src="/img/logo.png" alt="E-IUH" />
              </span>
            </a>
            <div
              className="collapse navbar-toggleable-md"
              id="navbarResponsive"
            >
              <div className="infoarea ">
                {/* custom_menu */}
                <li className="nav-item">
                  {/* <a className="nav-item nav-link" href="#" title="Trang ch???">Trang ch???</a> */}
                  <Link className="nav-item nav-link" title="Trang ch???" to="/">
                    Trang Ch???
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-item nav-link"
                    href="/"
                    title="Tin t???c - Th??ng b??o"
                  >
                    Tin t???c - Th??ng b??o
                  </a>
                </li>
                {/* page_heading_menu */}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
