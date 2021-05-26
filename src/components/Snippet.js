import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default function Snippet({ user, question, tags, link }) {
  return (
    <div>
      <Paper
        className="snippetBox"
        style={{
          float: user === "ducky" ? "left" : "right",
          backgroundColor: user === "ducky" ? "#6accc3" : "white",
          minHeight: "24px",
          minWidth: "30px",
        }}
      >
        {tags && link ? (
          <>
            <Typography component="h1">Question: {question}</Typography>
            <Typography component="p">Tags: {tags}</Typography>
            <Typography component="p">Link: {link}</Typography>
          </>
        ) : (
          <Typography component="h1">{question}</Typography>
        )}
      </Paper>
    </div>
  );
}
