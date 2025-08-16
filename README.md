# Figma Prompt Library

A beautiful, comprehensive RTCCF-compliant prompt library for product designers. Features a modern UI with dark mode, smooth animations, and a glassmorphic design system.

![Figma Prompt Library](https://via.placeholder.com/800x400/1a0a2e/ffffff?text=Figma+Prompt+Library)

## ✨ Features

- **30+ Design Prompts** - Organized across 6 design phases
- **RTCCF Compliant** - Role, Task, Context, Constraints, Format structure
- **Beautiful Dark Mode** - Synthwave-inspired dark theme with animated backgrounds
- **Smooth Animations** - Motion-powered transitions throughout
- **Search & Filter** - Find prompts by title, summary, tags, or design phase
- **Copy Functionality** - One-click copying with clipboard fallback
- **Responsive Design** - Works perfectly on desktop and mobile
- **Extensible** - Easy to add custom prompts and categories

## 🎨 Design System

- **Clean & Minimal** - Professional light mode for focused work
- **Synthwave Dark Mode** - Animated grid backgrounds, glowing orbs, and neon gradients
- **Liquid Glass UI** - Backdrop blur effects and glassmorphic elements
- **Motion Design** - Carefully crafted animations using Motion (Framer Motion)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+ or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/figma-prompt-library.git
   cd figma-prompt-library
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   ├── figma/          # Figma-specific components
│   └── ...             # Feature components
├── data/               # Data and mock content
├── lib/                # Utilities and helpers
└── styles/             # Global styles and CSS
```

## 🎯 Usage

### Adding Custom Prompts

1. **Via UI**: Use the "Create Prompt" button to add prompts through the interface
2. **Via Code**: Add prompts to `src/data/prompts.ts`

```typescript
{
  id: 'unique-id',
  title: 'Your Prompt Title',
  phase: 'Research', // Research | IA | Ideation | Prototyping | Stakeholder | Dev Handoff
  impact: 'High Impact', // High Impact | Quick Win | 5-min Setup
  summary: 'Brief description of what this prompt does',
  content: createRTCCFContent(
    'You are a...', // Role
    'Task description', // Task
    'Context about the situation', // Context
    'Constraints and requirements', // Constraints
    'Expected output format' // Format
  ),
  tags: ['Tag1', 'Tag2']
}
```

### Customizing Themes

Modify the CSS custom properties in `src/styles/globals.css` to customize colors and styling:

```css
:root {
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  /* ... other variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode variables */
}
```

## 🧩 Components

### Core Components

- **PromptCard** - Individual prompt display cards
- **SidePanel** - Detailed prompt view with RTCCF content
- **SearchBar** - Real-time search functionality
- **FilterChips** - Tag-based filtering system
- **NavigationSidebar** - Phase and category navigation
- **CreatePromptModal** - Form for adding custom prompts

### UI Components

Built with Shadcn/ui and RadixUI primitives:
- Button, Input, Select, Dialog, Tooltip, etc.
- Fully accessible and keyboard navigable
- Consistent styling across light and dark modes

## 🎨 Styling

This project uses:

- **Tailwind CSS v4** - Utility-first CSS framework
- **CSS Custom Properties** - For theme variables
- **Motion** - For smooth animations and transitions
- **Responsive Design** - Mobile-first approach

## 📱 Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** - Beautiful, accessible UI components
- **RadixUI** - Unstyled, accessible UI primitives  
- **Motion** - Smooth animations and transitions
- **Lucide** - Beautiful, consistent icons
- **Tailwind CSS** - Utility-first CSS framework

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/your-username/figma-prompt-library/issues) page
2. Create a new issue with detailed information
3. Join our [Discord community](https://discord.gg/your-discord)

---

Made with ❤️ for the design community