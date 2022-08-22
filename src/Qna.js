import React from "react";
import { withRouter } from "react-router-dom";

class Qna extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      currentStep: 0,
      answerSelection: [],
    };
  }

  fetchUser = () => {
    const { category, difficulty } = this.props;

    this.setState(
      () => ({
        data: null,
      }),
      () => {
        fetch(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty.toLowerCase()}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.setState({
              data: data.results,
            });
          });
      }
    );
  };

  answerSelection = (selectedAnswer) => {
    if (
      selectedAnswer === this.state.data[this.state.currentStep].correct_answer
    ) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
    }

    const answerSelection = this.state.answerSelection.slice(0);
    answerSelection.push(selectedAnswer);

    this.setState({
      answerSelection: answerSelection,
    });

    if (this.state.currentStep < this.state.data.length - 1) {
      this.setState((prevState) => ({
        currentStep: prevState.currentStep + 1,
      }));
    }
  };

  shuffleAnswer = () => {
    return [
      ...this.state.data[this.state.currentStep].incorrect_answers,
      this.state.data[this.state.currentStep].correct_answer,
    ].sort(() => Math.floor(Math.random() - 0.5));
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    if (!this.state.data) {
      return (
        <div className="loading-container">
          <span className="loader"></span>{" "}
        </div>
      );
    }

    return (
      <>
        <div className="container">
          {this.state.data && (
            <div className="card flex col center">
              <h1>
                Question no :- <small>{this.state.currentStep + 1}</small>
              </h1>
              <h3>
                Difficulty :{" "}
                {this.state.data[this.state.currentStep].difficulty}
              </h3>
              <p>
                <strong>Question:-</strong>
                {this.state.data[this.state.currentStep].question}
              </p>
              {this.shuffleAnswer().map((option) => (
                <button
                  className={
                    this.state.answer ===
                    this.state.data[this.state.currentStep].incorrect_answers[0]
                      ? "active"
                      : ""
                  }
                  onClick={() => this.answerSelection(option)}
                >
                  {option}
                </button>
              ))}

              {this.state.currentStep === this.state.data.length - 1 ? (
                <button
                  className="next-btn"
                  onClick={() => {
                    this.props.onSubmit(
                      this.state.data,
                      this.state.answerSelection,
                      this.state.score
                    );
                    // this.props.history.push("/score", {
                    //   score: this.state.score,
                    //   data: this.state.data,
                    //   answers: this.state.answerSelection,
                    // });
                  }}
                >
                  Submit
                </button>
              ) : null}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(Qna);
