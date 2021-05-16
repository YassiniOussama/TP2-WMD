import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './FormStyle';
import { setBoard, createPostIt, updatePostIt } from '../../actions/index';
import { useHistory, useParams } from "react-router-dom";

const FormPOSTIT = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [postit, setPostit] = useState({ title: '', text: '' });
    const id_board = useSelector(state => state.index);
    let { idx_postit } = useParams();
    const pos = useSelector(state => state.boards[id_board].postits[idx_postit]);
    let history = useHistory();

    if (idx_postit && pos) {
        useEffect(() => {
            if (parseInt(idx_postit, 10) > -1 && pos) {
                dispatch(setBoard(parseInt(id_board, 10)));
                setPostit(pos);
            }
        }, [idx_postit]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!idx_postit) {
            dispatch(createPostIt(postit));
            history.push("/board/" + id_board);
            clear();
        } else {
            dispatch(updatePostIt(idx_postit, postit));
            history.push("/board/" + id_board);
            clear();
        }
    };

    const clear = () => {
        setPostit({ title: '', text: '' });
    };

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6">{idx_postit ? 'Update ' + postit.title : 'Creating a PostIT'}</Typography>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <TextField name="title" variant="outlined" label={"Title"} fullWidth value={postit.title} onChange={(e) => setPostit({ ...postit, title: e.target.value })} />
                <TextField name="text" variant="outlined" label={"Text"} fullWidth value={postit.text} onChange={(e) => setPostit({ ...postit, text: e.target.value })} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default FormPOSTIT;