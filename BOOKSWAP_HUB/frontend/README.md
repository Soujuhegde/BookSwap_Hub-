# BookSwap Hub - Frontend

React frontend for the BookSwap Hub book exchange platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:3000
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Features

### Pages

#### Home Page (/)
- Hero section with call-to-action
- How it works section
- Features and statistics
- Responsive navigation

#### Login Page (/login)
- Email and password validation
- Error handling
- Redirect to books after successful login

#### Signup Page (/signup)
- Form validation (email, password match, minimum length)
- Optional fields (phone, address)
- Email format validation
- Password confirmation

#### Books Page (/books) - Protected
- Browse all available books
- Search by title, author, or genre
- View book details and owner information
- Contact book owners

#### My Books Page (/my-books) - Protected
- View your listed books
- Add new books
- Edit existing books
- Delete books
- Modal form for add/edit

### Components

#### Navbar
- Responsive navigation
- Conditional rendering based on auth state
- User profile display when logged in

#### PrivateRoute
- Route protection
- Redirect to login if not authenticated
- Loading state handling

### Authentication

The app uses JWT-based authentication:
- Tokens stored in localStorage
- Auto-redirect on 401 responses
- Auth context for global state
- Protected routes

### Form Validation

#### Login
- Required: email, password
- Email format validation

#### Signup
- Required: email, password, fullName
- Email format validation
- Password minimum length: 6 characters
- Password confirmation match
- Optional: phone, address

#### Add/Edit Book
- Required: title, author, condition
- Optional: ISBN, description, genre, publisher, publishYear, imageUrl

## API Integration

The frontend uses Axios for API calls:
- Base URL from environment variable
- Automatic token attachment
- Response interceptors for error handling
- Auto-redirect on authentication errors

## Styling

Built with Tailwind CSS:
- Utility-first CSS framework
- Responsive design
- Custom color palette
- Gradient backgrounds
- Hover effects and transitions

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   └── PrivateRoute.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   └── api.ts
├── pages/
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── BooksPage.tsx
│   └── MyBooksPage.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Icons

Using Lucide React for icons:
- BookOpen
- User
- LogOut
- BookMarked
- Search
- Plus
- Edit
- Trash2
- ArrowRight
- Users
- RefreshCw
- Shield
- Mail
- X

## Routing

React Router v6:
- `/` - Home page (public)
- `/login` - Login page (public)
- `/signup` - Signup page (public)
- `/books` - Browse books (protected)
- `/my-books` - Manage your books (protected)

## State Management

Using React Context API:
- AuthContext for authentication state
- Local state for component-specific data
- No external state management library required

## Book Conditions

- New
- Like New
- Good
- Fair
- Poor

Each condition has a unique color badge for quick identification.

## Future Enhancements

Potential features to add:
- Book image upload
- User ratings and reviews
- Exchange request system
- Chat functionality
- Advanced search filters
- Book categories
- User profiles
- Favorite books
- Exchange history
