from typing import Optional

from pydantic import BaseModel, Field


class SuiteSchema(BaseModel):
    project: str = Field(...)
    name: str = Field(...)
    description: str = Field(...)
    content: str = Field(...)
    tags: list = Field([])
    archived: bool = Field(True)

    class Config:
        schema_extra = {
            "example": {
                "project": "<id of project>",
                "name": "Test Suite",
                "description": "Sample test suite",
                "content": "This can be used to store various *markdown* describing the test suite.",
                "tags": ["automated", "manual"],
                "archived": False
            }
        }


class UpdateSuiteModel(BaseModel):
    name: Optional[str]
    description: Optional[str]
    content: Optional[str]
    tags: Optional[list]
    archived: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "name": "Test Suite",
                "description": "Sample test suite",
                "content": "This can be used to store various *markdown* describing the test suite.",
                "tags": ["automated", "manual"],
                "archived": False
            }
        }
