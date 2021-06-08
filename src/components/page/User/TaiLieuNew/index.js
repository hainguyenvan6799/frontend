import axios from "axios";
import React from "react";
import { mahoadulieu_postform } from "../../security";
import ClipLoader from "react-spinners/ClipLoader";
import DanhSachTaiLieu from "./DanhSachTaiLieu";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ThemTaiLieu from "./ThemTaiLieu";
import ChinhSuaTaiLieu from "./ChinhSuaTaiLieu";

import { channel } from "../../../../Store";

function TaiLieu(props) {
  const [isLoading, setIsLoading] = React.useState(true);
  var isMounted = true;

  const [tailieu, setTaiLieu] = React.useState([]);
  const [tailieuPending, setTaiLieuPending] = React.useState([]);

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
      resource_id: mahoadulieu_postform(`tl_${props.userlogin.malop}`),
    };
    const response = await axios.post(
      "/api/get-tailieu-of-specific-class",
      data
    );
    if (response.data.status) {
      const users = response.data.users;
      const urls = response.data.urls;
      response.data.data.map((item) => {
        if (isMounted) {
          item.username = get_username_of_user(users, item.mauser);
          item.url = get_url_of_file(urls, item.matailieu);

          if (item.active) {
            setTaiLieu((tailieu) => [...tailieu, item]);
          } else {
            setTaiLieuPending((tailieuPending) => [...tailieuPending, item]);
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
  }, []);

  const handleDeleteTaiLieu = () => {
    // channel.bind("App\\Events\\MyEvent", (data) => {
    //   console.log("pusher", data);
    //   if (data.data.isDelete) {
    //     if (data.data.active) {
    //       const newData = tailieu.filter((item) => item._id !== data.data._id);
    //       setTaiLieu(newData);
    //     } else {
    //       const newData = tailieuPending.filter(
    //         (item) => item._id !== data.data._id
    //       );
    //       setTaiLieuPending(newData);
    //     }
    //   }
    // });
  };

  React.useEffect(() => {
    channel.bind("App\\Events\\MyEvent", (data) => {
      console.log("pusher", data);
    if (data.data.resource_id === `tl_${props.userlogin.malop}`) {
      if (data.data.isDelete) {
        if (data.data.active) {
          //   const newData = tailieu.filter((item) => item._id !== data.data._id);
          setTaiLieu((tailieu) => [
            ...tailieu.filter((item) => item._id !== data.data._id),
          ]);
        } else {
          setTaiLieuPending((tailieu) => [
            ...tailieu.filter((item) => item._id !== data.data._id),
          ]);
        }
      }

      if (data.data.isAdd === true) {
        let item = data.data;
        item._id = item._id["$oid"];
        if (item.active === true) {
          setTaiLieu((tailieu) => [...tailieu, item]);
        } else {
          setTaiLieuPending((tailieu) => [...tailieu, item]);
        }
      }

      if (data.data.isUpdate === true) {
        if (data.data.active) {
          setTaiLieu((tailieu) =>
            tailieu.map((item) =>
              item._id === data.data._id ? data.data : item
            )
          );
        } else {
          setTaiLieu((tailieu) =>
            tailieu.filter((item) => item._id !== data.data._id)
          );
          setTaiLieuPending((tailieu) => [...tailieu, data.data]);
        }
      }

      if (data.data.isApprove === true) {
        setTaiLieu((tailieu) => [...tailieu, data.data]);
        setTaiLieuPending((tailieu) =>
          tailieu.filter((item) => item._id !== data.data._id)
        );
      }
    }
    });
  }, []);

  return isLoading ? (
    <ClipLoader />
  ) : (
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={{
                    pathname: `/them-tai-lieu`,
                    state: {
                      malop: props.privateInfo.malop,
                      accessRights: props.accessRights,
                      userlogin: props.userlogin,
                    },
                  }}
                >
                  Thêm tài liệu
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <DanhSachTaiLieu
          tailieu={tailieu}
          tailieuPending={tailieuPending}
          accessRights={props.accessRights}
          userlogin={props.userlogin}
          handleDeleteTaiLieu={handleDeleteTaiLieu}
        />

        <div className="col-md-12">
          <Switch>
            <Route
              exact
              path="/them-tai-lieu"
              component={(props) => (
                <ThemTaiLieu
                  {...props}
                  // handleCreate={handleCreate}
                  privateInfo={props.privateInfo}
                />
              )}
            />
            <Route
              exact
              path="/chinh-sua-tai-lieu"
              component={(props) => (
                <ChinhSuaTaiLieu
                  {...props}
                  //   handleEdit={handleEdit}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default TaiLieu;
