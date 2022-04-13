from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import plan, project, suite, test, user


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

app.include_router(plan.router, tags=["Plans"], prefix="/plans")
app.include_router(project.router, tags=["Projects"], prefix="/projects")
app.include_router(suite.router, tags=["Suites"], prefix="/suites")
app.include_router(test.router, tags=["Tests"], prefix="/tests")
app.include_router(user.router, tags=["Users"], prefix="/users")


# @app.get("/", tags=["Root"])
# async def read_root():
#     return {"message": "Welcome to this fantastic app!"}

