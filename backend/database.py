from decouple import config
import motor.motor_asyncio

MONGO_URL = config('MONGODB_URL')

CLIENT = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

DATABASE = CLIENT.dapr_tcm

USER_COLLECTION = DATABASE.get_collection("users")


