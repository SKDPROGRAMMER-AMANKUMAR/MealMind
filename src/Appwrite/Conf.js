const conf = {
    appwriteEndPOINT: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabase: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUsersCredentialsCollectionID: String(import.meta.env.VITE_APPWRITE_USERSCREDENTIALS_COLLECTION_ID),
    appwriteUsersAvatarsBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_USERSAVATARS_ID),
    appwriteMealMindFoodImagesBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_MEALMINDFOODIMAGE_ID),
    appwriteApiKeySecretID: String(import.meta.env.VITE_APPWRITE_API_KEY_SECRET),
    ReactappRedirectUrlsuccessflly: String(import.meta.env.VITE_REACT_APP_REDIRECT_SUCCESS_URI),
    ReactappRedirectUrlfailure: String(import.meta.env.VITE_REACT_APP_REDIRECT_URI_FAILURE),
    APPwriteFoodCollectionId: String(import.meta.env.VITE_APPWRITE_FOODCOLLECTION_ID),
    AppwriteFoodImageCollectionForAddToCart: String(import.meta.env.VITE_APPWRITE_FOOD_IMAGE_COLLECTION_FOR_ADDTOCART_ID),
    AppwriteUserProfileCredentilsCollectionId: String(import.meta.env.VITE_APPWRITE_USER_PROFILE_CREDENTIALS_COLLECTION_ID),
    AppwriteUserProfileCredentialsBucketId: String(import.meta.env.VITE_APPWRITE_USER_PROFILE_CREDENTIALS_BUCKET_ID),
}

export default conf