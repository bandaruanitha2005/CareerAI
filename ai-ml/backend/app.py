
from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_db_connection
from pypdf import PdfReader
from werkzeug.security import generate_password_hash, check_password_hash
import re

app = Flask(__name__)
CORS(app)


# =====================================
# 1. RESUME ANALYSIS FUNCTION
# =====================================

def analyze_resume_text(resume_text):

    text = resume_text.lower()
    text = re.sub(r"-\s*\n\s*", "", text)
    text = re.sub(r"\s+", " ", text)

    skills_patterns = {
        "Python": [r"\bpython\b"],
        "Java": [r"\bjava\b"],
        "C++": [r"(?<!\w)c\+\+(?!\w)"],
        "SQL": [r"\bsql\b"],
        "HTML": [r"\bhtml\b"],
        "CSS": [r"\bcss\b"],
        "JavaScript": [r"\bjavascript\b", r"\bjs\b"],
        "React": [r"\breact(?:js)?\b"],
        "Flask": [r"\bflask\b"],
        "Django": [r"\bdjango\b"],
        "MySQL": [r"\bmysql\b", r"\bmy\s+sql\b"],
        "MongoDB": [r"\bmongodb\b", r"\bmongo\s*db\b"],
        "Machine Learning": [r"\bmachine learning\b"],
        "Deep Learning": [r"\bdeep learning\b"],
        "Data Analysis": [
            r"\bdata analysis\b",
            r"\bdata analytics\b"
        ],
        "Power BI": [r"\bpower\s*bi\b"],
        "Git": [r"\bgit\b", r"\bgithub\b"],
        "AWS": [r"\baws\b", r"\bamazon web services\b"],
        "DSA": [
            r"\bdsa\b",
            r"\bdata structures and algorithms\b",
            r"\bdata structures\b"
        ],
        "OOP": [
            r"\boop\b",
            r"\boops\b",
            r"\bobject oriented programming\b"
        ],
        "REST API": [
            r"\brest\s*api\b",
            r"\brestful\s*api\b"
        ],
        "Node.js": [r"\bnode\.?js\b"],
        "Express.js": [r"\bexpress\.?js\b"],
        "Bootstrap": [r"\bbootstrap\b"],
        "Tailwind CSS": [r"\btailwind\s*css\b"],
        "PHP": [r"\bphp\b"],
        "C": [r"\bc programming\b", r"\blanguage c\b"],
        "Excel": [r"\bms excel\b", r"\bexcel\b"],
        "Tableau": [r"\btableau\b"],
        "Pandas": [r"\bpandas\b"],
        "NumPy": [r"\bnumpy\b"],
        "Matplotlib": [r"\bmatplotlib\b"],
        "Scikit-learn": [r"\bscikit.learn\b", r"\bsklearn\b"],
        "TensorFlow": [r"\btensorflow\b"],
        "PyTorch": [r"\bpytorch\b"],
        "Azure": [r"\bmicrosoft azure\b", r"\bazure\b"],
        "Docker": [r"\bdocker\b"],
        "Kubernetes": [r"\bkubernetes\b"],
        "Linux": [r"\blinux\b"],
        "Agile": [r"\bagile\b"]
    }

    found_skills = []

    for skill, patterns in skills_patterns.items():
        for pattern in patterns:
            if re.search(pattern, text, re.IGNORECASE):
                found_skills.append(skill)
                break

    recommended_skills = [
        "DSA", "OOP", "REST API",
        "React", "Flask", "AWS"
    ]

    missing_skills = [
        skill for skill in recommended_skills
        if skill not in found_skills
    ]

    score = min(len(found_skills) * 5, 100)

    strengths = []

    if "Python" in found_skills:
        strengths.append("Python Programming")

    if "Java" in found_skills:
        strengths.append("Java Programming")

    if "SQL" in found_skills or "MySQL" in found_skills:
        strengths.append("Database Knowledge")

    if "HTML" in found_skills and "CSS" in found_skills:
        strengths.append("Web Development Basics")

    if "Power BI" in found_skills:
        strengths.append("Data Visualization")

    if "Git" in found_skills:
        strengths.append("Version Control")

    if "Machine Learning" in found_skills:
        strengths.append("Machine Learning Knowledge")

    if "React" in found_skills:
        strengths.append("Frontend Development")

    if "Data Analysis" in found_skills:
        strengths.append("Data Analysis Knowledge")

    if not strengths:
        strengths.append("Basic Technical Knowledge")

    careers = []

    if "Python" in found_skills:
        careers.append("Python Developer")

    if "Java" in found_skills:
        careers.append("Java Developer")

    if "SQL" in found_skills or "MySQL" in found_skills:
        careers.append("Database Developer")

    if "Power BI" in found_skills or "Data Analysis" in found_skills:
        careers.append("Data Analyst")

    if "React" in found_skills or "JavaScript" in found_skills:
        careers.append("Frontend Developer")

    if "Machine Learning" in found_skills:
        careers.append("Machine Learning Engineer")

    if not careers:
        careers.append("Entry-Level Software Developer")

    suggestions = [
        "Practice Data Structures and Algorithms.",
        "Build real-world projects.",
        "Improve problem-solving skills.",
        "Learn REST API development.",
        "Add measurable achievements to your resume.",
        "Include relevant technical skills in your resume."
    ]

    return {
        "score": score,
        "skills": found_skills,
        "missing_skills": missing_skills,
        "strengths": strengths,
        "careers": careers,
        "suggestions": suggestions
    }


# =====================================
# 2. CREATE USERS TABLE
# =====================================

def create_users_table():

    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        connection.commit()

    finally:
        cursor.close()
        connection.close()


# =====================================
# 3. HOME API
# =====================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "AI Career Intelligence Backend is running!"
    })


