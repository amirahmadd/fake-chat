import React from "react";
import { CircularProgress } from "@material-ui/core";

const Loading = () => {
  return <CircularProgress style={{ position:'fixed' }} color="primary" />;
};

export default Loading;
