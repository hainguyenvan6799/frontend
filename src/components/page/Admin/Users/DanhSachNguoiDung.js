import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';


import {buttonStyle} from '../AdminOnly';

DanhSachNguoiDung.propTypes = {
    users: PropTypes.array,
    paginationInfo: PropTypes.object,
}

function DanhSachNguoiDung(props) {
    const { users, paginationInfo, handleClick, handleEdit, handleDelete, handlePageChange } = props;

    return (
        <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Trang chủ <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/add-user'>Thêm người dùng</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/import-users-using-file'>Thêm người dùng bằng file</Link>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Phân loại theo lớp
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {optionClasses.map((item, key) => {
                                        return <button name="followClass" onClick={handleClickEditCondition} className="dropdown-item" value={item.value}>{item.label}</button>
                                    })}
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Phân loại theo nhóm người dùng
        </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li> */}

                        </ul>
                    </div>
                </nav>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Mã người dùng</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Giới tính</th>
                            <th>Số điện thoại</th>
                            <th>Mã lớp</th>
                            <th>Mã phòng chat</th>
                            <th>Tình trạng cập nhật</th>
                            <th>Đã được kích hoạt bởi người dùng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, key) => (
                            <tr key={key}>
                                <th scope="row">{item.mauser}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.sex}</td>
                                <td>{item.sdt}</td>
                                <td>{item.malop !== undefined ? <button style={buttonStyle} value={item.malop} onClick={handleClick}>{item.malop}</button> : null}</td>
                                <td>{item.room_chat_id}</td>
                                <td>{item.is_updated_info === "1" ? "Đã cập nhật" : "Chưa cập nhật"}</td>
                                <td>{item.active === true ? "Đã kích hoạt" : "Chưa kích hoạt"}</td>
                                <td>
                                    {/* <button value={item.mauser} onClick={handleEdit}>Edit</button> */}
                                    {/* <Link to={`/admin/edit-user/${item.email}`}>Edit</Link> */}
                                    <button style={buttonStyle} onClick={handleEdit} value={JSON.stringify(item)}>Edit</button>/
                                    <button style={buttonStyle} value={item.mauser} onClick={handleDelete}>Delete</button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
                <div className='d-flex justify-content-center'>
                    <Pagination
                        activePage={paginationInfo.activePage}
                        itemsCountPerPage={paginationInfo.itemsCountPerPage}
                        totalItemsCount={paginationInfo.totalItemsCount}
                        pageRangeDisplayed={paginationInfo.pageRangeDisplayed}
                        onChange={handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            </div>
        
    )
}



export default DanhSachNguoiDung

