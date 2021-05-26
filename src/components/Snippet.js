import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default function Snippet({ user, question, tags, link }) {
  return (
    <div>
      <Paper
        className="snippetBox"
        style={
          user === "ducky"
            ? { float: "left", backgroundColor: "#6accc3" }
            : { float: "right" }
        }
      >
        {tags && link ? (
          <>
            <Typography component="h1">Question: {question}</Typography>
            <Typography component="p">Tags: ${tags}</Typography>
            <Typography component="p">Link: ${link}</Typography>
          </>
        ) : (
          <Typography component="h1">{question}</Typography>
        )}
      </Paper>
    </div>
  );
}
