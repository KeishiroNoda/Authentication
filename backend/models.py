from sqlalchemy import Column, Integer, String
from database import Base



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    firstName = Column(String)
    lastName = Column(String)
    email = Column(String, unique=True, index=True)
    twitter = Column(String)
    password = Column(String)
    

class Onetimepass(Base):
    __tablename__ = "onetimepass"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    twitterID = Column(String(50))
    password = Column(String(30))
    
    
class ContextInfo(Base):
    __tablename__ = "contextinfo"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    twitterID = Column(String(50))
    when  = Column(String(50))
    where  = Column(String(50))
