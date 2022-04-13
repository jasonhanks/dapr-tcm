from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from db.settings import database
from db.suite_helper import SuiteHelper
from routes.helpers import ErrorResponseModel, ResponseModel
from models.suite import SuiteSchema, UpdateSuiteModel

router = APIRouter()

helper = SuiteHelper(database, "suites")


@router.post("/", response_description="suite data added into the database")
async def add_suite_data(suite: SuiteSchema = Body(...)):
    suite = jsonable_encoder(suite)
    new_suite = await helper.add(suite)
    return ResponseModel(new_suite, "suite added successfully")


@router.get("/", response_description="suites retrieved")
async def get_suites():
    suites = await helper.retrieve_all()
    if suites:
        return ResponseModel(suites, "suites data retrieved successfully")
    return ResponseModel(suites, "Empty list returned")


@router.get("/{id}", response_description="suite data retrieved")
async def get_suite_data(id):
    suite = await helper.retrieve(id)
    if suite:
        return ResponseModel(suite, "suite data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "suite doesn't exist")


@router.put("/{id}")
async def update_suite_data(id: str, req: UpdateSuiteModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_suite = await helper.update(id, req)
    if updated_suite:
        return ResponseModel(
            "suite with ID: {} name update is successful".format(id),
            "suite name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the suite data.",
    )


@router.delete("/{id}", response_description="suite data deleted from the database")
async def delete_suite_data(id: str):
    deleted_suite = await helper.delete(id)
    if deleted_suite:
        return ResponseModel(
            "suite with ID: {} removed".format(id), "suite deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "suite with id {0} doesn't exist".format(id)
    )
