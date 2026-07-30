from auth_service.database import db


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(80),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.String(100),
        nullable=False
    )

    environment = db.Column(
        db.String(50),
        nullable=False
    )

    @classmethod
    def get_user(cls, username):
        return cls.query.filter_by(
            username=username
        ).first()
