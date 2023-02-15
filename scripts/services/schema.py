from typing import Dict
from dataclasses import dataclass


@dataclass
class GoogleTranslateInputSchema:
    q: str
    target: str
    format: str = "text"
    
    def to_dict(self)-> Dict:
        return dict(q=self.q,target=self.target,format=self.format)