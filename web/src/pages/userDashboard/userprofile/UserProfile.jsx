import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Container, IconButton, Grid } from "@material-ui/core";
import styles from "./UserProfile.style";
import picture from "./profilepic.jpg";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import UploadPhoto from "./UploadPhoto";
import EditProfile from "./EditProfile";

const UserProfile = ({ profile }) => {
    const classes = styles();
    setFakeProfileData();

    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [location, setLocation] = useState(profile.location);
    const [occupation, setOccupation] = useState(profile.occupation);
    const [skills, setSkills] = useState(profile.skills);
    const [nationality, setNationality] = useState(profile.nationality);
    const [languages, setLanguages] = useState(profile.languages);
    const [interests, setInterests] = useState(profile.interests);

    //TODO:: get this data from database
    function setFakeProfileData() {
        profile.location = "Sydney, Australia";
        profile.occupation = "Software developer";
        profile.skills = "Web | CSS | .NET";
        profile.nationality = "Australian";
        profile.languages = "English | Spanish";
        profile.interests = "Painting | Reading | Web Design";
    }

    const openDialog = () => {
        setOpen(true);
    };

    const longName = (name.length + lastName.length + 1) < 13;
    
    return (
        <>
            <Container>
                {/* main logo and text */}
                <Grid container className={classes.root} align="center" sm={12}>
                    <Grid item className={classes.backgroundStyle}>
                        <img src={picture} className={classes.profilePic} alt="Profile" />
                        <div>
                            <UploadPhoto />
                            {longName ? (
                                <h3 className={classes.userName}>
                                    {name} {lastName}
                                </h3>
                             ) : (
                                <h3 className={classes.userName}>
                                    {name}
                                    <br/>
                                    {lastName}
                                </h3>
                            )}
                            
                            <h5 className={classes.userOccupation}>
                                {" "}
                                <LocationOnOutlinedIcon /> {location}
                            </h5>
                        </div>
                        <br></br>
                    </Grid>

                    <Grid className={classes.userInfo} item sm={12} md={8} lg={8}>
                        <IconButton onClick={openDialog} style={{ marginLeft: "470px" }}>
                            <EditIcon />
                        </IconButton>
                        <div className={classes.profileInnerDiv}>
                            <h1>
                                Occupation <span style={{ marginLeft: "49px", color: "	#A8A8A" }}>{occupation}</span>
                            </h1>
                            <hr />
                            <h1>
                                Nationality <span style={{ marginLeft: "48px", color: "	#A8A8A" }}>{nationality}</span>
                            </h1>
                            <hr />

                            <h1>
                                Language
                                <span style={{ marginLeft: "66px", color: "	#A8A8A" }}>{languages}</span>
                            </h1>
                            <hr />
                            <h1>
                                Skills <span style={{ marginLeft: "95px", color: "	#A8A8A" }}>{skills}</span>
                            </h1>
                            <hr />
                            <h1>
                                Interests
                                <span style={{ marginLeft: "68px", color: "	#A8A8A" }}> {interests}</span>
                            </h1>
                            <hr />
                        </div>
                    </Grid>
                </Grid>
                <EditProfile
                    open={open}
                    onOpen={setOpen}
                    name={name}
                    onNameChange={setName}
                    lastName={lastName}
                    onLastNameChange={setLastName}
                    location={location}
                    onLocationChange={setLocation}
                    occupation={occupation}
                    onOccupationChange={setOccupation}
                    nationality={nationality}
                    onNationalityChange={setNationality}
                    languages={languages}
                    onLanguagesChange={setLanguages}
                    skills={skills}
                    onSkillsChange={setSkills}
                    interests={interests}
                    onInterestsChange={setInterests}
                />
            </Container>
        </>
    );
};

export default UserProfile;
