import React, { useRef } from "react";
// import adddictional components
import { ChatEngine, PeopleSettings } from "react-chat-engine";
import PeopleSetting from "./PeopleSetting";

import {
  chat_projectid,
  giaimadulieu,
  private_key_chatroom,
} from "../security";

import { userContext } from "../../../Store";
import Header from "../../basic_components/Header";
import Footer from "../../basic_components/Footer";
var axios = require("axios");

require("dotenv").config();

function ThamGiaPhongChat(props) {
  const direct_chat_email = props.match.params.email;
  const [user] = React.useContext(userContext);
  const mountedRef = useRef(true);

  const email_encoded = localStorage.getItem("email");
  const password_encoded = localStorage.getItem("password");

  const email_decoded = giaimadulieu(email_encoded);
  const password_decoded = giaimadulieu(password_encoded);

  const [userIDChat, setUserIDChat] = React.useState(null);

  const get_user_id_chat = async () => {
    try {
      var config = {
        method: "get",
        url: "https://api.chatengine.io/users/",
        headers: {
          "PRIVATE-KEY": private_key_chatroom,
        },
      };

      const response = await axios(config);
      if (response.status === 200) {
        if (!mountedRef.current) return null;
        response.data.map((item) =>
          item.username === user.email ? setUserIDChat(item.id) : null
        );
      }
    } catch (err) {
      if (!mountedRef.current) return null;
      console.log("Something went wrong");
    }
  };

  const updateState = (callback) => {
    callback();
  };

  React.useEffect(() => {
    updateState(get_user_id_chat);

    return () => {
      mountedRef.current = false;
      setUserIDChat(null);
    };
  }, [user.email]);

  const connect_to_other = async (email) => {
    const config = {
      method: "put",
      url: "https://api.chatengine.io/chats/",
      headers: {
        "Project-ID": chat_projectid,
        "User-Name": email_decoded,
        "User-Secret": password_decoded,
      },
      data: {
        usernames: [email],
        is_direct_chat: true,
      },
    };

    const response = await axios(config);
    return response;
  };

  React.useEffect(() => {
    if (direct_chat_email !== undefined) {
      connect_to_other(direct_chat_email);
    }

    return () => {};
  }, []);

  return (
    <div>
      <Header />
      {user.name !== "" && userIDChat !== null ? (
        direct_chat_email === undefined ? (
          <ChatEngine
            height="100vh"
            // projectID={chatConfig["Project-ID"]}
            // userName={chatConfig["User-Name"]}
            // userSecret={chatConfig["User-Secret"]}
            projectID={chat_projectid}
            userName={email_decoded}
            userSecret={password_decoded}
            renderPeopleSettings={(creds, chat) => {
              if (chat) {
                  console.log(chat);
                  if (chat.admin.username !== user.email) {
                    return (
                      <PeopleSetting
                        creds={creds}
                        chat={chat}
                        user={user}
                        userIDChat={userIDChat}
                        username={email_decoded}
                        password={password_decoded}
                      />
                    );
                  } else {
                    return <PeopleSettings />;
                  }
                }
            }}
          />
        ) : (
          <ChatEngine
            height="100vh"
            // projectID={chatConfig["Project-ID"]}
            // userName={chatConfig["User-Name"]}
            // userSecret={chatConfig["User-Secret"]}
            projectID={chat_projectid}
            userName={email_decoded}
            userSecret={password_decoded}
          />
        )
      ) : (
        "... Loading ..."
      )}
      <Footer />
    </div>
  );
}

export default ThamGiaPhongChat;
