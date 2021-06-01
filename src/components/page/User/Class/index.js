import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function DanhSachSinhVien(props) {
  const { userlogin } = props;
  var isMounted = true;
  const [students, setStudents] = React.useState([]);
  const [diem, setDiem] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const get_students_of_class = async () => {
    const data = {
      malop: userlogin.malop,
    };
    const response = await axios.post("/api/get-students-of-class", data);
    if (response.data.status) {
      return response.data.data;
    }
  };

  const xemdiem = async (mssv) => {
    const data = {
      masv: mssv,
    };
    const response = await axios.post("/api/xem-diem", data);
    if (response.data.status) {
      setDiem(response.data.data);
    }
  };

  React.useEffect(() => {
    const get_students = async () => {
      const result = await get_students_of_class();
      console.log(result);
      if (result) {
        if (isMounted) {
          setStudents([...result]);
          setLoading(false);
        }
      }
    };

    get_students();

    return () => {
      isMounted = false;
      setLoading(false);
    };
  }, []);

  console.log(students);
  return loading ? (
    <ClipLoader />
  ) : (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>MSSV</th>
            <th>Học tập</th>
            <th>Chat</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.sdt}</td>
              <td>{item.code}</td>
              <td>
                <button onClick={() => xemdiem(item.code)}>Xem</button>
              </td>
              <td>
                <a href={`/tham-gia-phong-chat/${item.email}`}>Chat</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {diem ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Điểm tích lũy hệ 4</th>
              <th>Điểm tích lũy hệ 10</th>
              <th>Tín chỉ tích lũy</th>
              <th>Tín chỉ tổng</th>
              <th>Xếp loại học tập</th>
              <th>Trung bình rèn luyện</th>
              <th>Xếp loại rèn luyện</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{diem.diemtichluy4}</td>
              <td>{diem.diemtichluy10}</td>
              <td>{diem.tinchitichluy}</td>
              <td>{diem.tinchitong}</td>
              <td>{diem.xeploai}</td>
              <td>{diem.tbrenluyen}</td>
              <td>{diem.xeploairenluyen}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        "Chưa có thông tin điểm"
      )}
    </div>
  );
}

export default DanhSachSinhVien;
