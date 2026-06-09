import pandas as pd
import joblib

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load data
df = pd.read_csv("../data/matches.csv")

# Keep only required columns
df = df[
    [
        "team1",
        "team2",
        "venue",
        "toss_winner",
        "toss_decision",
        "winner"
    ]
]
# Remove rows with missing values
df = df.dropna()

# Features and target
X = df[
    [
        "team1",
        "team2",
        "venue",
        "toss_winner",
        "toss_decision"
    ]
]
y = df["winner"]

# One-hot encode categorical features
preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            [
                "team1",
                "team2",
                "venue",
                "toss_winner",
                "toss_decision"
            ]
        )
    ],
    remainder="passthrough"
)


# Create pipeline
model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("classifier", RandomForestClassifier(
            n_estimators=200,
            random_state=42
        ))
    ]
)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train model
model.fit(X_train, y_train)

# Predictions
predictions = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, predictions)

print(f"Accuracy: {accuracy:.2%}")

# Save model
joblib.dump(model, "model/match_predictor.pkl")

print("Model saved successfully")