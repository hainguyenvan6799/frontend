import React from 'react'
import PropTypes from 'prop-types'
import VaiTroCard from './TheVaiTro';
import ClipLoader from "react-spinners/ClipLoader";


DanhSachVaiTro.propTypes = {
    roles: PropTypes.array,
}

DanhSachVaiTro.defaultProps = {
    roles: [],
}

function DanhSachVaiTro(props) {

    const handleDelete = (id) => {
        props.remove(id);
    }

    const render_danhsach = props.roles.map((item, index) => {
        return (
            <VaiTroCard item={item} handleDelete={handleDelete} key={index.toString()} />
        )
})

return (
    props.roles.length !== 0 ? 
    <table className="table table-striped">
        <thead>
                <tr>
                    <th>Tên vai trò</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
        <tbody>
            {render_danhsach}
        </tbody>
    </table> : <ClipLoader />
)
}

export default DanhSachVaiTro

