import React, { useState, useEffect } from "react";
import axios from "axios";
import { get_magiaovien } from "./components/page/User/Login1";
import { giaimadulieu, mahoadulieu_postform } from "./components/page/security";
import Pusher from "pusher-js";
const PusherBackend = require("pusher");
const pusherFrontend = new Pusher("2b03e0ab05c69b7c59b7", {
  cluster: "ap1",
  encrypted: true,
});
export const channel = pusherFrontend.subscribe("contain_files");
export const channel1 = pusherFrontend.subscribe("notification");
export const channel2 = pusherFrontend.subscribe("topics");
export const channel3 = pusherFrontend.subscribe("scheduleCalendar");

channel.bind("pusher:subscription_succeeded", function (members) {});
channel.bind("add_files", function (data) {
  alert(data);
});

// create context area
export const userContext = React.createContext({
  name: "",
  email: "",
  is_updated_info: 0,
  mauser: "",
  sex: "",
});
export const loadingContext = React.createContext(false);
export const validationContext = React.createContext({
  validation_all: {
    status: null,
    message: "",
  },
  validation_email: {
    status: null,
    message: "",
  },
  validation_password: {
    status: null,
    message: "",
  },
});

function Store({ children }) {
  const [user, setUser] = useState(userContext._currentValue);
  const [loading, setLoading] = useState(loadingContext._currentValue);
  const [general_validation, setGeneralValidation] = useState(
    validationContext._currentValue
  );

  const isMountedVal = React.useRef(1);

  useEffect(() => {
    console.log("đã thực hiện");

    if (isMountedVal.current === 1) {
      check_login();
    }

    return () => {
      console.log("Thực hiện isMountedVal = 0");
      isMountedVal.current = 0;
    };
  }, [isMountedVal]);

  useEffect(() => {
    Pusher.logToConsole = true;
    // const pusher = new PusherBackend({
    //   appId: "1211732",
    //   key: "2b03e0ab05c69b7c59b7",
    //   secret: "2f3702fb4c2927a74e72",
    //   cluster: "ap1",
    //   port: "3000",
    //   encrypted: true,
    // });
    // pusher.trigger('chat', 'message', {username: "NguyenVanHai"});
  });

  const check_login = async () => {
    let token = localStorage.getItem("token");

    if (token) {
      setLoading(true);
      axios
        .get("/api/user")
        .then((res) => {
          if (res.data.status === "success") {
            const users = res.data.users;
            let {
              name,
              email,
              is_updated_info,
              mauser,
              sex,
              group,
              malop,
              user_chat_id,
            } = res.data.user;
            const magiaovien = giaimadulieu(res.data.magiaovien);
            console.log(magiaovien);
            setUser({
              ...user,
              name: name,
              email: email,
              is_updated_info: is_updated_info,
              mauser: mauser,
              sex: sex,
              group: group,
              malop: malop,
              magiaovien: magiaovien,
              user_chat_id,
            });
            setLoading(false);
          } else {
            localStorage.clear();
            window.location.href = "/signin";
          }
        })
        .catch((err) => {
          if (err) {
            localStorage.clear();
            window.location.href = "/signin";
          }
        });
    }
  };

  //     axios.get('/api/user')
  //         .then(
  //             res => {
  //                 if (isMounted) {
  //                     // console.log(res);
  //                     if (res.data.status === "success") {
  //                         // console.log("success");
  //                         let { name, email, is_updated_info, mauser, sex, group } = res.data.user;

  //                         setUser({
  //                             ...user,
  //                             name: name,
  //                             email: email,
  //                             is_updated_info: is_updated_info,
  //                             mauser: mauser,
  //                             sex: sex,
  //                             group: group,
  //                             magiaovien: res.data.magiaovien,
  //                         })
  //                     }

  //                 }
  //                 setLoading(false);
  //             }
  //         )
  //         .catch(
  //             error => {
  //                 if (token) {
  //                     localStorage.clear();
  //                     alert("Đã hết thời gian đăng nhập. Vui lòng tải lại trang.")
  //                     return <Redirect to="/signin" />
  //                 }
  //             }
  //         )
  // }

  return (
    <div>
      <userContext.Provider value={[user, setUser]}>
        <loadingContext.Provider value={[loading, setLoading]}>
          <validationContext.Provider
            value={[general_validation, setGeneralValidation]}
          >
            {children}
          </validationContext.Provider>
        </loadingContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default Store;
