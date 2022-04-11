from decouple import config
import motor.motor_asyncio

# URL for the MongoDB instance we are using
MONGO_URL = config('MONGODB_URL')


# Motor client used to communicate with Mongo
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

# Reference to the specific database we use to store data
database = client.dapr_tcm
