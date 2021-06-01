import React from 'react'

function UploadAvatar(props) {
    const {uploadImage, changeImage} = props;
    return (
        <div className="card">
            <div className="card-header">
                <a className="card-link" data-toggle="collapse" href="#collapseThree">
                    Upload Your avatar
                        </a>
            </div>

            <div id="collapseThree" className="collapse show" data-parent="#accordion">
                <div className="card-body">

                    <form onSubmit={uploadImage} encType="multipart/form-data">
                        <input type="file" name="file" onChange={changeImage} id="uploadImage" />
                        <button type="submit">Upload file</button>
                    </form>

                </div>
            </div>
        </div>

    )
}

export default UploadAvatar
