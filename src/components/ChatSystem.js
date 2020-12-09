import React, { useReducer, useEffect } from "react";
import { Container, Paper } from "@material-ui/core";
import MainPaper from "./MainPaper";
import InputComponent from "./Input";
import IsTyping from "./IsTyping";
import "./style/ChatSystem.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADDMESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payLoad],
      };
    case "LOADMORE":
      return {
        ...state,
        messages: [...state.messages, ...action.payLoad],
      };
    case "SETLOADSTATUS":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case "TYPING":
      return {
        ...state,
        isTyping: !state.isTyping,
      };
    case "INTERVAL":
      return {
        ...state,
        interval: action.payLoad,
      };
    default:
      break;
  }
};

const ChatSystem = () => {
  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    isLoading: false,
    isTyping: false,
    interval: null,
  });
  useEffect(() => {
    const interval = setInterval(() => autoMessage(), 8000);
    return () => {
        clearInterval(interval)
    }
  });
 
  const autoMessage = () => {
    dispatch({ type: "TYPING" });
    setTimeout(() => {
      fakeCreator("auto fake msg");
      dispatch({ type: "TYPING" });
    }, 3500);
  };

  const fakeCreator = (value) => {
    let message = {
      id: state.messages.length +1,
      text: value,
      sender: "fake user",
      date: new Date(),
    };
    dispatch({
      type: "ADDMESSAGE",
      payLoad: message,
    });
  };
  const loadMore = () => {
    if (!state.isLoading) {
      dispatch({ type: "SETLOADSTATUS" });

      setTimeout(() => {
        let test = [];
        for (let i = 1; i <= 5; i++) {
          test.push({
            id: state.messages.length + i,
            text: "test",
            sender: "fake user 2",
            date: new Date(),
          });
        }
        dispatch({
          type: "LOADMORE",
          payLoad: test,
        });

        dispatch({ type: "SETLOADSTATUS" });
      }, 2000);
    }
  };
  const sendMessage = (value) => {
    let message = {
      id: state.messages.length + 1,
      text: value,
      sender: "user",
      date: new Date(),
    };
    dispatch({
      type: "ADDMESSAGE",
      payLoad: message,
    });
  };
  const attachHandler = (file) => {
    try {
      const image = URL.createObjectURL(file);
      let message = {
        id: state.messages.length + 1,
        image: image,
        file: file,
        sender: "user",
        date: new Date(),
      };
      dispatch({
        type: "ADDMESSAGE",
        payLoad: message,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const typing = (value) => {};
  return (
    <div className="mainDiv">
      <Container>
        <Paper elevation={5} className="chatContainer">
          <IsTyping check={state.isTyping} />
          <MainPaper
            isLoading={state.isLoading}
            messages={state.messages}
            fakeCreator={fakeCreator}
            loadMore={loadMore}
          />
          <InputComponent
            typing={typing}
            sendHandler={sendMessage}
            sendImage={attachHandler}
          />
        </Paper>
      </Container>
    </div>
  );
};

export default ChatSystem;
