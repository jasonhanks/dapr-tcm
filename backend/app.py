from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.user import router as UserRouter


app = FastAPI()

app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:8080",
            "localhost:8080"
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)

app.include_router(UserRouter, tags=["User"], prefix="/user")


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}

