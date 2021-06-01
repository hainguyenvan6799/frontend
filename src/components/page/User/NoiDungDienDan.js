import BaseView from '../../basic_components/allview/base_view';
import { noidungdiendan } from '../../basic_components/allview/users/noidungdiendan';

function NoiDungDienDan() {
    return (
        // truyền biến danh sách sinh viên vô để hiển thị
        BaseView(noidungdiendan)
    )
}

export default NoiDungDienDan
