let getfileID = null
let getavatarUrl = null

export const setFileId = (FileID) => {
    getfileID = FileID
    // console.log("The setFileID is:",getfileID)
    return getfileID
}
export const getFileId = () => {
    console.log("The getFileID is:",getfileID)
    return getfileID
}

export const setFileUrl = (fileUrl) => {
    getavatarUrl = fileUrl
    // console.log("The setFileurl is:",getavatarUrl)
    return getavatarUrl
}

export const getFileUrl = () => {
    // getavatarUrl = filEUrl
    console.log("The setFileurl is:",getavatarUrl)
    return getavatarUrl
}