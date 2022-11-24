from sqlalchemy.orm import Session

from models import User
from schemas import SignInInfo, SignUpInfo, deleteInfo
import hashlib


def signIn_User(db: Session, info:SignInInfo):
    db_User = db.query(User).filter(User.email == info.email).first()
    if db_User:
        # if db_User.password == hashlib.sha256(info.password).hexdigest():
        if db_User.password == info.password:
            return True
    else:
        return False


def signUp_User(db: Session, info: SignUpInfo):
    email_check = db.query(User).filter(User.email == info.email).first()
    if not email_check:
        # db_User = User(email=info.email, password=hashlib.sha256(info.password).hexdigest(), firstName=info.firstName, lastName=info.lastName)
        db_User = User(email=info.email, password=info.password, firstName=info.firstName, lastName=info.lastName)
        db.add(db_User)
        db.commit()
        db.refresh(db_User)
        return True
    else:
        return False
    

def get_User(db: Session):
    users = db.query(User).all()
    result = []
    for user in users:
        column = {
            "id": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "password": user.password
        }
        result.append(column)
    return result
    


def delete_User(db: Session, info:deleteInfo):
    db_User = db.query(User).filter(User.id == info.id).first()
    if db_User:
        db.delete(db_User)
        db.commit()
        return True
    else:
        return False
