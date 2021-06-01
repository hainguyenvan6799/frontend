import React from 'react'
import { buttonStyle } from '../../Admin/AdminOnly';

function TaiLieuPending(props) {

    const handleDelete = (id, pending) => {
        if(props.accessRights.allowDelete || ((props.item.mauser === props.userlogin.mauser)))
        {
            props.handleDelete(id, pending);
        }
        else
        {
            alert("Bạn không có quyền xóa.");
        }
        
    }

    const handleApprove = (id) => {
        if(props.accessRights.allowUpdate)
        {
            props.handleApprove(id);
        }
        else
        {
            alert("Bạn không có quyền duyệt tài liệu.");
        }
    }
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.tentailieu}</td>
            <td>{props.item.file}</td>
            <td>{props.item.username}</td>
            <td>Chờ chấp nhận</td>
            <td>
                <button style={buttonStyle}
                    onClick={() => handleDelete(props.item._id, "pending")}
                >Delete</button>

                <button style={buttonStyle}
                    onClick={() => handleApprove(props.item._id)}
                >Approve</button>

            </td>
        </tr>
    )
}

export default TaiLieuPending
