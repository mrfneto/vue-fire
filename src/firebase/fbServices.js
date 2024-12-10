import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { auth } from './'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { verifyErrors } from './fbErrors'

export const useFirebase = collectionName => {
  const error = ref(null)
  const loading = ref(false)
  const message = ref(null)
  const router = useRouter()

  const register = async (name, email, password) => {
    loading.value = true
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, { displayName: name })
      await router.replace({ name: 'home' })
    } catch (err) {
      error.value = verifyErrors(err.code)
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  const login = async (email, password) => {
    loading.value = true
    try {
      await signInWithEmailAndPassword(auth, email, password)
      await router.replace({ name: 'home' })
    } catch (err) {
      error.value = verifyErrors(err.code)
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  const recovery = async email => {
    loading.value = true
    try {
      await sendPasswordResetEmail(auth, email)
      message.value =
        'Um email de redefinição de senha foi enviado para ' + email
    } catch (err) {
      error.value = verifyErrors(err.code)
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      router.replace({ name: 'login' })
    } catch (error) {
      console.log(error)
    }
  }

  return { error, loading, message, register, login, recovery, logout }
}
