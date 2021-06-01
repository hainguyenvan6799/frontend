import * as React from 'react';
// import Paper from '@material-ui/core/Paper';
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
import { userContext } from '../../../Store';

// giao diện checkbox set phân quyền
// const useStyles = makeStyles(theme => ({
//   container: {
//     margin: theme.spacing(2),
//     padding: theme.spacing(2),
//   },
//   text: theme.typography.h6,
//   formControlLabel: {
//     ...theme.typography.caption,
//     fontSize: '1rem',
//   },
// }));
// const editingOptionsList = [
//   { id: 'allowAdding', text: 'Adding' },
//   { id: 'allowDeleting', text: 'Deleting' },
//   { id: 'allowUpdating', text: 'Updating' },
//   { id: 'allowResizing', text: 'Resizing' },
//   { id: 'allowDragging', text: 'Dragging' },
// ];

// const EditingOptionsSelector = ({
//   options, onOptionsChange,
// }) => {
//   const classes = useStyles();
//   return (
//     <div className={classes.container}>
//       <Typography className={classes.text}>
//         Enabled Options
//         </Typography>
//       <FormGroup row>
//         {editingOptionsList.map(({ id, text }) => (
//           <FormControlLabel
//             control={(
//               <Checkbox
//                 checked={options[id]}
//                 onChange={onOptionsChange}
//                 value={id}
//                 color="primary"
//               />
//             )}
//             classes={{ label: classes.formControlLabel }}
//             label={text}
//             key={id}
//             disabled={(id === 'allowDragging' || id === 'allowResizing') && !options.allowUpdating}
//           />
//         ))}
//       </FormGroup>
//     </div>
//   );
// };
// giao diện checkbox set phân quyền

export default () => {
  
  // declare global state
  const [user, setUser] = React.useContext(userContext);

  // declare component state
  const isMountedVal = React.useRef(1);
  const view_id = "view_01";
  const [data, setData] = React.useState([]);
  const [roleOfUser, setRoleOfUser] = React.useState("");
  const [addedAppointment, setAddedAppointment] = React.useState({})
  const [currentDate, setCurrentDate] = React.useState(new Date());
  

  const [isBeingCreated, setIsBeingCreated] = React.useState(false);
  const [editingOptions, setEditingOptions] = React.useState({
    allowReading: false,
    allowAdding: false,
    allowUpdating: false,
    allowDeleting: false,
    allowResizing: false,
    allowDragging: false,
  })

  const updateState = (callback) => {
    if(isMountedVal.current === 1)
    {
      callback();
    }
  }

  const check_access_rights = () => {
    const form_data = new FormData;
    form_data.append("mauser", user.mauser);
    form_data.append("object_id", view_id);
    
    axios.post("/api/check-access-rights-for-schedule-calendar", form_data)
    .then(res => {
      const { access_rights } = res.data;
      setRoleOfUser(access_rights.user_role)
      setEditingOptions({
        ...editingOptions,
        allowReading: access_rights.can_read,
        allowAdding: access_rights.can_add,
        allowUpdating: access_rights.can_update,
        allowDeleting: access_rights.can_delete,
      })
    }).catch(err => {
      console.log(err);
    })
  }
  
  console.log(editingOptions)

  React.useEffect(() => {
    if(user.name !== "")
    {
      updateState(check_access_rights);
    }
    return () => {
      isMountedVal.current = 0;
    }
  }, [user.name, isMountedVal.current])

  const get_schedule_calendar = () => {
    
    var data = {
      'owner_schedule_calendar': user.magiaovien,
    }
    
    axios.post("/api/get-schedule-list", data).then(res => {
      const new_data = res.data.schedule_list.map(item => {
        return {
          ...item,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
        }
      })
      setData(new_data);
    }).catch(err => console.log(err));
  }

  React.useEffect(() => {
    isMountedVal.current = 1;
    if(user.magiaovien !== "")
    {
      updateState(get_schedule_calendar);
    }
    
    return () => {
      setData([]);
      isMountedVal.current = 0;
    }
  }, [isMountedVal.current, user.magiaovien])

  // xử lý khi các option allowAdding, allowUpdating, allowDeleting thay đổi
  const handleEditingOptionsChange = (e) => {
    const option = e.target.value;
    const { [option]: checked } = editingOptions;
    setEditingOptions({
      ...editingOptions,
      [option]: !checked,
    })
  }

  const { allowAdding, allowDeleting, allowUpdating } = editingOptions;
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

  const onCommitChanges = (props) => {
    const { added, changed, deleted } = props;
    if (added) {
      const appointmentLength = data.length;
      const new_data_added = { ...added, id: appointmentLength + 1 };
      setData((data) => [...data, new_data_added]);
      setIsBeingCreated(false);

      axios.post('/api/add-appointment', {...new_data_added, magiaovien: user.mauser}).then(res => console.log(res)).catch(err => console.log(err))
    }
    if (changed) {
      const new_data = data.map((appointment) => (changed[appointment.id] ?
        { ...appointment, ...changed[appointment.id] } : appointment
      )
      )
      setData(new_data);

      data.map((appointment) => {
        if (changed[appointment.id]) {
          const edit_data = { ...appointment, ...changed[appointment.id] }
          axios.post('/api/edit-appointment', {...edit_data, magiaovien: user.mauser}).then(res => console.log(res)).catch(err => console.log(err))
        }
      })
    }
    if (deleted) {
      const new_data = data.filter(item => item.id !== deleted)
      setData(new_data)
      axios.post('/api/delete-appointment', {id: deleted, magiaovien: user.mauser}).then(res => console.log(res)).catch(err => console.log(err))
    }
    setIsBeingCreated(false);
    return appointments;
  }

  const onAddedAppointmentChange = (addedAppointment) => {
    setAddedAppointment(addedAppointment);
    setIsBeingCreated(true)
  }

  const currentDateChange = (currentDate) => {
    setCurrentDate(currentDate)
  }

  const view_schedule_calendar = () => {
    return (
      <React.Fragment>
      {/* {roleOfUser === "r03" ? (
        <EditingOptionsSelector
        options={editingOptions}
        onOptionsChange={handleEditingOptionsChange}
      />
      ) : null} */}
      <a href="/">Quay về Trang chủ</a>
      
//       <Paper>
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
//       </Paper>
    </React.Fragment>
  
    )
  }
  

  return (
    user.name !== "" ?
    (editingOptions.allowReading === true ? view_schedule_calendar() : "Wait a minutes or You can contact to admin to access to this view") : <ClipLoader/>
  );
};
