from urllib.request import BaseHandler
from db.base_helper import BaseHelper


class ProjectHelper(BaseHelper):

    def to_dict(self, project) -> dict:
        return {
            "id": str(project["_id"]),
            "name": project["name"],
            "description": project["description"],
            "content": project["content"],
            "archived": project["archived"],
        }
