const danhsachsinhvien = () => {
    return (
        <div>
            <div id="page" className="container-fluid mt-0">
                <div id="page-content" className="row">
                    <div id="region-main-box" className="col-12">
                        <section id="region-main" className="col-12">
                            <span className="notifications" id="user-notifications"></span>
                            <div role="main"><span id="maincontent"></span><div className="my-1 my-sm-5"></div>
                                <div className="row justify-content-center">

                                    <div className="col-xl-12 col-sm-8 ">
                                        <div className="card">
                                            <div className="card-block">
                                                <h2 className="card-header text-center">Thông tin lớp học</h2>
                                                <br />
                                                <div className="row justify-content-md-center">
                                                    <table className="col-xl-8 col-sm-4">
                                                        <tr>
                                                            <td style={{width: "30%"}}><b>Lớp:</b> DHHTTT13B</td>
                                                            <td style={{width: "30%"}}><b>Chủ Nhiệm:</b> Th.S Nguyễn Văn A</td>
                                                        </tr>
                                                        <tr>
                                                            <td><b>Niên khóa:</b> 2017-2021</td>
                                                            <td><b>Số điện thoại:</b> 0123456478</td>
                                                        </tr><tr>
                                                            <td><b>Số sinh viên:</b> 70</td>
                                                            <td><b>Email:</b> ngvana@gmail.com</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <br />
                                            </div>
                                        </div>
                                    </div>


                                </div></div>

                        </section>
                    </div>
                </div>
            </div>

            <div id="page-content" className="row pb-3">
                <div id="region-main-box" className="col-12">

                    <section id="region-main" >
                        <div className="region_main_settings_menu_proxy"></div>
                        <span className="notifications" id="user-notifications"></span>
                        <div role="main"><span id="maincontent"></span><h2>Danh sách sinh viên</h2><div>

                            <table
                                className="table table-hover table-striped discussion-list"
                                aria-label='Showing 8 of 8 discussions'
                                aria-describedby="discussion-table-description-605dd978bbd8f605dd9788f35719"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Stt</th>
                                        <th scope="col" className="p-l-0">Mã sinh viên</th>
                                        <th scope="col" className="author">Họ tên</th>
                                        <th scope="col" className="created">Số điện thoại</th>
                                        <th scope="col" className="created">Email</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="discussion ">
                                        <td className="pinned p-0 text-center align-middle">1</td>
                                        <td className="topic p-0 align-middle">
                                            {/* <a className="p-3 p-l-0 w-100 h-100 d-block" href="#">17055078</a> */}
                                            <button className="p-3 p-l-0 w-100 h-100 d-block">17055078</button>
                                        </td>
                                        <td className="author align-middle">
                                            <div className="d-flex flex-row">
                                                <div className="align-middle p-0">
                                                    <img alt="can not load img"
                                                        className="rounded-circle userpicture"
                                                        src="https://lms.iuh.edu.vn/theme/image.php/academi/core/1600662090/u/f1"
                                                    />
                                                </div>
                                                <div className="align-middle p-2">
                                                    Nguyễn Văn A
                                        </div>
                                            </div>
                                        </td>


                                        <td className="text-left align-middle">
                                            0904486898
                            </td>
                                        <td className="text-left align-middle">
                                            ngvana@gmail.com
                            </td>

                                    </tr>
                                    <tr className="discussion ">
                                        <td className="pinned p-0 text-center align-middle">2</td>
                                        <td className="topic p-0 align-middle">
                                            {/* <a className="p-3 p-l-0 w-100 h-100 d-block" href="#">17055078</a> */}
                                            <button className="p-3 p-l-0 w-100 h-100 d-block">17055078</button>
                                        </td>
                                        <td className="author align-middle">
                                            <div className="d-flex flex-row">
                                                <div className="align-middle p-0">
                                                    <img alt="can not load img"
                                                        className="rounded-circle userpicture"
                                                        src="https://lms.iuh.edu.vn/theme/image.php/academi/core/1600662090/u/f1"
                                                    />
                                                </div>
                                                <div className="align-middle p-2">
                                                    Nguyễn Văn B
                                        </div>
                                            </div>
                                        </td>


                                        <td className="text-left align-middle">
                                            0904486898
                            </td>
                                        <td className="text-left align-middle">
                                            ngvana@gmail.com
                            </td>

                                    </tr>
                                    <tr className="discussion ">
                                        <td className="pinned p-0 text-center align-middle">3</td>
                                        <td className="topic p-0 align-middle">
                                            {/* <a className="p-3 p-l-0 w-100 h-100 d-block" href="#">17055078</a> */}
                                            <button className="p-3 p-l-0 w-100 h-100 d-block">17055078</button>
                                        </td>
                                        <td className="author align-middle">
                                            <div className="d-flex flex-row">
                                                <div className="align-middle p-0">
                                                    <img alt="can not load img"
                                                        className="rounded-circle userpicture"
                                                        src="https://lms.iuh.edu.vn/theme/image.php/academi/core/1600662090/u/f1"
                                                    />
                                                </div>
                                                <div className="align-middle p-2">
                                                    Nguyễn Văn C
                                        </div>
                                            </div>
                                        </td>


                                        <td className="text-left align-middle">
                                            0904486898
                            </td>
                                        <td className="text-left align-middle">
                                            ngvana@gmail.com
                            </td>

                                    </tr>
                                </tbody>
                            </table>


                        </div></div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export { danhsachsinhvien }