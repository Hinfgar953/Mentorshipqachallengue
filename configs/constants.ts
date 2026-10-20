export const ROUTES = {
  login: "/practice-login-form",
  forgotPassword: "/forget-password",
  register: "/register",
  shop: "/practice-ecommerece-website",
  flightBooking: "/flight-booking-scenarios",
} as const;

export const MESSAGES = {
  loginSuccess: "Login Successful",
  emailAndPasswordRequired: "Email and Password are required",
  passwordRequired: "Password is required",
  emailRequired: "Email is required",
  invalidCredentials: "Invalid email id and password",
  orderSuccess: "Order Successful",
  bookingConfirmed: "Booking Confirmed",
} as const;

export const CATEGORIES = {
  electronics: "electronics",
  jewelery: "jewelery",
  men: "men's clothing",
  women: "women's clothing",
} as const;

export const API_PATHS = {
  login: "/auth/login",
  products: "/products",
  categories: "/products/categories",
  carts: "/carts",
} as const;

//business rule of the premium cart: 10% discount from $100 of subtotal
export const PREMIUM_RULES = {
  threshold: 100,
  rate: 0.1,
} as const;
