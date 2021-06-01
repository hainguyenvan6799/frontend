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

  console.log("comments", comments);
      
        return (
          <table>
              <thead>
                <tr>
                    <th>Tên</th>
                    <th>Nội dung</th>
                    <th>File(nếu có)</th>
                </tr>
              </thead>
              <tbody>
                {
                    comments.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.username}</td>
                                <td>{item.noidungbinhluan}</td>
                                <td>URL file nếu có</td>
                            </tr>
                        )
                    })
                }
              </tbody>
          </table>
        );
}

export default DanhSachBinhLuan;
