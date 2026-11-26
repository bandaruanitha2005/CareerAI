
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    connection = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT", 4000)),
        ssl_ca="/etc/secrets/isrgrootx1.pem",
        ssl_verify_cert=True
    )

    return connection
