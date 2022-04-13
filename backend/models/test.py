from typing import Optional

from pydantic import BaseModel, Field


class TestSchema(BaseModel):
    suite: str = Field(...)
    name: str = Field(...)
    description: str = Field(...)
    content: str = Field(...)
    tags: list = Field([])
    archived: bool = Field(True)

    class Config:
        schema_extra = {
            "example": {
                "suite": "<id of suite>",
                "name": "Test Case",
                "description": "Sample test case",
                "content": "This can be used to store various *markdown* describing the test case.",
                "tags": ["manual"],
                "archived": False
            }
        }


class UpdateTestModel(BaseModel):
    name: Optional[str]
    description: Optional[str]
    content: Optional[str]
    tags: Optional[list]
    archived: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "name": "Test Case",
                "description": "Sample test case",
                "content": "This can be used to store various *markdown* describing the test case.",
                "tags": ["manual"],
                "archived": False
            }
        }
