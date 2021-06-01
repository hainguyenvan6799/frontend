import React, { useState } from 'react';
// import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/FormControl';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    Appointments,
    Toolbar,
    ViewSwitcher,
    DateNavigator,
    TodayButton,
    AppointmentTooltip,
    EditRecurrenceMenu,
    AppointmentForm,

} from '@devexpress/dx-react-scheduler-material-ui';

// const schedulerData = [
//     { id: 1, startDate: '2021-04-24T09:45', endDate: '2021-04-24T11:00', title: 'Meeting' },
//     { id: 2, startDate: '2021-04-25T12:00', endDate: '2021-04-25T13:30', title: 'Go to a gym' },
// ];

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    text: theme.typography.h6,
    formControlLabel: {
        ...theme.typography.caption,
        fontSize: '1rem',
    },
}));

const editingOptionsList = [
    { id: 'allowAdding', text: 'Adding' },
    { id: 'allowDeleting', text: 'Deleting' },
    { id: 'allowUpdating', text: 'Updating' },
    { id: 'allowResizing', text: 'Resizing' },
    { id: 'allowDragging', text: 'Dragging' },
];

const EditingOptionsSelector = ({
    options, onOptionsChange,
}) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography className={classes.text}>
                Enabled Options
        </Typography>
            <FormGroup row>
                {editingOptionsList.map(({ id, text }) => (
                    <FormControlLabel
                        control={(
                            <Checkbox
                                checked={options[id]}
                                onChange={onOptionsChange}
                                value={id}
                                color="primary"
                            />
                        )}
                        classes={{ label: classes.formControlLabel }}
                        label={text}
                        key={id}
                        disabled={(id === 'allowDragging' || id === 'allowResizing') && !options.allowUpdating}
                    />
                ))}
            </FormGroup>
        </div>
    );
};


export default () => {
    const [schedulerData, setSchedulerData] = useState([
        { id: 1, startDate: '2021-04-24T09:45', endDate: '2021-04-24T11:00', title: 'Meeting' },
        { id: 2, startDate: '2021-04-25T12:00', endDate: '2021-04-25T13:30', title: 'Go to a gym' },
        // { id: 1, startDate: new Date(2021, 4, 24, 9, 45), endDate: new Date(2021, 4, 24, 11), title: 'Meeting' },
        // //  { id: 2, startDate: '2021-04-25T12:00', endDate: '2021-04-25T13:30', title: 'Go to a gym' },
    ])
    const [ currentDate, setCurrentDate ] = useState(new Date())
    const [editingOptions, setEditingOptions] = React.useState({
        allowAdding: true,
        allowDeleting: true,
        allowUpdating: true,
        allowDragging: true,
        allowResizing: true,
    });
    const [addedAppointment, setAddedAppointment] = React.useState({});

    const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);

    const {
        allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging,
    } = editingOptions;

    const handleEditingOptionsChange = (e) => {
        const option = e.target.value;
        const { [option]: checked } = editingOptions;
        setEditingOptions({
            ...editingOptions,
            [option]: !checked,
        })
    }

    const onAddedAppointmentChange = React.useCallback((appointment) => {
        setAddedAppointment(appointment);
        setIsAppointmentBeingCreated(true);
      });

    console.log(editingOptions)
    console.log("isAppointmentBeingCreated", isAppointmentBeingCreated);
    console.log("allowUpdating", allowUpdating)

    const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
        <WeekView.TimeTableCell
          {...restProps}
          onDoubleClick={allowAdding ? onDoubleClick : undefined}
        />
      )), [allowAdding]);
    
    const CommandButton = React.useCallback(({ id, ...restProps }) => {
        console.log(id)
        if (id === 'deleteButton') {
          return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
        }
        return <AppointmentForm.CommandButton id={id} {...restProps} />;
      }, [allowDeleting]);

    const commitChanges = ({ added, changed, deleted }) => {
        const data = schedulerData;
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            setSchedulerData((schedulerData) => [...schedulerData, { id: startingAddedId, ...added }])
            console.log(schedulerData)
        }
        if (changed) {
            // console.log(parseInt(Object.keys(changed))); id of changed
            // let idChanged = parseInt(Object.keys(changed));
            let new_data = data.map(item => (

                // console.log(changed[item.id])
                changed[item.id] !== undefined ? { ...item, ...changed[item.id] } : item
            ))
            setSchedulerData(new_data)
        }
        if (deleted !== undefined) {
            let new_data = data.filter(item => item.id !== deleted)
            setSchedulerData(new_data)
        }
        setIsAppointmentBeingCreated(false);
    }

    const currentDateChange = (currentDate) => {
        setCurrentDate(currentDate);
    }

    return (
        <React.StrictMode>
        <React.Fragment>
//             <Paper>
                <EditingOptionsSelector
                    options={editingOptions}
                    onOptionsChange={handleEditingOptionsChange}
                />
                <Scheduler
                    data={schedulerData}
                >
                    <ViewState
                        currentDate={currentDate}
                        defaultCurrentViewName="Week"
                        onCurrentDateChange={currentDateChange}
                    />
                    <EditingState
                        onCommitChanges={commitChanges}

                        addedAppointment={addedAppointment}
                        onAddedAppointmentChange={onAddedAppointmentChange}
                    />
                    <DayView
                        // use displayName="Follow by Day" to display name you want
                        startDayHour={8}
                        endDayHour={17}
                    />
                    <WeekView
                        startDayHour={8}
                        endDayHour={17}
                        timeTableCellComponent={TimeTableCell}
                    />
                    <Appointments />
                    <Toolbar />
                    <ViewSwitcher />
                    <DateNavigator />
                    <TodayButton />
                    <EditRecurrenceMenu />
                    <AppointmentTooltip
                        showOpenButton
                        showDeleteButton={allowDeleting}
                    />
                    <AppointmentForm
                        commandButtonComponent={CommandButton}
                        readOnly={ isAppointmentBeingCreated ? false : !allowUpdating}
                    />
                </Scheduler>
//             </Paper>
        </React.Fragment>
        </React.StrictMode>
    );

};
