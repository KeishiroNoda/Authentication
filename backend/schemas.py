from pydantic import BaseModel

class SignInInfo(BaseModel):
    email: str
    password: str
    
class SignUpInfo(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str