
import os
from requests.sessions import Session
from requests.adapters import HTTPAdapter
from .schema import GoogleTranslateInputSchema
from .interface import TranslationService




class GoogleTranslationService(TranslationService):
    def __init__(self,gcp_translation_api_key:str) -> None:
        self.url = "https://translation.googleapis.com"
        session = Session()
        adapter = HTTPAdapter(max_retries=5) 
        session.mount("https://",adapter=adapter)
        headers = {"X-goog-api-key": gcp_translation_api_key}
        session.headers.update(headers)
        self.session = session

    def translate(
        self,
        text: str,
        target: str = "en",
    ) -> str:
        json_body = GoogleTranslateInputSchema(
            q=text,
            target=target,
        ).to_dict()
        res = self.session.post(
            os.path.join(self.url, "language/translate/v2"),
            json=json_body,
        )
        response = res.json()
        return response['data']['translations'][0]['translatedText']