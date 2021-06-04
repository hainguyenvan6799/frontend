import React from 'react'
import axios from 'axios'
import { userContext } from '../../../../Store'

function ImportFileAws(props) {
    const [user, setUser] = React.useContext(userContext);
    console.log(user);
    const [files, setFiles] = React.useState({})
    const onChangeFile = (e) => {
        setFiles(e.target.files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formdata = new FormData();
        if (files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            formdata.append("files[" + i + "]", files[i]);
          }
        }
        formdata.append('email', user.email)
        formdata.append('mauser', user.mauser)
        formdata.append('folder_name', user.mauser + '_privatefiles/');

        props.handleUpload(formdata);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={onChangeFile} multiple />
            <button className="btn btn-primary">Submit</button>
        </form>
    )
}

export default ImportFileAws
