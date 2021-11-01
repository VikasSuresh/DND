/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import {
    makeStyles, useTheme, Theme, createStyles,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EventBusyRoundedIcon from '@material-ui/icons/EventBusyRounded';
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded';
import moment from 'moment';
import { Todo as Store } from '../../Store';
import { Clock, Icons } from '../../Components';
import './index.css';

const drawerWidth = 350;

// eslint-disable-next-line import/prefer-default-export
export const RightDrawer = observer((props:any) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [task, setTask] = React.useState({
        _id: 0,
        name: '',
        completed: false,
        priority: false,
        bookmarked: false,
        dueDate: '',
        expired: false,
    });
    const [clock, setClock] = React.useState('');

    const toDo = Store.aToDo;

    useEffect(() => {
        if (task._id !== toDo._id) {
            setTask({
                ...toDo,
            });
        }
    });

    const onSubmit = (e:any) => {
        if ((e.key === 'Enter' || e.type === 'blur') && e.target.value !== '') {
            if (e.target.value !== toDo.name) {
                Store.updateOne(task);
            }
        }
    };

    const handleDrawerOpen = (id:number) => {
        Store.fetchOne(id);
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {props.render(handleDrawerOpen)}
            </main>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                key={task._id}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <CancelIcon /> : <CancelIcon />}
                    </IconButton>
                    <IconButton style={{ justifyContent: 'left' }} onClick={() => { Store.deleteOne(task._id); handleDrawerClose(); }}>
                        <DeleteForeverRoundedIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key="name">
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <div className="form-floating mb-3" style={{ top: '7px' }}>
                            <input
                                size={25}
                                type="name"
                                className={task.name === '' ? 'form-control is-invalid' : 'form-control'}
                                id="floatingInput"
                                defaultValue={task.name}
                                onKeyPress={onSubmit}
                                onBlur={onSubmit}
                                onChange={(e) => setTask((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))}
                            />
                            <label htmlFor="floatingInput">Name*</label>
                        </div>
                    </ListItem>
                </List>
                <Divider />
                <List style={{ top: '3%' }}>
                    <ListItem>
                        <button
                            style={{ left: '20%', position: 'absolute', outline: 'none' }}
                            title="Completed"
                            type="submit"
                            className="btn btn-lg"
                            onClick={() => { Store.toggleToDo(toDo._id); }}
                        >
                            {toDo.completed ? <Icons.Completed /> : <Icons.NotCompleted />}
                        </button>
                        <button
                            style={{ left: '40%', position: 'absolute', outline: 'none' }}
                            title="Priority"
                            type="submit"
                            className="btn btn-lg"
                            disabled={toDo.completed}
                            onClick={() => { Store.togglePriority(toDo._id); }}
                        >
                            {toDo.completed ? <Icons.NotPrioritized /> : toDo.priority ? <Icons.Prioritized /> : <Icons.NotPrioritized />}
                        </button>
                        <button
                            style={{ left: '60%', position: 'absolute', outline: 'none' }}
                            title="Bookmark"
                            type="submit"
                            className="btn btn-lg"
                            onClick={() => { Store.toggleBookmark(toDo._id); }}
                        >
                            {toDo.bookmarked ? <Icons.Bookmarked /> : <Icons.NotBookmarked />}
                        </button>
                    </ListItem>
                </List>
                <div style={{ top: '7%' }} className="btn-group" role="group" aria-label="drop-down">
                    <button
                        type="button"
                        className={toDo.expired ? 'btn btn-outline-danger btn-block dropdown-toggle' : 'btn btn-secondary btn-block dropdown-toggle'}
                        id="dropdownMenu"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {toDo.expired ? <EventBusyRoundedIcon /> : <EventAvailableRoundedIcon />}
                        <span style={{ paddingLeft: '2%' }}>{toDo.dueDate}</span>
                    </button>
                    <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenu"
                        style={{ width: '100%', textAlign: 'center' }}
                    >
                        <h6 className="dropdown-header">Due</h6>
                        <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => Store.updateDueDate({ _id: task._id, dueDate: getDueDate('Tomorrow') })}
                        >
                            <Icons.Date />
                            <span>Tomorrow</span>
                        </button>
                        <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => Store.updateDueDate({ _id: task._id, dueDate: getDueDate('Week') })}
                        >
                            <Icons.Week />
                            <span>Next Week</span>
                        </button>
                        <div className="dropdown">
                            <button
                                className="dropdown-item"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ pointerEvents: 'none' }}
                            >
                                <Icons.Month />
                                <span>Pick A Date</span>
                            </button>
                            <div className="dropdown-content">
                                <Clock submit={(dueDate:string) => {
                                    if (clock !== dueDate) {
                                        Store.updateDueDate({ _id: task._id, dueDate: getDueDate(dueDate) });
                                    }
                                    setClock(dueDate);
                                }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
});

const getDueDate = (cond: string) => {
    switch (cond) {
        case 'Tomorrow':
            return moment(new Date()).add(1, 'd').endOf('day');
        case 'Week':
            return moment(new Date()).add(7, 'd').endOf('day');
        default:
            return moment(new Date(cond));
    }
};

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        top: 'calc(100% - 92%)',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
}));
