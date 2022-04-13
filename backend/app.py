from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import plans, projects, suites, tests, users


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

app.include_router(plans.router, tags=["Plans"], prefix="/plans")
app.include_router(projects.router, tags=["Projects"], prefix="/projects")
app.include_router(suites.router, tags=["Suites"], prefix="/suites")
app.include_router(tests.router, tags=["Tests"], prefix="/tests")
app.include_router(users.router, tags=["Users"], prefix="/users")


# @app.get("/", tags=["Root"])
# async def read_root():
#     return {"message": "Welcome to this fantastic app!"}

