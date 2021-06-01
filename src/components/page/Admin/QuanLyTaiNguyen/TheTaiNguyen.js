import React from 'react'
import { Link } from 'react-router-dom';
import { buttonStyle } from '../AdminOnly';

function TaiNguyenCard(props) {
    // thẻ vai trò
    const { item, handleDelete } = props;
    return (
        <tr>
            <th>{item.resource_name}</th>
            <td>
                <Link to={{ pathname: `/admin/edit-resource`, state: { item: item } }}>Edit</Link>
                <button style={buttonStyle} onClick={() => handleDelete(item.resource_id)}>Delete</button>
            </td>
        </tr>
    )
}

export default TaiNguyenCard
