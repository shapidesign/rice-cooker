# Rice Cooker App

A pixel art-themed React app for tracking rice cooking sessions with achievements and progress tracking.

## Features

- **Home Page**: Main dashboard with mascot and quick actions
- **Cooking Page**: Multi-stage rice cooking interface with timer
- **History Page**: View past cooking sessions and statistics
- **Achievements Page**: Track unlocked achievements and progress
- **Guide Page**: Learn about different rice types and cooking tips

## Tech Stack

- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- date-fns for date formatting
- Pixel art aesthetic with Press Start 2P font

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Project Structure

```
src/
├── components/
│   ├── Layout.tsx           # Main layout with pixel art styling
│   ├── PressableButton.tsx  # Interactive button component
│   └── achievementsConfig.ts # Achievement definitions
├── entities/
│   ├── all.ts              # User and UserProgress entities
│   ├── CookingSession.ts   # Cooking session data model
│   └── RiceType.ts         # Rice type definitions
├── pages/
│   ├── Home.tsx            # Main dashboard
│   ├── Cooking.tsx         # Cooking interface
│   ├── History.tsx         # Session history
│   ├── Achievements.tsx    # Achievement tracking
│   └── Guide.tsx           # Cooking guide
├── utils/
│   └── index.ts            # Utility functions
└── App.tsx                 # Main app with routing
```

## Features

### Cooking Interface
- Select from 6 different rice types
- Adjust serving size (0.25 to 4.0 cups)
- Real-time timer with pause/resume
- Progress tracking and completion alerts

### Achievement System
- 5 different achievements to unlock
- Progress tracking across sessions
- Dynamic mascot changes based on achievements

### History Tracking
- View all past cooking sessions
- Session details and statistics
- Success rate calculations

### Pixel Art Design
- Retro gaming aesthetic
- Press Start 2P font
- Custom button interactions with haptic feedback
- Smooth animations and transitions

## Development Notes

- All data is currently mocked - replace with actual API calls
- Haptic feedback is supported on mobile devices
- The app is designed for mobile-first experience
- Pixel art styling is handled through CSS custom properties

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)
