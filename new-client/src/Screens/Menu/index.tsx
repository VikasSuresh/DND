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
import Close from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Store from '../../Store';
import { Icons } from '../../Components';

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
    });

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
                        {theme.direction === 'rtl' ? <Close /> : <Close />}
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
                <List>
                    <ListItem>
                        <button style={{ top: '10%', left: '20%', position: 'absolute' }} title="Completed" type="submit" className="btn" onClick={() => { Store.toggleToDo(toDo._id); }}>
                            {toDo.completed ? <Icons.Completed /> : <Icons.NotCompleted />}
                        </button>
                        <button
                            style={{ top: '10%', left: '40%', position: 'absolute' }}
                            title="Priority"
                            type="submit"
                            className="btn"
                            disabled={toDo.completed}
                            onClick={() => { Store.togglePriority(toDo._id); }}
                        >
                            {toDo.completed ? <Icons.NotPrioritized /> : toDo.priority ? <Icons.Prioritized /> : <Icons.NotPrioritized />}
                        </button>
                        <button style={{ top: '10%', left: '60%', position: 'absolute' }} title="Bookmark" type="submit" className="btn" onClick={() => { Store.toggleBookmark(toDo._id); }}>
                            {toDo.bookmarked ? <Icons.Bookmarked /> : <Icons.NotBookmarked />}
                        </button>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
});

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
        // display: 'flex',
        // alignItems: 'center',
        // padding: theme.spacing(0, 1),
        // // necessary for content to be below app bar
        // ...theme.mixins.toolbar,
        // justifyContent: 'flex-start',
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
