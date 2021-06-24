import React, { useState } from "react";
import { checkIsFormValid, validateInput } from "../../utils/formUtils";
import { useHistory, useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/copyright/Copyright";
import { FormHelperText } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const initialState = {
  password: {
    value: "",
    touched: false,
    hasError: true,
    error: "",
  },
  isFormValid: false,
};

function ResetPassword() {
  const [formState, setFormState] = useState(initialState);
  const [showError, setShowError] = useState(false);

  let { id } = useParams();
  console.log(id);

  const classes = useStyles();
  let history = useHistory();
  const apiUrl = "/api/resetpassword";

  const updatePassword = async (apiUrl, payload, config) => {
    try {
      // TODOS update post req once the endpoint is ready
      const response = await axios.post(apiUrl, payload, config)
      return response.data
    }
    catch(error) {
      return error.message
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const { hasError, error } = validateInput(name, value);
    const isFormValid = checkIsFormValid(name, value, hasError, error, formState);
    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
        hasError,
        error,
        touched: false,
      },
      isFormValid,
    }));
  };

  const handleOnBlur = (event) => {
    const { name, value } = event.target;
    const { hasError, error } = validateInput(name, value);
    const isFormValid = checkIsFormValid(name, value, hasError, error, formState);
    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
        hasError,
        error,
        touched: true,
      },
      isFormValid,
    }));
  };

  const handleReset = (event) => {
    event.preventDefault();
    console.log(`reset btn is clicked ...`);
    let tempFormState = {};
    console.table(tempFormState);

    let isFormValid = true;

    for (const name in formState) {
      const { value } = formState[name];
      const { hasError, error } = validateInput(name, value);

      if (hasError) {
        isFormValid = false;
      }

      if (name) {
        tempFormState[name] = {
          value,
          hasError,
          error,
          touched: true,
        };
      }
    }

    setFormState({
      ...tempFormState,
      isFormValid,
    });

    if (!isFormValid) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else {
      const payload = {
        password: formState.password.value,
      };

      const config = {
        
      }
      const response = updatePassword(apiUrl, payload, config);
      
      console.log('response is ', response);

      history.push("/login");
    
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {showError && <FormHelperText>please enter the info correctly</FormHelperText>}

        <form className={classes.form}>
          <Grid container spacing={2}>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="email"
                id="email"
                label="Email Address"
                type="email"
                value={id}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={formState.password.value}
                onChange={handleChange}
                onBlur={handleOnBlur}
                error={formState.password.touched && formState.password.hasError}
                helperText={formState.password.error}
              />
            </Grid>
          </Grid>

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleReset}
          >
            Reset
          </Button>

          {/* <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default ResetPassword;
