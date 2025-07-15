# Changelog
## [0.3.0] – 2025-07-10
### Added
- Feature 5 - Auth Module
- Implemented Login and Register using Parse _User class.
- ProtectedRoute component and route guards for CartPage.
- PublicRoute to block auth pages when already logged in
- Extracted auth logic into `useAuth` service
- Used TailwindCSS to style all pages.

## [0.2.0] - 2025-07-02
### Added
- Feature 4: React Router (Home, Menu, Cart)
- Added React Routing for HomePage, MenuPage, CartPage, and a 404 route.
- `models/CoffeeModel.js` with one to many relationship (`reviews`)
- `CoffeeService.jsx` uses `CoffeeModel` for async fetch
- UML & component tree in README
