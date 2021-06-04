import axios from "axios";
import React from "react";

function DanhSachBinhLuan(props) {
  const { machude } = props;
  var isMounted = true;
  const [comments, setComments] = React.useState([]);

  const get_username = (arr, checkMauser) => {
    const user = arr.find(({ mauser }) => mauser === checkMauser);
    return user.name;
  };

  React.useEffect(() => {
    const get_comments = async () => {
      console.log(machude);
      const data = {
        machude,
      };
      const response = await axios.post("/api/xem-binh-luan", data);
      console.log(response);
      if (response.data.status) {
        const users = response.data.users;
        if (isMounted) {
          const newData = response.data.comments.map((item) => {
            item.username = get_username(users, item.mauser);
            return item;
          });
          setComments(newData);
        }
      }
    };
    get_comments();
    return () => {
      isMounted = false;
      setComments([]);
    };
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Nội dung</th>
          <th>File(nếu có)</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.username}</td>
              <td>{item.noidungbinhluan}</td>
              <td>
                {item.urls.map((url) => {
                  return (
                    <>
                      <a href={url.fileurl}>{url.filename}</a>
                      <br />
                    </>
                  );
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DanhSachBinhLuan;
