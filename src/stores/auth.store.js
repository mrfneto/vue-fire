import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, onAuthStateChanged, signOut, updateProfile } from '../firebase'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({ name: 'Mrfneto' })
  const router = useRouter()

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        u => {
          user.value = u
          resolve(u)
        },
        e => {
          reject(e)
        }
      )
    })
  }

  const logout = async () => {
    try {
      await signOut(auth)
      router.replace({ name: 'login' })
    } catch (error) {
      console.log(error)
    }
  }

  return { user, getCurrentUser, logout }
})
