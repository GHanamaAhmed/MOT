# MOT - Modeling by Object Types

![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=Electron&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-Auth-8A2BE2)
![tldraw](https://img.shields.io/badge/tldraw-Editor-4BC0F0)

A desktop application for object type modeling and diagramming (MOT = _Modélisation par Objets Types_) with secure authentication and GitHub integration.

## Features

- 🔐 **Secure Authentication** with Clerk
- 🎨 **Object Modeling** using tldraw.dev
- 📂 **Project Management** (Full CRUD Operations)
- 💾 **GitHub Storage** for project persistence
- 🖥️ **Cross-Platform** (Windows, macOS, Linux)
- 🧩 **Modular Architecture** with Electron + React
- 🎨 **Tailwind CSS** with Shadcn components
- 🛠 **Type Safety** with TypeScript

## Prerequisites

- Node.js 18+
- npm 9+
- Git
- Clerk API Keys (Sign up at [clerk.dev](https://clerk.dev))

## Installation

```bash
# Clone repository
git clone https://github.com/ghanamaahmed/mot.git
cd mot

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Update Clerk publishable key in .env file
```

## Development

```bash
# Start development server
npm run dev

# Run type checking
npm run typecheck

# Lint codebase
npm run lint

# Format code
npm run format
```

## Build & Deployment

```bash
# Build for current platform
npm run build

# Platform-specific builds
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux

# Create unpacked build
npm run build:unpack
```

## Project Structure

```
mot/
├── src/
│   ├── main/          # Electron main process
│   ├── renderer/      # React components
│   └── preload/       # IPC communication
├── resources/         # Static assets
├── types/             # TypeScript definitions
└── electron.vite.config.ts # Build configuration
```

## Key Technologies

- **Authentication**: Clerk React SDK
- **Diagramming**: tldraw v3.4+
- **State Management**: React Context API
- **Routing**: React Router v6
- **UI Components**: Shadcn
- **Styling**: Tailwind CSS with Animate
- **Build System**: electron-vite

## CRUD Operations

Manage modeling projects through:
- **Create**: New object type models
- **Read**: Project listings and details
- **Update**: Modify existing diagrams
- **Delete**: Remove projects
- **Store/Retrieve**: GitHub repository integration

## Environment Configuration

Required `.env` variable:
```ini
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
```

## API Repository

The backend API for this project is available at:  
[GitHub API Repository](https://github.com/ghanamaahmed/mot-server-side)

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) guidelines.


---

**Developed by** [ghanama.tech](https://ghanama.tech)  
**Documentation** [https://electron-vite.org](https://electron-vite.org)
