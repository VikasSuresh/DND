/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import {
    createStyles, makeStyles, useTheme, Theme, alpha,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Notification } from '../../Components';
import { User as Store } from '../../Store';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        left: '33%',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

// eslint-disable-next-line import/prefer-default-export
export function MiniDrawer(props:any) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuId = 'primary-search-account-menu';

    return (
    // eslint-disable-next-line react/jsx-filename-extension
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        To Do
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <div className="btn-group">
                            <IconButton
                                aria-label="show 2 new notifications"
                                data-bs-toggle="dropdown"
                                id="dropdownMenu"
                                color="inherit"
                                aria-expanded="false"
                            >
                                <Badge badgeContent={2} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <Notification />
                        </div>
                        <div className="btn-group">
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                aria-controls={menuId}
                                data-bs-toggle="dropdown"
                                id="dropdownMenu"
                                color="inherit"
                                aria-expanded="false"
                            >
                                <AccountCircle />
                            </IconButton>
                            <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                <a className="dropdown-item" href="/profile">Profile</a>
                                <button
                                    className="dropdown-item"
                                    type="button"
                                    onClick={() => {
                                        Store.logout();
                                        history.push('/auth');
                                    }}
                                >
                                    Logout

                                </button>
                            </div>
                        </div>

                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <List>
                    <ListItem button key="Today" component="a" href="/">
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary="Today" />
                    </ListItem>
                    <ListItem button key="Bookmarked" component="a" href="/bookmarks">
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary="Bookmarked" />
                    </ListItem>
                    <ListItem button key="Calendar" component="a" href="/calendar">
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary="Calendar" />
                    </ListItem>
                    <ListItem button key="Tasks" component="a" href="/tasks">
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary="Tasks" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}
