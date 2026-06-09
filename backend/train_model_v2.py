import pandas as pd
import joblib
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

df = pd.read_csv("../data/matches.csv")

df = df.sort_values("date")
df = df.reset_index(drop=True)

def get_recent_form(df, team, current_index, n=5):

    previous_matches = df.iloc[:current_index]

    team_matches = previous_matches[
        (previous_matches["team1"] == team) |
        (previous_matches["team2"] == team)
    ]

    recent_matches = team_matches.tail(n)

    if len(recent_matches) == 0:
        return 0.5

    wins = (recent_matches["winner"] == team).sum()

    return wins / len(recent_matches)

team1_form = []
team2_form = []

for idx, row in df.iterrows():

    team1_form.append(
        get_recent_form(
            df,
            row["team1"],
            idx
        )
    )

    team2_form.append(
        get_recent_form(
            df,
            row["team2"],
            idx
        )
    )

df["team1_form"] = team1_form
df["team2_form"] = team2_form

df = df[
    [
        "team1",
        "team2",
        "venue",
        "toss_winner",
        "toss_decision",
        "winner",
        "team1_form",
        "team2_form"
    ]
].dropna()

print("Rows:", len(df))
print("Missing winners:", df["winner"].isna().sum())

print(df[
    [
        "team1",
        "team2",
        "winner",
        "team1_form",
        "team2_form"
    ]
].head(10))
print(df["winner"].value_counts().head())
X = df[
    [
        "team1",
        "team2",
        "venue",
        "toss_winner",
        "toss_decision",
        "team1_form",
        "team2_form"
    ]
]

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

y = df["winner"]

model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "classifier",
            RandomForestClassifier(
                n_estimators=200,
                random_state=42
            )
        )
    ]
)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions
)

print(f"Accuracy: {accuracy:.2%}")