import React from 'react'
import PropTypes from 'prop-types'

DanhSachPhanQuyen.propTypes = {
    users_roles: PropTypes.array,
}

DanhSachPhanQuyen.defaultProps = {
    users_roles: [],
}

function DanhSachPhanQuyen(props) {
    const { users_roles } = props;
    console.log(users_roles)

    return (
        <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Mã user</th>
                            <th>Tên</th>
                            <th>Vai trò</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {users_roles.map((item, key) => (
                            <tr key={key}>
                                <th scope="row">{item.mauser}</th>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                                
                            </tr>
                        ))}


                    </tbody>
                </table>
    )
}

export default DanhSachPhanQuyen

