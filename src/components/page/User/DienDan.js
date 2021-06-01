import BaseView from '../../basic_components/allview/base_view';
import { diendan } from '../../basic_components/allview/users/diendan';

function DienDan() {
    return (
        // truyền biến danh sách sinh viên vô để hiển thị
        BaseView(diendan)
    )
}

export default DienDan
