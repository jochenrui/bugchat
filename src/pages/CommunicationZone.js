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
      history: [
        {
          user: "ducky",
          question: "How can I help?",
          tags: null,
          link: null,
        },
      ],
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

  handleChange(input) {
    this.setState({
      value: input,
    });
  }

  handleSubmit(event) {
    if (
      // disabled send if no message is entered
      (event.key === "Enter" || event.nativeEvent.type === "click") &&
      this.state.value.length > 0
    ) {
      let addedMessage = {
        user: "user",
        question: this.state.value,
      };
      this.setState({
        value: "",
        lastQuestion: this.state.value,
        history: [...this.state.history, addedMessage],
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
      `Maybe one of these topics interests you? ${this.state.tags
        .slice(0, 5)
        .join(" ")}`,
      "can you be more specific?",
      "I need more details for this one",
    ];

    // check if the last question contains any popular tags
    const words = this.state.lastQuestion.split(" ");
    const foundTags = words.filter((word) =>
      this.state.tags.includes(word.toLowerCase())
    );

    if (foundTags.length > 0) {
      fetch(
        `https://api.stackexchange.com/2.2/search/advanced?%20order=desc&site=stackoverflow&accepted=true&sort=votes&pageSize=5&q=${foundTags.join(
          " AND "
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          const suggestions = [
            {
              user: "ducky",
              question: "Maybe one of these questions could help you:",
            },
          ];
          data.items.map((question) => {
            suggestions.push({
              user: "ducky",
              question: question.title,
              tags: question.tags.join(" "),
              link: question.link,
            });
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
        history: [
          ...this.state.history,
          {
            user: "ducky",
            question: response,
          },
        ],
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
