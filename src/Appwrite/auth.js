import { storage, account, database } from "./AppwriteConfig";
import { Permission, Query, Role } from "appwrite";
import { ID } from "appwrite";
import conf from "./Conf";
import { v4 as uuidv4 } from "uuid"; // Import UUID package
// import { useNavigate } from "react-router-dom";
import { setUserID } from "./UserKiID";
import { setDatabaseID, setStorageID } from "./UnsavedDocsID";
import { setDbId, setStId } from "../Redux/getDatabaseAndStorageIDSlice.js";
import { setFileId, setFileUrl } from "../Appwrite/GetFileIdOfAvatar.js";
import {
  setfileId,
  setDocId,
  setemailId,
  setuserId,
  setuserprofiledocumentId,
} from "../Redux/GetAvatarFileIDSlice.js";
let userId;
let fileID;
// let fileIDforFoodImage;

export const createUserAccount = async (
  email,
  password,
  username,
  name,
  dispatch
) => {
  // const navigate = useNavigate();
  try {
    const userAccount = await account.create(ID.unique(), email, password);
    userId = userAccount.$id;
    let userEmail = userAccount.email;
    setUserID(userId);
    // console.log("User ID:", userId);
    // console.log(`Type: ${typeof name}, Name: ${name}`);
    // console.log(`Type: ${typeof username}, Username: ${username}`);

    // 2. Create a session (log the user in)
    // await account.createEmailPasswordSession(email, password);
    let documetnId = ID.unique();
    const Profile = await database.createDocument(
      conf.appwriteDatabase,
      conf.appwriteUsersCredentialsCollectionID,
      documetnId,
      { Name: name, Username: username },
      [
        Permission.read(Role.any()), // Allow everyone to read
        Permission.write(Role.any()), // Allow everyone to write
        Permission.update(Role.any()), // Allow everyone to update
        Permission.delete(Role.any()), // Allow everyone to delete
      ]
    );

    // // 4. Send verification email with absolute URL
    // const EmailVerification = await account.createVerification(
    //   `${window.location.origin}/verify`  // This ensures full URL is used
    // );

    if (userAccount && Profile) {
      console.log("Account created successfully");
      dispatch(setDocId(documetnId));
      console.log("The user account is: ", userAccount);
      dispatch(setemailId(userEmail));
      dispatch(setuserId(userId));
      // console.log("The profile is: ", Profile);
      // console.log("EmailVerificatoin routes works:",EmailVerification)
      return true;
      // Delay the navigation slightly to let the toast message display
    }

    // if (userAccount && Profile && EmailVerification) {
    //   console.log("Account created successfully");
    //   return { success: true, userId: userAccount.$id };
    // }

    // return { success: false };
  } catch (error) {
    console.error("Error while creating user account auth.js: ", error.message);
    if ((error.code = 429)) return "Try Again After Some time";
  }
};

// export const SendingDataToDatabaseGoogleSignup = async (name, username) => {
//   try {
//     const existingUser = await database.listDocuments(
//       conf.appwriteDatabase,
//       conf.appwriteUsersCredentialsCollectionID,
//       [
//         Query.equal('email', email)
//       ]
//     );

//     if (existingUser.documents.length === 0) {
//       // Only create new document if user doesn't exist
//       await database.createDocument(
//         conf.appwriteDatabase,
//         conf.appwriteUsersCredentialsCollectionID,
//         ID.unique(),
//         {
//           Name: name,
//           Username: username,
//           // Add other relevant user data
//         }
//       );
//     }
//     return true;
//   } catch (error) {
//     console.error("Database operation failed:", error);
//     throw error;
//   }
// };

export const LoggedInUser = async (email, password) => {
  try {
    const session = await account.get();
    if (session) {
      console.log("User is already logged in:", session);
      // Redirect user to homepage if already logged in
      window.location.href = "/home";
      return;
    } 

    const userLogged = await account.createEmailPasswordSession(
      email,
      password
    );

    // 4. Send verification email with absolute URL
    const EmailVerification = await account.createVerification(
      `${window.location.origin}/verify` // This ensures full URL is used
    );

    if (userLogged && EmailVerification) {
      console.log("User logged in Successfully");
      return { success: true, userId: userId };
    }

    return false;
  } catch (error) {
    console.log("Error while user logginIN: ", error.message);
  }
};

