# BookSwap Hub - Backend

NestJS backend API for the BookSwap Hub book exchange platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create MySQL database:
```sql
CREATE DATABASE bookswap_db;
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=bookswap_db

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=7d

PORT=3000
```

4. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## Database Schema

### Users Table
- id (UUID, Primary Key)
- email (String, Unique)
- fullName (String)
- password (String, Hashed)
- phone (String, Optional)
- address (String, Optional)
- isActive (Boolean)
- createdAt (DateTime)
- updatedAt (DateTime)

### Books Table
- id (UUID, Primary Key)
- title (String)
- author (String)
- isbn (String, Optional)
- description (Text, Optional)
- genre (String, Optional)
- publisher (String, Optional)
- publishYear (Integer, Optional)
- condition (Enum: new, like_new, good, fair, poor)
- status (Enum: available, exchanged, pending)
- imageUrl (String, Optional)
- ownerId (UUID, Foreign Key)
- createdAt (DateTime)
- updatedAt (DateTime)

## API Endpoints

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Profile (Protected)
```http
GET /auth/profile
Authorization: Bearer <token>
```

### Books

#### Get All Books
```http
GET /books
```

#### Search Books
```http
GET /books/search?q=query
```

#### Get My Books (Protected)
```http
GET /books/my-books
Authorization: Bearer <token>
```

#### Get Book by ID
```http
GET /books/:id
```

#### Create Book (Protected)
```http
POST /books
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name",
  "isbn": "1234567890",
  "description": "Book description",
  "genre": "Fiction",
  "publisher": "Publisher Name",
  "publishYear": 2024,
  "condition": "good",
  "imageUrl": "https://example.com/image.jpg"
}
```

#### Update Book (Protected)
```http
PATCH /books/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "condition": "like_new"
}
```

#### Delete Book (Protected)
```http
DELETE /books/:id
Authorization: Bearer <token>
```

## Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with watch
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint

## Validation

The API uses class-validator for request validation:
- Email validation
- Password minimum length (6 characters)
- Required fields validation
- Enum validation for condition and status

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS enabled for frontend access
- Request validation and sanitization
- SQL injection protection via TypeORM

## Error Handling

The API returns standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict (e.g., email already exists)
- 500: Internal Server Error
