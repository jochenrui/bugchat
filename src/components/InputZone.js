import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

export default function InputZone(props) {
  return (
    <Paper className="root">
      <InputBase
        className="input"
        placeholder="Enter Message..."
        inputProps={{ "aria-label": "Enter..." }}
        value={props.value}
        onKeyPress={props.handleSubmit}
        onChange={props.handleChange}
      />
      <IconButton
        className="iconButton"
        aria-label="Search"
        onClick={props.handleSubmit}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
