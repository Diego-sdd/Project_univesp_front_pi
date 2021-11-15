export const STORE_JWT = 'AUTH_STORE_JWT'
export const RESET = 'AUTH_RESET'

// Token
export const setUserData = (token) => ({
    type: STORE_JWT,
    token: token,
})

export const reset = () => ({
    type: RESET,
})