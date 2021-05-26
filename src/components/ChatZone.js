import React from "react";
import Snippet from "../Snippet";

export default function ChatZone(props) {
  const history = props.chatItem;

  return (
    <div className="innerShadow">
      <div className="chatWrap">
        {history.map((item, index) => (
          <Snippet key={index} index={index} item={item} />
        ))}
      </div>
    </div>
  );
}
