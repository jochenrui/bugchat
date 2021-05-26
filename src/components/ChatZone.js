import React from "react";
import Snippet from "./Snippet";

export default function ChatZone(props) {
  const history = props.chatItem;

  const renderChatMessages = history.map((item, index) => (
    <Snippet
      key={index}
      user={item.user}
      question={item.question}
      link={item.link}
      tags={item.tags}
    />
  ));

  return (
    <div className="innerShadow">
      <div className="chatWrap">{renderChatMessages}</div>
    </div>
  );
}
