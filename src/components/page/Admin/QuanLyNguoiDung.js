import {useState, useContext} from 'react';
import BaseView from '../../basic_components/allview/base_view';
import { quanlynguoidung } from '../../basic_components/allview/admin/quanlynguoidung';

// import addictional components
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

// import context
import { loadingContext, userContext } from '../../../Store';

function QuanLyNguoiDung() {
    // declare useState
    const [ file, setFile ] = useState({})
    const [ error, setError ] = useState("");

    // declare context
    const [ loading ] = useContext(loadingContext)
    const [ user ] = useContext(userContext);

    const handleChange = (e) => {
        setFile({
            files: e.target.files,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(file.files)
        // console.log(file.file[0].name);
        const name_of_file = file.files[0].name;
        const file_extension = name_of_file.split('.')[1];
        console.log(file_extension)
        if(file_extension !== "xlsx")
        {
            setError("Bạn chỉ được nhập file Excel.");
        }
        else
        {
            let formData = new FormData();
            formData.append('file', file.files[0]);
            axios.post("/api/user_import", formData).then(response =>{
                // response.data.map(item => console.log(item.errorInfo[2]));
                // console.log(response.data);
                setError(response.data)
                
            }).catch(error => console.log(error))
        }
    }

    return (
        // truyền biến danh sách sinh viên vô để hiển thị
        loading ? <ClipLoader/> : user.name !== "" ? BaseView(quanlynguoidung(handleChange, handleSubmit, error)) : <ClipLoader/>
        
    )
}

export default QuanLyNguoiDung
