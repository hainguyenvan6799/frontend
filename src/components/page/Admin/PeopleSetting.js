import React from "react";
import { private_key_chatroom, chat_projectid } from "../security";

// import context
// import { userContext } from '../../../Store';
import MembersOfChat from "./MembersOfChat";
import AddMemberToChat from "./AddMemberToChat";
import UploadAvatar from "./UploadAvatar";

var axios = require("axios");

function PeopleSetting(props) {
  const [isEditUser, setIsEditUser] = React.useState(null);
  const [users_not_attend, setUsersNotAttend] = React.useState([]);
  const [searchResult, setSearchResult] = React.useState([]);
  const [imageUser, setImageUser] = React.useState({});
  const classname = props.chat.title;
  const person = props.chat.people;

  const check_edit_users = async () => {
    const url = `/api/check-edit-users/${props.username}/${classname}`;
    const result = await axios.get(url);
    const { status } = result.data;
    setIsEditUser(status);
    // console.log("đã thực hiện check_edit_user")
    if (props.username === "hainguyenvan6799.webdev@gmail.com") {
      setIsEditUser(true);
    }
  };

  const user_not_attend_room_chat = async () => {
    try {
      const url = `/api/get-users-in-specific-class/${classname}`;
      const response = await axios.get(url);

      if (response.data.status === true) {
        const { users } = await response.data;
        setUsersNotAttend((users_not_attend) => [
          ...users_not_attend,
          ...users,
        ]);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (props.chat.people.length > 2) {
      check_edit_users();
      user_not_attend_room_chat();
    }

    return () => {
      setIsEditUser(null);
      setUsersNotAttend([]);
      setSearchResult([]);
    };
  }, [props.chat.id]);

  const handleDelete = (e) => {
    e.preventDefault();
    const email_of_member = e.target.value;

    var data = JSON.stringify({
      username: email_of_member,
    });

    var config = {
      method: "put",
      url: `https://api.chatengine.io/chats/${props.chat.id}/people/\n`,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Project-ID": chat_projectid,
        // 'User-Name': 'hainguyenvan6799.webdev@gmail.com',
        // 'User-Secret': 'Hai123456',
        "User-Name": "hainguyenvan6799.webdev@gmail.com",
        "User-Secret": "Hai123456",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        axios
          .post("/api/remove-member-in-chat", {
            email: email_of_member,
          })
          .then((res) => {
            setUsersNotAttend((users_not_attend) => [
              ...users_not_attend,
              email_of_member,
            ]);
          })
          .catch((err) => {
            console.log(err);
          });
        // setSomethingChange(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleKeyUp = (e) => {
    const userInput = e.target.value;
    let emptyArray = [];
    if (userInput !== "") {
      emptyArray = users_not_attend.filter((data) => {
        return data.toLocaleLowerCase().indexOf(userInput) !== -1 ? data : "";
      });

      setSearchResult(emptyArray);
    } else {
      setSearchResult([]);
    }
  };

  const addMember = (e) => {
    e.preventDefault(users_not_attend);
    // console.log(e.target.value);

    var axios_chat = require("axios");
    var data = JSON.stringify({
      username: e.target.value,
    });

    var config = {
      method: "post",
      url: `https://api.chatengine.io/chats/${props.chat.id}/people/\n`,
      headers: {
        "Project-ID": chat_projectid,
        "User-Name": "hainguyenvan6799.webdev@gmail.com",
        "User-Secret": "Hai123456",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const data = {
          email: e.target.value,
          room_chat_id: props.chat.id,
        };
        axios
          .post("/api/update-room-chat-for-user", data)
          .then((res) => {
            const { message } = res.data;
            // console.log(message);
            if (message === "success") {
              let index = users_not_attend.indexOf(e.target.value);
              users_not_attend.splice(index, 1);
              setUsersNotAttend([...users_not_attend]);
              setSearchResult([]);
            } else {
              console.log(message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const check_file_extension = (file) => {
    const file_extension = file.name.split(".")[1];
    if (file_extension !== undefined) {
      if (file_extension !== "png" && file_extension !== "jpg") {
        return false;
      } else {
        return true;
      }
    }
    return false;
  };

  const changeImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!check_file_extension(file)) {
      alert("Bạn cần chọn file có định dạng .jpg hoặc .png");
    } else {
      setImageUser(e.target.files[0]);
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();
    if (imageUser.name !== undefined) {
      var data = new FormData();
      data.append("avatar", imageUser, imageUser.name);

      var config = {
        method: "patch",
        url: `https://api.chatengine.io/users/${props.userIDChat}/`,
        headers: {
          "PRIVATE-KEY": private_key_chatroom,
        },
        data: data,
      };
      axios(config)
        .then((res) => {
          alert("Thay đổi ảnh đại diện thành công, vui lòng tải lại trang.");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Bạn không được để trống file");
    }
  };

  // declare useContext
  return isEditUser !== null ? (
    <div>
      <MembersOfChat
        {...props}
        persons={person}
        isUserCanEdit={isEditUser}
        handleDelete={handleDelete}
      />

      <AddMemberToChat
        {...props}
        isUserCanEdit={isEditUser}
        searchResult={searchResult}
        handleKeyUp={handleKeyUp}
        addMember={addMember}
      />

      <UploadAvatar
        {...props}
        uploadImage={uploadImage}
        changeImage={changeImage}
      />
    </div>
  ) : props.chat.people.length > 2 ? (
    "...Loading..."
  ) : null;
}

export default PeopleSetting;
