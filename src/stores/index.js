import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const useStore = defineStore('main', () => {
  const user = ref({ name: 'Mrfneto' })

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

  return { user, getCurrentUser }
})
