from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import schemas
import uvicorn
import cruds 
from database import get_db
from twitter import twitter_thread_case1, twitter_thread_case2, twitter_case2

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

thread = 0


@app.post("/signin")
def signin(data: schemas.SignInInfo, db: Session = Depends(get_db)):
    print(data)
    return cruds.signIn_User(db=db, info=data)


@app.post("/signin_case1_1")
def signin_case1_1(data: schemas.SignInInfo, db: Session = Depends(get_db)):
    global thread
    onetimePass = cruds.signIn_case1_1(db=db, info=data)
    twitterID = cruds.get_twitter_from_email(db=db, email=data.email)
    thread = twitter_thread_case1(db=db, twitterID=twitterID, onetimePass=onetimePass)
    thread.start()
    print("Thread start!")
    return onetimePass


@app.get("/signin_case1_2")
def signin_case1_2():
    global thread
    if (thread != 0):
        result = thread.status
        if (result):
            thread.kill()
            thread = 0
            print("Thread killed!")
    else:
        result = False
    return result
    
    
# @app.post("/signin_case1_2")
# def signin_case1_2(data: schemas.Case1_2Info, db: Session = Depends(get_db)):
#     return cruds.signIn_case1_2(db=db, info=data)


@app.post("/signin_case2_1")
def signin_case2_1(db: Session = Depends(get_db)):
    global thread
    if (thread == 0):
        thread = twitter_thread_case2(db=db)
        thread.start()
        print("Thread start!")
    return 


@app.post("/signin_case2_2")
def signin_case2_2(data: schemas.Case1_2Info, db: Session = Depends(get_db)):
    twitter = cruds.get_twitter_from_email(db=db, email=data.email)
    if (data.onetimePass == twitter_case2(db=db, twitter=twitter)):
        return cruds.signIn_User(db=db, info=data)
    else:
        return False
    
@app.post("/kill_thread")
def kill_thread():
    global thread
    if (thread != 0):
        thread.kill()
        thread = 0
        print("Thread killed!")
    return 

    
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
    thread = 0
    uvicorn.run(
        "__main__:app", port=8000, reload=True, host='0.0.0.0'
    )
