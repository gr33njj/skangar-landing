# API Contracts для ООО "Ангастр" - Строительство Ангаров

## Обзор
Backend API для обработки контактных форм, сохранения заявок и управления запросами клиентов.

## Frontend Mock Data (требует замены)
- **Файл**: `/app/frontend/src/data/mock.js`
- **Что мокируется**: Статические данные компании, услуги, проекты, отзывы
- **Действие**: Удалить mock.js после интеграции с backend

## Backend Endpoints

### 1. POST /api/contact-form
**Описание**: Обработка контактной формы с главной страницы

**Request Body**:
```json
{
  "name": "string (required, min: 2, max: 100)",
  "phone": "string (required, phone format)",
  "email": "string (optional, email format)",
  "buildingType": "string (optional)",
  "area": "string (optional)",
  "message": "string (optional, max: 1000)"
}
```

**Response (Success 201)**:
```json
{
  "success": true,
  "message": "Заявка успешно отправлена",
  "requestId": "uuid",
  "estimatedCallbackTime": "30 минут"
}
```

**Response (Error 400)**:
```json
{
  "success": false,
  "message": "Ошибка валидации",
  "errors": {
    "name": "Имя обязательно",
    "phone": "Неверный формат телефона"
  }
}
```

### 2. GET /api/company-info
**Описание**: Получение информации о компании

**Response (200)**:
```json
{
  "name": "ООО «Ангастр»",
  "tagline": "Строительство каркасных ангаров под ключ",
  "description": "Профессиональное строительство...",
  "address": "352240 г. Краснодар, ул. Восточно-кругликовская, 60",
  "workingHours": "Пн-Пт: 8:00 - 18:00",
  "phone": "+7 (918) 633-32-21",
  "fax": "8(861) 953-40-77",
  "email": "angastr@inbox.ru"
}
```

### 3. GET /api/services
**Описание**: Получение списка услуг

**Response (200)**:
```json
[
  {
    "id": 1,
    "category": "Промышленные объекты",
    "items": ["Промышленные здания", "Складские здания", ...]
  }
]
```

### 4. GET /api/projects
**Описание**: Получение списка проектов

**Response (200)**:
```json
[
  {
    "id": 1,
    "title": "Складской комплекс 2400 м²",
    "description": "Строительство современного...",
    "area": "2400 м²",
    "duration": "45 дней",
    "type": "Складское здание"
  }
]
```

### 5. GET /api/admin/contact-requests
**Описание**: Получение списка заявок (админ панель - опционально)

**Response (200)**:
```json
[
  {
    "id": "uuid",
    "name": "Иван Петров",
    "phone": "+7 (903) 123-45-67",
    "email": "ivan@example.com",
    "buildingType": "warehouse",
    "area": "2000",
    "message": "Требуется построить складской ангар...",
    "createdAt": "2024-08-26T10:30:00Z",
    "status": "new"
  }
]
```

## Database Models

### ContactRequest
```python
class ContactRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    building_type: Optional[str] = None
    area: Optional[str] = None
    message: Optional[str] = None
    status: str = "new"  # new, contacted, completed
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

### CompanyInfo
```python
class CompanyInfo(BaseModel):
    id: str = Field(default="company_info")
    name: str
    tagline: str
    description: str
    address: str
    working_hours: str
    phone: str
    fax: str
    email: str
```

## Frontend Integration План

### 1. Удаление Mock Data
- Удалить `/app/frontend/src/data/mock.js`
- Создать API service файлы для HTTP запросов

### 2. API Service Creation
```javascript
// /app/frontend/src/services/api.js
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const submitContactForm = async (formData) => {
  const response = await fetch(`${API_BASE}/contact-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return response.json();
};
```

### 3. Component Updates
- **ContactsSection.jsx**: Заменить mock submit на реальный API вызов
- **Все компоненты**: Заменить импорты mock данных на API вызовы

### 4. Error Handling
- Добавить loading states
- Обработка ошибок сети
- Пользовательские уведомления об ошибках

## Приоритет Реализации

### High Priority
1. **POST /api/contact-form** - основная форма
2. **GET /api/company-info** - информация компании
3. **Frontend интеграция** - замена mock данных

### Medium Priority  
1. **GET /api/services** - список услуг
2. **GET /api/projects** - портфолио проектов

### Low Priority
1. **GET /api/admin/contact-requests** - админ панель

## Валидация

### Backend Validation
- Phone: российский формат +7 (XXX) XXX-XX-XX
- Email: стандартная email валидация
- Name: минимум 2 символа, максимум 100
- Message: максимум 1000 символов

### Frontend Validation
- Валидация перед отправкой
- Реалтайм валидация полей
- Показ ошибок валидации

## Тестирование

### Backend Tests
- Валидация входных данных
- Сохранение в базу данных
- Обработка ошибок

### Integration Tests
- Frontend + Backend взаимодействие
- Отправка формы end-to-end
- Обработка различных сценариев ошибок