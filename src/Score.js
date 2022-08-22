import { Redirect, withRouter } from "react-router-dom";

function Score(props) {
  if (!props.data) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="container">
        <h3 className="flex center">Your Score is : {props.score || 0}</h3>
        <div className="score-card flex center">
          <table>
            <tr>
              <th scope="col">IsCorrect</th>
              <th scope="col">No.</th>
              <th scope="col">Question</th>
              <th scope="col">Correct Answer</th>
              <th scope="col">Your Answer</th>
            </tr>
            {props.data.map((info, i) => {
              return (
                <tr>
                  <td>
                    {info.correct_answer === props.answers[i] ? (
                      <i class="fa-solid fa-circle-check"></i>
                    ) : (
                      <i class="fa-solid fa-circle-xmark"></i>
                    )}
                  </td>
                  <td>{i + 1}.</td>
                  <td>{info.question}</td>
                  <td>{info.correct_answer}</td>
                  <td>{props.answers[i]}</td>
                </tr>
              );
            })}{" "}
          </table>
        </div>
      </div>
    </>
  );
}

export default withRouter(Score);
