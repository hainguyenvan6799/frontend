import React from 'react'
import { Link } from 'react-router-dom'
import { buttonStyle } from '../../Admin/AdminOnly'

function TaiLieu(props) {
    const handleDelete = (id, offical) => {
        props.handleDelete(id, offical);
    }
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.tentailieu}</td>
            <td>{props.item.file}</td>
            <td><a href={props.item.url}>{props.item.file}</a></td>
            <td>{props.item.username}</td>
            {/* <td><a href={props.file.fileurl}>{props.file.filename}</a></td> */}
            <td>
                {props.accessRights.allowUpdate || ((props.item.mauser === props.userlogin.mauser)) ? 
                    <Link to={{ pathname: `/chinh-sua-tai-lieu`, state: { item: props.item, userlogin: props.userlogin  } }}>Edit</Link> : null }
                
                {props.accessRights.allowDelete ? 
                    <button style={buttonStyle}
                    onClick={() => handleDelete(props.item._id, "offical")}
                    >Delete</button> 
                    : null }
            </td>
        </tr>
    )
}

export default TaiLieu
