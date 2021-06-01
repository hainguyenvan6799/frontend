import React from 'react'
import { buttonStyle } from '../../Admin/AdminOnly';
import FileViewer from 'react-file-viewer';

function FileDetail(props) {
    const handleDelete = (filename) => {
        props.delete(filename)
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td><a href={props.file.fileurl}>{props.file.filename}</a></td>
            <td><button style={buttonStyle} onClick={() => handleDelete(props.file.filename)}>Delete</button></td>
        </tr>
    )
}

export default FileDetail
