const diendan = () => {
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
                        <div role="main"><span id="maincontent"></span><h2>Diễn đàn trao đổi giữa GV và SV</h2><div>



                            <div className="p-t-1 p-b-1">
                                <a className="btn btn-primary" data-toggle="collapse" href="#">
                                    Thêm một chủ đề thảo luận mới
            </a>
                            </div>
                            <table
                                className="table table-hover table-striped discussion-list"
                                aria-label='Showing 8 of 8 discussions'
                                aria-describedby="discussion-table-description-605dd978bbd8f605dd9788f35719"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Stt</th>
                                        <th scope="col" className="p-l-0">Diễn đàn</th>
                                        <th scope="col" className="author">Người khởi tạo</th>

                                        <th scope="col" className="created">Created</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="discussion ">
                                        <td scope="col" className="pinned p-0 text-center align-middle">1</td>
                                        <td scope="col" className="topic p-0 align-middle">
                                            <a className="p-3 p-l-0 w-100 h-100 d-block" href="#">Điều chỉnh Setting cho phần Sign trong Odoo</a>
                                        </td>
                                        <td scope="col" className="author align-middle">
                                            <div className="d-flex flex-row">
                                                <div className="align-middle p-0">
                                                    <img
                                                        className="rounded-circle userpicture"
                                                        src="https://lms.iuh.edu.vn/theme/image.php/academi/core/1600662090/u/f1"
                                                    />
                                                </div>
                                                <div className="align-middle p-2">
                                                    Phan Thị Bảo Trân
                                        </div>
                                            </div>
                                        </td>


                                        <td scope="col" className="text-left align-middle">
                                            Sat, 21 Nov 2020, 4:24 PM
                            </td>

                                    </tr>
                                    <tr className="discussion ">
                                        <td scope="col" className="pinned p-0 text-center align-middle">2</td>
                                        <td scope="col" className="topic p-0 align-middle">
                                            <a className="p-3 p-l-0 w-100 h-100 d-block" href="#">Điều chỉnh Setting cho phần Sign trong Odoo</a>
                                        </td>
                                        <td scope="col" className="author align-middle">
                                            <div className="d-flex flex-row">
                                                <div className="align-middle p-0">
                                                    <img
                                                        className="rounded-circle userpicture"
                                                        src="https://lms.iuh.edu.vn/theme/image.php/academi/core/1600662090/u/f1"
                                                    />
                                                </div>
                                                <div className="align-middle p-2">
                                                    Phan Thị Bảo Trân
                                        </div>
                                            </div>
                                        </td>


                                        <td scope="col" className="text-left align-middle">
                                            Sat, 21 Nov 2020, 4:24 PM
                            </td>

                                    </tr>
                                    <tr>
                                        <td scope="col" className="pinned p-0 text-center align-middle">3</td>
                                        <td scope="col" className="topic p-0 align-middle">
                                            <a className="p-3 p-l-0 w-100 h-100 d-block" href="#">Điều chỉnh Setting cho phần Sign trong Odoo</a>
                                        </td>
                                        <td scope="col" className="author align-middle">
                                            <div className="d-flex flex-row">
                                                <div className="align-middle p-0">
                                                    <img
                                                        className="rounded-circle userpicture"
                                                        src="https://lms.iuh.edu.vn/theme/image.php/academi/core/1600662090/u/f1"
                                                    />
                                                </div>
                                                <div className="align-middle p-2">
                                                    Phan Thị Bảo Trân
                                        </div>
                                            </div>
                                        </td>


                                        <td scope="col" className="text-left align-middle">
                                            Sat, 21 Nov 2020, 4:24 PM
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

export { diendan }
