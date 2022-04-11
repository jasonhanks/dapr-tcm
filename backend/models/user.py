from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UserSchema(BaseModel):
    full_name: str = Field(...)
    email: EmailStr = Field(...)
    initials: str = Field(...)
    enabled: bool = Field(True)

    class Config:
        schema_extra = {
            "example": {
                "full_name": "John Doe",
                "email": "jdoe@gmail.com",
                "initials": "JD",
                "enabled": True
            }
        }


class UpdateUserModel(BaseModel):
    full_name: Optional[str]
    email: Optional[EmailStr]
    initials: Optional[str]
    enabled: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "full_name": "John Doe",
                "email": "jdoe@gmail.com",
                "initials": "JD",
                "enabled": True
            }
        }
