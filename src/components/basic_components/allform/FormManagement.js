import { Formik, Form, Field, ErrorMessage } from 'formik';

const change_password_after_login_form = (initialValues, onSubmit, validationSchema) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
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
                                                <h2 className="card-header text-center">Hệ Thống Liên Lạc Trực Tuyến - IUH</h2>
                                                <div className="card-body">


                                                    <div className="row justify-content-md-center">
                                                        <div className="col-md-8">
                                                            <div className="mt-3">

                                                                <Form>
                                                                    <div className="form-group">
                                                                        <label htmlFor="old_password" className="sr-only">Nhập mật khẩu cũ</label>
                                                                        <Field
                                                                            type="password"
                                                                            name="old_password"
                                                                            id="old_password"
                                                                            className="form-control"
                                                                            placeholder="Nhập mật khẩu cũ"
                                                                        ></Field>
                                                                        <ErrorMessage name="old_password" />
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label htmlFor="password" className="sr-only">Nhập mật khẩu mới</label>
                                                                        <Field
                                                                            type="password"
                                                                            name="password"
                                                                            id="password"
                                                                            className="form-control"
                                                                            placeholder="Nhập mật khẩu mới của bạn"
                                                                        ></Field>
                                                                        <ErrorMessage name="password" />
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label htmlFor="confirm_password" className="sr-only">Xác nhận mật khẩu mới</label>
                                                                        <Field
                                                                            type="password"
                                                                            name="confirm_password"
                                                                            id="confirm_password"
                                                                            className="form-control"
                                                                            placeholder="Xác nhận lại mật khẩu mới của bạn"
                                                                        ></Field>
                                                                        <ErrorMessage name="confirm_password" />

                                                                    </div>


                                                                    <button type="submit" className="btn btn-primary btn-block mt-3">Đổi mật khẩu</button>
                                                                </Form>
                                                            </div>

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
        </Formik>
    )
}

export {change_password_after_login_form}