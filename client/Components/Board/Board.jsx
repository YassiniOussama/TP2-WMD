import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
    useLocation, useParams, useRouteMatch
} from "react-router-dom";  

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
    let { id } = useParams();


    console.log(id);

    if (!id)
        id = index;

    return (

        <>
            <div style={{ display: "inline-block" }} className="app">
                {board[id].postits.map((posit, index) => (
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
                ))}
            </div>
        </>
    );
}

