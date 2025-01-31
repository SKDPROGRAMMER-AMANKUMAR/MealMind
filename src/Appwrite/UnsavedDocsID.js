// In UserKiID.js
let storedDatabaseId = null;
let storedStorageId = null;

export const setDatabaseID = (databaseID) => {
    storedDatabaseId = databaseID;
    console.log("Setting DatabaseID:", storedDatabaseId);
}
export const setStorageID = (storageID) => {
    storedStorageId = storageID;
    console.log("Setting StorageId:", storedStorageId);
}

export const getDatabaseID = (storedDatabaseId) => {
    console.log("Getting DatabaseId:", storedDatabaseId);
    return storedDatabaseId;
}
export const getStorageID = (storedStorageId) => {
    console.log("Getting StorageId:", storedStorageId);
    return storedStorageId;
}