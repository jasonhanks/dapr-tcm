from bson.objectid import ObjectId


class UserHelper:
    def __init__(self, db):
        self.db = db                                    # MongoDB reference
        self.collection = db.get_collection("users")    # users collection


    # Add a new user into to the database
    async def add_user(self, user_data: dict) -> dict:
        user = await self.collection.insert_one(user_data)
        new_user = await self.collection.find_one({"_id": user.inserted_id})
        return self.to_dict(new_user)


    # Delete a user from the database
    async def delete_user(self, id: str):
        user = await self.collection.find_one({"_id": ObjectId(id)})
        if user:
            await self.collection.delete_one({"_id": ObjectId(id)})
            return True


    # Retrieve a user with a matching ID
    async def retrieve_user(self, id: str) -> dict:
        user = await self.collection.find_one({"_id": ObjectId(id)})
        if user:
            return self.to_dict(user)


    # Retrieve all users present in the database
    async def retrieve_users(self):
        users = []
        async for user in self.collection.find():
            users.append(self.to_dict(user))
        return users


    # Update a user with a matching ID
    async def update_user(self, id: str, data: dict):
        # Return false if an empty request body is sent.
        if len(data) < 1:
            return False
        user = await self.collection.find_one({"_id": ObjectId(id)})
        if user:
            updated_user = await self.collection.update_one(
                {"_id": ObjectId(id)}, {"$set": data}
            )
            return True if updated_user else False


    def to_dict(self, user) -> dict:
        return {
            "id": str(user["_id"]),
            "full_name": user["full_name"],
            "email": user["email"],
            "enabled": user["enabled"],
        }