# =====================================
# 4. RESUME ANALYZER API
# =====================================

@app.route("/analyze", methods=["POST"])
def analyze_resume():

    print("\nNEW ANALYZE API CODE RUNNING")

    if "resume" not in request.files:
        return jsonify({
            "error": "No resume uploaded"
        }), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({
            "error": "No file selected"
        }), 400

    if not file.filename.lower().endswith(".pdf"):
        return jsonify({
            "error": "Please upload a PDF file"
        }), 400

    try:
        pdf = PdfReader(file)

        if pdf.is_encrypted:
            return jsonify({
                "error": "This PDF is password protected. Please upload an unlocked PDF."
            }), 400

        resume_text = ""

        for page_number, page in enumerate(pdf.pages, start=1):

            extracted_text = page.extract_text() or ""

            print(
                f"Page {page_number} extracted characters:",
                len(extracted_text)
            )

            resume_text += extracted_text + "\n"

        print("\n========== RESUME DEBUG ==========")
        print("PDF Filename:", file.filename)
        print("Total Pages:", len(pdf.pages))
        print("TEXT LENGTH:", len(resume_text))
        print("EXTRACTED TEXT:")
        print(repr(resume_text[:3000]))
        print("==================================\n")

        if not resume_text.strip():
            return jsonify({
                "error": "No readable text found in PDF. Please upload a text-based PDF instead of a scanned image PDF."
            }), 400

        analysis = analyze_resume_text(resume_text)

        print("Detected Skills:", analysis["skills"])
        print("Resume Score:", analysis["score"])

        return jsonify({
            "message": "Resume analyzed successfully!",
            "resume_score": analysis["score"],
            "detected_skills": analysis["skills"],
            "missing_skills": analysis["missing_skills"],
            "strengths": analysis["strengths"],
            "career_recommendations": analysis["careers"],
            "improvement_suggestions": analysis["suggestions"],
            "resume_text": resume_text
        }), 200

    except Exception as error:

        print("Resume Analysis Error:", error)

        return jsonify({
            "error": "Unable to analyze this PDF: " + str(error)
        }), 500


# =====================================
# 5. GET PROFILE API
# =====================================

@app.route("/profile", methods=["GET"])
def get_profile():

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("SELECT * FROM profile WHERE id = 1")

        profile = cursor.fetchone()

        return jsonify(profile if profile else {}), 200

    except Exception as error:

        print("Get Profile Error:", error)

        return jsonify({
            "error": "Unable to load profile"
        }), 500

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =====================================
# 6. SAVE PROFILE API
# =====================================

@app.route("/profile", methods=["POST"])
def save_profile():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Profile data is required"
        }), 400

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = """
            INSERT INTO profile
            (id, name, email, degree, year, specialization, career_goal, about)
            VALUES (1, %s, %s, %s, %s, %s, %s, %s)

            ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            email = VALUES(email),
            degree = VALUES(degree),
            year = VALUES(year),
            specialization = VALUES(specialization),
            career_goal = VALUES(career_goal),
            about = VALUES(about)
        """

        values = (
            data.get("name", ""),
            data.get("email", ""),
            data.get("degree", ""),
            data.get("year", ""),
            data.get("specialization", ""),
            data.get("careerGoal", ""),
            data.get("about", "")
        )

        cursor.execute(query, values)
        connection.commit()

        return jsonify({
            "message": "Profile saved successfully!"
        }), 200

    except Exception as error:

        if connection:
            connection.rollback()

        print("Save Profile Error:", error)

        return jsonify({
            "error": "Unable to save profile"
        }), 500

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =====================================
# 7. USER REGISTRATION API
# =====================================

@app.route("/register", methods=["POST"])
def register():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Registration data is required"
        }), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    name_pattern = r"^[A-Za-z]+(?: [A-Za-z]+)*$"

    if not re.fullmatch(name_pattern, name):
        return jsonify({
            "error": "Full name should contain only letters and spaces"
        }), 400

    email_pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

    if not re.fullmatch(email_pattern, email):
        return jsonify({
            "error": "Please enter a valid email address"
        }), 400

    password_pattern = r"^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Z].{7,}$"

    if not re.fullmatch(password_pattern, password):
        return jsonify({
            "error": "Password must start with a capital letter, contain at least 8 characters, one number and one special character"
        }), 400

    connection = None
    cursor = None

    try:
        create_users_table()

        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute(
            "SELECT id FROM users WHERE email = %s",
            (email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({
                "error": "Email already registered. Please Login."
            }), 409

        hashed_password = generate_password_hash(password)

        cursor.execute("""
            INSERT INTO users
            (full_name, email, password)
            VALUES (%s, %s, %s)
        """, (name, email, hashed_password))

        connection.commit()

        return jsonify({
            "message": "Registration successful! Please Login."
        }), 201

    except Exception as error:

        if connection:
            connection.rollback()

        print("Registration Error:", error)

        return jsonify({
            "error": "Registration failed. Please try again."
        }), 500

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =====================================
# 8. USER LOGIN API
# =====================================

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Login details are required"
        }), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required"
        }), 400

    connection = None
    cursor = None

    try:
        create_users_table()

        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM users WHERE email = %s",
            (email,)
        )

        user = cursor.fetchone()

        if not user or not check_password_hash(
            user["password"], password
        ):
            return jsonify({
                "error": "Invalid email or password"
            }), 401

        return jsonify({
            "message": "Login successful!",
            "user": {
                "id": user["id"],
                "name": user["full_name"],
                "email": user["email"]
            }
        }), 200

    except Exception as error:

        print("Login Error:", error)

        return jsonify({
            "error": "Login failed. Please try again."
        }), 500

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =====================================
# 9. RUN FLASK SERVER
# =====================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000,
        use_reloader=False
    )
