import React from 'react'

function Footer() {
    return (
        <div>
            <div>
                <iframe title="display map" style={{ width: '100%' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8564388348705!2d106.68526211477928!3d10.822296492290434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1616057636677!5m2!1svi!2s" width={600} height={450} allowFullScreen loading="lazy" />
            </div>
            <footer id="page-footer" className="py-3 bg-dark text-light">
                <div id="footer">
                    <div className="footer-main">
                        <div className="container">
                            <div id="course-footer" />
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="infoarea">
                                        <div className="footer-logo">
                                            <a href="/"><img src="img/logo.PNG" width={100} height={100} alt="Academi" /></a>
                                        </div>
                                        <p>Chào mừng các bạn đến với Hệ thống liên lạc trực tuyến của trường Đại học Công
                  nghiệp TP.HCM, kênh liên lạc trực tuyến của nhà trường cho giảng viên và sinh viên.<br /></p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="foot-links">
                                        {/*<h2>Liên kết</h2>*/}
                                        <h2>Liên kết</h2>
                                        <ul>
                                            <li><a href="http://iuh.edu.vn/" target="_blank" rel="noreferrer">Website Nhà Trường</a></li>
                                            <li><a href="https://sv.iuh.edu.vn/" target="_blank" rel="noreferrer">Cổng Thông Tin Sinh Viên</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="contact-info">
                                        <h2 className="nopadding">Liên hệ</h2>
                                        <p>Số 12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, TP.HCM<br />
                  Phone : 0283.8940 390 - ext 168<br />
                  E-mail : <a className="mail-link" href="mailto:sac@iuh.edu.vn">sac@iuh.edu.vn</a><br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bootom">
                        <p>Copyright © 2021 - Phát triển bởi Nhật-Hải - ĐHCN TP.HCM</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
