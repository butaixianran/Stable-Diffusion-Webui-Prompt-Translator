
from typing import List
from dataclasses import dataclass
from dataclasses_json import dataclass_json




@dataclass_json
@dataclass
class GoogleTranslateInputSchema:
    q: str
    target: str
    format: str = "text"

