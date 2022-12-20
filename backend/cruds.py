from sqlalchemy.orm import Session

from models import User, Onetimepass, ContextInfo
from schemas import SignInInfo, SignUpInfo, deleteInfo, Case1Info, Case3Info
from context import get_location
import hashlib
import math
import secrets
import string
import datetime
from twitter import twitter_case1, get_twitterID_from_name



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
    
    
def signIn_case1_2(db: Session, info: Case1Info):
    db_User = db.query(User).filter(User.email == info.email).first()
    return twitter_case1(twitterID=db_User.twitter, onetimePass=info.onetimePass)


def signIn_case2(db: Session, info: Case1Info):
    db_User = db.query(User).filter(User.email == info.email).first()
    if db_User:
        # if db_User.password == hashlib.sha256(info.password).hexdigest():
        if db_User.password == info.password:
            return True
    else:
        return False
    
    
def signIn_case3(db: Session, info: Case3Info):
    db_User = db.query(User).filter(User.email == info.email).first()
    if db_User:
        # if db_User.password == hashlib.sha256(info.password).hexdigest():
        if (db_User.password == info.password):
            twitterID = get_twitterID_from_name(db_User.twitter)
            db_Context = db.query(ContextInfo).filter(ContextInfo.twitterID == twitterID).first()
            if db_Context:
                location = get_location(db_Context.where)
                dt_now = datetime.datetime.now()
                if (math.floor(info.latitude) == math.floor(location["latitude"])) and (math.floor(info.longitude) == math.floor(location["longitude"])):
                    if (dt_now.month == int(db_Context.when.split('/')[0])) and (dt_now.day == int(db_Context.when.split('/')[1])) and (dt_now.hour > (int(db_Context.when.split('/')[2].split(':')[0]) - 1)) and (dt_now.hour < (int(db_Context.when.split('/')[2].split(':')[0]) + 1)):
                        return True
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
    
     
def add_context(db: Session, twitterID: str, when: str, where:str):
    twitter_check = db.query(ContextInfo).filter(ContextInfo.twitterID == twitterID).first()
    if twitter_check:
        db.delete(twitter_check)
    db_ContextInfo = ContextInfo(twitterID=twitterID, when=when, where=where)
    db.add(db_ContextInfo)
    db.commit()
    db.refresh(db_ContextInfo)
    return    