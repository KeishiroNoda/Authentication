from sqlalchemy.orm import Session

from models import User, Onetimepass
from schemas import SignInInfo, SignUpInfo, deleteInfo, Case1_2Info
import hashlib
import secrets
import string
from twitter import twitter_case1



def get_random_password_string(length):
    pass_chars = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(pass_chars) for x in range(length))
    return password


def signIn_User(db: Session, info):
    db_User = db.query(User).filter(User.email == info.email).first()
    if db_User:
        # if db_User.password == hashlib.sha256(info.password).hexdigest():
        if db_User.password == info.password:
            return True
    else:
        return False
    

def signIn_case1_1(db: Session, info:SignInInfo):
    db_User = db.query(User).filter(User.email == info.email).first()
    if db_User:
        # if db_User.password == hashlib.sha256(info.password).hexdigest():
        if db_User.password == info.password:
            onetimePass = get_random_password_string(8)
            return onetimePass
    else:
        return 0
    
    
def signIn_case1_2(db: Session, info: Case1_2Info):
    db_User = db.query(User).filter(User.email == info.email).first()
    return twitter_case1(twitterID=db_User.twitter, onetimePass=info.onetimePass)


def signIn_case2(db: Session, info: Case1_2Info):
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
        db_User = User(email=info.email, password=info.password, twitter=info.twitter, firstName=info.firstName, lastName=info.lastName)
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
            "twitter": user.twitter,
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
    
    
def get_twitter_from_email(db: Session, email:str):
    db_User = db.query(User).filter(User.email == email).first()
    return db_User.twitter


def add_onetime(db: Session, twitterID: str, onetimepassword: str):
    twitter_check = db.query(Onetimepass).filter(Onetimepass.twitterID == twitterID).first()
    if twitter_check:
        db.delete(twitter_check)
    db_Onetimepass = Onetimepass(password=onetimepassword, twitterID=twitterID)
    db.add(db_Onetimepass)
    db.commit()
    db.refresh(db_Onetimepass)
    return 


def get_onetime(db: Session, twitterID: str):
    onetimepassword = db.query(Onetimepass).filter(Onetimepass.twitterID == twitterID).first()
    if (onetimepassword):
        return onetimepassword.password
    else:
        return 0
        