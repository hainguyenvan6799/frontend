import React from 'react'
import autocomplete from 'autocompleter';
import e from 'cors';
// import './autocomplete.css';

function Them(props) {
    // const [phanquyen, setPhanQuyen] = React.useState({
    //     'mauser': "",
    //     'role_id': "",
    // })
    const [resourceID, setResourceID] = React.useState("");
    const [roleID, setRoleID] = React.useState("");
    const [allow, setAllow] = React.useState({})

    React.useEffect(() => {
        const { roles, resources } = props;
        
        const datas1 = resources.map(item => {
            return {
                label: `${item.resource_name}`,
                value: item.resource_id,
            }

        })

        const datas2 = roles.map(item => {
            return {
                label: `${item.role_name}`,
                value: item.role_id,
            }
        })

        console.log(datas1)
        console.log(datas2)

        var input1 = document.getElementById('resource');
        var input2 = document.getElementById('role');

        autocomplete({
            input: input1,
            fetch: function (text, update) {
                text = text.toLowerCase();
                // you can also use AJAX requests instead of preloaded data
                var suggestions = datas1.filter(n => n.label.toLowerCase().includes(text))
                update(suggestions);
            },
            onSelect: function (item) {
                let test = input1.value = item.label;
                setResourceID(item.value)
            }
        });

        autocomplete({
            input: input2,
            fetch: function (text, update) {
                text = text.toLowerCase();
                // you can also use AJAX requests instead of preloaded data
                var suggestions = datas2.filter(n => n.label.toLowerCase().includes(text))
                update(suggestions);
            },
            onSelect: function (item) {
                let test = input2.value = item.label;
                setRoleID(item.value)
            }
        });
        return () => {

        }
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        if(roleID !== "" && resourceID !== "")
        {
            const data = {
                'resource_id': resourceID,
                'role_id': roleID,
                ...allow,
            }
            props.create(data);
        }
        else
        {
            alert("Tài nguyên hoặc vai trò bạn nhập không tồn tại trong hệ thống.");
        }
        
        // console.log(allow)
        // console.log(data)
    }

    const handleChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.checked);
        setAllow({
            ...allow,
            [event.target.name]: event.target.checked,
        })
    }

    return (
        <div>
            <form>
                <br />
                <div className="form-group">
                    <label htmlFor="resource" >Nhập tên tài nguyên</label>
                    <input type="text" id="resource" className="form-control" autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="role" >Nhập tên vai trò</label>
                    <input type="text" id="role" className="form-control" autoComplete="off" />
                </div>

                <div className="form-group row" style={{'paddingLeft': '250px'}}>
                    <div className="col-md-2">
                        <label htmlFor="allowReading" >Allow Reading</label>
                        <input type="checkbox" id="allowReading" value="can_read" className="form-control" name="can_read" onChange={handleChange} />
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="allowAdding" >Allow Adding</label>
                        <input type="checkbox" id="allowAdding" value="can_add" className="form-control" name="can_add" onChange={handleChange} />
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="allowUpdating" >Allow Updating</label>
                        <input type="checkbox" id="allowUpdating" value="can_update" className="form-control" name="can_update" onChange={handleChange} />
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="allowDeleting" >Allow Deleting</label>
                        <input type="checkbox" id="allowDeleting" value="can_delete" className="form-control" name="can_delete" onChange={handleChange} />
                    </div>
                </div>
                <button onClick={handleClick}>Nhấn</button>
            </form>
        </div>
    )
}

export default Them
