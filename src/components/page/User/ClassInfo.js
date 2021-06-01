import axios from 'axios';
import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";


function ClassInfo(props) {
    const [privateInfo, setPrivateInfo] = props.private_info;

    const [loading, setLoading] = React.useState(false);

    const fetchUrl = `/api/get-private-info/${props.mauser}/${props.magiaovien}`;
    React.useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const response = await axios.get(fetchUrl);
            console.log(response)
            const { class_info, giaovien_info, private_files_of_user } = await response.data;
            const { tenlop, nienkhoa, malop } = class_info;
            const { tengiangvien, sodienthoai, email } = giaovien_info;
            // const { files } = await response.data;
            props.setFiles(private_files_of_user);
            setPrivateInfo({ tenlop, nienkhoa, malop, tengiangvien, sodienthoai, emailgiaovien: email });
            setLoading(false);
            return response;
        }

        fetchData();


        return () => {
            props.setFiles([])
            setLoading(false)
            setPrivateInfo({})

        }

    }, [fetchUrl])

    return (
        loading ? <ClipLoader/> :
        <div className="card">
            <div className="card-block">
                <h2 className="card-header text-center">Thông tin lớp học</h2>
                <br />

                <hr />
                <div className="row justify-content-md-center">
                    <table className="col-xl-8 col-sm-4" style={{border: '1px solid black'}}>
                        <tbody>
                            <tr>
                                <td style={{ width: "30%" }}><b>Lớp:</b> {privateInfo.tenlop}</td>
                                <td style={{ width: "30%" }}><b>Chủ Nhiệm:</b> {privateInfo.tengiangvien}</td>
                            </tr>
                            <tr>
                                <td><b>Niên khóa:</b> {privateInfo.nienkhoa}</td>
                                <td><b>Số điện thoại:</b> {privateInfo.sodienthoai}</td>
                            </tr><tr>
                                <td><b>Số sinh viên:</b> {props.mauser}</td>
                                <td><b>Email:</b> {privateInfo.emailgiaovien}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ClassInfo
