medical-app-deployment/
├── auth-service/
│   ├── package.json
│   ├── server.js
│   ├── users.json
│   ├── public/
│   │   ├── css/
│   │   │   ├── bootstrap.min.css
│   │   │   ├── style.css
│   │   │   └── login.css
│   │   ├── js/
│   │   │   ├── bootstrap.min.js
│   │   │   ├── jquery.min.js
│   │   │   └── auth.js
│   │   ├── login.html
│   │   └── register.html
│   └── .env.example
│
├── disease-service/
│   ├── app.py
│   ├── requirements.txt
│   ├── disease_model.pkl
│   ├── static/
│   │   ├── css/
│   │   │   └── streamlit_style.css
│   │   └── js/
│   │       └── streamlit_custom.js
│   └── .env.example
│
├── precaution-service/
│   ├── app.py
│   ├── requirements.txt
│   ├── precaution_model.pkl
│   ├── templates/
│   │   └── index.html
│   ├── static/
│   │   ├── css/
│   │   │   ├── bootstrap.min.css
│   │   │   └── precaution.css
│   │   └── js/
│   │       ├── bootstrap.min.js
│   │       └── precaution.js
│   └── .env.example
│
├── frontend/
│   ├── index.html
│   ├── patient_dashboard.html
│   ├── contact.html
│   ├── about.html
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── style.css
│   │   ├── responsive.css
│   │   ├── medical-theme.css
│   │   └── dashboard.css
│   ├── js/
│   │   ├── bootstrap.min.js
│   │   ├── jquery.min.js
│   │   ├── main.js
│   │   ├── dashboard.js
│   │   └── api-calls.js
│   ├── img/
│   │   ├── logo.png
│   │   ├── hero-bg.jpg
│   │   ├── doctor1.jpg
│   │   ├── doctor2.jpg
│   │   ├── medical-icons/
│   │   │   ├── stethoscope.svg
│   │   │   ├── heart.svg
│   │   │   └── pills.svg
│   │   └── testimonials/
│   │       ├── patient1.jpg
│   │       └── patient2.jpg
│   ├── fonts/
│   │   ├── Roboto/
│   │   └── OpenSans/
│   ├── _redirects
│   └── README.md
│
├── deployment-files/
│   ├── render.yaml
│   ├── docker-compose.yml
│   ├── Dockerfile.auth
│   ├── Dockerfile.disease
│   ├── Dockerfile.precaution
│   └── nginx.conf
│
├── scripts/
│   ├── deploy.sh
│   ├── local-setup.sh
│   └── test-services.sh
│
├── docs/
│   ├── DEPLOYMENT_INSTRUCTIONS.md
│   ├── API_DOCUMENTATION.md
│   ├── TROUBLESHOOTING.md
│   └── USER_GUIDE.md
│
├── config/
│   ├── service-urls.json
│   ├── development.json
│   └── production.json
│
└── README.md
