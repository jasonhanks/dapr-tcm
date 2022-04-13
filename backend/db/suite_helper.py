from urllib.request import BaseHandler
from db.base_helper import BaseHelper


class SuiteHelper(BaseHelper):

    def to_dict(self, project) -> dict:
        return {
            "id": str(project["_id"]),
            "project": str(project["project"]),
            "name": project["name"],
            "description": project["description"],
            "content": project["content"],
            "tags": project["tags"],
            "archived": project["archived"]
        }
