import React, { Component } from "react";

import InputZone from "../components/InputZone";
import ChatZone from "../components/ChatZone";
import ContactWindow from "../components/ContactWindow";

class CommunicationZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      lastQuestion: "",
      history: ["How can I help?"],
      tags: [],
      suggestions: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    fetch(
      "https://api.stackexchange.com/2.2/tags?pagesize=100&order=desc&sort=popular&site=stackoverflow"
    )
      .then((res) => res.json())
      .then((data) => {
        let tags = data.items.map((item) => item.name);
        this.setState({ tags: tags });
        console.log(tags);
      })
      .catch((err) => console.log(err));
  };

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event) {
    if (event.key === "Enter" || event.nativeEvent.type === "click") {
      let valueCopy = this.state.value;
      this.setState({
        value: "",
        lastQuestion: valueCopy,
        history: [...this.state.history, valueCopy],
      });

      setTimeout(
        function () {
          this.dialogueEngine();
        }.bind(this),
        3000
      );
    }
    this.cleanHistory();
  }

  dialogueEngine() {
    const answersBasic = [
      "can you elaborate?",
      "and why do you believe that is so?",
      "can you be more specific?",
      "what would be your guess?",
      "I need more details for this one",
    ];

    console.log(this.state.lastQuestion);
    const words = this.state.lastQuestion.split(" ");
    const foundTags = words.filter((word) => this.state.tags.includes(word));

    if (foundTags.length > 0) {
      fetch(
        `https://api.stackexchange.com/2.2/search/advanced?%20order=desc&site=stackoverflow&accepted=true&sort=votes&pageSize=5&q=${foundTags.join(
          " AND "
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          const suggestions = [];
          data.items.map((question) => {
            suggestions.push(
              `Question: ${question.title}\nTags: ${question.tags.join(
                " "
              )}\nLink: ${question.link}`
            );
          });
          this.setState({
            history: [...this.state.history, ...suggestions],
          });
        })
        .catch((err) => console.log(err));
    } else {
      let response =
        answersBasic[Math.floor(Math.random() * answersBasic.length)];
      this.setState({
        history: [...this.state.history, response],
      });
    }
  }

  cleanHistory() {
    const tempHistory = this.state.history;
    let newHistory = [];
    if (this.state.history.length > 12) {
      tempHistory.shift();
      tempHistory.shift();
      newHistory = tempHistory;
      this.setState({
        history: newHistory,
      });
    }
  }

  render() {
    return (
      <div className="chatHost innerShadow">
        <ContactWindow />
        <ChatZone chatItem={this.state.history} />
        <InputZone
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default CommunicationZone;
