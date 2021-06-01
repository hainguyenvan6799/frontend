import React from 'react'
import { Link } from 'react-router-dom'
import { buttonStyle } from '../../Admin/AdminOnly'

function DienDanPending(props) {
    const { userlogin, accessRights } = props;

    const handleDelete = (id, pending, mauser) => {
        if(accessRights.allowDelete === true || mauser === userlogin.mauser)
        {
            props.handleDelete(id, pending);
        }
        else
        {
            alert("Bạn không có quyền xóa.");
        }
    }

    const handleApprove = (id) => {
        if(accessRights.allowUpdate === true)
        {
            props.handleApprove(id);
        }
        else
        {
            alert("Bạn không có quyền được chỉnh sửa.");
        }
    
    }

    return (

        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.mota}</td>
            <td>{props.item.noidung}</td>
            {/* <td>{props.item.username}</td> */}
            <td>{props.getUserNameOfUser(props.item.mauser)}</td>
            <td>Chờ duyệt</td>
            <td>


                <button style={buttonStyle}
                    onClick={() => handleDelete(props.item._id, "pending", props.item.mauser)}
                >Delete</button>


                <button style={buttonStyle}
                    onClick={() => handleApprove(props.item._id)}
                >Approve</button>

            </td>
        </tr>

    )
}

export default DienDanPending
