import axios from "axios";
import React from "react";
import { buttonStyle } from "../../Admin/AdminOnly";

function TaiLieuPendingCard({
  tailieu,
  tailieuPending,
  accessRights,
  userlogin,
}) {
  const handleDeleteTaiLieuPending = async (id) => {
    const response = await axios.delete(`/api/xoa-tai-lieu/${id}`);
  };

  const handleApprove = async (id) => {
    const data = {
      id: id,
    };
    const response = await axios.post("/api/chap-nhan-tai-lieu", data);
  };

  return (
    <div>
      {tailieuPending.length !== 0 ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên tài liệu</th>
                <th>Tên file</th>
                <th>Trạng thái</th>
                {accessRights.allowUpdate || accessRights.allowDelete ? (
                  <th>Hành động</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {tailieuPending.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.tentailieu}</td>
                    <td>{item.file}</td>
                    <td>Chờ chấp nhận</td>
                    <td>
                      {accessRights.allowDelete ||
                      item.mauser === userlogin.mauser ? (
                        <button
                          style={buttonStyle}
                          onClick={() => handleDeleteTaiLieuPending(item._id)}
                        >
                          Delete
                        </button>
                      ) : null}

                      {accessRights.allowUpdate ? (
                        <button
                          style={buttonStyle}
                          onClick={() => handleApprove(item._id)}
                        >
                          Approve
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <h5>Hiện tại chưa có tệp</h5>
      )}
    </div>
  );
}

export default TaiLieuPendingCard;
