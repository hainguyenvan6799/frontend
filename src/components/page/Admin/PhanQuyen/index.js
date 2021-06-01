import React from 'react'
import DanhSachPhanQuyen from './DanhSachPhanQuyen'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ThemVaiTroNguoiDung from './ThemVaiTroNguoiDung';
// import ChinhSuaNguoiDung from '../Users/ChinhSuaNguoiDung';
import ChinhSuaPhanQuyen from './ChinhSuaPhanQuyen';
import api from '../../role_api';

function PhanQuyen() {
    const isMountedVal = React.useRef(1);

    const [users_roles, setUsersRoles] = React.useState([]);
    const [users, setUsers] = React.useState([])
    const [roles, setRoles] = React.useState([])

    const get_role_name = (arr, checkRoleID) => {
        const role = arr.find(({ role_id }) => role_id === checkRoleID);
        return role.role_name;
    }

    const get_user_name = (arr, checkMauser) => {
        const user = arr.find(({ mauser }) => mauser === checkMauser);
        return user.name;
    }

    const get_roles_users = async () => {
        const response = await axios.get('/api/get-all-users-roles');
        if (response.data.status === true) {
            const users_roles = response.data.data;
            const roles = response.data.roles;
            const users = response.data.users;

            const newdata = users_roles.map(item => {
                item.role = get_role_name(roles, item.role_id);
                item.name = get_user_name(users, item.mauser);

                return item;
            });
            setUsersRoles(newdata)
            setUsers([...users]);
            setRoles([...roles]);
        }
    }

    const updateState = (callback) => {
        if (isMountedVal.current === 1) {
            callback();
        }
    }

    const create = async (item) => {
        const result = await api.post('/add-user-role', item);
        if (result.data.status === true) {
            console.log(result.data.data);
        }
        else {
            alert(result.data.message);
        }
    }

    const remove = async (id) => {
        // axios delete
        console.log(id)
        // const new_data = users_roles.filter(item => item.id !== id);;
        // setUsersRoles(new_data);
    }

    const update = async (item) => {
        const response = {}; //lấy dữ liệu trả về sau khi edit
        const { mauser } = response.data;;
        const new_data = users_roles.map((item) => {
            return item.mauser !== mauser ? item : { ...response.data }
        })
        setUsersRoles(new_data);

    }

    React.useEffect(() => {
        updateState(get_roles_users);

        isMountedVal.current = 0;

        return () => {
            isMountedVal.current = 0;
        }
    }, [isMountedVal])

    return (
        <div>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/users-roles'>Danh sách</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/add-users-roles'>Thêm phân quyền</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Switch>

                    <Route exact path="/admin/users-roles">
                        <DanhSachPhanQuyen users_roles={users_roles} remove={remove} />
                    </Route>

                    <Route exact path="/admin/add-users-roles" render={(props) => <ThemVaiTroNguoiDung {...props} users={users} roles={roles} create={create} />} />

                    <Route
                        path="/admin/edit-users-roles"
                        render={(props) => (
                            <ChinhSuaPhanQuyen
                                {...props}
                                update={update}
                            />
                        )}
                    />

                </Switch>
            </Router>
        </div>
    )
}

export default PhanQuyen
