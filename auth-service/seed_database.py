import bcrypt

from auth_service import app
from auth_service.database import db
from auth_service.models.user import User


users = [
    {
        "username": "devadmin",
        "password": "Dev@123",
        "role": "DevOps Engineer",
        "environment": "DEV",
    },
    {
        "username": "qaadmin",
        "password": "Qa@123",
        "role": "QA Engineer",
        "environment": "QA",
    },
    {
        "username": "uatadmin",
        "password": "Uat@123",
        "role": "Release Manager",
        "environment": "UAT",
    },
    {
        "username": "prodadmin",
        "password": "Prod@123",
        "role": "Platform Admin",
        "environment": "PROD",
    },
]


with app.app_context():

    db.create_all()

    for item in users:

        existing_user = User.get_user(item["username"])

        if existing_user:
            continue

        user = User(
            username=item["username"],
            password=bcrypt.hashpw(
                item["password"].encode(),
                bcrypt.gensalt()
            ).decode(),
            role=item["role"],
            environment=item["environment"],
        )

        db.session.add(user)

    db.session.commit()

    print("Database seeded successfully")
