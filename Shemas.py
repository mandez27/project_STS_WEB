from pydantic import BaseModel, EmailStr
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass

class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str]
    password: Mapped[str]
    faculty: Mapped[str]
    group: Mapped[str]
    email: Mapped[str] = mapped_column(String, unique=True)


# 5. Валидация Pydantic
class UserCreate(BaseModel):
    username: str
    password: str
    faculty: str
    group: str
    email: EmailStr