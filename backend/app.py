from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import plan, project, user


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

app.include_router(plan.router, tags=["Plan"], prefix="/plan")
app.include_router(project.router, tags=["Project"], prefix="/project")
app.include_router(user.router, tags=["User"], prefix="/user")


# @app.get("/", tags=["Root"])
# async def read_root():
#     return {"message": "Welcome to this fantastic app!"}

