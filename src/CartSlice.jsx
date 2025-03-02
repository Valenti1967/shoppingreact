import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    countCartItems: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ name, image, cost, quantity: 1 });
        }
        state.countCartItems++;
    },
    removeItem: (state, action) => {
        const { name, quantity } = action.payload;
        state.items = state.items.filter(item => item.name !== name);
        if(quantity > 0){
            state.countCartItems -= quantity; 
        }
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            if(quantity > itemToUpdate.quantity){
                state.countCartItems += (quantity - itemToUpdate.quantity); 
            } else if(quantity < itemToUpdate.quantity) {
                state.countCartItems -= (itemToUpdate.quantity - quantity);
            }
            itemToUpdate.quantity = quantity;
        }        
    },
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectCountCartItems = (state) => state.cart.countCartItems;

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
