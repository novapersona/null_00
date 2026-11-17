# iTicket Backend API

Ushbu loyiha [DrawSQL iTicket](https://drawsql.app/teams/1kromov/diagrams/iticket) ma'lumotlar bazasi diagrammasi asosida va `backend 2/psql` arxitekturasiga mos ravishda yaratilgan backend API hisoblanadi.

## 🛠 Texnologiyalar

- **Node.js** & **Express 5**
- **Sequelize ORM** (PostgreSQL)
- **Joi** (Ma'lumotlar validatsiyasi)
- **Swagger / OpenAPI 3.0** (`swagger-ui-express`, `swagger-jsdoc`)
- **bcryptjs** (Parollarni xavfsiz xesh qilish)
- **dotenv** & **cors**

---

## 📁 Loyiha Tuzilmasi

```
├── config/
│   └── database.js              # PostgreSQL Sequelize ulanish konfiguratsiyasi
├── models/                      # 29 ta model va ularning assotsiatsiyalari
│   ├── index.js                 # Barcha modellarni eksport qilish va bog'lash
│   ├── admin.model.js
│   ├── customer.model.js
│   ├── event.model.js
│   ├── venue.model.js
│   ├── ticket.model.js
│   ├── booking.model.js
│   ├── cart.model.js
│   └── ... (barcha 29 ta model)
├── controller/                  # Barcha modellar uchun CRUD + Search controllerlar
│   ├── adminController.js
│   ├── customerController.js
│   ├── eventController.js
│   ├── venueController.js
│   ├── ticketController.js
│   └── ...
├── validations/                 # Joi orqali create va update validatsiyalari
│   ├── adminValidation.js
│   ├── customerValidation.js
│   ├── eventValidation.js
│   └── ...
├── routes/                      # Swagger dokumentatsiyasi bilan ta'minlangan routelar
│   ├── adminRoute.js
│   ├── customerRoute.js
│   ├── eventRoute.js
│   └── ...
├── swagger/
│   └── swagger.js               # Swagger UI konfiguratsiyasi
├── .env                         # Ma'lumotlar bazasi va port parametrlari
├── .env.example
├── app.js                       # Express ilovasining asosiy kirish fayli
└── package.json
```

---

## 🗄 Ma'lumotlar Bazasi Modellari (29 ta jadval)

1. **Admin** (`admin`) - admin boshqaruvi (parollar bcrypt orqali xeshlanadi)
2. **Customer** (`customer`) - mijozlar, avto-xesh parollar, refresh token
3. **CustomerAddress** (`customer_address`) - mijoz manzillari (viloyat, tuman, xonadon)
4. **CustomerCard** (`customer_card`) - mijoz bank kartalari
5. **Country** (`Country`) - davlatlar
6. **Region** (`region`) - viloyatlar
7. **District** (`district`) - tumanlar
8. **Flat** (`Flat`) - xonadonlar (qavat, holati)
9. **Gender** (`Gender`) - jinslar
10. **HumanCategory** (`human_category`) - yosh toifalari (bolalar, kattalar)
11. **Lang** (`lang`) - tillar
12. **Types** (`types`) - maydon/tadbir turlari
13. **Venue** (`venue`) - saroylar, stadionlar, zallar
14. **VenueTypes** (`venue_types`) - maydon turlari (ko'pdan-ko'pga bog'lanish)
15. **VenuePhoto** (`venue_photo`) - zallarning rasmlari
16. **Sector** (`Sector`) - sektorlar
17. **SeatType** (`seat_type`) - o'rindiq toifalari (VIP, oddiy)
18. **Seat** (`seat`) - o'rindiqlar
19. **EventType** (`event_type`) - tadbir turlari (ierarxik, sub-kategoriya)
20. **Event** (`event`) - tadbirlar (konsert, futbol, spektakl)
21. **TicketType** (`Tycket_Type`) - chipta turlari
22. **TicketStatus** (`ticket_status`) - chipta holatlari (band, sotilgan, bekor qilingan)
23. **Ticket** (`ticket`) - chiptalar
24. **Cart** (`cart`) - savatcha
25. **CartItem** (`cart_item`) - savatchadagi chiptalar
26. **Discount** (`Discount`) - chegirmalar
27. **DeliveryMethod** (`delivery_method`) - yetkazib berish usullari
28. **PaymentMethod** (`payment_method`) - to'lov usullari
29. **Booking** (`booking`) - buyurtmalar / bron qilish

---

## 🚀 Ishga Tushirish

1. **Kutubxonalarni o'rnatish** (kerak bo'lsa):
   ```bash
   npm install
   ```

2. **`.env` faylini sozlash**:
   ```env
   DB_NAME=iticket
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   PORT=3333
   ```

3. **Serverni ishga tushirish**:
   ```bash
   # Ishlab chiqish rejimida (nodemon bilan):
   npm run dev

   # Standart rejimda:
   npm start
   ```

4. **Swagger API Dokumentatsiyasi**:
   Brauzerda quyidagi manzilni oching:
   ```
   http://localhost:3333/api-docs
   ```

---

## 📡 API Endpointlar Strukturasi

Har bir entitiya uchun quyidagi standart RESTful endpointlar yaratilgan:

- `POST   /api/{entities}`       - Yangi yozuv yaratish
- `GET    /api/{entities}`       - Barcha yozuvlarni olish (bog'liq jadvallar bilan `include`)
- `GET    /api/{entities}/search` - Qidiruv (`?query=...`)
- `GET    /api/{entities}/:id`   - ID bo'yicha olish
- `PUT    /api/{entities}/:id`   - ID bo'yicha tahrirlash
- `DELETE /api/{entities}/:id`   - ID bo'yicha o'chirish
