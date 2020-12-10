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
    case "LOADOLDMSG":
      return {
        ...state,
        messages: [...action.payLoad, ...state.messages],
      };
    case "ADDAUTOMESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payLoad],
        newMessage: true,
      };
    case "HIDENEWMSG":
      return {
        ...state,
        newMessage: false,
      };
    default:
      break;
  }
};

const ChatSystem = () => {
  //manage states & lifecycles
  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    isLoading: false,
    isTyping: false,
    interval: null,
    newMessage: false,
  });
  useEffect(() => {
    const interval = setInterval(() => autoMessage(), 6000);
    return () => {
      clearInterval(interval);
    };
  });

  // event handlers

  // new new fake message Automatically 
  // and set the typing status to true
  const autoMessage = () => {
    dispatch({ type: "TYPING" });
    setTimeout(() => {
      fakeCreator("auto fake msg");
      dispatch({ type: "TYPING" });
    }, 3000);
  };

  // message creator for auto or Manually creat msg 
  // create new message object and dispach action
  // to add to state.messages & hide new msg badge
  const fakeCreator = (value) => {
    let message = {
      id: state.messages.length + 1,
      text: value,
      sender: "fake user",
      date: new Date(),
    };
    dispatch({
      type: "ADDAUTOMESSAGE",
      payLoad: message,
    });
    setTimeout(()=>dispatch({ type: "HIDENEWMSG" }),2000);
  };

  // load more messages when scrolling down (end of messages)
  // create an array of messages and add to state
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

  // load more messages when scrolling up (load old messages)
  // create an array of messages and add them before 
  // other messages in state 
  const loadTop = () => {
    if (!state.isLoading) {
      dispatch({ type: "SETLOADSTATUS" });
      let test = [];
      let firstId = state.messages[0].id;
      setTimeout(() => {
        for (let i = 4; i >= 1; i--) {
          let yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          test.push({
            id: firstId - i,
            text: "top messages",
            sender: "fake user 2",
            date: yesterday,
          });
        }
        dispatch({
          type: "LOADOLDMSG",
          payLoad: test,
        });

        dispatch({ type: "SETLOADSTATUS" });
      }, 2000);
    }
  };

  // event handler for sending new message by
  // user inputs 
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

  // event handler for sending images
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

  return (
    <div className="mainDiv">
      <Container>
        <Paper elevation={5} className="chatContainer">
          <IsTyping check={state.isTyping} />
          <MainPaper
            isLoading={state.isLoading}
            messages={state.messages}
            newMessage={state.newMessage}
            fakeCreator={fakeCreator}
            loadMore={loadMore}
            loadTopMessage={loadTop}
          />
          <InputComponent
            sendHandler={sendMessage}
            sendImage={attachHandler}
          />
        </Paper>
      </Container>
    </div>
  );
};

export default ChatSystem;
