from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from db.settings import database
from db.plan_helper import PlanHelper
from routes.helpers import ErrorResponseModel, ResponseModel
from models.plan import PlanSchema, UpdatePlanModel

router = APIRouter()

helper = PlanHelper(database, "plans")


@router.post("/", response_description="plan data added into the database")
async def add_plan_data(plan: PlanSchema = Body(...)):
    plan = jsonable_encoder(plan)
    new_plan = await helper.add(plan)
    return ResponseModel(new_plan, "plan added successfully")


@router.get("/", response_description="plans retrieved")
async def get_plans():
    plans = await helper.retrieve_all()
    if plans:
        return ResponseModel(plans, "plans data retrieved successfully")
    return ResponseModel(plans, "Empty list returned")


@router.get("/{id}", response_description="plan data retrieved")
async def get_plan_data(id):
    plan = await helper.retrieve(id)
    if plan:
        return ResponseModel(plan, "plan data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "plan doesn't exist")


@router.put("/{id}")
async def update_plan_data(id: str, req: UpdatePlanModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_plan = await helper.update(id, req)
    if updated_plan:
        return ResponseModel(
            "plan with ID: {} name update is successful".format(id),
            "plan name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the plan data.",
    )


@router.delete("/{id}", response_description="plan data deleted from the database")
async def delete_plan_data(id: str):
    deleted_plan = await helper.delete(id)
    if deleted_plan:
        return ResponseModel(
            "plan with ID: {} removed".format(id), "plan deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "plan with id {0} doesn't exist".format(id)
    )
