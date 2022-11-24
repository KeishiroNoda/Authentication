from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import schemas
import uvicorn
import cruds 
from database import get_db

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/signin")
def signin(data: schemas.SignInInfo, db: Session = Depends(get_db)):
    print(data)
    return cruds.signIn_User(db=db, info=data)

    
@app.post("/signup")
def signup(data: schemas.SignUpInfo, db: Session = Depends(get_db)):
    print(data)
    return cruds.signUp_User(db=db, info=data)


@app.get("/getall")
def getall(db: Session = Depends(get_db)):
    return cruds.get_User(db=db)


@app.post("/delete")
def delete(data: schemas.deleteInfo, db: Session = Depends(get_db)):
    print(data)
    return cruds.delete_User(db=db, info=data)



if __name__ == "__main__":
    uvicorn.run(
        "__main__:app", port=8000, reload=True, host='0.0.0.0'
    )
