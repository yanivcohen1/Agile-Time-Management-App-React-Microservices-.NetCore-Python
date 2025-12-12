# Python Backend Service

This is the secondary backend service, built with FastAPI and Python.

## 🚀 Technologies

*   **Framework**: FastAPI
*   **Database**: MongoDB (via Motor & Beanie ODM)
*   **Testing**: Pytest
*   **Package Manager**: pip

## 🛠 Setup & Installation

### Prerequisites
*   Python 3.10+
*   MongoDB

### Installation

1.  Create a virtual environment:
    `ash
    python -m venv venv
    `
2.  Activate the virtual environment:
    *   Windows: .\venv\Scripts\Activate
    *   Linux/Mac: source venv/bin/activate
3.  Install dependencies:
    `ash
    pip install -r requirements.txt
    `

## 🏃‍♂️ Running the Service

### Start Server
Runs the FastAPI app on port 5000 (default).

`ash
python app/main.py
`

### Seed Data
Populates the database with initial users and todos.

`ash
python seed.py
`

## 🧪 Testing

Runs the test suite using Pytest.

`ash
pytest
`

## ⚙️ Configuration
Settings are loaded from config.dev.yaml (default) or config.prod.yaml.
