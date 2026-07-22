import bcrypt


class User:

    users = {
        "devadmin": {
            "password": bcrypt.hashpw(
                "Dev@123".encode(),
                bcrypt.gensalt()
            ),
            "role": "DevOps Engineer",
            "environment": "DEV"
        },
        "qaadmin": {
            "password": bcrypt.hashpw(
                "Qa@123".encode(),
                bcrypt.gensalt()
            ),
            "role": "QA Engineer",
            "environment": "QA"
        },
        "uatadmin": {
            "password": bcrypt.hashpw(
                "Uat@123".encode(),
                bcrypt.gensalt()
            ),
            "role": "Release Manager",
            "environment": "UAT"
        },
        "prodadmin": {
            "password": bcrypt.hashpw(
                "Prod@123".encode(),
                bcrypt.gensalt()
            ),
            "role": "Platform Admin",
            "environment": "PROD"
        }
    }

    @classmethod
    def get_user(cls, username):
        return cls.users.get(username)