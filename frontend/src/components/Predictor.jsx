import { useState } from "react";
import axios from "axios";

function Predictor() {
  const [formData, setFormData] = useState({
    team1: "",
    team2: "",
    venue: ""
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
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px"
  }}
>
      <h1>IPL Match Predictor</h1>

      <select
  name="team1"
  style={{ width: "300px" }}
  onChange={handleChange}
>
  <option value="">Select Team 1</option>

  <option value="Mumbai Indians">Mumbai Indians</option>
  <option value="Chennai Super Kings">Chennai Super Kings</option>
  <option value="Royal Challengers Bangalore">Royal Challengers Bangalore</option>
  <option value="Kolkata Knight Riders">Kolkata Knight Riders</option>
  <option value="Delhi Daredevils">Delhi Daredevils</option>
  <option value="Delhi Capitals">Delhi Capitals</option>
  <option value="Kings XI Punjab">Kings XI Punjab</option>
  <option value="Punjab Kings">Punjab Kings</option>
  <option value="Rajasthan Royals">Rajasthan Royals</option>
  <option value="Sunrisers Hyderabad">Sunrisers Hyderabad</option>
  <option value="Deccan Chargers">Deccan Chargers</option>
</select>

      <br /><br />

      <select
  name="team2"
  style={{ width: "300px" }}
  onChange={handleChange}
>
  <option value="">Select Team 2</option>

  <option value="Mumbai Indians">Mumbai Indians</option>
  <option value="Chennai Super Kings">Chennai Super Kings</option>
  <option value="Royal Challengers Bangalore">Royal Challengers Bangalore</option>
  <option value="Kolkata Knight Riders">Kolkata Knight Riders</option>
  <option value="Delhi Daredevils">Delhi Daredevils</option>
  <option value="Delhi Capitals">Delhi Capitals</option>
  <option value="Kings XI Punjab">Kings XI Punjab</option>
  <option value="Punjab Kings">Punjab Kings</option>
  <option value="Rajasthan Royals">Rajasthan Royals</option>
  <option value="Sunrisers Hyderabad">Sunrisers Hyderabad</option>
  <option value="Deccan Chargers">Deccan Chargers</option>
</select>

      <br /><br />

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
  <option value="Rajiv Gandhi International Stadium">Rajiv Gandhi International Stadium</option>
  <option value="Sawai Mansingh Stadium">Sawai Mansingh Stadium</option>
  <option value="Punjab Cricket Association Stadium">Punjab Cricket Association Stadium</option>
  <option value="Arun Jaitley Stadium">Arun Jaitley Stadium</option>
  <option value="Dr DY Patil Sports Academy">Dr DY Patil Sports Academy</option>
  <option value="Brabourne Stadium">Brabourne Stadium</option>
</select>

      <br /><br />

    <select
  name="toss_winner"
  style={{ width: "300px" }}
  onChange={handleChange}
>
  <option value="">Select Toss Winner</option>

  <option value="Mumbai Indians">Mumbai Indians</option>
  <option value="Chennai Super Kings">Chennai Super Kings</option>
  <option value="Royal Challengers Bangalore">Royal Challengers Bangalore</option>
  <option value="Kolkata Knight Riders">Kolkata Knight Riders</option>
  <option value="Delhi Daredevils">Delhi Daredevils</option>
  <option value="Delhi Capitals">Delhi Capitals</option>
  <option value="Kings XI Punjab">Kings XI Punjab</option>
  <option value="Punjab Kings">Punjab Kings</option>
  <option value="Rajasthan Royals">Rajasthan Royals</option>
  <option value="Sunrisers Hyderabad">Sunrisers Hyderabad</option>
  <option value="Deccan Chargers">Deccan Chargers</option>
</select>

      <br /><br />

      <select
  name="toss_decision"
  style={{ width: "300px" }}
  onChange={handleChange}
>
  <option value="">Select Toss Decision</option>
  <option value="bat">Bat</option>
  <option value="field">Field</option>
</select>

      <br /><br />

      <button onClick={handlePredict}>
        Predict Winner
      </button>

      {result && (
  <div
    style={{
      marginTop: "30px",
      padding: "20px",
      border: "1px solid #444",
      borderRadius: "12px",
      width: "350px",
      textAlign: "center"
    }}
  >
          <h2>🏆 Prediction Result</h2>

          <h1>
  {result.predicted_winner}
</h1>

          <h3>
  Confidence: {result.confidence}%
</h3>
        <div
  style={{
    width: "100%",
    height: "20px",
    backgroundColor: "#333",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "10px"
  }}
>
  <div
    style={{
      width: `${result.confidence}%`,
      height: "100%",
      backgroundColor: "#4CAF50"
    }}
  />
</div>
        </div>
      )}
    </div>
  );
}

export default Predictor;