from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {
        "message": "IPL Match Predictor API Running"
    }
model = joblib.load("model/match_predictor.pkl")


class MatchInput(BaseModel):
    team1: str
    team2: str
    venue: str
    toss_winner: str
    toss_decision: str



@app.post("/predict")
def predict(match: MatchInput):
    try:
        data = pd.DataFrame([{
            "team1": match.team1,
            "team2": match.team2,
            "venue": match.venue,
            "toss_winner": match.toss_winner,
            "toss_decision": match.toss_decision
        }])

        prediction = model.predict(data)[0]
        probabilities = model.predict_proba(data)[0]
        confidence = max(probabilities)

        return {
            "predicted_winner": prediction,
            "confidence": round(float(confidence) * 100, 2)
        }

    except Exception as e:
        return {"error": str(e)}