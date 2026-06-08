from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI()

model = joblib.load("model/match_predictor.pkl")


class MatchInput(BaseModel):
    team1: str
    team2: str
    venue: str


@app.post("/predict")
def predict(match: MatchInput):

    data = pd.DataFrame([{
    "team1": match.team1,
    "team2": match.team2,
    "venue": match.venue,
    "toss_winner": match.toss_winner,
    "toss_decision": match.toss_decision
}])

    prediction = model.predict(data)[0]

    probabilities = model.predict_proba(data)[0]

    classes = model.classes_

    probability_dict = {
        team: round(float(prob) * 100, 2)
        for team, prob in zip(classes, probabilities)
    }

    return {
        "predicted_winner": prediction,
        "probabilities": probability_dict
    }