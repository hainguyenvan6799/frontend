import React from 'react'
import autocomplete from 'autocompleter';
import './autocomplete.css';

function ThemVaiTroNguoiDung(props) {
    // const [phanquyen, setPhanQuyen] = React.useState({
    //     'mauser': "",
    //     'role_id': "",
    // })
    const [mauser, setMaUser] = React.useState("");
    const [roleID, setRoleID] = React.useState("");

    React.useEffect(() => {
        const { users, roles } = props;

        const datas1 = users.map(item => {
            return {
                label: `${item.name} - ${item.code}`,
                value: item.mauser,
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

        var input1 = document.getElementById('nguoidung');
        var input2 = document.getElementById('role');

        autocomplete({
            input: input1,
            fetch: function (text, update) {
                text = text.toLowerCase();
                console.log(text)
                console.log("abc")
                // you can also use AJAX requests instead of preloaded data
                var suggestions = datas1.filter(n => n.label.toLowerCase().includes(text))
                update(suggestions);
            },
            onSelect: function (item) {
                let test = input1.value = item.label;
                setMaUser(item.value)
            }
        });

        autocomplete({
            input: input2,
            fetch: function (text, update) {
                text = text.toLowerCase();
                console.log(text)
                console.log("acb")
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
        const data = {
            'mauser': mauser,
            'role_id': roleID,
        }
        props.create(data);
    }

    return (
        <div>
            <form>
                <br />
                <div className="form-group">
                    <label htmlFor="nguoidung" >Nhập tên người dùng</label>
                    <input type="text" id="nguoidung" className="form-control" autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="role" >Nhập tên vai trò</label>
                    <input type="text" id="role" className="form-control" autoComplete="off"/>
                </div>
                <button onClick={handleClick}>Nhấn</button>
            </form>
        </div>
    )
}

export default ThemVaiTroNguoiDung
