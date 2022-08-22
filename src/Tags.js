import React from "react";
import { withRouter } from "react-router-dom";

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      activeCategory: "",
      difficulty: "",
      id: "",
    };
  }

  handleClick = (cat) => {
    this.setState({ activeCategory: cat });
  };

  fetchUser = () =>
    this.setState(
      () => ({
        data: null,
      }),
      () => {
        fetch(`https://opentdb.com/api_category.php`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.setState({
              data,
            });
          });
      }
    );

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
        <div>
          <h2>Select Categories</h2>
          <div className="container flex wrap">
            {this.state.data.trivia_categories.map((cat) => {
              return (
                <div className="tag-btn ">
                  <button
                    className={
                      this.state.activeCategory === cat.id ? "active" : ""
                    }
                    onClick={() => {
                      this.setState({
                        activeCategory: cat.id,
                      });
                    }}
                  >
                    {cat.name}
                  </button>
                </div>
              );
            })}
          </div>
          <h2>Select Difficulty Level</h2>
          <div className="flex wrap center">
            {[
              { difficulty: "Easy" },
              { difficulty: "Medium" },
              { difficulty: "Hard" },
            ].map((cat) => {
              return (
                <div className="tag-btn ">
                  <button
                    className={
                      this.state.difficulty === cat.difficulty ? "active" : ""
                    }
                    onClick={() => {
                      this.setState({
                        difficulty: cat.difficulty,
                      });
                    }}
                  >
                    {cat.difficulty}
                  </button>
                </div>
              );
            })}
          </div>
          {this.state.activeCategory && this.state.difficulty ? (
            <div className="flex center">
              {" "}
              <button
                className="quiz-btn"
                onClick={
                  () =>
                    this.props.onSubmit(
                      this.state.activeCategory,
                      this.state.difficulty
                    )
                  // this.props.history.push(
                  //   `/quiz/${this.state.activeCategory}/${this.state.difficulty}`
                  // )
                }
              >
                Start Quiz
              </button>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default withRouter(Tags);
