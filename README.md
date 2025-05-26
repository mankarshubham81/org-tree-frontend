# Organization Tree Frontend

A modern, responsive React application built with Vite and Redux Toolkit to visualize and manage an organizational chart. Users can view employee hierarchies and add new employees via a modal form with image upload and reporting manager assignment.

---

## 🚀 Features

* **Interactive Tree View**: Displays a dynamic tree structure of employees and their reporting lines.
* **Add Employee Modal**: Add new employees with fields for name, designation, date of birth, years of experience, manager selection, and photo upload.
* **Redux Toolkit**: Centralized state management with async thunks for API interactions.
* **Responsive Design**: Adapts layout for desktop and mobile devices.
* **Accessible & UX-Focused**: Keyboard-friendly forms, high-contrast cards, and smooth animations.

---

## 📦 Project Structure

```bash
org-tree-frontend/
├── public/                # Static assets and index.html
├── src/
│   ├── components/        # UI components (TreeView, AddEmployeeModal)
│   ├── features/          # Redux slices and async thunks
│   ├── store.js           # Redux store configuration
│   ├── App.jsx            # Root application component
│   ├── main.jsx           # Vite entry point
│   └── styles/            # Global and component-specific CSS
├── .gitignore
├── package.json
└── vite.config.js
```

---

## 🛠️ Prerequisites

1. **Node.js** (v14+) and **npm** or **Yarn**
2. Backend API running (see [org-tree-backend](https://github.com/mankarshubham81/org-tree-backend)).

   * Default expects `http://localhost:4000` for API requests.

---

## ⚡️ Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/mankarshubham81/org-tree-frontend.git
   cd org-tree-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or yarn install
   ```

3. **Configure environment (optional)**

   If your backend is on a different URL or port, update the base URL in `src/features/employeeSlice.js`:

   ```js
   const API_BASE = 'http://localhost:4000/api/employees';
   ```

4. **Run development server**

   ```bash
   npm run dev
   # or yarn dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173` (default Vite port).

6. **Build for production**

   ```bash
   npm run build
   # or yarn build
   ```

7. **Preview production build**

   ```bash
   npm run serve
   # or yarn serve
   ```

---

## 🧩 Usage

* **View Tree**: The homepage shows the full organization tree after fetching employees from the backend.
* **Add Employee**: Click **Add Employee** to open a modal. Fill out the form and submit. The tree refreshes automatically.

---

## 🎨 Styles & Theming

* CSS lives in `src/styles/` alongside component-specific styles under `src/components/`.
* No CSS framework—uses plain CSS for full control and performance.

---

## 🙌 Contributing

1. Fork this repo.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Happy coding!*
