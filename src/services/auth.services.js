import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'

export const useFirebase = () => {
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

  const verifyErrors = code => {
    const errors = {}
    switch (code) {
      case 'auth/invalid-email':
        errors.email = 'E-mail inválido'
        break
      case 'auth/user-not-found':
        errors.email = 'Não existe usuário com o endereço de email fornecido.'
        break
      case 'auth/email-already-in-use':
        errors.email = 'Já existi uma conta com o endereço de email fornecido.'
        break
      case 'auth/wrong-password':
        errors.password = 'Senha incorreta'
        break
      case 'auth/weak-password':
        errors.password =
          'A senha é inválida, precisa ter pelo menos 6 caracteres.'
        break
      default:
        errors.alert =
          'Ocorreu um erro ao efetuar a requisição. Tente novamente'
        break
    }
    return errors
  }

  return { error, loading, message, register, login, recovery, logout }
}
