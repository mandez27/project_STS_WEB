from contextlib import asynccontextmanager
from typing import Any, AsyncGenerator

import Shemas

from fastapi import Depends, FastAPI
from pydantic import BaseModel, EmailStr
from sqlalchemy import String, select  # Добавили select для GET-запроса
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

# Жизненный цикл app
@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Shemas.Base.metadata.create_all)
    yield


# 2. Инициализация приложения (СТРОГО внутри database.py, если запускаем его!)
app = FastAPI(lifespan=lifespan)

# 3. Настройка базы данных
engine = create_async_engine("sqlite+aiosqlite:///users.db")
new_session = async_sessionmaker(engine, expire_on_commit=False)


async def get_session() -> AsyncGenerator[AsyncSession, Any]:
    async with new_session() as session:
        yield session
