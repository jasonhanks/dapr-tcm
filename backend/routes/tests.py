from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from db.settings import database
from db.test_helper import TestHelper
from routes.helpers import ErrorResponseModel, ResponseModel
from models.test import TestSchema, UpdateTestModel

router = APIRouter()

helper = TestHelper(database, "tests")


@router.post("/", response_description="test data added into the database")
async def add_test_data(test: TestSchema = Body(...)):
    test = jsonable_encoder(test)
    new_test = await helper.add(test)
    return ResponseModel(new_test, "test added successfully")


@router.get("/", response_description="tests retrieved")
async def get_tests():
    tests = await helper.retrieve_all()
    if tests:
        return ResponseModel(tests, "tests data retrieved successfully")
    return ResponseModel(tests, "Empty list returned")


@router.get("/{id}", response_description="test data retrieved")
async def get_test_data(id):
    test = await helper.retrieve(id)
    if test:
        return ResponseModel(test, "test data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "test doesn't exist")


@router.put("/{id}")
async def update_test_data(id: str, req: UpdateTestModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_test = await helper.update(id, req)
    if updated_test:
        return ResponseModel(
            "test with ID: {} name update is successful".format(id),
            "test name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the test data.",
    )


@router.delete("/{id}", response_description="test data deleted from the database")
async def delete_test_data(id: str):
    deleted_test = await helper.delete(id)
    if deleted_test:
        return ResponseModel(
            "test with ID: {} removed".format(id), "test deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "test with id {0} doesn't exist".format(id)
    )
