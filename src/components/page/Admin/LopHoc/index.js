import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import DanhSachLopHoc from './DanhSachLopHoc';
import ThemLopHoc from './ThemLopHoc';

function Index() {
    return (
        <div>
            <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/classes'>Xem danh sách</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/add-class'>Thêm lớp học</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/admin/classes" component={DanhSachLopHoc} />
                    <Route exact path='/admin/add-class' component={ThemLopHoc} />
                </Switch>
                </Router>
        </div>
    )
}

export default Index
