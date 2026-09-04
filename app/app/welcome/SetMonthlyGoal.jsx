import { useActionState } from 'react';

import "./app.css";

async function submitGoals(previousState, formData) {
  const goal1 = formData.get("goal1")?.toString().trim() || "";
  const goal2 = formData.get("goal2")?.toString().trim() || "";
  const goal3 = formData.get("goal3")?.toString().trim() || "";

  try {
    await chrome.storage.local.set({
      monthlyGoal: {
        goal1,
        goal2,
        goal3,
      },
    });
    loadGoals();
    return {
      success: true,
      goals: {
        goal1,
        goal2,
        goal3,
      },
    };
  } catch (error) {
    console.error("Failed to save goals:", error);

    return {
      success: false,
      error: "Failed to save your goals. Please try again.",
    };
  }
}

async function loadGoals() {
    try {
      const result = await chrome.storage.local.get("monthlyGoal");
      const monthlyGoal = result.monthlyGoal || {
        goal1: "",
        goal2: "",
        goal3: "",
      };
      const monthlyGoalString = JSON.stringify(monthlyGoal);
      console.log("Loaded goals:", monthlyGoalString);
      return {
        success: true,
        goals: monthlyGoalString,
      };

    } catch (error) {
      console.error("Failed to load goals:", error);

      return {
        success: false,
        error: "Failed to load your goals. Please try again.",
      };
    }
  }

export function SetMonthlyGoal() {
  const [state, submitGoalsAction, isPending] = useActionState(
    submitGoals,
    {
      success: false,
      goals: {
        goal1: "",
        goal2: "",
        goal3: "",
      },
      error: null,
    }
  );


  return (
    <div id="hero">
      <h1 id="header">Set Your Monthly Goal</h1>

      <div id="card">
        <div className="goal-content">
          <h2>What would you like to work toward?</h2>

          <form action={submitGoalsAction}>
            <label htmlFor="goal1">
              My goal(s) for this month:
            </label>

            <input
              id="goal1"
              type="text"
              name="goal1"
              defaultValue={state?.goals?.goal1}
              disabled={isPending}
              placeholder="Enter your goal..."
            />

            <input
              id="goal2"
              type="text"
              name="goal2"
              defaultValue={state?.goals?.goal2}
              disabled={isPending}
              placeholder="Enter another goal..."
            />

            <input
              id="goal3"
              type="text"
              name="goal3"
              defaultValue={state?.goals?.goal3}
              disabled={isPending}
              placeholder="Enter another goal..."
            />

            <button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Set Goal"}
            </button>
          </form>

          {state.error && (
            <div className="goal-error">
              <p>{state.error}</p>
            </div>
          )}

          {state.success && (
            <div className="goal-confirmation">
              <h3>You've got this! 🌱</h3>

              <p>Your monthly goals have been set:</p>

              {state?.goals?.goal1 && (
                <p className="goal-text">{state.goals.goal1}</p>
              )}

              {state?.goals?.goal2 && (
                <p className="goal-text">{state.goals.goal2}</p>
              )}

              {state?.goals?.goal3 && (
                <p className="goal-text">{state.goals.goal3}</p>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}