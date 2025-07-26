import Parse from "parse";

export const fetchAllWithReviews = () => {
  const Coffee = Parse.Object.extend("Coffee");
  const query = new Parse.Query(Coffee);
  query.include("reviews"); // one-to-many relation, 1 coffee type can have multiple ratings from many customers.
  return query.find();
};

export const addToCart = async (user, coffeeId) => {
  const Cart = Parse.Object.extend("Cart");
  const query = new Parse.Query(Cart);
  query.equalTo("user", user);
  let cart = await query.first();
  if (!cart) {
    cart = new Cart();
    cart.set("user", user);
    cart.set("items", []);
  }
  let items = cart.get("items") || [];
  const existing = items.find((item) => item.coffeeId === coffeeId);
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ coffeeId, quantity: 1 });
  }
  cart.set("items", items);
  await cart.save();
  return cart;
};

export const getUserCart = async (user) => {
  const Cart = Parse.Object.extend("Cart");
  const query = new Parse.Query(Cart);
  query.equalTo("user", user);
  const cart = await query.first();
  return cart;
};

export const createOrderFromCart = async (user, cartItems) => {
  const Order = Parse.Object.extend("Order");
  const order = new Order();
  order.set("user", user);
  order.set("items", cartItems);
  order.set("status", "In Progress");
  await order.save();
  return order;
};

export const fetchInProgressOrders = async () => {
  const Order = Parse.Object.extend("Order");
  const query = new Parse.Query(Order);
  query.equalTo("status", "In Progress");
  query.include("user");
  return await query.find();
};

export const markOrderReady = async (orderId) => {
  const Order = Parse.Object.extend("Order");
  const query = new Parse.Query(Order);
  const order = await query.get(orderId);
  order.set("status", "Ready");
  await order.save();
  return order;
};
