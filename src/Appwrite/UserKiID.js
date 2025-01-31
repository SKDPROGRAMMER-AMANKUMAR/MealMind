// In UserKiID.js
let storedUserId = null;

export const setUserID = (userId) => {
    storedUserId = userId;
    // console.log("Setting userID:", storedUserId);
}

export const getUserID = () => {
    // console.log("Getting userID:", storedUserId);
    return storedUserId;
}