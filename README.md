# modernwebdev_v1

# Coffee Shop App

## UML: Component ↔ Model
```mermaid
classDiagram
    App <|-- HomePage
    App <|-- MenuPage
    App <|-- CartPage
    MenuPage <|-- MenuList
    CartPage <|-- CartItemList
    MenuPage ..> CoffeeModel : uses
