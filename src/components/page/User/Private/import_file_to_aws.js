import React from 'react'
import axios from 'axios'
import { userContext } from '../../../../Store'

function ImportFileAws(props) {
    const [user, setUser] = React.useContext(userContext);
    console.log(user);
    const [files, setFiles] = React.useState({})
    const onChangeFile = (e) => {
        setFiles(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formdata = new FormData();
        formdata.append('file', files);
        formdata.append('email', user.email)
        formdata.append('mauser', user.mauser)
        formdata.append('folder_name', user.mauser + '_privatefiles/');

        props.handleUpload(formdata);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={onChangeFile} />
            <button className="btn btn-primary">Submit</button>
        </form>
    )
}

export default ImportFileAws
