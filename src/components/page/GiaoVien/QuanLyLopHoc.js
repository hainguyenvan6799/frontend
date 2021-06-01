import BaseView from '../../basic_components/allview/base_view';
import { quanlylophoc } from '../../basic_components/allview/giaovien/quanlylophoc';

function QuanLyLopHoc() {
    return (
        // truyền biến danh sách sinh viên vô để hiển thị
        BaseView(quanlylophoc)
    )
}

export default QuanLyLopHoc
