import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Radio, RadioGroup, FormLabel, FormControlLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './FormStyle';
import { setBoard, createBoard } from '../../actions/index';
import { useHistory, useParams } from "react-router-dom";

const Form = ({ match }) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [board, setBoa] = useState({ title: '', postits: [] });
    let history = useHistory();
    let { id } = useParams();
    console.log(id);
    const bor = useSelector(state => state.boards[id]);
    console.log(bor);
  if(id && bor){
    useEffect(() => {
        if (parseInt(id, 10) > -1 && bor) {
            dispatch(setBoard(parseInt(id, 10)));
            setBoa(bor);
        }
    }, [id]);
  }



    console.log(useSelector(state => state.boards[id]));

    const handleSubmit = (e) => {
        e.preventDefault();
        /* if (user._id === 0) {
           dispatch(createUser(user));
           clear();
         } else {
           dispatch(updateUser(user._id, user));
           history.push(`/user/details/${match.params.id}`);
         }*/
        console.log(e);
    };

    const clear = () => {
        setBoa({ title: '', postits: [] });
    };



    return (
        <Paper className={classes.paper}>
            <Typography variant="h6">{'Creating a Memory'}</Typography>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <TextField name="title" variant="outlined" label={"title"} fullWidth value={board.title} onChange={(e) => setBoa({ ...board, title: e.target.value })} />



                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;