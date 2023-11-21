export const selectShowCart = (state: { cart: { showCart: any } }) =>
  state.cart.showCart
export const selectCartItems = (state: { cart: { cartItems: any } }) =>
  state.cart.cartItems
export const selectTotalPrice = (state: { cart: { totalPrice: any } }) =>
  state.cart.totalPrice
export const selectTotalQuantities = (state: {
  cart: { totalQuantities: any }
}) => state.cart.totalQuantities
export const selectSize = (state: { cart: { size: any } }) => state.cart.size
export const selectColor = (state: { cart: { color: any } }) => state.cart.color
