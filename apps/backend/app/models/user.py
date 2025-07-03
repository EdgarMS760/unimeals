from app.extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    nickname = db.Column(db.String(50), unique=True, nullable=False)
    pic_profile = db.Column(db.String(255))

    def __repr__(self):
        return f"<User {self.email}>"
