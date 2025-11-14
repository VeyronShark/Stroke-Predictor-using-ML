from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.model_selection import cross_val_score, RepeatedStratifiedKFold
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import PowerTransformer, OneHotEncoder
from sklearn.impute import SimpleImputer
from imblearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from joblib import dump

def load_data():
  df = pd.read_csv('./backend/stroke.csv')
  df = df.drop('id', axis=1)
  categorical = ['gender', 'hypertension', 'heart_disease', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']
  numerical = ['age', 'avg_glucose_level', 'bmi']
  y = df['stroke']
  x = df.drop('stroke', axis=1)
  return x, y, categorical, numerical

def evaluate_model(x, y, model):
  cv = RepeatedStratifiedKFold(n_splits = 10, n_repeats = 3, random_state = 42)
  scores = cross_val_score(model, x, y, scoring = 'roc_auc', cv = cv, n_jobs = -1)
  return scores

x, y, categorical, numerical = load_data()
print(x.shape, y.shape)

model = LinearDiscriminantAnalysis()

transformer = ColumnTransformer(transformers = [
  ('imp', SimpleImputer(strategy = 'median'), numerical),
  ('o', OneHotEncoder(handle_unknown = 'ignore'), categorical)
])

pipeline = Pipeline(steps = [
  ('t', transformer),
  ('p', PowerTransformer(method = 'yeo-johnson', standardize = True)),
  ('over', SMOTE()),
  ('m', model)
])

scores = evaluate_model(x, y, pipeline)
print("LDA %.3f (%.3f)" % (np.mean(scores), np.std(scores)))

plt.boxplot([scores], labels = ['LDA'], showfliers=True)
plt.show()

pipeline.fit(x, y)

dump(pipeline, './backend/stroke_prediction_model.joblib')