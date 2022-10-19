from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import schemas
import uvicorn

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

@app.get("/signin")
def signin(data: schemas.SignInInfo):
    return data
    
@app.get("/signup")
def signin(data: schemas.SignUpInfo):
    return data


if __name__ == "__main__":
    uvicorn.run(
        "__main__:app", port=5000, reload=True, host='0.0.0.0'
    )
