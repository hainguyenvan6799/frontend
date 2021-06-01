import React from 'react'
import { Link } from 'react-router-dom';
import { buttonStyle } from '../AdminOnly';

function UserRoleCard(props) {
    const { item, handleDelete } = props;
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.role}</td>
            <td>
                {/* <button style={buttonStyle} onClick={() => handleEdit(item.mauser)} value={JSON.stringify(item)}>Edit</button>/ */}
                <Link to={{ pathname: `/admin/edit-users-roles`, state: { item: item } }}>Edit</Link>
                <button style={buttonStyle} onClick={() => handleDelete(item._id)}>Delete</button>
            </td>
        </tr>
    )
}

export default UserRoleCard
