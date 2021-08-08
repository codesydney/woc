import React, { useState, useEffect } from "react";
import random from "../../../../src/res/img/events5.svg";

import {
    Grid,
    Container,
    Card,
    Button,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    makeStyles,
    CardActions,
} from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 345,
    },
});

function redirect(url) {
    window.open("https://events.humanitix.com/" + url, "_blank");
}

const EventCard = (event, index) => {
    const classes = useStyles();
    let img = event.event.bannerImage ? event.event.bannerImage.url : random;
    let date = new Date(event.event.startDate);

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia component="img" alt="event banner" height="140" image={img} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {event.event.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {date.toDateString()}
                        <br></br>

                        {event.event.ticketTypes[0].price === 0 ? "Free" : event.event.ticketTypes[0].price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={() => redirect(event.event.slug)} size="small" color="primary">
                    Register here
                </Button>
            </CardActions>
        </Card>
    );
};

//API call to backend

function UserEvents() {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const apiResult = await fetch(`/api/events`, {
                method: "GET",
            });
            const body = await apiResult.json();
            const res = JSON.parse(body);
            setLoading(false);
            setResponse(res.events);
        };

        fetchEvents();
    }, []);

    return (
        <>
            <h2>Events</h2>
            <Container>
                <Grid container className="classes.second">
                    <Grid container spacing={4} style={{ paddingTop: "4em" }}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            response.map((item) => {
                                console.log(item);
                                return <Grid item={true}>{<EventCard key={item._id} event={item} />}</Grid>;
                            })
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default UserEvents;
