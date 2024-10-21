import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const storage = getStorage()

export const uploadProfilePicture = async (file, userId) => {
  try {
    const storageRef = ref(storage, `profiles/${userId}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
  } catch (error) {
    throw new Error(error.message)
  }
}
