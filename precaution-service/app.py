from flask import Flask, render_template, request, jsonify
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=os.getenv('FRONTEND_URL', '*'))

# Mock precaution model since we don't have the actual .pkl file
class MockPrecautionModel:
    def predict(self, disease_list):
        disease = disease_list[0].lower()
        precautions = {
            'common cold': [
                "Get plenty of rest and sleep",
                "Drink lots of fluids, especially warm liquids",
                "Use a humidifier or breathe steam from hot shower",
                "Gargle with salt water for sore throat"
            ],
            'influenza (flu)': [
                "Stay home and rest for at least 24 hours after fever breaks",
                "Drink plenty of fluids to prevent dehydration",
                "Take antiviral medications if prescribed by doctor",
                "Cover coughs and sneezes to prevent spreading"
            ],
            'food poisoning': [
                "Stay hydrated with clear fluids",
                "Follow BRAT diet (Bananas, Rice, Applesauce, Toast)",
                "Avoid dairy, caffeine, alcohol, and fatty foods",
                "Seek medical attention if symptoms worsen"
            ],
            'chicken pox': [
                "Keep fingernails short to prevent scratching",
                "Take cool baths with oatmeal or baking soda",
                "Apply calamine lotion to reduce itching",
                "Stay isolated until all blisters have crusted over"
            ],
            'dengue fever': [
                "Get plenty of rest and sleep",
                "Drink lots of fluids to prevent dehydration",
                "Take paracetamol for fever (avoid aspirin)",
                "Seek immediate medical attention for severe symptoms"
            ],
            'malaria': [
                "Take prescribed antimalarial medications completely",
                "Get plenty of rest and fluids",
                "Use mosquito nets and repellents",
                "Seek immediate medical attention for complications"
            ],
            'covid-19': [
                "Isolate yourself from others for at least 5 days",
                "Monitor symptoms and oxygen levels",
                "Get plenty of rest and stay hydrated",
                "Seek medical attention if breathing becomes difficult"
            ],
            'allergic reaction': [
                "Identify and avoid the allergen trigger",
                "Take antihistamines as directed",
                "Apply cool compresses to affected areas",
                "Seek emergency care for severe reactions"
            ],
            'stomach flu': [
                "Rest and stay hydrated with clear fluids",
                "Eat bland foods when able to keep food down",
                "Avoid dairy, caffeine, and fatty foods",
                "Wash hands frequently to prevent spread"
            ]
        }
        return [precautions.get(disease, [
            "Consult with a healthcare professional",
            "Follow prescribed treatment plan",
            "Get adequate rest and nutrition",
            "Monitor symptoms and seek help if they worsen"
        ])]

# Initialize mock model
precaution_model = MockPrecautionModel()

def get_precautions(disease):
    precautions = precaution_model.predict([disease])[0]
    return precautions

@app.route('/health')
def health():
    return jsonify({"status": "OK", "service": "Precaution Service"})

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        disease = data.get('disease', '').strip()
        
        if not disease:
            return jsonify({'error': 'Please enter a disease name'}), 400

        precautions = get_precautions(disease)
        return jsonify({
            'disease': disease,
            'precautions': precautions,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({'error': f'Prediction error: {str(e)}'}), 500

@app.route('/api/precautions/<disease>')
def get_precautions_api(disease):
    try:
        precautions = get_precautions(disease)
        return jsonify({
            'disease': disease,
            'precautions': precautions,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({'error': f'Error getting precautions: {str(e)}'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
