from typing import Optional

from pydantic import BaseModel, Field


class ProjectSchema(BaseModel):
    name: str = Field(...)
    description: str = Field(...)
    content: str = Field(...)
    archived: bool = Field(True)

    class Config:
        schema_extra = {
            "example": {
                "name": "Default",
                "description": "Default project used to track testing",
                "content": "This can be used to store various *markdown* describing the project.",
                "archived": False
            }
        }


class UpdateProjectModel(BaseModel):
    name: Optional[str]
    description: Optional[str]
    content: Optional[str]
    archived: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "name": "Default",
                "description": "Default project used to track testing",
                "content": "This can be used to store various *markdown* describing the project.",
                "archived": False
            }
        }
