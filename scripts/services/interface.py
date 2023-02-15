from abc import ABCMeta,abstractmethod

class TranslationService(metaclass=ABCMeta):
    @abstractmethod
    async def translate(self, *args, **kwargs) -> str:
        pass
