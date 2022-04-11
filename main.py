import logging
import uvicorn

if __name__ == "__main__":
    uvicorn.run("backend.app:app", reload=True, port=8080, host="0.0.0.0", log_config="logging.yaml", log_level=logging.INFO)
    