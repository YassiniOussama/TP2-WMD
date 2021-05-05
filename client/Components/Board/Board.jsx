import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setBoard } from '../../actions';

const useStyles = makeStyles({
    app: {

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
    pos: {
        marginBottom: 12,
    },
});


export default function Board({ board, index }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        if(parseInt(id, 10)  > -1){
            if (parseInt(id, 10) !== index)
                dispatch(setBoard(parseInt(id, 10)));
            else
                dispatch(setBoard(parseInt(index)));
        }
    }, [id]);

    console.log(id);
    console.log(index);

    if (!id)
        id = index;

    return (

        <>
            <div style={{ display: "inline-block" }} className="app">

                {board[id] !== undefined ? board[id].postits.map((posit, index) => (
                    <>
                        <Card className={classes.root} key={index}>

                            <CardContent >
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {id}
                                </Typography>
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
        </>
    );
}

