import React from 'react'
import { Link } from 'react-router-dom';
import { buttonStyle } from '../AdminOnly';

function RoleResourceCard(props) {
    const { item, handleDelete } = props;
    return (
        <tr>
            <td>{item.resource_name}</td>
            <td>{item.role_name}</td>
            <td>{item.can_read ? "Yes" : "No"}</td>
            <td>{item.can_add ? "Yes" : "No"}</td>
            <td>{item.can_update ? "Yes" : "No"}</td>
            <td>{item.can_delete ? "Yes" : "No"}</td>

            <td>
                {/* <button style={buttonStyle} onClick={() => handleEdit(item.mauser)} value={JSON.stringify(item)}>Edit</button>/ */}
                <Link to={{ pathname: `/admin/edit-roles-resources`, state: { item: item } }}>Edit</Link>
                <button style={buttonStyle} onClick={() => handleDelete(item._id)}>Delete</button>
            </td>
        </tr>
    )
}

export default RoleResourceCard
