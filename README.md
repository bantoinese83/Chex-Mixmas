<div align="center">
  <h1>🎄 Chex Mixmas 🎄</h1>
  <p><em>The AI-Powered Holiday Chex Mix Recipe Generator</em></p>
  <p>✨ Where festive flavors meet culinary creativity ✨</p>
</div>

---

## 🎅 What's This All About?

**Chex Mixmas** is your personal holiday recipe workshop powered by Google's Gemini AI. No more boring, generic Chex Mix recipes! This app generates **unique, creative, and delicious** holiday snack mixes tailored to your exact preferences.

Want a spicy-sweet mix with a hint of umami? We got you. Need something keto-friendly with a caramel twist? Say no more. The AI elves in the kitchen will whip up something special just for you! 🧑‍🍳✨

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher recommended)
- A **Gemini API Key** (get one from [Google AI Studio](https://ai.google.dev/))

### Installation

1. **Clone and install:**
   ```bash
   npm install
   ```

2. **Set up your API key:**
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
     ```env
     API_KEY=your_gemini_api_key_here
     ```

3. **Start the magic:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:5173`
   - Start creating delicious holiday mixes! 🎉

---

## 🎨 Features

### 🎯 Core Features
- **AI-Powered Recipe Generation** - Unique recipes every time, powered by Gemini 2.5 Flash
- **Customizable Preferences** - Choose from 20+ flavor profiles, 100+ ingredients, and dietary options
- **Recipe Management** - Save, edit, rate, and organize your favorite recipes
- **Smart Scaling** - Automatically adjust ingredient quantities for different serving sizes
- **Search & Filter** - Find recipes quickly with advanced search and filtering
- **Social Sharing** - Share your creations via Twitter, Facebook, or Pinterest
- **PDF Export** - Print or save recipes as beautiful PDFs

### 🎁 Enhanced Features
- ⭐ **Favorites & Ratings** - Mark recipes as favorites and rate them
- 🏷️ **Tags & Collections** - Organize recipes with custom tags and collections
- 📝 **Recipe Editing** - Customize any recipe to your heart's content
- 🎚️ **Difficulty Levels** - Easy, Medium, or Hard - recipes are automatically categorized
- 📊 **Nutrition Facts** - Complete nutritional information for every recipe

---

## 🛠️ Tech Stack

Built with modern, cutting-edge technologies:

- **React 19.2** - Latest React with concurrent features
- **TypeScript** - Strict mode for type safety
- **Vite 6** - Lightning-fast build tool
- **Tailwind CSS 4** - Modern utility-first styling
- **Google Gemini AI** - Advanced AI recipe generation
- **React Hooks 2025** - `useActionState`, `useOptimistic`, `useEffectEvent` for optimal performance

---

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Quality Assurance
npm run type-check   # TypeScript strict mode checking
npm run lint         # ESLint with zero warnings policy
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting without fixing
npm run knip         # Find unused code and dependencies
npm run quality      # Run all quality checks (type-check, build, lint, format, knip)
```

---

## 🎯 Project Structure

```
src/
├── components/          # React components
│   ├── GeneratorForm/  # Recipe generation form
│   ├── RecipeCard/     # Recipe display and editing
│   ├── SavedRecipes/   # Recipe library with search/filter
│   └── ui/             # Reusable UI components
├── context/            # React Context for state management
├── data/               # Static data (ingredients, flavor profiles)
├── hooks/              # Custom React hooks
├── services/           # Business logic (AI, storage, sharing)
├── utils/              # Utility functions
└── types.ts            # TypeScript type definitions
```

---

## 🎄 Holiday Spirit Mode

Enable **Christmas Spirit** mode to get festive, holiday-themed recipe names and descriptions. The AI will sprinkle in some seasonal magic! ✨🎅

---

## 🧪 Development Notes

- **Strict TypeScript** - Zero tolerance for `any` types
- **Zero Lint Warnings** - Code quality is non-negotiable
- **React 2025 Hooks** - Using the latest concurrent features
- **Optimistic Updates** - Instant UI feedback with `useOptimistic`
- **Error Boundaries** - Graceful error handling throughout
- **Code Splitting** - Optimized bundle sizes for performance

---

## 🎁 Made With Love

Built by the **Antoine Family** with ❤️ and lots of holiday cheer!

---

## 📝 License

Private project - All rights reserved

---

<div align="center">
  <p><em>May your mixes be merry and your snacks be bright! 🎄✨</em></p>
</div>
