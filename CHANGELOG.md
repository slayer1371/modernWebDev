# Changelog

## [0.3.0] - 2025-07-17

### Added
- **ProtectedRoute** component to guard routes requiring authentication  
- **AdminRoute** component to guard admin‑only routes  
- **PublicRoute** to prevent logged‑in users from accessing login/signup pages  
- Automatic **redirect to Home** after successful Login and Registration  
- “Forgot Password” flow in **AuthLogin** with Parse reset email  
- **View Details** modal on menu cards showing per‑coffee image, description, calories, sugar, benefits  
- Detailed comments throughout the codebase (> 5) to explain logic, mark TODOs, and document future work  
- **AuthService** moved into its own hook (`hooks/AuthService.jsx`)  

### Changed
- Version bumped to **0.3.0**  
- All protected routes (`/cart`, `/my‑orders`, `/admin/orders`) now redirect to `/auth` if unauthenticated  
- Auth routes (`/auth`, `/login`, `/register`) now redirect to `/` if already logged in  
- Extracted authentication logic into **AuthService** (register/login) and **useAuth** (isAuthenticated/logout/isAdmin) hooks  

### Fixed
- Users previously stayed on login/register page after auth — now redirect correctly  
- Ensured manual URL typing into protected routes triggers redirect to `/auth` when not logged in  


> This release completes the core authentication and authorization flows, adds in‑app coffee detail modals, and lays the groundwork for future admin and user‑profile features.
