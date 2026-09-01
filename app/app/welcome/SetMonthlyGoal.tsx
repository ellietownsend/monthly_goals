import { useState } from "react";
import "./app.css";

export function SetMonthlyGoal() {
  const [goal, setGoal] = useState("");
  const [goal2, setGoal2] = useState("");
  const [goal3, setGoal3] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="hero">
      <h1 id="header">Set Your Monthly Goal</h1>

      <div id="card">
        <div className="goal-content">
          <h2>What would you like to work toward?</h2>


          <form onSubmit={handleSubmit}>
            <label htmlFor="monthly-goal">
              My goal(s) for this month:
            </label>

            <input
              id="monthly-goal"
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Enter your goal..."
            />

             <input
              id="monthly-goal"
              type="text"
              value={goal2}
              onChange={(e) => setGoal2(e.target.value)}
              placeholder="Enter your goal..."
            />

             <input
              id="monthly-goal"
              type="text"
              value={goal3}
              onChange={(e) => setGoal3(e.target.value)}
              placeholder="Enter your goal..."
            />

            <button type="submit">
              Set Goal
            </button>
          </form>

          {submitted && (
            <div className="goal-confirmation">
              <h3>You've got this! 🌱</h3>
              <p>
                Your monthly goal has been set:
              </p>
              <p className="goal-text">{goal}</p>
              <p className="goal-text">{goal2}</p>
              <p className="goal-text">{goal3}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
