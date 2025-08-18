import streamlit as st
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import os

st.set_page_config(
    page_title="Team Sashwat - Disease Prediction",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.markdown("""
    <style>
    :root {
        --primary: #005b96;
        --secondary: #1a3e72;
        --accent: #4caf50;
        --text: #ffffff;
        --light: #1a3e72;
    }
    
    html, body, [class*="css"] {
        color: var(--text) !important;
    }
    
    .main {
        background-color: var(--light);
    }
    
    .sidebar .sidebar-content {
        background-color: var(--primary) !important;
        color: white;
    }
    
    .stButton>button {
        background-color: var(--accent);
        color: black !important;
        border-radius: 8px;
        padding: 12px 28px;
        font-weight: 500;
        border: none;
        transition: all 0.3s;
    }
    
    .stButton>button:hover {
        background-color: #3d8b40;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .prediction-card {
        background-color: var(--secondary);
        border-radius: 12px;
        padding: 25px;
        margin: 15px 0;
        border-left: 5px solid var(--accent);
        box-shadow: 0 4px 12px rgba(0,91,150,0.1);
    }
    
    h1, h2, h3, h4, h5, h6 {
        color: var(--text) !important;
    }
    
    .stMultiSelect div[role="button"] {
        border: 2px solid var(--accent);
        border-radius: 8px;
        color: black !important;
    }
    
    .stProgress > div > div > div {
        background-color: var(--accent);
    }
    
    .disclaimer {
        background-color: #2a4a7c;
        border-radius: 8px;
        padding: 15px;
        border-left: 4px solid var(--accent);
    }
    
    p, div, span, label {
        color: white !important;
    }
    
    .st-bd, .st-bc, .st-bb, .st-at, .st-ar, .st-aq, .st-ap, .st-ao, .st-an, .st-am, .st-al, .st-ak, .st-aj, .st-ai, .st-ah, .st-ag, .st-af, .st-ae, .st-ad, .st-ac, .st-ab, .st-aa, .st-z, .st-y, .st-x, .st-w, .st-v, .st-u, .st-t, .st-s, .st-r, .st-q, .st-p, .st-o, .st-n, .st-m, .st-l, .st-k, .st-j, .st-i, .st-h, .st-g, .st-f, .st-e, .st-d, .st-c, .st-b, .st-a {
        color: black !important;
    }
    </style>
    """, unsafe_allow_html=True)

st.markdown("""
<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <h1 style="margin: 0; color: white !important;">🏥 Team Sashwat : Where Innovation Meets Healthcare</h1>
    <span style="margin-left: auto; font-size: 16px; color: white !important;">Medical Diagnostic Assistant</span>
</div>
""", unsafe_allow_html=True)

st.markdown("""
<p style="font-size: 16px;">
Select your symptoms from the list below to receive a preliminary assessment. 
Our AI-powered diagnostic tool provides potential conditions based on your symptoms.
</p>
""", unsafe_allow_html=True)

symptoms = [
    'Fever', 'Cough', 'Headache', 'Skin rash', 'Fatigue', 
    'Nausea', 'Vomiting', 'Diarrhea', 'Body aches', 'Chills'
]

diseases = [
    'Common Cold', 'Influenza (Flu)', 'Food Poisoning', 
    'Chicken Pox', 'Dengue Fever', 'Malaria', 
    'COVID-19', 'Allergic Reaction', 'Stomach Flu'
]

data = {
    'Fever': [1, 1, 1, 1, 1, 0, 0, 1, 1],
    'Cough': [1, 1, 0, 0, 0, 0, 0, 1, 0],
    'Headache': [0, 1, 0, 1, 1, 0, 1, 0, 0],
    'Skin rash': [0, 0, 0, 1, 0, 0, 0, 1, 0],
    'Fatigue': [0, 1, 1, 0, 1, 1, 1, 0, 1],
    'Nausea': [0, 0, 1, 0, 0, 1, 0, 0, 1],
    'Vomiting': [0, 0, 1, 0, 0, 1, 0, 0, 1],
    'Diarrhea': [0, 0, 1, 0, 0, 0, 0, 0, 1],
    'Body aches': [0, 1, 0, 0, 1, 0, 1, 0, 1],
    'Chills': [0, 1, 0, 0, 1, 0, 0, 0, 1],
    'disease': [0, 1, 2, 3, 4, 5, 6, 7, 8]  
}

df = pd.DataFrame(data)
X = df[symptoms]
y = df['disease']

model = DecisionTreeClassifier(random_state=42)
model.fit(X, y)

with st.sidebar:
    st.markdown("""
    <div style="padding: 10px; border-bottom: 1px solid #e3f2fd; margin-bottom: 20px;">
        <h2 style="margin: 0;">🩺 About</h2>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    <p>
    This clinical decision support system uses artificial intelligence to analyze symptom patterns and suggest possible conditions.
    </p>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    <div style="background-color: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4 style="margin-top: 0;">⚕️ Important Notice</h4>
        <p style="font-size: 14px; margin-bottom: 0;">
        This tool is not a substitute for professional medical diagnosis. Always consult a healthcare provider for medical concerns.
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("---")
    
    st.markdown("""
    <div>
        <h4>🔍 Model Information</h4>
        <p>• Decision Tree Classifier</p>
        <p>• Trained on clinical symptom patterns</p>
        <p>• {0} possible conditions</p>
        <p>• {1} symptom indicators</p>
    </div>
    """.format(len(diseases), len(symptoms)), unsafe_allow_html=True)

st.markdown("### Patient Symptom Intake Form")

with st.container():
    col1, col2 = st.columns([3, 1])
    with col1:
        selected_symptoms = st.multiselect(
            "**Select all current symptoms:**",
            options=symptoms,
            help="Check all symptoms you're currently experiencing"
        )
    with col2:
        st.markdown("<div style='height: 27px'></div>", unsafe_allow_html=True)
        predict_btn = st.button("Analyze Symptoms")  # Removed type="primary" parameter for compatibility

if predict_btn:
    if not selected_symptoms:
        st.warning("Please select at least one symptom to analyze")
    else:
        input_data = [[1 if symptom in selected_symptoms else 0 for symptom in symptoms]]
        
        prediction = model.predict(input_data)[0]
        probabilities = model.predict_proba(input_data)[0]
        
        st.markdown("---")
        st.markdown("## Clinical Assessment Results")
        
        st.markdown(f"""
        <div class="prediction-card">
            <div style="display: flex; align-items: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"/>
                    <path d="M10 14.17L16.59 7.58L18 9L10 17L6 13L7.41 11.59L10 14.17Z" fill="white"/>
                </svg>
                <h3 style="margin: 0;">Primary Diagnosis</h3>
            </div>
            <h2 style="margin-top: 10px;">{diseases[prediction]}</h2>
            <div style="display: flex; align-items: center;">
                <div style="width: 100px; height: 8px; background-color: #e0e0e0; border-radius: 4px; margin-right: 10px;">
                    <div style="width: {probabilities[prediction]*100}%; height: 100%; background-color: #4caf50; border-radius: 4px;"></div>
                </div>
                <span style="font-weight: bold;">{probabilities[prediction]*100:.1f}% confidence</span>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("#### Differential Diagnoses")
        st.markdown("<p>Other possible conditions based on symptoms:</p>", unsafe_allow_html=True)
        
        top_indices = probabilities.argsort()[::-1][:3]
        
        for idx in top_indices:
            if idx != prediction or probabilities[idx] == probabilities[top_indices[0]]:
                st.markdown(f"""
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="font-weight: bold;">{diseases[idx]}</span>
                        <span>{probabilities[idx]*100:.1f}%</span>
                    </div>
                    <div style="width: 100%; height: 6px; background-color: #e0e0e0; border-radius: 3px;">
                        <div style="width: {probabilities[idx]*100}%; height: 100%; background-color: #4caf50; border-radius: 3px;"></div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
        
        st.markdown("---")
        st.markdown("## Next Steps")
        
        precaution_url = os.getenv('PRECAUTION_SERVICE_URL', 'http://localhost:5000')
        st.markdown(f"""
        <a href="{precaution_url}" target="_blank">
            <button style="
                background-color: #4CAF50;
                color: white;
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
                text-decoration: none;
                display: inline-block;
            ">
                🩹 Get Precautions
            </button>
        </a>
        """, unsafe_allow_html=True)
        
        st.markdown("""
        <p style="margin-top: 10px;">
        Click the button above to get detailed precautions and recommendations for your diagnosed condition.
        </p>
        """, unsafe_allow_html=True)
