from bson.objectid import ObjectId

from database import USER_COLLECTION


def to_dict(self) -> dict:
    return {
        "id": str(self["_id"]),
        "full_name": self["full_name"],
        "email": self["email"],
        "enabled": self["enabled"],
    }

# Retrieve all users present in the database
async def retrieve_users(self):
    users = []
    async for user in USER_COLLECTION.find():
        users.append(to_dict(user))
    return users


# Add a new user into to the database
async def add_user(user_data: dict) -> dict:
    user = await USER_COLLECTION.insert_one(user_data)
    new_user = await USER_COLLECTION.find_one({"_id": user.inserted_id})
    return to_dict(new_user)


# Retrieve a user with a matching ID
async def retrieve_user(id: str) -> dict:
    user = await USER_COLLECTION.find_one({"_id": ObjectId(id)})
    if user:
        return to_dict(user)


# Update a user with a matching ID
async def update_user(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    user = await USER_COLLECTION.find_one({"_id": ObjectId(id)})
    if user:
        updated_user = await USER_COLLECTION.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_user:
            return True
        return False


# Delete a user from the database
async def delete_user(id: str):
    user = await USER_COLLECTION.find_one({"_id": ObjectId(id)})
    if user:
        await USER_COLLECTION.delete_one({"_id": ObjectId(id)})
        return True
