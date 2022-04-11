from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from db.settings import database
from db.user_helper import UserHelper
from routes.helpers import ErrorResponseModel, ResponseModel
from models.user import UserSchema, UpdateUserModel

router = APIRouter()

helper = UserHelper(database, "users")


@router.post("/", response_description="user data added into the database")
async def add_user_data(user: UserSchema = Body(...)):
    user = jsonable_encoder(user)
    new_user = await helper.add(user)
    return ResponseModel(new_user, "user added successfully")


@router.get("/", response_description="users retrieved")
async def get_users():
    users = await helper.retrieve_all()
    if users:
        return ResponseModel(users, "users data retrieved successfully")
    return ResponseModel(users, "Empty list returned")


@router.get("/{id}", response_description="user data retrieved")
async def get_user_data(id):
    user = await helper.retrieve(id)
    if user:
        return ResponseModel(user, "user data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "user doesn't exist")


@router.put("/{id}")
async def update_user_data(id: str, req: UpdateUserModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_user = await helper.update(id, req)
    if updated_user:
        return ResponseModel(
            "user with ID: {} name update is successful".format(id),
            "user name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the user data.",
    )


@router.delete("/{id}", response_description="user data deleted from the database")
async def delete_user_data(id: str):
    deleted_user = await helper.delete(id)
    if deleted_user:
        return ResponseModel(
            "user with ID: {} removed".format(id), "user deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "user with id {0} doesn't exist".format(id)
    )
