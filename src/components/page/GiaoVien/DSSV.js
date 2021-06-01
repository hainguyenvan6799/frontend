import React from 'react'

import BaseView from '../../basic_components/allview/base_view';
import {danhsachsinhvien} from '../../basic_components/allview/giaovien/danhsachsinhvien';

function DSSV() {
    return (
        // truyền biến danh sách sinh viên vô để hiển thị
        BaseView(danhsachsinhvien)
    )
}

export default DSSV
