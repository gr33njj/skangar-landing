from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field, validator
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Ангастр API", description="API для строительной компании ООО Ангастр")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Models
class ContactRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Имя клиента")
    phone: str = Field(..., description="Телефон в формате +7 (XXX) XXX-XX-XX")
    email: Optional[str] = Field(None, description="Email адрес")
    building_type: Optional[str] = Field(alias="buildingType", default=None, description="Тип здания")
    area: Optional[str] = Field(default=None, description="Площадь в м²")
    message: Optional[str] = Field(default=None, max_length=1000, description="Дополнительное сообщение")

    @validator('phone')
    def validate_phone(cls, v):
        # Российский формат: +7 (XXX) XXX-XX-XX или +7XXXXXXXXXX
        phone_pattern = r'^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$'
        if not re.match(phone_pattern, v.replace(' ', '').replace('-', '').replace('(', '').replace(')', '')):
            raise ValueError('Неверный формат телефона')
        return v

    @validator('email')
    def validate_email(cls, v):
        if v is not None and v.strip():
            email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            if not re.match(email_pattern, v):
                raise ValueError('Неверный формат email')
        return v

class ContactRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    building_type: Optional[str] = None
    area: Optional[str] = None
    message: Optional[str] = None
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactResponse(BaseModel):
    success: bool
    message: str
    request_id: str
    estimated_callback_time: str

class CompanyInfo(BaseModel):
    name: str = "ООО «Ангастр»"
    tagline: str = "Строительство каркасных ангаров под ключ"
    description: str = "Профессиональное строительство каркасных ангаров от изготовления металлоконструкций и заливки фундамента до возведения холодных ангаров или теплых ангаров, как арочного так и прямостенного типа"
    address: str = "352240 г. Краснодар, ул. Восточно-кругликовская, 60"
    working_hours: str = "Пн-Пт: 8:00 - 18:00"
    phone: str = "+7 (918) 633-32-21"
    fax: str = "8(861) 953-40-77"
    email: str = "angastr@inbox.ru"

class Service(BaseModel):
    id: int
    category: str
    items: List[str]

class Project(BaseModel):
    id: int
    title: str
    description: str
    area: str
    duration: str
    type: str


# Static data
SERVICES_DATA = [
    {
        "id": 1,
        "category": "Промышленные объекты",
        "items": [
            "Промышленные здания",
            "Складские здания", 
            "Производственные цеха",
            "Ангары-склады для инвентаря"
        ]
    },
    {
        "id": 2,
        "category": "Коммерческие объекты",
        "items": [
            "Торговые павильоны",
            "Торговые комплексы",
            "Выставочные ангары",
            "Многоцелевые модульные здания"
        ]
    },
    {
        "id": 3,
        "category": "Спортивные сооружения",
        "items": [
            "Ангары для спорта",
            "Спортивные ангары",
            "Развлекательные комплексы"
        ]
    },
    {
        "id": 4,
        "category": "Сельскохозяйственные объекты",
        "items": [
            "Сельскохозяйственные здания",
            "Теплицы",
            "Открытые навесы"
        ]
    },
    {
        "id": 5,
        "category": "Специализированные ангары",
        "items": [
            "Ангары для авиации",
            "Ангары для хранения яхт",
            "Строительство гаражей",
            "Мобильные здания"
        ]
    }
]

PROJECTS_DATA = [
    {
        "id": 1,
        "title": "Складской комплекс 2400 м²",
        "description": "Строительство современного складского комплекса для логистической компании",
        "area": "2400 м²",
        "duration": "45 дней",
        "type": "Складское здание"
    },
    {
        "id": 2,
        "title": "Производственный цех 1800 м²",
        "description": "Возведение производственного цеха для машиностроительного предприятия",
        "area": "1800 м²", 
        "duration": "38 дней",
        "type": "Производственное здание"
    },
    {
        "id": 3,
        "title": "Спортивный комплекс 3200 м²",
        "description": "Строительство многофункционального спортивного комплекса",
        "area": "3200 м²",
        "duration": "52 дня", 
        "type": "Спортивное сооружение"
    }
]


# API Routes
@api_router.get("/", tags=["Health"])
async def root():
    return {"message": "Ангастр API v1.0", "status": "active"}

@api_router.post("/contact-form", response_model=ContactResponse, tags=["Contact"])
async def submit_contact_form(request: ContactRequestCreate):
    """Обработка контактной формы"""
    try:
        # Create contact request
        contact_request = ContactRequest(
            name=request.name,
            phone=request.phone,
            email=request.email,
            building_type=request.building_type,
            area=request.area,
            message=request.message
        )
        
        # Save to database
        result = await db.contact_requests.insert_one(contact_request.dict())
        
        if result.inserted_id:
            return ContactResponse(
                success=True,
                message="Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
                request_id=contact_request.id,
                estimated_callback_time="30 минут"
            )
        else:
            raise HTTPException(status_code=500, detail="Ошибка сохранения заявки")
            
    except ValueError as e:
        raise HTTPException(status_code=400, detail={"success": False, "message": str(e)})
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Внутренняя ошибка сервера")

@api_router.get("/company-info", response_model=CompanyInfo, tags=["Company"])
async def get_company_info():
    """Получение информации о компании"""
    return CompanyInfo()

@api_router.get("/services", response_model=List[Service], tags=["Services"])
async def get_services():
    """Получение списка услуг"""
    return SERVICES_DATA

@api_router.get("/projects", response_model=List[Project], tags=["Projects"])
async def get_projects():
    """Получение списка проектов"""
    return PROJECTS_DATA

@api_router.get("/admin/contact-requests", response_model=List[ContactRequest], tags=["Admin"])
async def get_contact_requests():
    """Получение всех заявок (админ панель)"""
    try:
        requests = await db.contact_requests.find().sort("created_at", -1).to_list(100)
        return [ContactRequest(**req) for req in requests]
    except Exception as e:
        logging.error(f"Error fetching contact requests: {e}")
        raise HTTPException(status_code=500, detail="Ошибка получения заявок")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
