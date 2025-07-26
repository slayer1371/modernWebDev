All notable changes to this project are documented in this file.

## [0.4.0] – 2025‑07‑26
### Added
- **Order Management**
  - Tracking order status and showing order history for users.
  - Admin role added for changing order status from the admin side, using `Parse.Role` class.
- **Shopping Cart & Checkout**
  - "Add to Cart" feature implemented.
  - "Proceed to Checkout" feature implemented.

## [0.3.0] – 2025‑07‑10
### Added
- **Authentication & Authorization**
  - Login and Register flows using Parse `_User` class.
  - `ProtectedRoute` component and route guards implemented for `CartPage`.
  - `PublicRoute` to block access to authentication pages when a user is already logged in.
  - Authentication logic extracted into `useAuth` service.
- **Styling**
  - TailwindCSS used to style all pages.

### Changed
- Project version bumped to **0.3.0** in `package.json`.

## [0.2.0] – 2025‑07‑02
### Added
- **Routing**
  - React Routing implemented for `HomePage`, `MenuPage`, `CartPage`, and a 404 route.
- **Data Models & Services**
  - `models/CoffeeModel.js` added with a one-to-many relationship for reviews.
  - `CoffeeService.jsx` uses `CoffeeModel` for asynchronous data fetching.
- **Documentation**
  - UML and component tree added to the README.
