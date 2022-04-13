from typing import Optional

from pydantic import BaseModel, Field


class PlanSchema(BaseModel):
    project: str = Field(...)
    name: str = Field(...)
    description: str = Field(...)
    content: str = Field(...)
    tags: list = Field([])
    version: str = Field(...)
    archived: bool = Field(True)

    class Config:
        schema_extra = {
            "example": {
                "project": "<id of project>",
                "name": "Test Plan",
                "description": "Sample test plan",
                "content": "This can be used to store various *markdown* describing the test plan.",
                "tags": ["automated", "manual"],
                "version": "1.0",
                "archived": False
            }
        }


class UpdatePlanModel(BaseModel):
    name: Optional[str]
    description: Optional[str]
    content: Optional[str]
    tags: Optional[list]
    version: Optional[str]
    archived: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "name": "Test Plan",
                "description": "Sample test plan",
                "content": "This can be used to store various *markdown* describing the test plan.",
                "tags": ["automated", "manual"],
                "version": "1.0",
                "archived": False
            }
        }
