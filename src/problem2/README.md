# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

---

## ⏰ Duration

You should not spend more than **16 hours** on this problem.  
_Time estimation is for internship roles; if you are a software professional, you should spend significantly less time._

---

## Task

Create a currency swap form based on the template provided in the folder. A user would use this form to swap assets from one currency to another.

_You may use any third-party plugin, library, and/or framework for this problem._

1. You may add input validation/error messages to make the form interactive.
2. Your submission will be rated on its usage intuitiveness and visual attractiveness.
3. Show us your frontend development and design skills; feel free to totally disregard the provided files for this problem.
4. You may use this [repo](https://github.com/Switcheo/token-icons/tree/main/tokens) for token images, e.g., [SVG image](https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg).
5. You may use this [URL](https://interview.switcheo.com/prices.json) for token price information and to compute exchange rates (not every token has a price; those that do not can be omitted).

✨ **Bonus**: Extra points if you use [Vite](https://vite.dev/) for this task!

Please submit your solution using the files provided in the skeletal repo, including any additional files your solution may use.

💡 **Hint**: Feel free to simulate or mock interactions with a backend service, e.g., implementing a loading indicator with a timeout delay for the submit button is good enough.

---

## Setup and Run the Webpage

Follow these steps to set up and run the project:

1. **Install Dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed. Then, run the following command in the project directory:

   ```bash
   npm install
   ```

2. **Run the Development Server**:
   Start the development server with:

   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

4. **Build for Production**:
   To create a production build, run:

   ```bash
   npm run build
   ```

5. **Preview the Production Build**:
   To preview the production build locally, run:
   ```bash
   npm run preview
   ```

---

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
