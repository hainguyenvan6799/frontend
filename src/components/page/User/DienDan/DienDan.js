import React from 'react'
import { Link } from 'react-router-dom'
import { buttonStyle } from '../../Admin/AdminOnly'

function DienDan(props) {
    const { accessRights, userlogin } = props;

    const handleDelete = (id, type) => {
        if (accessRights.allowDelete === true) {
            props.handleDelete(id, type)
        }
        else {
            alert("Bạn không có quyền xóa.");
        }
    }

    return (

        <tr>
            <td>{props.index + 1}</td>
            <td><Link to={{ pathname: `/forum/xem`, state: {item: props.item, userlogin: props.userlogin, machude: props.item.machude} }}>{props.item.mota}</Link></td>
            <td>{props.item.noidung}</td>
            {/* <td>{props.item.username}</td> */}
            <td>{props.getUserNameOfUser(props.item.mauser)}</td>
            <td>
                {
                    accessRights.allowUpdate === true || props.item.mauser === userlogin.mauser ?
                        props.item.mauser === userlogin.mauser ?
                            <Link to={{ pathname: `/forum/edit-topic`, state: { item: props.item, userlogin: props.userlogin } }}>Edit</Link>
                            : null
                        : null
                }

                {accessRights.allowDelete ?
                        <button style={buttonStyle}
                            onClick={() => handleDelete(props.item._id, "offical")}
                        >Delete</button>
                : null} 


            </td>
            {/* <td>
                {props.accessRights.allowUpdate && ((props.item.mauser === props.userlogin.mauser) || (props.userlogin.group === "gv")) ? 
                    <Link to={{ pathname: `/chinh-sua-tai-lieu`, state: { item: props.item, userlogin: props.userlogin  } }}>Edit</Link> : null }
                
                {props.accessRights.allowDelete ? 
                    <button style={buttonStyle}
                    onClick={() => handleDelete(props.item._id, "offical")}
                    >Delete</button> : null }
            </td> */}
        </tr>


    )
}

export default DienDan
