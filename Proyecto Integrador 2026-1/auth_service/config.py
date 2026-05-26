SECRET_KEY = "super_secret_key"

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:12345@db:5432/it_monitoring_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False