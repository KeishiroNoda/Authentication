from pydantic import BaseModel



class SignInInfo(BaseModel):
    email: str
    password: str
    
class SignUpInfo(BaseModel):
    firstName: str
    lastName: str
    email: str
    twitter: str
    password: str

class Case1Info(BaseModel):
    email: str
    password: str
    onetimePass: str
    
class Case3Info(BaseModel):
    email: str
    password: str
    latitude: float
    longitude: float
    
class deleteInfo(BaseModel):
    id: int