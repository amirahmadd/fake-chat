import React, { useState } from "react";
import { Grid, Paper, InputBase, IconButton, Button } from "@material-ui/core";
import Send from "@material-ui/icons/Send";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { makeStyles } from "@material-ui/core/styles";
import "./style/Input.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  chatInputs: {
    minHeight: 53,
    margin: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const InputComponent = ({ sendHandler, sendImage }) => {
  const [newMessage, setMessage] = useState("");
  const classes = useStyles();

  
  const InputHandler = (e) => {
    setMessage(e.target.value);
  };
  const sendMessage = () => {
    sendHandler(newMessage);
    setMessage("");
  };
  const attachHandler = (e) => {
    const file = e.target.files[0];
    sendImage(file);
  };
  return (
    <div>
      <Paper elevation={3} className={classes.chatInputs}>
        <Grid container justify="center">
          <Grid container justify="center" item xs={1}>
            <IconButton
              onClick={sendMessage}
              aria-label="Send"
              className={classes.margin}
              disabled={newMessage.trim() === ""}
            >
              <Send
                color={newMessage.trim() === "" ? "disabled" : "primary"}
                fontSize="inherit"
              />
            </IconButton>
          </Grid>
          <Grid container justify="center" item xs={9}>
            <InputBase
              fullWidth
              multiline
              rowsMax={3}
              className={classes.margin}
              placeholder="پیام جدید"
              inputProps={{ "aria-label": "naked" }}
              onChange={InputHandler}
              value={newMessage}
              id="input"
              name="input"
            />
          </Grid>
          <Grid container justify="center" item xs={1}>
            <input
              hidden
              accept="image/*"
              id="attach-file"
              multiple
              type="file"
              onChange={(e) => attachHandler(e)}
            />
            <label htmlFor="attach-file">
              <Button style={{ margin: 15, display: "flex" }} component="span">
                <AttachmentIcon
                  style={{ display: "flex" }}
                  color="action"
                  fontSize="default"
                />
              </Button>
            </label>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default InputComponent;
