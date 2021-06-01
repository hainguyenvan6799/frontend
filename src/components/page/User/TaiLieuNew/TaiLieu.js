import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { buttonStyle } from "../../Admin/AdminOnly";

function TaiLieuCard({ tailieu, accessRights, userlogin }) {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await axios.delete(`/api/xoa-tai-lieu/${id}`);
  };

  return (
    <div>
      {tailieu.length !== 0 ? (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên tài liệu</th>
                <th>Tên file</th>
                <th>Download</th>
                <th>Người đăng</th>
                {accessRights.allowUpdate || accessRights.allowDelete ? (
                  <th>Hành động</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {tailieu.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.tentailieu}</td>
                    <td>{item.file}</td>
                    <td>
                      <a href={item.url}>{item.file}</a>
                    </td>
                    <td>{item.username}</td>
                    <td>
                      {accessRights.allowUpdate ||
                      item.mauser === userlogin.mauser ? (
                        <Link
                          to={{
                            pathname: `/chinh-sua-tai-lieu`,
                            state: { item: item, userlogin: userlogin },
                          }}
                        >
                          Edit
                        </Link>
                      ) : null}

                      {accessRights.allowDelete ? (
                        <button
                          style={buttonStyle}
                          onClick={(e) => handleDelete(e, item._id)}
                        >
                          Delete
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

export default TaiLieuCard;
