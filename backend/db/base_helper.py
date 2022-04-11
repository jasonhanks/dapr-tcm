from abc import abstractclassmethod
from bson.objectid import ObjectId


class BaseHelper:

    def __init__(self, db, collection_name):
        self.db = db                                            # MongoDB reference
        self.collection = db.get_collection(collection_name)    # default collection name


    # Add a new project into to the database
    async def add(self, data: dict) -> dict:
        result = await self.collection.insert_one(data)
        new_data = await self.collection.find_one({"_id": result.inserted_id})
        return self.to_dict(new_data)


    # Delete a project from the database
    async def delete(self, id: str):
        result = await self.collection.find_one({"_id": ObjectId(id)})
        if result:
            await self.collection.delete_one({"_id": ObjectId(id)})
            return True


    # Retrieve a project with a matching ID
    async def retrieve(self, id: str) -> dict:
        result = await self.collection.find_one({"_id": ObjectId(id)})
        if result:
            return self.to_dict(result)


    # Retrieve all projects present in the database
    async def retrieve_all(self):
        results = []
        async for data in self.collection.find():
            results.append(self.to_dict(data))
        return results


    # Update a project with a matching ID
    async def update(self, id: str, data: dict):
        # Return false if an empty request body is sent.
        if len(data) < 1:
            return False
        result = await self.collection.find_one({"_id": ObjectId(id)})
        if result:
            new_result = await self.collection.update_one(
                {"_id": ObjectId(id)}, {"$set": data}
            )
            return True if new_result else False

    @abstractclassmethod
    def to_dict(self, record):
        pass
    