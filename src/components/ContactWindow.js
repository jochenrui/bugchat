import React from "react";

export default function ContactWindow({ isTyping }) {
  return (
    <div className="headerWrapper">
      <span className="contactName">
        Dr. Rubberduck {isTyping ? " is typing ..." : ""}
      </span>
    </div>
  );
}
