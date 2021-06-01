import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import api from '../../role_api';
import ThemTaiNguyen from './ThemTaiNguyen';
import ChinhSuaTaiNguyen from './ChinhSuaTaiNguyen';
import DanhSachTaiNguyen from './DanhSachTaiNguyen';
import NavBar from './NavBar';

function TaiNguyen() {
    const isMountedVal = React.useRef(1);
    const history = useHistory();

    const [resources, setResources] = React.useState([]);

    const get_resources = async () => {
        const result = await api.get('/get-resources');
        if (result.data.status === true) {
            setResources([...result.data.resources]);
        }
    }

    const updateState = (callback) => {
        if (isMountedVal.current === 1) {
            callback();
        }
    }

    const create = async (resource) => {
        const result = await api.post('/add-resource', resource);
        if(result.data.status === true)
        {
            const new_resource = result.data.resource;
            setResources([...resources, {
                resource_id: new_resource.resource_id,
                resource_name: new_resource.resource_name,
            }]);
            alert("Thêm tài nguyên thành công.")
        }
        else
        {
            alert(result.data.message);
            history.push('/admin/resources')
        }
    }

    const remove = async (id) => {
        const result = await api.delete(`/delete-resource/${id}`);
        if(result.data.status === true)
        {
            setResources(
                resources.filter( resource => resource.resource_id !== id)
            )
        }
        else
        {
            alert(result.data.message);
        }
        // axios delete

        // const new_data = users_roles.filter(item => item.id !== id);;
        // setUsersRoles(new_data);
    }

    const update = async (item) => {
        const { resource_id } = item;
        const result = await api.put(`/update-resource/${resource_id}`, item);
        if(result.data.status === true)
        {
            const edited_resource = result.data.resource;
            setResources(
                resources.map( resource => resource.resource_id !== resource_id ? resource : edited_resource)
            )
        }
        else
        {
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
        updateState(get_resources);

        isMountedVal.current = 0;

        return () => {
            isMountedVal.current = 0;
        }
    }, [isMountedVal])

    return (
        <div>

            <Router>
                <NavBar/>
                <Switch>

                    <Route exact path="/admin/resources" render={(props) => <DanhSachTaiNguyen {...props} resources={resources} remove={remove} />} />

                    <Route path="/admin/add-resource" render={(props) => (
                        <ThemTaiNguyen {...props} handleCreate={create} />
                    )} />

                    <Route
                        path="/admin/edit-resource"
                        render={(props) => (
                            <ChinhSuaTaiNguyen
                                {...props}
                                handleUpdate={update}
                            />
                        )}
                    />

                </Switch>
            </Router>
        </div>
    )
}

export default TaiNguyen
