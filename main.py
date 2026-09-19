from contextlib import asynccontextmanager
from passlib.context import CryptContext

from fastapi import FastAPI, HTTPException, Depends
from authx import AuthX, AuthXConfig
from pydantic import BaseModel, EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

import database, Shemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with database.engine.begin() as conn:
        await conn.run_sync(Shemas.Base.metadata.create_all)
    yield

app = FastAPI(lifespan=lifespan)



config = AuthXConfig()
config.JWT_SECRET_KEY = "SECRET_KEY"
config.JWT_ACCESS_COOKIE_NAME = "my_token"
config.JWT_TOKEN_LOCATION = ['cookies']

security = AuthX(config=config)

# РУЧКА №1: Создание пользователя

@app.post("/Registr")
async def create_user(
    user_in: Shemas.UserCreate, session: AsyncSession = Depends(database.get_session)
):
    new_user = Shemas.UserModel(
        username=user_in.username,
        password=user_in.password,
        faculty=user_in.faculty,
        group=user_in.group,
        email=user_in.email,
    )
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    return {"status": "User created", "user_id": new_user.id}


# РУЧКА №2: Получение пользователей
@app.get("/Check")
async def get_users(session: AsyncSession = Depends(database.get_session)):
    query = select(Shemas.UserModel)
    result = await session.execute(query)
    users = result.scalars().all()
    return users





