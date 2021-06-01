import React from 'react'
import { Link } from 'react-router-dom';
import { buttonStyle } from '../AdminOnly';

function VaiTroCard(props) {
    // thẻ vai trò
    const { item, handleDelete } = props;
    return (
        <tr>
            <th>{item.role_name}</th>
            <td>{item.active ? "Hoạt động" : "Không hoạt động"}</td>
            <td>
                <Link to={{ pathname: `/admin/edit-roles`, state: { item: item } }}>Edit</Link>
                <button style={buttonStyle} onClick={() => handleDelete(item.role_id)}>Delete</button>
            </td>
        </tr>
    )
}

export default VaiTroCard
