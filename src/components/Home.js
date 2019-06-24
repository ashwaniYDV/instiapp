import React, { Fragment } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {AppBar, Avatar, Button, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar,Typography} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';

// import 'antd/dist/antd.css';
// import {  Button } from "antd";

import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile';
import LoginModal from './LoginModal/LoginModal';
import RegisterModal from './RegisterModal/RegisterModal';

import { openLoginModal } from "../redux/actions/authActions";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  avatar: {
    color: '#fff',
    backgroundColor: 'purple',
  },
});

class Home extends React.Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    openLoginModal: PropTypes.func.isRequired,
    anchorEl: null,
  };

  state = {
    mobileOpen: false,
  };

  openLoginModal = () => {
    this.props.openLoginModal();
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const {
      isAuthenticated,
      user,
      openloginModal,
      openregisterModal
    } = this.props.auth;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const drawer = (
      <div>
        <div className={classes.toolbar} style={{background: '#2196f3', padding: '5px', display: 'flex', alignItems: 'center'}}>
          <Avatar className={classes.avatar}><InboxIcon /></Avatar>
          <span style={{margin: '5px'}}>{isAuthenticated ? user.name.split(' ')[0] : "Guest User"}</span>
        </div>
        <Divider />
        <List>
          {isAuthenticated ? 
            <ListItem button key='profile' component={Link} to='/profile' >
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItem>
            :
            [
              <ListItem button key='signup' component={Link} to='/signup' >
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary='Signup' />
              </ListItem>,
              <ListItem button key='signin' component={Link} to='/signin' >
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary='Signin' />
              </ListItem>
            ]
          }
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} style={{'background': '#2196f3'}}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
              Responsive drawer
            </Typography>

            {!isAuthenticated && (
              <Button color="inherit" onClick={this.openLoginModal}>Login</Button>
            )}
            {openloginModal ? <LoginModal /> : null}
            {openregisterModal ? <RegisterModal /> : null}

            {isAuthenticated && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose} component={Link} to='/profile'>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

const WrappedHome=withRouter(connect( mapStateToProps, {openLoginModal} )(Home));
export default compose(
  withStyles(styles, { withTheme: true }),
)(WrappedHome);