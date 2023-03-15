from typing import Dict
from dataclasses import dataclass


@dataclass
class GoogleTranslateInputSchema:
    q: str
    target: str
    format: str = "text"
    
    def to_dict(self)-> Dict:
        if not self.target:
            self.target = "en"
        return dict(q=self.q,target=self.target,format=self.format)