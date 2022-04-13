from urllib.request import BaseHandler
from db.base_helper import BaseHelper


class PlanHelper(BaseHelper):

    def to_dict(self, project) -> dict:
        return {
            "id": str(project["_id"]),
            "project": str(project["project"]),
            "name": project["name"],
            "description": project["description"],
            "content": project["content"],
            "tags": project["tags"],
            "version": project["version"],
            "archived": project["archived"],
        }
