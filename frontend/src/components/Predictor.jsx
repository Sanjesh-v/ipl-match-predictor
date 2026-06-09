import { useState } from "react";
import axios from "axios";

const teams = [
  "Mumbai Indians",
  "Chennai Super Kings",
  "Royal Challengers Bangalore",
  "Kolkata Knight Riders",
  "Delhi Capitals",
  "Punjab Kings",
  "Rajasthan Royals",
  "Sunrisers Hyderabad"
];

function Predictor() {
  const [formData, setFormData] = useState({
  team1: "",
  team2: "",
  venue: "",
  toss_winner: "",
  toss_decision: ""
});

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePredict = async () => {
     if (formData.team1 === formData.team2) {
    alert("Team 1 and Team 2 cannot be the same");
    return;
  }
  try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    }
  };

 return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}
  >
    <div
      style={{
        width: "500px",
        backgroundColor: "#1e293b",
        padding: "30px",
        borderRadius: "20px",
        textAlign: "center"
      }}
    >
      <h1>🏏 IPL Match Predictor</h1>

      <p
        style={{
          opacity: 0.8,
          marginBottom: "30px"
        }}
      >
        Predict IPL match winners using Machine Learning
      </p>

      <div style={{ marginBottom: "20px" }}>
        <label>Team 1</label>
        <br />
        <select
          name="team1"
          style={{ width: "300px" }}
          onChange={handleChange}
        >
          <option value="">Select Team 1</option>
          {teams.map(team => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Team 2</label>
        <br />
        <select
          name="team2"
          style={{ width: "300px" }}
          onChange={handleChange}
        >
          <option value="">Select Team 2</option>

          {teams
            .filter(team => team !== formData.team1)
            .map(team => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Venue</label>
        <br />
        <select
          name="venue"
          style={{ width: "300px" }}
          onChange={handleChange}
        >
          <option value="">Select Venue</option>
          <option value="Wankhede Stadium">Wankhede Stadium</option>
          <option value="MA Chidambaram Stadium">MA Chidambaram Stadium</option>
          <option value="M Chinnaswamy Stadium">M Chinnaswamy Stadium</option>
          <option value="Eden Gardens">Eden Gardens</option>
          <option value="Rajiv Gandhi International Stadium">
            Rajiv Gandhi International Stadium
          </option>
          <option value="Sawai Mansingh Stadium">
            Sawai Mansingh Stadium
          </option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Toss Winner</label>
        <br />
        <select
          name="toss_winner"
          style={{ width: "300px" }}
          onChange={handleChange}
        >
          <option value="">Select Toss Winner</option>

          {teams.map(team => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Toss Decision</label>
        <br />
        <select
          name="toss_decision"
          style={{ width: "300px" }}
          onChange={handleChange}
        >
          <option value="">Select Toss Decision</option>
          <option value="bat">Bat</option>
          <option value="field">Field</option>
        </select>
      </div>

      <button
        onClick={handlePredict}
        disabled={
          !formData.team1 ||
          !formData.team2 ||
          !formData.venue ||
          !formData.toss_winner ||
          !formData.toss_decision
        }
      >
        Predict Winner
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#334155"
          }}
        >
          <h2>🏆 Prediction Result</h2>

          <h1
            style={{
              color: "#22c55e"
            }}
          >
            {result.predicted_winner}
          </h1>

          <h3>
            Confidence: {result.confidence}%
          </h3>

          <div
            style={{
              width: "100%",
              height: "20px",
              backgroundColor: "#475569",
              borderRadius: "10px"
            }}
          >
            <div
              style={{
                width: `${result.confidence}%`,
                height: "100%",
                backgroundColor: "#22c55e",
                borderRadius: "10px"
              }}
            />
          </div>
        </div>
      )}

      <p
        style={{
          marginTop: "30px",
          fontSize: "14px",
          opacity: 0.7
        }}
      >
        Built with React, FastAPI and Scikit-Learn
      </p>
    </div>
  </div>
);
}

export default Predictor;