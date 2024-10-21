import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

export const auth = getAuth()
export const db = getFirestore()

export const loginUser = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error) {
    throw new Error(error.message)
  }
}

export const registerUser = async (email, password, username) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, 'users', result.user.uid), {
      username,
      email,
      createdAt: new Date().toISOString(),
      stats: {
        totalGames: 0,
        bestScore: 0,
        averageScore: 0,
      },
    })
    return result.user
  } catch (error) {
    throw new Error(error.message)
  }
}

export const logoutUser = () => signOut(auth)
