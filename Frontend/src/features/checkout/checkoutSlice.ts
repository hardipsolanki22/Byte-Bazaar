import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


interface CheckoutState {
    addressId: string | null
}
const getInitialState = (): CheckoutState => {
    const addressId = sessionStorage.getItem('checkout_addressId')
    return {
        addressId: addressId ?? null,
    }
}
const checkoutSlice = createSlice({
    name: "checkout",
    initialState: getInitialState(),
    reducers: {
        setAddressId: (state, action: PayloadAction<string>) => {
            state.addressId = action.payload
            sessionStorage.setItem('checkout_addressId', action.payload)
        },
        clearCheckout: (state) => {
            state.addressId = null
            sessionStorage.removeItem('checkout_addressId')
        }
    }
})

export const { setAddressId, clearCheckout } = checkoutSlice.actions
export default checkoutSlice.reducer