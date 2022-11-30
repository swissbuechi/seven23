import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';

import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from "@mui/material/TextField";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import Edit from "@mui/icons-material/Edit";
import Close from "@mui/icons-material/Close";

import PasswordField from '../forms/PasswordField';
import UserActions from "../../actions/UserActions";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function ConnectToAServer(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const server = useSelector((state) => state.server);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    setLoading(true);

    dispatch(UserActions.fetchToken(username, password))
      .then((res) => {
        return dispatch(UserActions.login());
      })
      .then((res) => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          setLoading(false);
          setError({
            non_field_errors: error.response.data.non_field_errors,
            username: error.response.data.username,
            password: error.response.data.password,
          });
        } else {
          setLoading(false);
          setError({
            non_field_errors: "An error occured",
          });
        }
      });
  };

  const handleForgottenPassword = () => {
    if (props.onForgottenPassword) {
      props.onForgottenPassword();
    } else {
      navigate("/password/reset");
    }
  };

  const handleChangeServer = () => {
    if (props.onChangeServer) {
      props.onChangeServer();
    } else {
      navigate("/server");
    }
  };

  const handleCancel = () => {
    if (props.onClose) {
      props.onClose();
    } else {
      navigate("/select-account-type");
    }
  };

  return (
    <div className="layout dashboard mobile">
      <header className="layout_header">
        <Container className="layout_header_top_bar">
          <h2>Log in</h2>
        </Container>
      </header>
      <main className="layout_content">
        <Container>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>

              <TextField
                label="Username"
                margin="normal"
                fullWidth
                disabled={loading}
                value={username}
                error={Boolean(error.username) || Boolean(error.non_field_errors)}
                helperText={error.username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <PasswordField
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                disabled={loading}
                value={password}
                error={Boolean(error.password) || Boolean(error.non_field_errors)}
                helperText={error.password}
                onChange={(event) => setPassword(event.target.value)}
              />
              { error.non_field_errors &&
                <Alert severity="error">
                  { error.non_field_errors }
                </Alert>
              }
              <Button
                variant="contained"
                disableElevation
                color="primary"
                fullWidth
                disabled={loading}
                type="submit"
              >
                Log in
              </Button>
              <Button
                fullWidth
                disabled={loading}
                color='inherit'
                onClick={() => handleChangeServer()}
                className="serverButton"
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
                  <p style={{ textAlign: 'left', textTransform: 'lowercase', marginTop: 0, marginBottom: 0 }}>
                    <small style={{ fontWeight: 300, textTransform: 'uppercase' }}>server</small>
                    <br />
                    {server.name}
                  </p>
                  <KeyboardArrowRightIcon />
                </Stack>
              </Button>
            </Stack>
          </form>
        </Container>
      </main>
      <footer className="layout_footer">
        <Container>
          <Stack direction='row' spacing={2} style={{ justifyContent: 'space-between'}}>
            
            <Button
              disabled={loading}
              onClick={() => handleCancel()}
              color='inherit'
            >
              Cancel
            </Button>

          <div>
            <Button
              disabled={loading}
              color='inherit'
              onClick={() => handleForgottenPassword()}
            >
              Forgotten password ?
            </Button>
          </div>

          </Stack>
        </Container>
      </footer>
    </div>
  );
}