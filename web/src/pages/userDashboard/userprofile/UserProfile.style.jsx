import { makeStyles } from "@material-ui/core/styles";
// import "../../components/navbar/NavBar.css";

const styles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "35px",
    },
    second: {
        backgroundColor: "#efe8eb",
    },
    paper: {
        // padding: theme.spacing(1),
        textAlign: "center",

        color: theme.palette.text.secondary,
    },
    modalBox: {
        //  width: "40%",
    },
    backgroundStyle: {
        paddingTop: "26px",
        border: "2px solid lightgrey",
        padding: "10px",
        borderRadius: "25px",
        backgroundColor: " #f2f2f2",
    },
    profilePic: {
        display: "inline - block",
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
    },
    userName: {
        fontWeight: "bold",
        fontSize: "2em",
        fontFamily: `'Roboto Slab', serif`,
    },
    userOccupation: {
        fontSize: "16px",
        fontFamily: `'Roboto Slab', serif`,
        marginBottom: "0px",
        color: "grey",
    },
    userInfo: {
        textAlign: "left",
        fontFamily: `'Roboto Slab', serif`,
        fontSize: "9px",
        //paddingTop: "40px !important",
        marginLeft: "10px",
        border: "2px solid lightgrey",
        padding: "10px",
        borderRadius: "25px",
        backgroundColor: "#f2f2f2",
        paddingLeft: "37px",
        color: "grey",
    },
}));

export default styles;
