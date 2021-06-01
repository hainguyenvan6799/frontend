import React from 'react'
import PropTypes from 'prop-types'
import TaiNguyenCard from './TheTaiNguyen';
import ClipLoader from "react-spinners/ClipLoader";

DanhSachTaiNguyen.propTypes = {
    resources: PropTypes.array,
}

DanhSachTaiNguyen.defaultProps = {
    resources: [],
}

function DanhSachTaiNguyen(props) {

    const handleDelete = (id) => {
        props.remove(id);
    }

    const render_danhsach = props.resources.map((item, index) => {
        return (
            <TaiNguyenCard item={item} handleDelete={handleDelete} key={index.toString()} />
        )
})

return (
    props.resources.length !== 0 ?
    <table className="table table-striped">
        <thead>
                <tr>
                    <th>Tên vai trò</th>
                </tr>
            </thead>
        <tbody>
            {render_danhsach}
        </tbody>
    </table> : <ClipLoader/>
)
}

export default DanhSachTaiNguyen

