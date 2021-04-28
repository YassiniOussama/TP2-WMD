import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import MoreIcon from '@material-ui/icons/MoreVert';
import useStyles from "./style";
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { connect } from "react-redux";
import { nextBoard } from "../../actions/index";


const mapStateToProps = (state) => {
  return {
    boards: state.boards,
    index:state.index
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    nextBoard: () => dispatch(nextBoard(true)),
    // previousBoard: () => dispatch(previousBoard(true)),
  }
}


 function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [boardAnchorEl, setBoardAnchorEl] = React.useState(null);
  const [title, setTitle] = React.useState(props.boards[props.index].title);

  const isMenuOpen = Boolean(anchorEl);
  const isBoardMenuOpen = Boolean(boardAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBoardMenuClose = () => {
    setBoardAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBoardMenuOpen = (event) => {
    setBoardAnchorEl(event.currentTarget);
  };
  const changeBoard = index => {
    setTitle(props.boards[index].title);
    handleBoardMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenuUser = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const boardMenuId = 'primary-search-account-menu-board';
  const renderMenuBords = (
    <Menu
      anchorEl={boardAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={boardMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isBoardMenuOpen}
      onClose={handleBoardMenuClose}
    >
      {props.boards.map((board, index) => (

        <Link to={`/${index}`} className={classes.links} key={index}>
          <MenuItem onClick={() => changeBoard(index)}>{board.title}</MenuItem>
        </Link>
      ))}
    </Menu>
  );


  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleBoardMenuOpen}
            color="inherit"
            aria-label="open drawer"
            aria-haspopup="true"
            aria-controls={boardMenuId}
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            {title}
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

          <IconButton
            onClick={props.nextBoard}
            color="inherit"
            aria-label="Next"
            aria-haspopup="true"
          >
            <NavigateNextIcon />
          </IconButton>


          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>
      {renderMenuUser}
      {renderMenuBords}
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(PrimarySearchAppBar)
