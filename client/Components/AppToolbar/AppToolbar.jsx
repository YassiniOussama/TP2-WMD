import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreIcon from '@material-ui/icons/MoreVert';
import useStyles from "./style";
import { Link } from 'react-router-dom'
import { connect, useDispatch, useSelector } from "react-redux";
import { deleteBoard, setBoard, nextBoard, previousBoard } from '../../actions';
import { useParams, useLocation, useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    boards: state.boards,
    index: state.index
  }
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

function PrimarySearchAppBar() {
  const classes = useStyles();
  const [userAnchorEl, setUserAnchorEl] = React.useState(null);
  const [boardAnchorEl, setBoardAnchorEl] = React.useState(null);
  const [addAnchorEl, setAddAnchorEl] = React.useState(null);
  const isUserMenuOpen = Boolean(userAnchorEl);
  const isBoardMenuOpen = Boolean(boardAnchorEl);
  const isAddMenuOpen = Boolean(addAnchorEl);
  const [title, setTitle] = React.useState(null);
  const dispatch = useDispatch();
  let id = useSelector(state => state.index);
  let boards = useSelector(state => state.boards);
  let location = useLocation();
  //let { id_props } = useParams();

  useEffect(() => {
    if (parseInt(id, 10) > -1 ) {
      console.log(id);
      console.log(boards[parseInt(id, 10)]);
      setTitle(boards[parseInt(id, 10)].title);
      dispatch(setBoard(parseInt(id, 10)));
    }
  }, [id]);

  useEffect(() => {
    if (location.pathname.substring(0, 7) === "/board/" ) {
      console.log(location.pathname);
      id = parseInt(location.pathname.substring(7), 10);
      setTitle(boards[parseInt(id, 10)].title);
      dispatch(setBoard(parseInt(id, 10)));
    }console.log(id);
     if (location.pathname === '/') {
      id = 0;
      setTitle(boards[id].title);
    }
    else if (location.pathname === '/add/board')
      setTitle("Add Board");
    else if (location.pathname === '/add/postit')
      setTitle("Add PostIt");
  }, [location.pathname]);

  const handleUserMenuOpen = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleBoardMenuOpen = (event) => {
    setBoardAnchorEl(event.currentTarget);
  };

  const handleAddMenuOpen = (event) => {
    setAddAnchorEl(event.currentTarget);
  };

  const handleBoardMenuClose = () => {
    setBoardAnchorEl(null);
  };

  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  const handleAddMenuClose = () => {
    setAddAnchorEl(null);
  };

  const changeBoard = index => {
    console.log(index);
    if (parseInt(index, 10) > -1) {
      setTitle(boards[index].title);
      dispatch(setBoard(parseInt(index, 10)));
      handleBoardMenuClose();
    }
  };

  const handleDeleteBoard = () => {
    dispatch(deleteBoard(id));
    if (id < boards.length - 1)
      setTitle(boards[parseInt(id + 1, 10)].title);
    else
      setTitle(boards[parseInt(id - 1, 10)].title);
  };

  const userMenuId = 'menu-account';
  const renderMenuUser = (
    <Menu
      anchorEl={userAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={userMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isUserMenuOpen}
      onClose={handleUserMenuClose}
    >
      <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleUserMenuClose}>My account</MenuItem>
    </Menu>
  );

  const boardMenuId = 'menu-board';
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
      {boards.map((board, index) => (
        <Link to={`/board/${index}`} className={classes.links} key={index}>
          <MenuItem onClick={() => changeBoard(index)}>{board.title}</MenuItem>
        </Link>
      ))}
    </Menu>
  );

  const addMenuId = 'menu-add';
  const renderMenuAdd = (
    <Menu
      anchorEl={addAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={addMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isAddMenuOpen}
      onClose={handleAddMenuClose}
    >
      <Link to="/add/board" className={classes.links} onClick={() => handleAddMenuClose} >
        <MenuItem >Add new Board</MenuItem>
      </Link>
      <Link to="/add/postit" className={classes.links} onClick={() => handleAddMenuClose}>
        <MenuItem >Add new POSTIT</MenuItem>
      </Link>
    </Menu>
  );


  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="open drawer"
            aria-controls={boardMenuId}
            onClick={handleBoardMenuOpen}
            color="inherit"
          //   aria-haspopup="true"
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
            edge="start"
            onClick={handleAddMenuOpen}
            color="inherit"
            aria-label="open drawer"
            aria-haspopup="true"
            aria-controls={addMenuId}
          >
            <AddIcon />
          </IconButton>
          <>
            {
              id > -1 ?
                <>
                  {
                    id > 0 ?
                      <>
                        <IconButton
                          color="primary"
                          aria-label="Next"
                          aria-haspopup="true"
                          onClick={() => dispatch(previousBoard(id))}
                        >
                          <Link to={`/board/${id - 1}`} className={classes.links} >
                            <NavigateBefore />
                          </Link>
                        </IconButton>
                      </>
                      : ""

                  }

                  {
                    id < boards.length - 1 ?
                      <>
                        <IconButton
                          color="primary"
                          aria-label="Next"
                          aria-haspopup="true"
                          onClick={() => dispatch(nextBoard(id))}
                        >
                          <Link to={`/board/${id + 1}`} className={classes.links} >
                            <NavigateNextIcon />
                          </Link>
                        </IconButton>
                      </>
                      : ""
                  }


                  <IconButton
                    color="inherit"
                    aria-label="Next"
                    aria-haspopup="true"
                  >
                    <Link to={`/update/board/${id}`} className={classes.links}>
                      <UpdateIcon />
                    </Link>
                  </IconButton>
                </>
                : null

            }
            <IconButton
              edge="start"
              onClick={() => handleDeleteBoard}
              color="inherit"
              aria-label="open drawer"
              aria-haspopup="true"
            >
              <Link to={`/board/${id < boards.length - 1 ? id : id - 1}`} className={classes.links} >
                <DeleteIcon className={classes.iconHover} />
              </Link>

            </IconButton>
          </>
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
              aria-controls={userMenuId}
              aria-haspopup="true"
              onClick={handleUserMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>
      {renderMenuUser}
      {renderMenuBords}
      {renderMenuAdd}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimarySearchAppBar)
