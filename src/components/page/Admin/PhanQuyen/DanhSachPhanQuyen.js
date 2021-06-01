import React from 'react'
import PropTypes from 'prop-types'
import UserRoleCard from './UserRoleCard';
import Navbar from './Navbar';
import ClipLoader from "react-spinners/ClipLoader";

DanhSachPhanQuyen.propTypes = {
    users_roles: PropTypes.array,
}

DanhSachPhanQuyen.defaultProps = {
    users_roles: [],
}

function DanhSachPhanQuyen(props) {
    const isMountedVal = React.useRef(1);
    // const setUsers = props.users;
    // const setRoles = props.roles
    // const [users, setUsers] = React.useState([]);
    // const [roles, setRoles] = React.useState([]);

    // const get_users = async () => {
    //     const result = await api.get('/get-users');
    //     if (result.data.status === true) {
    //         setUsers(result.data.users);
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
    //     updateState(get_users);
    //     updateState(get_roles);

    //     isMountedVal.current = 0;

    //     return () => {
    //         isMountedVal.current = 0;
    //         setUsers([])
    //         setRoles([])
    //     }
    // }, [isMountedVal])

    const handleDelete = (id) => {
        props.remove(id);
    }

    const render_danhsach = props.users_roles.map((item, index) => {
        return (
            <UserRoleCard item={item} handleDelete={handleDelete} key={index.toString()} />
        )
    })

    return (
        <div>
            {props.users_roles.length !== 0 ? 
            <div>
            {/* <Navbar /> */}
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Vai trò</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {render_danhsach}
                </tbody>
            </table>
            </div> : <ClipLoader />}
        </div> 
    )
}

export default DanhSachPhanQuyen

