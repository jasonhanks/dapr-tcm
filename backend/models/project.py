from typing import Optional

from pydantic import BaseModel, Field


class ProjectSchema(BaseModel):
    name: str = Field(...)
    description: str = Field(...)
    content: str = Field(...)
    tags: list = Field([])
    archived: bool = Field(False)

    class Config:
        schema_extra = {
            "example": {
                "name": "Default",
                "description": "Default project used to track testing",
                "content": "This can be used to store various *markdown* describing the project.",
                "tags": ["acceptance", "integration", "load", "system"],
                "archived": False
            }
        }


class UpdateProjectModel(BaseModel):
    name: Optional[str]
    description: Optional[str]
    content: Optional[str]
    tags: Optional[list]
    archived: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "name": "Default",
                "description": "Default project used to track testing",
                "content": "This can be used to store various *markdown* describing the project.",
                "tags": ["acceptance", "integration", "load", "system"],
                "archived": False
            }
        }
