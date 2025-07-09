import AuthModule from "../auth/Auth";

function CartPage() {
  return (
    <div>
      <h1>Your Shopping Cart</h1>
      <p>Login to see your cart.</p>
      {/* Implement cart logic here: display items, quantities, total, checkout button */}
      <AuthModule />
    </div>
  );
}

export default CartPage;
