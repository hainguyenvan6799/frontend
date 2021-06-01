import React from 'react'
import FileDetail from './FileDetail'
import ImportFileAws from './import_file_to_aws';

function FilesManagement(props) {
    const deletefile = (filename) => {
        props.handleDelete(filename);
    }

    const handleUpload = (formdata) => {
        props.handleUploadFile(formdata);
    }

    return (
        <div className="row">
      {props.files ? (
        props.files.length !== 0 ? (
          <div className="col-md-6">
            <h2>Thực hiện hiển thị danh sách file, đường dẫn file</h2>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Download</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {props.files.map((file, index) => {
                  return (
                    <FileDetail
                      {...props}
                      key={index}
                      file={file}
                      index={index}
                      delete={deletefile}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <h5>Hiện tại người dùng chưa có tệp nào</h5>
        )
      ) : (
        <h5>...Loading...</h5>
      )}

      <div className="col-md-6">
        <h2 className="text-center">Tải tệp riêng tư lên tại đây</h2>
        <ImportFileAws {...props} handleUpload={handleUpload} />
      </div>
    </div>
    )
}

export default FilesManagement