export const LogoutUser = async () => {
  try {
    // Attempt to delete the current session
    await account.deleteSessions();
    console.log("User logged out successfully.");
    return true;
  } catch (error) {
    if (error.code === 401) {
      console.error("Unauthorized: No active session found.");
    } else {
      console.error("Error while logging out:", error.message);
    }
    return false;
  }
};

// Intercept requests globally
const handleGlobalErrors = async (action) => {
  try {
    await action();
  } catch (error) {
    if (error.code === 401) {
      console.error("Session expired. Redirecting to login...");
      // Redirect or clear authentication state
    } else {
      console.error("An error occurred:", error.message);
    }
  }
};

// Usage
// Create an initialization function
const initializeAccount = async () => {
  try {
    await handleGlobalErrors(() => account.get());
  } catch (error) {
    console.error("Error initializing account:", error);
  }
};

// Call it right away
initializeAccount();

export const UploadAvatarToStorage = async (avatar, dispatch) => {
  const fileID = uuidv4();
  // console.log("The fileId is: ", fileID);

  try {
    const result = await storage.createFile(
      conf.appwriteUsersAvatarsBucketID,
      fileID,
      document.getElementById("uploader").files[0]
    );

    if (result) {
      // console.log("Avatar uploaded successfully", result);
      const fileUrl = result.name;
      dispatch(setfileId(fileID));
      setFileUrl(fileUrl); // Set the URL
      setFileId(fileID); // Set the ID
      return {
        success: true,
        fileId: fileID,
        fileUrl: fileUrl,
      };
    }
  } catch (error) {
    console.error("Error while uploading Avatar: ", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const ForgetPassord = async (email) => {
  try {
    const forgetPass = await account.createRecovery(
      email,
      "http://localhost:5173/resetPassword"
    );

    if (forgetPass) {
      console.log("Email send successfully");
    }
  } catch (error) {
    console.log("Error while sending the email: ", error.message);
  }
};

export const updateForgetPasswordRecovery = async (
  userId,
  secret,
  newPassword
) => {
  try {
    const updateRecovery = await account.updateRecovery(
      userId,
      secret,
      newPassword
    );
    if (updateRecovery) {
      console.log("Password get reset successfully");
      return true; // Make sure it returns `true` when successful
    } else {
      console.log("Password reset failed without error.");
      return false;
    }
  } catch (error) {
    console.log("Error while updating the new password: ", error.message);
    return false; // Make sure to return false in case of failure
  }
};

export const getAvatarFromStorage = async (fileID) => {
  try {
    const Avatar = await storage.getFile(
      conf.appwriteUsersAvatarsBucketID,
      fileID
    );
    if (Avatar) {
      console.log("User avatar fetched successfully");
      // console.log("The image is: ", Avatar)
      return Avatar;
    }
    // return false;
    return Avatar;
  } catch (error) {
    console.log("Error while gettin user avatar: ", error.message);
    return false;
  }
};

//  Below are main database that get generate by user(saveToFavourites)

export const saveFoodImageToStorage = async (title, foodimage, userId) => {
  if (!userId || userId.length > 36 || !/^[a-zA-Z0-9._-]+$/.test(userId)) {
    console.error("Invalid userId:", userId);
    console.log("The userId is:", userId);
    return; // Prevent further execution
  }

  let fileIDforFoodImage = uuidv4();
  const response = await fetch(foodimage);
  const blob = await response.blob();
  const file = new File([blob], `food_image_${fileIDforFoodImage}.jpg`, {
    type: blob.type,
  });

  try {
    const savedfoodPicToST = await storage.createFile(
      conf.appwriteMealMindFoodImagesBucketID,
      fileIDforFoodImage,
      file,
      [
        Permission.read(Role.user(userId)), // Correct user permission format
        Permission.write(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
    );
    let DocumentID = ID.unique();
    console.log("The documentID is(auth.js):", DocumentID);
    const savedfoodDataToDB = await database.createDocument(
      conf.appwriteDatabase,
      conf.APPwriteFoodCollectionId,
      DocumentID,
      {
        name: title,
        imageUrl: foodimage,
        userId: userId,
        dbId: DocumentID, // Add these IDs to the document
        stId: fileIDforFoodImage,
      },
      [
        Permission.read(Role.user(userId)), // Only this user can read
        Permission.write(Role.user(userId)), // Only this user can read
        Permission.update(Role.user(userId)), // Only this user can update
        Permission.delete(Role.user(userId)), // Only this user can delete
      ]
    );

    if (savedfoodPicToST && savedfoodDataToDB) {
      // dispatch(setDbId(DocumentID))
      // setDatabaseID(DocumentID)
      // dispatch(setStId(fileIDforFoodImage))
      // setStorageID(fileIDforFoodImage)
      console.log("The databaseID from auth.js is:", DocumentID);
      console.log("The storageID from auth.js is:", fileIDforFoodImage);
      console.log(
        "Food Image and data successfully get save to storage and database"
      );
    }
  } catch (error) {
    console.log("Error while saving food image to storage:", error.message);
  }
};

export const RetrieveFoodImageAndItsDataFromSTaDB = async (userId) => {
  try {
    const listFoodDetails = await database.listDocuments(
      conf.appwriteDatabase,
      conf.APPwriteFoodCollectionId,
      [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
    );

    if (listFoodDetails.documents.length > 0) {
      console.log(
        "Saved meals retrieved successfully:",
        listFoodDetails.documents
      );

      // Return properly formatted array of food details
      return listFoodDetails.documents.map((doc) => ({
        name: doc.name,
        imageUrl: doc.imageUrl,
        $id: doc.$id, // Using Appwrite's document ID instead of generating a new one
        dbId: doc.dbId, // Include these IDs
        stId: doc.stId,
        created: doc.$createdAt,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching saved meals:", error);
    throw error;
  }
};

export const DeleteFoodImagesFromDataBase = async (databaseID, storageID) => {
  try {
    const deleteDocumentfromdb = await database.deleteDocument(
      conf.appwriteDatabase,
      conf.APPwriteFoodCollectionId,
      databaseID
    );

    const deleteImageFromStorage = await storage.deleteFile(
      conf.appwriteMealMindFoodImagesBucketID,
      storageID
    );

    if (deleteDocumentfromdb && deleteImageFromStorage) {
      console.log(
        "Document and Image Deleted from Database and Storage successfully "
      );
      return true;
    }
  } catch (error) {
    console.log(
      "Error while deleting documents from db and storage:",
      error.message
    );
  }
};

// For Add To Cart Meals

export const saveFoodMealsToDatabase = async (title, foodimage, userId) => {
  if (!userId || userId.length > 36 || !/^[a-zA-Z0-9._-]+$/.test(userId)) {
    console.error("Invalid userId:", userId);
    console.log("The userId is:", userId);
    return; // Prevent further execution
  }

  try {
    let DocumentID = ID.unique();
    console.log("The documentID is(auth.js):", DocumentID);
    const savedfoodDataToDB = await database.createDocument(
      conf.appwriteDatabase,
      conf.AppwriteFoodImageCollectionForAddToCart,
      DocumentID,
      { name: title, imageUrl: foodimage, userId: userId, dbId: DocumentID },
      [
        Permission.read(Role.user(userId)), // Only this user can read
        Permission.write(Role.user(userId)), // Only this user can read
        Permission.update(Role.user(userId)), // Only this user can update
        Permission.delete(Role.user(userId)), // Only this user can delete
      ]
    );

    if (savedfoodDataToDB) {
      console.log("The databaseID from auth.js addToCart is:", DocumentID);
      //  console.log("The storageID from auth.js is:",fileIDforFoodImage)
      console.log(
        "Food Image and data successfully get save to storage and database"
      );
    }
  } catch (error) {
    console.log("Error while saving food to addToCart:", error.message);
  }
};

export const RetrieveFoodDetailsToDatabase = async (userId) => {
  try {
    const listFoodDetails = await database.listDocuments(
      conf.appwriteDatabase,
      conf.AppwriteFoodImageCollectionForAddToCart,
      [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
    );

    if (listFoodDetails.documents.length > 0) {
      console.log(
        "Saved meals retrieved successfully:",
        listFoodDetails.documents
      );

      // Return properly formatted array of food details
      return listFoodDetails.documents.map((doc) => ({
        name: doc.name,
        imageUrl: doc.imageUrl,
        id: doc.$id, // Using Appwrite's document ID instead of generating a new one
        dbId: doc.dbId, // Include these IDs
        created: doc.$createdAt,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching saved meals:", error);
    throw error;
  }
};

export const DeleteFoodItemsFromDataBase = async (databaseID) => {
  if (!databaseID) {
    throw new Error("Database ID is required");
  }

  try {
    const deleteDocumentfromdb = await database.deleteDocument(
      conf.appwriteDatabase,
      conf.AppwriteFoodImageCollectionForAddToCart,
      databaseID
    );

    if (deleteDocumentfromdb) {
      console.log("Document and Deleted from Database successfully ");
      return deleteDocumentfromdb;
    }
  } catch (error) {
    if (error.code === 404) {
      // If document doesn't exist, we should still remove it from Redux
      return { status: "not_found" };
    }
    throw error;
  }
};

// Below are the logic for Profile of User --------------------------------------------------------------------------

export const getUserAvatarWhileSignupAndSendingItToTheuserAvatarImageFromMainBucket =
  async (avatarUrl, userId) => {
    if (!userId || userId.length > 36 || !/^[a-zA-Z0-9._-]+$/.test(userId)) {
      console.error("Invalid userId:", userId);
      console.log("The userId is:", userId);
      return; // Prevent further execution
    }

    let fileIDforAvatarImage = uuidv4();
    const response = await fetch(avatarUrl);
    const blob = await response.blob();
    const file = new File([blob], `food_image_${fileIDforFoodImage}.jpg`, {
      type: blob.type,
    });

    try {
      const uploadAvatarImageToStorage = await storage.createFile(
        conf.AppwriteUserProfileCredentialsBucketId,
        fileIDforAvatarImage,
        document.getElementById("uploader").files[0],
        [
          Permission.read(Role.user(userId)), // Correct user permission format
          Permission.write(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );

      if (uploadAvatarImageToStorage) {
        console.log(
          "Avatar Image Uploaded Successfully to userProfileCredentialBucket",
          uploadAvatarImageToStorage
        );
        return true;
      }
    } catch (error) {
      console.log(
        "Error while uploading avatar image to userProfileCredentialBucket",
        error.message
      );
    }
  };

export const getUserInfoFromDataBase = async (documentId) => {
  if (!documentId) {
    console.log("Document Id not define", documentId);
    return;
  }
  try {
    const userInfoFromDB = await database.getDocument(
      conf.appwriteDatabase,
      conf.appwriteUsersCredentialsCollectionID,
      documentId,
      [Query.select(["Username", "Name"])]
    );

    if (userInfoFromDB) {
      // console.log("User info successfully retrived:",userInfoFromDB)
      return userInfoFromDB;
    }
  } catch (error) {
    console.log("Error while retrieving user info:", error.message);
  }
};

export const getUserEmailAndInfo = async () => {
  //  if(!userId){
  //   console.log("The user ID is not defined yet",userId)
  //   return;
  //  }
  try {
    const getUserIdInfoAndMail = await account.get();

    if (getUserIdInfoAndMail) {
      //  console.log("User email get retrieved successfully",getUserIdInfoAndMail)
    }
  } catch (error) {
    console.log("Error while getting email from database:", error.message);
  }
};

export const savedUserProfileSetupToDatabase = async (
  Phone,
  Location,
  Bio,
  userId,
  dispatch
) => {
  if (!Phone || !Location || !Bio || !userId) {
    console.log("The required credentials not found");
    return;
  }

  try {
    let documetnId = ID.unique();
    const ProfileInfoSaveToDB = await database.createDocument(
      conf.appwriteDatabase,
      conf.AppwriteUserProfileCredentilsCollectionId,
      documetnId,
      { Phone: Phone, Location: Location, Bio: Bio },
      [
        Permission.read(Role.user(userId)), // Correct user permission format
        Permission.write(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
    );

    if (ProfileInfoSaveToDB) {
      console.log(
        "User Information successfully get saved to database",
        ProfileInfoSaveToDB
      );
      dispatch(setuserprofiledocumentId(documetnId));
      return ProfileInfoSaveToDB;
    }
  } catch (error) {
    console.log(
      "Error while saving user profile information to database:",
      error.message
    );
  }
};

export const getUserProfilleSetupFromDatabases = async (documentId) => {
  if (!documentId) {
    console.log("Document Id not define", documentId);
    return;
  }
  try {
    const userProfileInfoFromDB = await database.getDocument(
      conf.appwriteDatabase,
      conf.AppwriteUserProfileCredentilsCollectionId,
      documentId,
      [Query.select(["Phone", "Location", "Bio"])]
    );

    if (userProfileInfoFromDB) {
      // console.log("User info successfully retrived:",userProfileInfoFromDB)
      return userProfileInfoFromDB;
    }
  } catch (error) {
    console.log("Error while retrieving user info:", error.message);
  }
};
