const quanlylophoc = () => {
    return (
        <div>
            <div id="page" className="container-fluid mt-0">
                <div id="page-content" className="row">
                    <div id="region-main-box" className="col-12">
                        <section id="region-main" className="col-12">
                            <span className="notifications" id="user-notifications"></span>
                            <div role="main"><span id="maincontent"></span><div className="my-1 my-sm-5"></div>
                                <div className="row justify-content-center">
                                    <div className="col-xl-6 col-sm-8 ">
                                        <div className="card">
                                            <div className="card-block">
                                                <h2 className="card-header text-center">Thêm lớp học</h2>
                                                <div className="card-body">


                                                    <div className="row justify-content-md-center">
                                                        <div className="col-md-8">
                                                            <form className="mt-3" action="https://lms.iuh.edu.vn/login/index.php" method="post" id="login">
                                                                <div className="form-group">
                                                                    <label htmlFor="username" className="sr-only">Tên lớp</label>
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        placeholder="Tên lớp" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="password" className="sr-only">Niên khóa</label>
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        placeholder="Niên khóa" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="password" className="sr-only">Mã giáo viên chủ nhiệm</label>
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        placeholder="Mã giáo viên chủ nhiệm" />
                                                                </div>
                                                                <button type="submit" className="btn btn-primary btn-block mt-3" id="loginbtn">Thêm lớp mới</button>
                                                            </form>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>

                        </section>
                    </div>
                </div>
            </div>
            <br />
            <div id="page-content" className="row pb-3">
                <div id="region-main-box" className="col-12">

                    <section id="region-main" >
                        <div className="region_main_settings_menu_proxy"></div>
                        <span className="notifications" id="user-notifications"></span>
                        <div role="main"><span id="maincontent"></span><h2 style={{ "text-align": "center" }}>Danh sách lớp học</h2><div>

                            <table
                                className="table table-hover table-striped discussion-list"
                                aria-label='Showing 8 of 8 discussions'
                                aria-describedby="discussion-table-description-605dd978bbd8f605dd9788f35719"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Stt</th>
                                        <th scope="col" className="p-l-0">Mã lớp học</th>
                                        <th scope="col" className="author">Tên lớp học</th>
                                        <th scope="col" className="created">Niên khóa</th>
                                        <th scope="col" className="created">Giáo viên chủ nhiệm</th>
                                        <th scope="col" className="created"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="discussion ">
                                        <td className="pinned p-0 text-center align-middle">1</td>
                                        <td className="topic p-0 align-middle">
                                            {/* <a className="p-3 p-l-0 w-100 h-100 d-block" href="#">1234001</a> */}
                                            <button className="p-3 p-l-0 w-100 h-100 d-block">17055078</button>
                                        </td>
                                        <td className="author align-middle">
                                            <div className="d-flex flex-row">

                                                <div className="align-middle p-2">
                                                    DHHTTT13B
                                        </div>
                                            </div>
                                        </td>


                                        <td className="text-left align-middle">
                                            2017-2021
                            </td>
                                        <td className="text-left align-middle">
                                            Th.S Nguyễn Như Hoa
                            </td>
                                        <td className="text-left align-middle">
                                            {/* <a href="#">Xóa</a> */}
                                            <button className="p-3 p-l-0 w-100 h-100 d-block">17055078</button>
                                        </td>

                                    </tr>
                                    <tr className="discussion ">
                                        <td className="pinned p-0 text-center align-middle">2</td>
                                        <td className="topic p-0 align-middle">
                                            {/* <a className="p-3 p-l-0 w-100 h-100 d-block" href="#">1234002</a> */}
                                            <button className="p-3 p-l-0 w-100 h-100 d-block">17055078</button>
                                        </td>
                                        <td className="author align-middle">
                                            <div className="d-flex flex-row">

                                                <div className="align-middle p-2">
                                                    DHHTTT13A
                                        </div>
                                            </div>
                                        </td>


                                        <td className="text-left align-middle">
                                            2017-2021
                            </td>
                                        <td className="text-left align-middle">
                                            Th.S Lê Thùy Trang
                            </td>
                                        <td className="text-left align-middle">
                                            {/* <a href="#">Xóa</a> */}
                                            <button className="p-3 p-l-0 w-100 h-100 d-block">17055078</button>
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

export { quanlylophoc }