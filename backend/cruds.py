from sqlalchemy.orm import Session

from models import User
from schemas import SignInInfo, SignUpInfo


def signIn_User(db: Session, info:SignInInfo):
    db_User = db.query(User).filter(User.email == info.email).first()
    if db_User:
        if db_User.password == info.password:
            return True
    else:
        return False


def signUp_User(db: Session, info: SignUpInfo):
    email_check = db.query(User).filter(User.email == info.email).first()
    if not email_check:
        db_User = User(email=info.email, password=info.password, firstName=info.firstName, lastName=info.lastName)
        db.add(db_User)
        db.commit()
        db.refresh(db_User)
        return True
    else:
        return False


def delete_User(db: Session, info:SignInInfo):
    db_User = db.query(User).filter(User.email == info.email).first()
    db.delete(db_User)
    db.commit()
