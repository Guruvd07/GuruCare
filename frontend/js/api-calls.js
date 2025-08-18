// API Integration Functions
class MedicalAPI {
  constructor() {
    this.baseURLs = {
      auth: "http://localhost:3001",
      disease: "http://localhost:8501",
      precaution: "http://localhost:5000",
    }
  }

  // Authentication APIs
  async login(email, password) {
    const makeAPICall = async (url, method, data) => {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      return response.json()
    }
    return await makeAPICall(`${this.baseURLs.auth}/login`, "POST", {
      email,
      password,
    })
  }

  async register(userData) {
    const makeAPICall = async (url, method, data) => {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      return response.json()
    }
    return await makeAPICall(`${this.baseURLs.auth}/register`, "POST", userData)
  }

  // Disease Prediction API
  async predictDisease(symptoms) {
    const makeAPICall = async (url, method, data) => {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      return response.json()
    }
    return await makeAPICall(`${this.baseURLs.disease}/predict`, "POST", {
      symptoms,
    })
  }

  // Precaution API
  async getPrecautions(disease) {
    const makeAPICall = async (url, method, data) => {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      return response.json()
    }
    return await makeAPICall(`${this.baseURLs.precaution}/precautions`, "POST", {
      disease,
    })
  }

  // Update URLs for production
  updateURLs(newURLs) {
    this.baseURLs = { ...this.baseURLs, ...newURLs }
  }
}

// Initialize API instance
const medicalAPI = new MedicalAPI()
