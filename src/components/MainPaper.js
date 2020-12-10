import React from "react";
import { Button, Badge } from "@material-ui/core";
import MessageList from "./MesageList";
import Loading from "./Loading";
import "./style/MainPaper.css";
const MainPaper = (props) => {
  const {
    messages,
    fakeCreator,
    loadMore,
    loadTopMessage,
    isLoading,
    newMessage,
  } = props;
  const clickHandler = () => {
    fakeCreator("testInput");
  };
  const load = (e) => {
    if (
      e.target.offsetHeight + e.target.scrollTop + 1 >=
      e.target.scrollHeight
    ) {
      loadMore();
    } else if (e.target.scrollTop === 0) {
      loadTopMessage();
    }
  };
  return (
    <div>
      {newMessage && <Badge color="secondary" variant="dot" /> }
      <div className="messageContainer" onScroll={(e) => load(e)}>
        <MessageList messages={messages} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <Button
          className="fakeBtn"
          variant="outlined"
          color="primary"
          onClick={clickHandler}
        >
          fake message
        </Button>
      )}
    </div>
  );
};

export default MainPaper;
