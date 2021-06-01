import React, { useContext } from 'react'

import Footer from './basic_components/Footer'
import Header from './basic_components/Header'

// import context
import { loadingContext } from '../Store';

// import addictional components:
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
    // declare context
    const [loading] = useContext(loadingContext);

    const slider = () => {
        return (
            <div className="theme-slider">
                <div id="home-page-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item  active" style={{ backgroundImage: 'url(img/banner.jpg)' }}>
                            <div className=" carousel-overlay-content container-fluid">
                                <div className="content-wrap">
                                    <h2>Hệ Thống Liên Lạc Trực Tuyến - IUH</h2><br />
                                    <p>Đổi mới, nâng tầm cao mới - Năng động, hội nhập toàn cầu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const main_content = () => {
        return (
            <div id="page" className="container">
                <header id="page-header" className="clearfix">
                    <div id="course-header">
                    </div>
                </header>

                <div id="page-content" className="row">
                    <div id="region-bs-main-and-pre" className="col-md-9">
                        <span className="notifications" id="user-notifications" />
                        <div role="main">
                            <span id="maincontent" />
                            <div className="box py-3 generalbox sitetopic">
                                <h2 className="sectionname">Giới thiệu chung</h2>
                                <div className="no-overflow">
                                    Chào mừng các bạn đến với kênh liên lạc trực tuyến của Trường Đại học Công nghiệp TP.HCM. Hệ thống giúp giảng viên tiếp nhận thông tin từ SV (về tình hình học tập/ rèn luyện của sinh viên, nội dung cần hỗ trợ/ tư vấn, nêu thắc mắc/ khiếu nại...), giúp sinh viên nhận tư vấn học tập và rèn luyện kỹ năng từ giáo viên chủ nhiệm/ đoàn thể. Chúc các bạn có nhiều kiến thức trên hệ thống liên lạc trực tuyến này.
                                    .
              <br /><p><br /></p></div>
                                <ul className="section img-text" />
                            </div>
                            <span className="skip-block-to" id="skipsitenews" /><br /></div>  </div>
                    <aside id="block-region-side-pre" className="col-md-3 block-region" data-blockregion="side-pre" data-droptarget={1}>
                        <section id="inst34" className=" block_calendar_month block  card mb-3" role="complementary" data-block="calendar_month" aria-labelledby="instance-34-header">
                            <div className="card-body p-3">
                                <h5 id="instance-34-header" className="card-title d-inline">Lịch</h5>
                                <div className="card-text content mt-3">
                                    <div id="calendar-month-2021-March-605309f19a446605309f19a4861" data-template="core_calendar/month_mini" data-includenavigation="false" data-mini="true">
                                        <div id="month-mini-2021-March-605309f19a446605309f19a4861" className="calendarwrapper" data-courseid={1} data-categoryid={0} data-month={3} data-year={2021} data-view="month">
                                            <span className="overlay-icon-container hidden" data-region="overlay-icon-container">
                                                <span className="loading-icon icon-no-margin"><i className="icon fa fa-circle-o-notch fa-spin fa-fw " title="Loading" aria-label="Loading" /></span>
                                            </span>
                                            <table className="minicalendar calendartable">
                                                <caption className="calendar-controls">
                                                    <h3>
                                                        <a href="/signin" title="Tháng này">March 2021</a>
                                                    </h3>
                                                </caption>
                                                <thead>
                                                    <tr>
                                                        <th className="header text-xs-center" scope="col">
                                                            <abbr title="Thứ 2">T2</abbr>
                                                        </th>
                                                        <th className="header text-xs-center" scope="col">
                                                            <abbr title="Thứ 3">T3</abbr>
                                                        </th>
                                                        <th className="header text-xs-center" scope="col">
                                                            <abbr title="Thứ 4">T4</abbr>
                                                        </th>
                                                        <th className="header text-xs-center" scope="col">
                                                            <abbr title="Thứ 5">T5</abbr>
                                                        </th>
                                                        <th className="header text-xs-center" scope="col">
                                                            <abbr title="Thứ 6">T6</abbr>
                                                        </th>
                                                        <th className="header text-xs-center" scope="col">
                                                            <abbr title="Thứ 7">T7</abbr>
                                                        </th>
                                                        <th className="header text-xs-center" scope="col">
                                                            <abbr title="Chủ Nhật">CN</abbr>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr data-region="month-view-week">
                                                        <td className="day text-center" data-day-timestamp={1614531600}>
                                                            1
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1614618000}>
                                                            2
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1614704400}>
                                                            3
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1614790800}>
                                                            4
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1614877200}>
                                                            5
                        </td>
                                                        <td className="day text-center weekend" data-day-timestamp={1614963600}>
                                                            6
                        </td>
                                                        <td className="day text-center weekend" data-day-timestamp={1615050000}>
                                                            7
                        </td>
                                                    </tr>
                                                    <tr data-region="month-view-week">
                                                        <td className="day text-center" data-day-timestamp={1615136400}>
                                                            8
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1615222800}>
                                                            9
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1615309200}>
                                                            10
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1615395600}>
                                                            11
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1615482000}>
                                                            12
                        </td>
                                                        <td className="day text-center weekend" data-day-timestamp={1615568400}>
                                                            13
                        </td>
                                                        <td className="day text-center weekend" data-day-timestamp={1615654800}>
                                                            14
                        </td>
                                                    </tr>
                                                    <tr data-region="month-view-week">
                                                        <td className="day text-center" data-day-timestamp={1615741200}>
                                                            15
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1615827600}>
                                                            16
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1615914000}>
                                                            17
                        </td>
                                                        <td className="day text-center today" data-day-timestamp={1616000400}>
                                                            <a id="calendar-day-popover-link-1-2021-76-605309f19a446605309f19a4861" href="https://lms.iuh.edu.vn/calendar/view.php?view=day&time=1616000400" data-container="body" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="top" data-title="Today Thursday, 18 March" data-alternate="Không có sự kiện">18</a>
                                                            <div className="hidden">
                                                            </div>
                                                        </td>
                                                        <td className="day text-center" data-day-timestamp={1616086800}>
                                                            19
                        </td>
                                                        <td className="day text-center weekend" data-day-timestamp={1616173200}>
                                                            20
                        </td>
                                                        <td className="day text-center weekend" data-day-timestamp={1616259600}>
                                                            21
                        </td>
                                                    </tr>
                                                    <tr data-region="month-view-week">
                                                        <td className="day text-center" data-day-timestamp={1616346000}>
                                                            22
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1616432400}>
                                                            23
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1616518800}>
                                                            24
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1616605200}>
                                                            25
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1616691600}>
                                                            26
                        </td>
                                                        <td className="day text-center weekend" data-day-timestamp={1616778000}>
                                                            27
                        </td>
                                                        <td className="day text-center weekend" data-day-timestamp={1616864400}>
                                                            28
                        </td>
                                                    </tr>
                                                    <tr data-region="month-view-week">
                                                        <td className="day text-center" data-day-timestamp={1616950800}>
                                                            29
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1617037200}>
                                                            30
                        </td>
                                                        <td className="day text-center" data-day-timestamp={1617123600}>
                                                            31
                        </td>
                                                        <td className="dayblank">&nbsp;</td>
                                                        <td className="dayblank">&nbsp;</td>
                                                        <td className="dayblank">&nbsp;</td>
                                                        <td className="dayblank">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="footer" />
                                </div>
                            </div>
                        </section>
                        <span id="sb-4" /></aside>  </div>
                <div id="nav-drawer" data-region="drawer" className="d-print-none moodle-has-zindex closed" aria-hidden="true" tabIndex={-1}>
                    <nav className="list-group">
                        <a className="list-group-item list-group-item-action active" href="https://lms.iuh.edu.vn/" data-key="home" data-isexpandable={0} data-indent={0} data-showdivider={0} data-type={1} data-nodetype={1} data-collapse={0} data-forceopen={1} data-isactive={1} data-hidden={0} data-preceedwithhr={0}>
                            <div className="ml-0">
                                <div className="media">
                                    <span className="media-left">
                                        <i className="icon fa fa-home fa-fw " aria-hidden="true" />
                                    </span>
                                    <span className="media-body font-weight-bold">Trang chủ</span>
                                </div>
                            </div>
                        </a>
                    </nav>
                </div></div>
        )
    }
    return (
        <div>
            { loading ? <ClipLoader /> : (
                <div>
                    <Header />
                    {slider()}
                    {main_content()}
                    <Footer />
                </div>)
            }
        </div>
    )
}

export default Home
