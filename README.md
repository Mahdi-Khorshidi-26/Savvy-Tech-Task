# 🛒 Savvy Tech Team - Pantry Management App

A modern, responsive pantry management application built for the Savvy Tech Team task. This application allows users to organize their pantry items across different shelves, track expiry dates, and manage their ingredients efficiently.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How the App Works](#how-the-app-works)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)

## ✨ Features

- **📱 Fully Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🗂️ Shelf Management**: Create, edit, and delete pantry shelves (Fridge, Freezer, Cabinet, etc.)
- **📦 Item Management**: Add, edit, and delete pantry items with detailed information
- **📅 Expiry Tracking**: Track expiry dates with visual warnings for expired/expiring items
- **🔍 Search Functionality**: Search through all pantry items across shelves
- **⚡ Optimistic UI**: Instant feedback for user actions with optimistic updates
- **🎨 Modern UI**: Clean, intuitive interface with Tailwind CSS
- **🔄 Real-time Updates**: Live updates without page refreshes

## 🛠️ Technologies Used

### Frontend

- **React 19.1.1** - Modern React with latest features and hooks
- **React Router 7.9.2** - File-based routing with server-side rendering support
- **React Hook Form 7.65.0** - Efficient form handling with validation
- **TypeScript 5.9.2** - Type-safe development
- **Tailwind CSS 4.1.13** - Utility-first CSS framework for responsive design
- **Vite 7.1.7** - Fast build tool and development server

### Backend

- **React Router (SSR)** - Server-side rendering and API routes
- **Node.js** - Runtime environment
- **Prisma 6.18.0** - Type-safe database ORM
- **PostgreSQL** - Robust relational database
- **Zod 4.1.12** - Schema validation library

### Development Tools

- **Prisma Studio** - Database visualization and management
- **ESLint & TypeScript** - Code quality and type checking
- **Docker** - Containerization support

## 📁 Project Structure

```
recipe-app/
├── app/                          # Main application code
│   ├── components/               # Reusable UI components
│   │   ├── Button.tsx           # Customizable button component
│   │   ├── Container.tsx        # Responsive container wrapper
│   │   ├── ErrorMessage.tsx     # Error display component
│   │   ├── Modal.tsx            # Responsive modal component
│   │   └── Navigation.tsx       # Mobile-friendly navigation
│   ├── routes/                  # File-based routing
│   │   ├── app/                 # Main app routes
│   │   │   ├── index.tsx        # Pantry management page
│   │   │   ├── components/      # App-specific components
│   │   │   │   ├── ItemForm.tsx # Item creation/editing form
│   │   │   │   └── shelfCard.tsx # Shelf display component
│   │   │   ├── model/           # Data layer functions
│   │   │   ├── types/           # TypeScript type definitions
│   │   │   └── validation/      # Zod validation schemas
│   │   ├── home.tsx            # Landing page
│   │   └── aboutMe.tsx         # About page (LinkedIn redirect)
│   ├── welcome/                # Welcome page components
│   ├── app.css                 # Global styles
│   └── root.tsx                # App root component
├── lib/                        # Shared utilities
├── prisma/                     # Database configuration
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
├── generated/                  # Prisma generated files
└── public/                    # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mahdi-Khorshidi-26/Savvy-Tech-Task.git
   cd recipe-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/pantry_db"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open the application**
   Navigate to `http://localhost:5173` in your browser

### Production Build

```bash
npm run build
npm start
```

## 🔧 How the App Works

### Core Architecture

The application follows a modern React architecture with server-side rendering:

1. **File-Based Routing**: Routes are automatically generated from the `app/routes/` directory
2. **Server Actions**: Form submissions are handled server-side with type-safe validation
3. **Optimistic UI**: User actions provide immediate feedback while server processes requests
4. **Type Safety**: Full TypeScript coverage from database to UI components

### Data Flow

1. **User Action**: User interacts with the UI (create shelf, add item, etc.)
2. **Optimistic Update**: UI immediately reflects the change
3. **Server Processing**: Request is sent to server with validation
4. **Database Update**: Prisma ORM updates PostgreSQL database
5. **State Sync**: Server response syncs with client state

### Key Features Explained

#### 🗂️ Shelf Management

- **Create Shelves**: Users can create different types of shelves (Fridge, Freezer, Cabinet)
- **Edit Names**: Click on shelf names to edit them inline
- **Delete Shelves**: Remove shelves and all their items
- **Optimistic Updates**: Changes appear instantly with loading states

#### 📦 Item Management

- **Add Items**: Comprehensive form with name, category, quantity, unit, expiry date, and notes
- **Edit Items**: Click edit button to modify existing items
- **Delete Items**: Remove individual items from shelves
- **Expiry Tracking**: Visual indicators for expired (🚨) and expiring soon (⚠️) items

#### 🔍 Search & Filter

- **Real-time Search**: Search across all items in all shelves
- **Category Display**: Items are color-coded by category
- **Responsive Results**: Search results update as you type

#### 📱 Responsive Design

- **Mobile-First**: Designed for mobile devices first, then enhanced for larger screens
- **Adaptive Layouts**: Tables become cards on mobile devices
- **Touch-Friendly**: Large touch targets and intuitive gestures

### Component Architecture

#### Reusable Components

- **Button**: Configurable button with variants, sizes, and loading states
- **Modal**: Responsive modal with accessibility features
- **Container**: Responsive wrapper with configurable sizing and spacing
- **ErrorMessage**: Consistent error display across the app

#### Feature Components

- **ShelfCard**: Displays shelf information and contained items
- **ItemForm**: Handles item creation and editing with validation
- **Navigation**: Mobile-responsive navigation with slide-out menu

## 🌐 API Endpoints

The app uses React Router's action system for API endpoints:

### Shelf Operations

- **POST** `/app` with `_action=createShelf` - Create new shelf
- **POST** `/app` with `_action=deleteShelf` - Delete shelf
- **POST** `/app` with `_action=saveShelf` - Update shelf name

### Item Operations

- **POST** `/app` with `_action=createItem` - Add new item
- **POST** `/app` with `_action=updateItem` - Edit existing item
- **POST** `/app` with `_action=deleteItem` - Remove item

### Query Parameters

- **GET** `/app?q=search_term` - Search items

## 🗄️ Database Schema

### PantrySelf Table

```sql
id          String   @id @default(cuid())
name        String   -- Shelf name (e.g., "Fridge")
type        String   -- Shelf type (e.g., "fridge")
order       Int      @default(0) -- Display order
createdAt   DateTime @default(now())
updatedAt   DateTime @updatedAt
```

### PantryItem Table

```sql
id           String    @id @default(cuid())
name         String    -- Item name (e.g., "Milk")
category     String    -- Category (e.g., "Dairy")
quantity     Int       @default(1)
unit         String    -- Unit (e.g., "ml", "g")
expiryDate   DateTime? -- Optional expiry date
notes        String?   -- Optional notes
pantrySelfId String    -- Foreign key to shelf
createdAt    DateTime  @default(now())
updatedAt    DateTime  @updatedAt
```

## 🔄 State Management

The app uses a combination of:

- **React Router Loaders**: For initial data fetching
- **React Router Actions**: For server-side mutations
- **React Hook Form**: For form state management
- **React State**: For local UI state and optimistic updates
- **Fetchers**: For non-navigation form submissions

## 🎨 Styling & Theming

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach with breakpoints
- **Color Scheme**: Light theme only (dark theme removed)
- **Component Variants**: Configurable button, modal, and container variants

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (cards layout, stacked forms)
- **Tablet**: 768px - 1024px (mixed layout)
- **Desktop**: > 1024px (full table layout, side-by-side forms)

## 🧪 Development

### Type Generation

```bash
npm run typecheck
```

### Database Management

```bash
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Create and apply migration
npx prisma db seed         # Seed database
```

### Code Quality

- TypeScript strict mode enabled
- ESLint configuration for React best practices
- Prisma type generation for database operations

## 👨‍💻 Author

**Mahdi Khorshidi**

- LinkedIn: [mahdi-khorshidi](https://www.linkedin.com/in/mahdi-khorshidi/)
- GitHub: [Mahdi-Khorshidi-26](https://github.com/Mahdi-Khorshidi-26)

## 📄 License

This project is created as a technical task for Savvy Tech Team.

---

_Built by Mahdi Khorshidi with ❤️ for Savvy Tech Team_
