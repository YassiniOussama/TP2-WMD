import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './FormStyle';
import { setBoard, createBoard, updateBoard } from '../../actions/index';
import { useHistory, useParams } from "react-router-dom";

const Form = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [board, setBoa] = useState({ title: '', notes: '' });
    let index = useSelector(state => state.index);
    let { id } = useParams();
    const bor = useSelector(state => state.boards[id]);
    const length = useSelector(state => state.boards.length);
    let history = useHistory();

    if (id && bor) {
        useEffect(() => {
            if (parseInt(id, 10) > -1 && bor) {
                dispatch(setBoard(parseInt(id, 10)));
                setBoa(bor);
            }
        }, [id]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(index);
        if (!id) {
            dispatch(createBoard(board));
            history.push("/board/" + length);
            clear();
        } else {
            setBoa(bor);
            console.log(bor);
            dispatch(updateBoard(board));
            history.push("/board/" + id);
        }
    };

    const clear = () => {
        setBoa({ title: '', notes: [] });
    };

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6">{id ? 'Update ' + board.title : 'Creating a Board'}</Typography>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <TextField name="title" variant="outlined" label={"Title"} fullWidth value={board.title} onChange={(e) => setBoa({ ...board, title: e.target.value })} />
                <TextField name="notes" variant="outlined" label={"Notes"} fullWidth value={board.notes} onChange={(e) => setBoa({ ...board, notes: e.target.value })} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;