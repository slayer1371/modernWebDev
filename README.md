# modernwebdev_v1

# Coffee Shop App

## UML: Component ↔ Model
```mermaid
classDiagram
    App <|-- HomePage
    App <|-- MenuPage
    App <|-- CartPage
    MenuPage <|-- MenuList
    MenuPage ..> CoffeeModel : uses


App
├─ Navbar
└─ Routes
   ├ HomePage
   ├ MenuPage
   │  └ MenuList
   └ CartPage
