export const CONFIG = {
    GOOGLE_REDIRECT_URL: "https://byte-bazaar-isvj.onrender.com/api/v1/users/google",
    FACEBOOK_REDIRECT_URL: "https://byte-bazaar-isvj.onrender.com/api/v1/users/facebook",
    BACKEND_URL: "https://byte-bazaar-isvj.onrender.com/",
    API_BASE_URL: "https://byte-bazaar-isvj.onrender.com/api/v1"
}

export const MAX_IMAGES = 3

export const userRole = {
    USER: "USER",
    ADMIN: "ADMIN"
}


export const availablePaymentMethods = [
    {
        id: "COD",
        method: "Cash on Delivery",
        description: "Pay with cash upon delivery.",
    },
    {
        id: "STRIPE",
        method: "Pay Online - Credit/Debit Card",
        description: "Pay securely using Stripe.",
    }
]