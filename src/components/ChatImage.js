import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: 5,
    },
    // position:'bottom',
  },
  newImg: {
    maxWidth: 300,
    maxHeight: 300,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 1000,
  },
}));

const ChatImage = ({message}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      {message.image !== null ? (
        <>
          <Card onClick={handleOpen} className={classes.newImg}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={message.image.name}
                height="140"
                weight="140"
                image={message.image}
                title={message.image.name}
              />
            </CardActionArea>
          </Card>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <CardMedia
                  component="img"
                  alt={message.image.name}
                  image={message.image}
                  title="image"
                  style={{ maxWidth: 600 }}
                />
              </div>
            </Fade>
          </Modal>
        </>
      ) : (
        <CircularProgress
          style={{ marginTop: 50, marginBottom: 50 }}
          color="primary"
        />
      )}
      
    </>
  );
};
export default ChatImage;
