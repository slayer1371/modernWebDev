# Changelog

All notable changes to this project are documented in this file.

## [0.3.0] – 2025‑07‑26
### Added
- **Authentication & Authorization**  
  - Login, Register and “Forgot Password” flows using Parse.  
  - `ProtectedRoute` wraps all routes that require authentication.  
  - `AdminRoute` wraps admin‑only routes (e.g. `/admin/orders`).  
- **Redirection Rules**  
  - Unauthenticated access to protected routes redirects to `/auth`.  
  - Authenticated users trying to access `/auth`, `/login`, or `/register` are sent back to `/`.  
- **New Pages & Components**  
  - `AuthLogin.jsx`, `AuthRegister.jsx`, with form validation and UI feedback.  
  - `MyOrders.jsx` for users to view their order history.  
  - `AdminOrders.jsx` for admins to manage in‑progress orders.  
- **Code Quality**  
  - > 5 comments added across HTML/JSX/JS for clarity and future notes.  
  - Auth logic extracted into `AuthService.jsx`; coffee‑related logic into `CoffeeModelService.jsx`.  

### Changed
- Routing upgraded to React Router v7; wrap routes in `<ProtectedRoute>` and `<PublicRoute>`.  
- Navbar (`Navbar.jsx`) reflects login state via `AuthNav` module.  
- Project version bumped to **0.3.0** in `package.json`.  

---

## [0.2.0] – 2025‑07‑20
### Added
- **Routing & Parsing**  
  - Defined top‑level `<Routes>` in `Components.jsx`.  
  - `PublicRoute` to guard login/register pages.  
- **Menu & Cart**  
  - `MenuPage.jsx` displays coffees fetched via `CoffeeService.jsx`.  
  - “Add to Cart” and basic cart UI in `CartPage.jsx`.  

### Changed
- Vite/TailwindCSS setup finalized.  
- ESLint rules applied project‑wide.

---

## [0.1.0] – 2025‑07‑15
### Added
- **Component Architecture**  
  - Scaffolded core components: `HomePage`, `MenuPage`, `CartPage`, `Navbar`.  
  - Basic layout and styling with TailwindCSS.  
- **Tooling**  
  - Initialized with Vite, React 19, Tailwind v4, ESLint.  
