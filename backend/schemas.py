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

class Case1_2Info(BaseModel):
    email: str
    password: str
    onetimePass: str
    
class deleteInfo(BaseModel):
    id: int