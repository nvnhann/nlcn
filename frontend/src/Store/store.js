import userReducer from './userSlice';
import profileReducer from './profileSlice';
import loginReducer from './loginpageSlice';
import cartReducer from './cartSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  user: userReducer,
  profile: profileReducer,
  login: loginReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
