import { ref } from 'vue'

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
const userEmail = ref(localStorage.getItem('userEmail') || '')

const MOCK_EMAIL = 'admin@toko.com'
const MOCK_PASSWORD = 'admin123'

function login(email: string, password: string): boolean {
  if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
    isLoggedIn.value = true
    userEmail.value = email
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userEmail', email)
    return true
  }
  return false
}

function logout() {
  isLoggedIn.value = false
  userEmail.value = ''
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userEmail')
}

export const auth = {
  isLoggedIn,
  userEmail,
  login,
  logout,
}