# 📝 NoteUno - Modern Note-Taking App


<div align="center">

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**A beautiful, modern, and feature-rich note-taking application built with the MERN stack**

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🐛 Report Bug](#contributing) • [✨ Request Feature](#contributing)

</div>

---

## ✨ Features

### 🔐 **Authentication System**
- **Secure Sign Up/Sign In** with JWT authentication
- **Protected Routes** - Notes are private to each user
- **Persistent Sessions** with automatic token refresh
- **Beautiful Auth UI** with smooth transitions

### 📝 **Note Management**
- **Rich Text Notes** - Create, edit, and delete notes
- **Real-time Updates** - Changes reflected instantly
- **Search & Filter** - Find notes quickly
- **Responsive Design** - Perfect on any device

### ⭐ **Smart Organization**
- **Starred Notes** - Mark important notes with a simple star
- **Dedicated Starred View** - Easy access to your favorite notes
- **Visual Indicators** - Clear star icons show note status

### 📎 **File Attachments**
- **Multiple File Support** - Attach up to 5 files per note
- **File Type Validation** - Images, documents, archives supported
- **Secure Downloads** - Protected file access
- **File Previews** - See attachment info at a glance

### 🎨 **Modern UI/UX**
- **Clean Interface** - Minimalist design focused on productivity
- **Dark Theme Ready** - Built with DaisyUI theme system
- **Smooth Animations** - Delightful micro-interactions
- **Mobile First** - Responsive design for all screen sizes

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Latest React with modern hooks
- **Vite** - Lightning-fast build tool and dev server  
- **React Router** - Seamless client-side routing
- **Tailwind CSS** - Utility-first styling framework
- **DaisyUI** - Beautiful component library
- **Lucide React** - Consistent icon system
- **Axios** - HTTP client with interceptors
- **React Hot Toast** - Elegant notification system

### **Backend**
- **Node.js & Express** - Robust server framework
- **MongoDB & Mongoose** - Flexible document database
- **JWT Authentication** - Secure token-based auth
- **Bcrypt** - Password hashing and security
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### **Development Tools**
- **ESLint** - Code quality and consistency
- **Nodemon** - Hot reload for development
- **PostCSS** - CSS processing and optimization

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **Git** for cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/noteuno.git
   cd noteuno
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/noteuno
   
   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # Server
   PORT=5001
   NODE_ENV=development
   ```

4. **Start the application**
   
   **Terminal 1** - Start Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2** - Start Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` and start taking notes! 🎉

---

## 📱 Usage Guide

### **Getting Started**
1. **Sign Up** - Create your account with email and password
2. **Sign In** - Access your personal note collection
3. **Create Notes** - Click "New Note" to start writing

### **Managing Notes**
- **Edit Notes** - Click on any note to open the editor
- **Star Important Notes** - Click the star icon to mark favorites
- **View Starred Notes** - Use the "Starred" button in navigation
- **Delete Notes** - Use the trash icon on note cards

### **File Attachments**
- **Upload Files** - Use the file input in the note creation form
- **Supported Types** - Images, PDFs, documents, archives
- **Download Files** - Click download button in note details
- **File Info** - See file size and upload date

### **Navigation**
- **Home** - View all your notes in a clean grid
- **Starred** - Quick access to your favorite notes  
- **Profile** - Manage your account settings

---

## 🏗️ Project Structure

```
noteuno/
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 config/          # Database configuration
│   │   ├── 📁 controllers/     # Route handlers
│   │   ├── 📁 middleware/      # Auth & file upload
│   │   ├── 📁 models/          # Database schemas
│   │   ├── 📁 routes/          # API endpoints
│   │   └── 📄 server.js        # Express server
│   ├── 📁 uploads/             # File storage
│   └── 📄 package.json
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/      # Reusable UI components
│   │   ├── 📁 contexts/        # React contexts
│   │   ├── 📁 lib/             # Utilities & config
│   │   ├── 📁 pages/           # Route components
│   │   └── 📄 App.jsx          # Main app component
│   ├── 📁 public/              # Static assets
│   └── 📄 package.json
└── 📄 README.md
```

---

## 🔧 API Documentation

### **Authentication Endpoints**
```http
POST /api/auth/signup     # Create new user account
POST /api/auth/signin     # Sign in user
```

### **Notes Endpoints**
```http
GET    /api/notes         # Get all user notes
GET    /api/notes/:id     # Get specific note
POST   /api/notes         # Create new note (with file upload)
PUT    /api/notes/:id     # Update note
DELETE /api/notes/:id     # Delete note
PATCH  /api/notes/:id/favorite  # Toggle favorite status
```

### **File Endpoints**
```http
GET /api/notes/:noteId/download/:fileId  # Download attachment
```

---

## 🎨 Screenshots

<div align="center">

### 🏠 Home Page
*Clean grid layout showing all your notes*

### ⭐ Starred Notes
*Quick access to your most important notes*

### ✏️ Note Editor  
*Rich editing experience with file attachments*

### 🔐 Authentication
*Beautiful sign-in and sign-up pages*

</div>

---

## 🤝 Contributing

We love contributions! Here's how you can help make NoteUno even better:

### **Ways to Contribute**
- 🐛 **Report Bugs** - Found an issue? Let us know!
- ✨ **Suggest Features** - Have ideas? We'd love to hear them!
- 💻 **Submit Code** - Ready to contribute? Fork and submit a PR!
- 📖 **Improve Docs** - Help make our documentation better

### **Development Process**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)  
5. **Open** a Pull Request

### **Coding Standards**
- Use **ESLint** configuration provided
- Follow **React** best practices
- Write **meaningful commit messages**
- Add **comments** for complex logic

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **MongoDB** - For the flexible database solution
- **Tailwind CSS** - For the beautiful utility-first CSS
- **DaisyUI** - For the gorgeous component library
- **Lucide** - For the consistent icon system

---

## 📊 Project Status

- ✅ **Authentication System** - Complete
- ✅ **Note CRUD Operations** - Complete  
- ✅ **File Attachments** - Complete
- ✅ **Starred Notes** - Complete
- ✅ **Responsive Design** - Complete
- 🔄 **Search & Filter** - In Progress
- 📋 **Export Notes** - Planned
- 🔔 **Push Notifications** - Planned

---

