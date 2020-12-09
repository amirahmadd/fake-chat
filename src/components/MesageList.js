import React from "react";
import "./style/messageList.css";
import Message from "./Message";

const MessageList = (props) => {

  return (
    <div>
      <ul style={{ listStyleType: "none", display: "inline" }}>
        {props.messages !== undefined &&
          props.messages.map((message) => {
            return (
              <li key={message.id}>
                  <Message message={message} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default MessageList;
