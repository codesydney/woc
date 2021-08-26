import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from "../../../res/img/woc.jpg";
import { Container, Grid } from "@material-ui/core";
import EventCard from "./EventCard";
import styles from "./UserEvent.style";

/* We upload all the images with titles and date from the user details*/
const slideImages = [
    {
        id: "001",
        url: img1,
        title: "Placeholder Event 1",
        date: "05-05-20201",
    },
    {
        id: "002",
        url: img1,
        title: "Placeholder Event 2",
        date: "05-04-20201",
    },
    {
        id: "003",
        url: img1,
        title: "Placeholder Event 3",
        date: "05-03-20201",
    },
    {
        id: "004",
        url: img1,
        title: "Placeholder Event 4",
        date: "05-02-20201",
    },
];

const responsiveCarousel = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};



/* NOTE: the carousel is fine but for now needs a lot of refining */
const UserEvents = () => {
    const classes = styles();

    return (
        <>
            <Container>
                <h2>Upcoming Events</h2>
                <Grid container clasName={classes.root} justify={"center"}>
                    <Grid item className={classes.backgroundStyle} md={11}>
                        <Carousel responsive={responsiveCarousel} itemClass={"spacing=2"}>
                            {slideImages.map((item) => {
                                return (
                                    <Grid item={true}>
                                        <EventCard key={item.id} event={item}/>
                                    </Grid>
                                );
                            })}
                        </Carousel>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default UserEvents;
