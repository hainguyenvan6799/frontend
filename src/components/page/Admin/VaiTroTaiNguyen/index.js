import React from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import { history } from '../AdminOnly';

import api from '../../role_api';
import DanhSach from './DanhSach';
import Them from './Them';
import ChinhSua from './ChinhSua';
import Navbar from './Navbar';

function VaiTroTaiNguyen() {
    const isMountedVal = React.useRef(1);

    const [roles_resources, setRolesResources] = React.useState([]);
    const [resources, setResources] = React.useState([])
    const [roles, setRoles] = React.useState([])

    const get_role_name = (arr, checkRoleID) => {
        const role = arr.find(({ role_id }) => role_id === checkRoleID);
        return role.role_name;
    }

    const get_resource_name = (arr, checkResourceID) => {
        const resource = arr.find(({ resource_id }) => resource_id === checkResourceID);
        return resource.resource_name;
    }

    const get_roles_resources = async () => {
        const response = await axios.get('/api/get-all-roles-resources');
        if (response.data.status === true) {

            const roles_resources = response.data.data;
            const roles = response.data.roles;
            const resources = response.data.resources;

            const newdata = roles_resources.map(item => {
                item.role_name = get_role_name(roles, item.role_id);
                item.resource_name = get_resource_name(resources, item.resource_id);

                return item;
            });
            setRolesResources(newdata)
            setResources([...resources])
            setRoles([...roles]);
            // console.log(result.data.data)
            // setRolesResources([...result.data.data]);
            // setUsers([...result.data.users]);
            // setRoles([...result.data.roles]);
        }
    }

    const updateState = (callback) => {
        if (isMountedVal.current === 1) {
            callback();
        }
    }

    const create = async (item) => {
        const result = await api.post('/add-role-resource', item);
        if (result.data.status === true) {
            alert(result.data.message)
        }
        else {
            alert(result.data.message);
        }
        history.push('/admin/roles-resources')
    }

    const remove = async (id) => {
        // axios delete
        const result = await api.delete(`/delete-role-resource/${id}`);

        if (result.data.status) {
            const new_data = roles_resources.filter(item => item._id !== id);;
            setRolesResources(new_data);
        }
        else {
            alert(result.data.message)
        }
        console.log(id)

    }

    const update = async (item) => {
        // const response = {}; //lấy dữ liệu trả về sau khi edit
        // const { mauser } = response.data;;
        // const new_data = users_roles.map((item) => {
        //     return item.mauser !== mauser ? item : { ...response.data }
        // })
        // setUsersRoles(new_data);

    }

    React.useEffect(() => {
        updateState(get_roles_resources);

        isMountedVal.current = 0;

        return () => {
            isMountedVal.current = 0;
        }
    }, [isMountedVal])

    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/admin/roles-resources">
                        <DanhSach roles_resources={roles_resources} remove={remove}
                        // resources={setResources}
                        // roles={setRoles}
                        />
                    </Route>

                    <Route exact path="/admin/add-roles-resources"
                        render={(props) => <Them {...props}
                            resources={resources}
                            roles={roles}
                            create={create}
                        />} />

                    <Route
                        path="/admin/edit-roles-resources"
                        render={(props) => (
                            <ChinhSua
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

export default VaiTroTaiNguyen
