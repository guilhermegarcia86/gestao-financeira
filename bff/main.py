from pydoc import cli
from fastapi import FastAPI
import httpx
import asyncio

app = FastAPI()

URL_ITEM = "http://localhost:8080/item"
URL_EMAIL = "http://localhost:3000/email/v1"

async def getItem():
    async with httpx.AsyncClient() as client:
        result = await client.get(URL_ITEM)
        return result.json()

async def getEmails():
    async with httpx.AsyncClient() as client:
        result = await client.get(URL_EMAIL)
        return result.json()

@app.get("/item")
async def getItems():
    return await getItem()

@app.get("/email")
async def getEmails():
    return await getEmails()