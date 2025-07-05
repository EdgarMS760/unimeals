from app.extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    nickname = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    pic_profile = db.Column(db.String(255))

    def __repr__(self):
        return f"<User {self.email}>"

    def check_password(self, password):
        return True if self.password == password else False

    def update(self, name, lastname, nickname, password):
        self.password = password
        self.name = name
        self.lastname = lastname
        self.nickname = nickname

    def formatSelf(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "nickname": self.nickname,
            "pic_profile": self.pic_profile,
        }