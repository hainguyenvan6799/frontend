import * as React from 'react';
import { ViewState, EditingState, IntegratedEditing, } from '@devexpress/dx-react-scheduler';

import ClipLoader from "react-spinners/ClipLoader";


import {
    Scheduler,
    // Toolbar là thanh chứa viewSwitcher  
    Toolbar,
    ViewSwitcher,
    DayView,
    WeekView,

    //   renders a date navigator control
    DateNavigator,

    // display today button
    TodayButton,

    Appointments,
    AppointmentForm,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

import appointments from './today_appointment';
import axios from 'axios';

import { userContext } from '../../../Store'
import Header from '../../basic_components/Header';
import Footer from '../../basic_components/Footer';
import { channel3 } from "../../../Store";

function TestSchedule(props) {

    const view_id = "view_01"; // cái này là trùng với resource_id trong bảng resources
    const [currentDate, setCurrentDate] = React.useState(new Date()); // set ngày hiện tại cho lịch
    const [data, setData] = React.useState([])

    const [addedAppointment, setAddedAppointment] = React.useState({})
    const [isBeingCreated, setIsBeingCreated] = React.useState(false);

    // const isMountedVal = React.useRef(1);
    const [user, setUser] = React.useContext(userContext);
    console.log(user);
    // const [user, setUser] = React.useContext(userContext);

    const [roleOfUser, setRoleOfUser] = React.useState([]);
    const [accessRights, setAccessRights] = React.useState({
        allowReading: false,
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
    })

    const check_access_rights = async () => {
        // try {
        const result = await axios.post('/api/check-access-rights-for-schedule-calendar', {
            mauser: user.mauser,
            resource_id: view_id,
            magiaovien: user.magiaovien,
        })
        console.log(result);
        if (result.data.status === true) {
            console.log(result)
            const { accessRights } = result.data;

            setAccessRights({
                allowReading: accessRights.allowRead,
                allowAdding: accessRights.allowAdd,
                allowUpdating: accessRights.allowUpdate,
                allowDeleting: accessRights.allowDelete,
            });

            if (accessRights.allowRead === true) {
                const newdata = result.data.dataList.map(item => {
                    return {
                        ...item,
                        startDate: new Date(item.startDate),
                        endDate: new Date(item.endDate),
                    }
                })
                setData(newdata);

                setRoleOfUser(accessRights.user_role);
            }

            // console.log(result.data.dataList)

        }
        // } catch (err) {
        //     console.log(err)
        // }

    }

    const currentDateChange = (currentDate) => {
        setCurrentDate(currentDate)
    }

    const onAddedAppointmentChange = (addedAppointment) => {
        setAddedAppointment(addedAppointment);
        setIsBeingCreated(true)
    }
    
    React.useEffect(() => {
    channel3.bind("App\\Events\\ScheduleCalendarEvent", (data) => {
      console.log("pusher", data);
      if (data.data.magiaovien === user.magiaovien) {
        if (data.data.isAdd) {
          const { allDay, id, title, startDate, endDate } = data.data;
          setData((schedule) => [
            ...schedule,
            { allDay, id, title, startDate, endDate },
          ]);
          setIsBeingCreated(false);
        }

        if (data.data.isUpdate) {
          const { allDay, id, title, startDate, endDate } = data.data;
          setData((schedule) =>
            schedule.map((item) =>
              item.id === id ? { allDay, id, title, startDate, endDate } : item
            )
          );
        }

        if (data.data.isDelete) {
          const { id } = data.data;
          setData((schedule) => schedule.filter((item) => item.id !== id));
        }
      }
    });
  }, []);

    const onCommitChanges = (props) => {
        const { added, changed, deleted } = props;
        if (added) {
            const appointmentLength = data.length;
            const new_data_added = { ...added, id: appointmentLength + 1 };
//             setData((data) => [...data, new_data_added]);
//             setIsBeingCreated(false);

            axios.post('/api/add-appointment', { ...new_data_added, magiaovien: user.mauser }).then(res => console.log(res)).catch(err => console.log(err))
        }
        if (changed) {
//             const new_data = data.map((appointment) => (changed[appointment.id] ?
//                 { ...appointment, ...changed[appointment.id] } : appointment
//             )
//             )
//             setData(new_data);

            data.map((appointment) => {
                if (changed[appointment.id]) {
                    const edit_data = { ...appointment, ...changed[appointment.id] }
                    axios.post('/api/edit-appointment', { ...edit_data, magiaovien: user.mauser }).then(res => console.log(res)).catch(err => console.log(err))
                }
            })
        }
        if (deleted) {
//             const new_data = data.filter(item => item.id !== deleted)
//             setData(new_data)
            axios.post('/api/delete-appointment', { id: deleted, magiaovien: user.mauser }).then(res => console.log(res)).catch(err => console.log(err))
        }
        setIsBeingCreated(false);
        return appointments;
    }

    const { allowReading, allowAdding, allowUpdating, allowDeleting } = accessRights;

    // Xử lý không cho phép adding bằng cách tắt onDoubleClick handler 
    const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
        <WeekView.TimeTableCell
            {...restProps}
            onDoubleClick={allowAdding ? onDoubleClick : undefined}
        />
    )), [allowAdding]);

    // Xử lý không cho phép xóa:
    const CommandButton = ({ id, ...restProps }) => {
        console.log(id); //saveButton, deleteButton, cancelButton
        // ra 3 nút có trên giao diện, kiểm tra xem nếu là nút delete thì sẽ tùy chỉnh disable trái ngược với option về edit bên trên
        if (id === 'deleteButton') {
            return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />
        }
        else {
            return <AppointmentForm.CommandButton id={id} {...restProps} />
        }
    }

    const view_schedule_calendar = () => {
        return (
            <div>

                <React.Fragment>
                        <Scheduler
                            data={data}
                        >

                            <ViewState
                                currentDate={currentDate}
                                defaultCurrentDate={currentDate}
                                defaultCurrentViewName="Week"
                                onCurrentDateChange={currentDateChange}
                            />

                            <EditingState
                                onCommitChanges={onCommitChanges}

                                addedAppointment={addedAppointment}
                                onAddedAppointmentChange={onAddedAppointmentChange}
                            />

                            {/* Bắt sự kiện edit khi nhấn onCommitChanges */}
                            <IntegratedEditing />

                            {/* Toolbar chứa button ViewSwitcher */}
                            <Toolbar />
                            <DateNavigator />
                            <TodayButton />
                            <ViewSwitcher />

                            <DayView
                                displayName="Day Work"
                                startDayHour={8}
                                endDayHour={22}
                            />
                            <WeekView
                                displayName="Week Work"
                                startDayHour={8}
                                endDayHour={22}
                                timeTableCellComponent={TimeTableCell}
                            />
                            <Appointments />
                            <AppointmentTooltip
                                showOpenButton
                                showCloseButton
                            />
                            <AppointmentForm
                                commandButtonComponent={CommandButton}
                                readOnly={isBeingCreated ? false : !allowUpdating}
                            />
                        </Scheduler>
                </React.Fragment>

            </div>
        )
    }


    React.useEffect(() => {
        if (user.name !== "") {
            check_access_rights();
        }

        return () => {
            setRoleOfUser([])
            setAccessRights({})
            setData([])
        }
    }, [user.name])

    return (
        <div>
            <Header />
            {roleOfUser.length !== 0 ? accessRights.allowReading === true ? (

            view_schedule_calendar()

        ) : "Bạn không có quyền truy cập vào trang này" : <ClipLoader/>}

            <Footer />
        </div>
    )
}

export default TestSchedule
