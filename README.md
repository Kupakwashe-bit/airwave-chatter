# AirWave Chatter

A modern, proximity-based radio chat application built with React, TypeScript, and Vite. Experience simulated radio-style communication with signal strength indicators and proximity-based user discovery.

## ✨ Features

- **Proximity-Based Chat**: Discover and chat with simulated nearby users
- **Signal Strength Indicators**: Visual feedback on connection quality
- **Real-time Messaging**: Instant message delivery with typing indicators
- **Dark/Light Mode**: Fully responsive theme switching
- **Input Validation**: Secure message handling with XSS protection
- **Rate Limiting**: Built-in spam protection
- **Error Boundaries**: Graceful error handling and recovery
- **Accessibility**: ARIA labels and keyboard navigation
- **Progressive Enhancement**: Works offline with service worker ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd airwave-chatter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run type-check   # Run TypeScript type checking
```

## 🛠 Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React hooks with context
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Toast Notifications**: Sonner

## 🎨 Architecture

### Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── ErrorBoundary.tsx   # Error handling
│   ├── LoadingSpinner.tsx  # Loading states
│   ├── ThemeProvider.tsx   # Theme management
│   └── ThemeToggle.tsx     # Theme switcher
├── hooks/
│   └── useSimulatedProximity.ts  # User proximity simulation
├── lib/
│   ├── utils.ts           # Utility functions
│   └── validation.ts      # Input validation & security
├── pages/
│   ├── Chat.tsx           # Chat interface
│   ├── Scan.tsx           # User discovery
│   ├── Splash.tsx         # Landing page
│   └── NotFound.tsx       # 404 page
└── types/                 # TypeScript definitions
```

### Security Features

- **XSS Protection**: All user input is sanitized
- **Input Validation**: Zod schemas for type-safe validation  
- **Rate Limiting**: Message sending limits to prevent spam
- **Content Security**: Script injection prevention

## 🎯 Usage

1. **Start Scanning**: Launch the app and click "Start Scanning"
2. **Discover Users**: View nearby simulated users with signal strength
3. **Start Chatting**: Click on any user to begin a conversation
4. **Send Messages**: Type and send messages with real-time feedback
5. **Theme Toggle**: Switch between light/dark modes

## 🔧 Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```env
VITE_APP_TITLE="AirWave Chatter"
VITE_MAX_MESSAGE_LENGTH=500
VITE_RATE_LIMIT_MESSAGES=10
VITE_RATE_LIMIT_WINDOW=60000
```

### Customization

- **Themes**: Modify `src/index.css` for custom color schemes
- **Components**: Extend shadcn/ui components in `src/components/ui/`
- **Validation**: Update schemas in `src/lib/validation.ts`

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly interactions
- Progressive Web App (PWA) ready
- Capacitor integration for native mobile apps

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📦 Building for Production

```bash
npm run build
npm run preview  # Preview the build locally
```

## 🚀 Deployment

The app can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **Firebase Hosting**: Use Firebase CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Open an issue on GitHub
- Check the documentation
- Review existing issues and discussions

---

**Made with ❤️ using React, TypeScript, and modern web technologies**
