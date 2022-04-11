from db.base_helper import BaseHelper

class UserHelper(BaseHelper):

    def to_dict(self, user) -> dict:
        return {
            "id": str(user["_id"]),
            "full_name": user["full_name"],
            "email": user["email"],
            "enabled": user["enabled"],
        }
