import React from "react";
import Header from "./Header";
import Qna from "./Qna";
import Tags from "./Tags";
import Score from "./Score";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showQA: false,
      showScore: false,
      data: null,
      cat: null,
      difficulty: null,
    };
  }

  render() {
    return (
      <>
        <Header />

        {this.state.showQA ? (
          <Qna
            category={this.state.cat}
            difficulty={this.state.difficulty}
            onSubmit={(data, selectedAnswer, score) => {
              this.setState({
                showQA: false,
                showScore: true,
                data: data,
                score: score,
                selectedAnswer: selectedAnswer,
              });
            }}
          />
        ) : this.state.showScore ? (
          <Score
            data={this.state.data}
            answers={this.state.selectedAnswer}
            score={this.state.score}
          />
        ) : (
          <Tags
            onSubmit={(cat, difficulty) =>
              this.setState({
                showQA: true,
                cat: cat,
                difficulty: difficulty,
              })
            }
          />
        )}
      </>
    );
  }
}

export default App;
