import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { useParams, useLocation, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux'
import { setBoard, deletePostIt } from '../../actions';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';

const useStyles = makeStyles((theme) => ({
    app: {
        marginTop: 10,
    },
    root: {
        display: "inline-block",
        width: 355,
        marginTop: 100,
        marginRight: 15,
        justifyContent: 'spaceBetween',
        background: '#ffff98'
    },
    title: {
        fontSize: 14,
    },
    buttonAddPOSTIT: {
        marginBottom: 10,
    },
    btnDelete: {
        color: '#Ef0022',
        display: 'right',
        marginLeft: 210,
    },
    btnUpdate: {
        color: '#Ef0022',
        display: 'right',
        marginLeft: 210,
    },
    iconDeleteHover: {
        margin: theme.spacing.unit * 2,
        '&:hover': {
            color: red[800],
        },
    },
    iconUpdatHover: {
        margin: theme.spacing.unit * 2,
        '&:hover': {
            color: orange[800],
        },
    },
}));

const mapStateToProps = (state) => {
    return {
        boards: state.boards,
        index: state.index
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        nextBoard: () => dispatch(nextBoard(true)),
    }
}
function Board({ board, index }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    let id = useSelector(state => state.index);
    let boards = useSelector(state => state.boards);
    let { id_props } = useParams();
    let location = useLocation();

    useEffect(() => {

        console.log(id_props);
        console.log(id);
        if (id_props)
            if (parseInt(id_props, 10) > -1)
                dispatch(setBoard(parseInt(id_props, 10)))
        if (parseInt(id, 10) > -1) {
            if (parseInt(id, 10) !== id_props)
                dispatch(setBoard(parseInt(id_props, 10)));
            if (parseInt(id, 10) !== index)
                dispatch(setBoard(parseInt(id, 10)));
            else
                dispatch(setBoard(parseInt(index)));
        }
    }, [id]);

    useEffect(() => {
        if (location.pathname.substring(0, 7) === "/board/") {
            id = parseInt(location.pathname.substring(7), 10);
            dispatch(setBoard(parseInt(id, 10)));
        }
    }, [location.pathname]);

    const handleDeletePostIt = (indexPostIt) => {
        dispatch(deletePostIt(indexPostIt));
    };

    return (
        <>
            <div className={classes.app}>
                <div style={{ display: "inline-block" }} >
                    {boards[id] ? boards[id].postits.map((posit, index) => (
                        <>
                            <Card className={classes.root} key={index}>
                                <CardContent >
                                    <CardActions className={classes.cardActions}>
                                        <Button size="small" className={classes.btnUpdate}>
                                            <Link to={`/update/postit/${index}`} className={classes.links} >
                                                <UpdateIcon color="action" fontSize="default" className={classes.iconUpdatHover} />
                                            </Link>
                                        </Button>
                                        <Button size="small" className={classes.btnDelete} onClick={() => handleDeletePostIt(index)}>
                                            <Link to={`/board/${id}`} className={classes.links} >
                                                <DeleteIcon color="secondary" fontSize="default" className={classes.iconDeleteHover} />
                                            </Link>
                                        </Button>
                                    </CardActions>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {index}.{posit.title}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {posit.text}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                    <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>

                            </Card>
                        </>
                    )) : ""}
                </div>
            </div>
        </>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Board)

