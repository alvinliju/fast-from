# FastForm - Notion-like Form Builder

A powerful form builder that feels like Notion, built with BlockNote editor. Create, edit, and share forms without complex learning curves.

## 🚀 Quick Start

1. **Create a form** - Click "Create Form" and start building
2. **Add questions** - Use `/` slash menu to add different question types
3. **Share instantly** - Get a public link to share your form
4. **Collect responses** - View submissions in real-time

## 🏗️ Architecture Overview

### Frontend (Next.js 15)
- **BlockNote Editor** - Notion-like editing experience
- **Clerk Auth** - User authentication
- **ShadCN/UI** - Beautiful component library
- **Tailwind CSS** - Styling

### Backend (Express.js)
- **Supabase** - Database and storage
- **REST API** - Form and response management

### Key Engineering Decisions

1. **BlockNote Integration**
   - Custom form blocks (shortText, longText, email, etc.)
   - Page break functionality for multi-step forms
   - Real-time editing experience

2. **Form Persistence**
   - Forms saved as structured JSON in Supabase
   - Edit existing forms via dynamic routes
   - Public form sharing without login

3. **State Management**
   - Single source of truth in BlockNote editor
   - Proper prop synchronization for custom blocks
   - No duplicate state between component and editor

## 🛠️ Core Features

### Form Builder
- **Question Types**: Short text, Long text, Email, Number, Multiple Choice, Checkboxes
- **Page Breaks**: Create multi-step forms
- **Real-time Editing**: Notion-like experience
- **Slash Menu**: `/` to add elements quickly

### Form Player
- **Public Access**: Anyone with link can fill form
- **Responsive Design**: Works on all devices
- **Basic Validation**: Required field support

### Response Management
- **Submission Collection**: Store responses in Supabase
- **Simple Analytics**: View response counts
- **Export Ready**: Structured data for future analytics

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── builder/         # Form builder pages
│   │   ├── form/            # Form player pages
│   │   └── forms/           # Form management
│   ├── components/          # Reusable UI components
│   └── lib/                 # Utility functions
│
backend/
├── src/
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth middleware
│   └── lib/                # Database connections
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- Supabase account
- Clerk account

### Environment Variables

**Frontend (.env)**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Backend (.env)**
```env
PORT=3001
CLERK_SECRET_KEY=your_clerk_secret
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
```

### Installation

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
```

## 🚀 Deployment

not deployed yet, maybe after a few bug fixes and modifying the form player..

## 🎯 Future Enhancements

### Short Term
- Advanced form logic (conditional questions)
- Better analytics dashboard
- Response export (CSV, JSON)
- Custom domain support

### Long Term
- Real-time collaboration
- AI-powered form generation
- Natural language analytics queries
- Template marketplace

## 🤖 Engineering Principles

### Build Stupid, Then Iterate
- Start with minimal viable features
- Focus on core user flows first
- Add complexity only when needed

### Notion-like Experience
- Familiar editing interface
- No learning curve for users
- Powerful functionality under the hood

### Single Source of Truth
- BlockNote editor as the single state source
- Avoid React state duplication
- Proper prop synchronization

## 🐛 Common Issues & Solutions

### Form Loading Problems
- Ensure form IDs match database records
- Check Clerk authentication tokens
- Verify Supabase connection

### Block Editing Issues
- Make sure all custom blocks have proper update handlers
- Check that props are synchronized correctly
- Validate data types in prop schemas

### Authentication Errors
- Verify Clerk keys in environment variables
- Check middleware configuration
- Ensure proper token handling in API calls

## 📚 API Endpoints

### Forms
- `POST /api/forms` - Create new form
- `GET /api/forms` - Get user's forms
- `GET /api/forms/:id` - Get specific form
- `PUT /api/forms/:id` - Update form
- `DELETE /api/forms/:id` - Delete form

### Responses
- `POST /api/responses/:id` - Submit form response
- `GET /api/responses/:id` - Get form responses

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - See LICENSE file for details

## 🙋‍♂️ Support

For issues and feature requests, please open a GitHub issue.