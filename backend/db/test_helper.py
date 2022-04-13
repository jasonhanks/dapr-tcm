from urllib.request import BaseHandler
from db.base_helper import BaseHelper


class TestHelper(BaseHelper):

    def to_dict(self, project) -> dict:
        return {
            "id": str(project["_id"]),
            "suite": str(project["suite"]),
            "name": project["name"],
            "description": project["description"],
            "content": project["content"],
            "tags": project["tags"],
            "archived": project["archived"]
        }
