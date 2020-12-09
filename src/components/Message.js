import React from "react";
import { Paper, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ChatImage from './ChatImage'
import "./style/messageList.css";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: 5,
    },
    position: "bottom",
  },
  myMessages: {
    backgroundColor: "lightgreen",
    padding: '6px',
    paddingLeft:'10px'
  },
  otherMessages: {
    backgroundColor: "lightblue",
    padding: '6px',
    paddingRight:'10px'
  },
  text: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    maxWidth: 325,
  },
}));
const Message = ({message}) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        alignItems="flex-end"
        justify={message.sender === "user" ? "flex-start" : "flex-end"}
        className={classes.root}
      >
        <Paper
          className={`
                      ${
                        message.sender === "user"
                          ? classes.myMessages
                          : classes.otherMessages
                      } message`}
          elevation={5}
        >
          <Grid container justify="flex-end" item xs={12}>
            {message.sender !== "user" && (
              <Typography
                justify="left"
                variant="caption"
                color="textSecondary"
              >
                {message.sender}
              </Typography>
            )}
          </Grid>
          {message.image === undefined ? (
            <Typography
              variant="h6"
              style={{ fontFamily: "B Yekan , tahoma" }}
              className="text"
            >
              {message.text}
            </Typography>
          ) :    <ChatImage message={message} />
          }
        </Paper>
      </Grid>
      <Typography
        variant="caption"
        align="inherit"
        style={{
          marginRight: 5,
          marginLeft: 5,
          fontFamily: "B Yekan , tahoma",
          float: `${message.sender === "user" ? "right" : "left"}`,
        }}
      >
        {new Date(message.date).getHours()}:
        {new Date(message.date).getMinutes()}
      </Typography>
    </>
  );
};
export default Message;
