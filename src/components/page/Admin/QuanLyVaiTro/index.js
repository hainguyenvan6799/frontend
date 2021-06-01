import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import api from '../../role_api';
import ThemVaiTro from './ThemVaiTro';
import ChinhSuaVaiTro from './ChinhSuaVaiTro';
import DanhSachVaiTro from './DanhSachVaiTro';
import NavBar from './NavBar';
import Header from '../../../basic_components/Header';
import Footer from '../../../basic_components/Footer';

function VaiTro() {
    const isMountedVal = React.useRef(1);
    const history = useHistory();

    const [roles, setRoles] = React.useState([]);

    const get_roles = async () => {
        const result = await api.get('/get-roles');
        if (result.data.status === true) {
            setRoles([...result.data.roles]);
        }
    }

    const updateState = (callback) => {
        if (isMountedVal.current === 1) {
            callback();
        }
    }

    const create = async (role) => {
        const result = await api.post('/add-role', role);
        if (result.data.status === true) {
            const new_role = result.data.role;
            setRoles([...roles, {
                role_id: new_role.role_id,
                role_name: new_role.role_name,
                active: new_role.active,
            }]);
            alert("Thêm vai trò thành công.")
        }
        else {
            alert(result.data.message);
            history.push('/admin/roles')
        }
    }

    const remove = async (id) => {
        const result = await api.delete(`/delete-role/${id}`);
        if (result.data.status === true) {
            setRoles(
                roles.filter(role => role.role_id !== id)
            )
        }
        else {
            alert(result.data.message);
        }
        // axios delete

        // const new_data = users_roles.filter(item => item.id !== id);;
        // setUsersRoles(new_data);
    }

    const update = async (item) => {
        const { role_id } = item;
        const result = await api.put(`/update-role/${role_id}`, item);
        if (result.data.status === true) {
            const edited_role = result.data.role;
            setRoles(
                roles.map(role => role.role_id !== role_id ? role : edited_role)
            )
        }
        else {
            alert(result.data.message);
        }
        // const response = {}; //lấy dữ liệu trả về sau khi edit
        // const { mauser } = response.data;;
        // const new_data = users_roles.map((item) => {
        //     return item.mauser !== mauser ? item : { ...response.data }
        // })
        // setUsersRoles(new_data);

    }

    React.useEffect(() => {
        updateState(get_roles);

        isMountedVal.current = 0;

        return () => {
            isMountedVal.current = 0;
        }
    }, [isMountedVal])

    return (
        <div>
            <Router>
                <NavBar />
                <Switch>

                    <Route path="/admin/roles" render={(props) => <DanhSachVaiTro {...props} roles={roles} remove={remove} />} />

                    <Route exact path="/admin/add-roles" render={(props) => (
                        <ThemVaiTro {...props} handleCreate={create} />
                    )} />

                    <Route
                        path="/admin/edit-roles"
                        render={(props) => (
                            <ChinhSuaVaiTro
                                {...props}
                                handleUpdate={update}
                            />
                        )}
                    />

                </Switch>
            </Router>
            {/* </div>
            </div>
            </div>
            <Footer /> */}
        </div>
    )
}

export default VaiTro
