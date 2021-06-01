import React from 'react'
import PropTypes from 'prop-types'

import Navbar from './Navbar';
import RoleResourceCard from './RoleResourceCard';
import ClipLoader from "react-spinners/ClipLoader";


DanhSach.propTypes = {
    roles_resources: PropTypes.array,
}

DanhSach.defaultProps = {
    roles_resources: [],
}

function DanhSach(props) {
    const isMountedVal = React.useRef(1);
    // const setResources = props.resources;
    // const setRoles = props.roles

    // const get_resources = async () => {
    //     const result = await api.get('/get-resources');
    //     if (result.data.status === true) {
    //         setResources(result.data.resources);
    //     }
    // }

    // const get_roles = async () => {
    //     const result = await api.get('/get-roles');
    //     if (result.data.status === true) {
    //         setRoles(result.data.roles);
    //     }
    // }

    // const updateState = (callback) => {
    //     if (isMountedVal.current === 1) {
    //         callback();
    //     }
    // }

    // React.useEffect(() => {
    //     console.log("Đang thực hiện");
    //     updateState(get_resources);
    //     updateState(get_roles);

    //     isMountedVal.current = 0;

    //     return () => {
    //         isMountedVal.current = 0;
    //         setResources([])
    //         setRoles([])
    //     }
    // }, [isMountedVal])

    const handleDelete = (id) => {
        props.remove(id);
    }

    const render_danhsach = props.roles_resources.map((item, index) => {
        return (
            <RoleResourceCard item={item} handleDelete={handleDelete} key={index.toString()} />
        )
    })

    return (

        props.roles_resources.length !== 0 ?
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Tên tài nguyên</th>
                            <th>Tên vai trò</th>
                            <th>Xem</th>
                            <th>Thêm</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {render_danhsach}
                    </tbody>
                </table>
            </div> : <ClipLoader />
    )
}

export default DanhSach

