<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Semua field form dibundel dalam satu reactive object
const form = reactive({
  email: '',
  password: '',
})

// State untuk loading dan toggle password
const isSubmitting = ref(false)
const showPassword = ref(false)
const errors = ref({
  email: '',
  password: '',
})

// Validasi email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validasi password - contoh: minimal 6 karakter
function validatePassword(password) {
  return password.length >= 6
}

// Handle form submission
function handleSubmit() {
  // Reset errors
  errors.value = {
    email: '',
    password: '',
  }

  // Validasi email
  if (!form.email) {
    errors.value.email = 'Email harus diisi'
  } else if (!validateEmail(form.email)) {
    errors.value.email = 'Format email tidak valid'
  }

  // Validasi password
  if (!form.password) {
    errors.value.password = 'Password harus diisi'
  } else if (!validatePassword(form.password)) {
    errors.value.password = 'Password minimal 6 karakter'
  }

  // Simulasi validasi password dari server (contoh: password salah)
  // Ganti dengan logika autentikasi sebenarnya
  if (form.email && form.password && !errors.value.email && !errors.value.password) {
    // cek password
    if (form.email === 'made@gmail.com' && form.password === '123456') {
      isSubmitting.value = true
      // Simulasi proses login (delay 1.2 detik)
      setTimeout(() => {
        isSubmitting.value = false
        alert(`Login Berhasil!\n\nEmail: ${form.email}\nPassword: ${form.password}`)
        router.push('/') // redirect ke homepage
      }, 1200)
    } else {
      errors.value.password = 'Email atau password salah'
    }
  }
}
</script>


<template>
  <section class="min-h-[80vh] flex items-center justify-center px-4 mt-16">
    <div class="max-w-md mx-auto w-full">

      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Masuk</h1>
        <p class="text-gray-500 mt-2">Masuk ke akun kamu untuk melanjutkan belanja.</p>
      </div>

      <!-- Form Card -->
      <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-8 space-y-6">

        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input id="email" v-model="form.email" type="email" placeholder="contoh@email.com" :class="['w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition',
            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']" />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password Field dengan Toggle -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div class="relative">
            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
              placeholder="Minimal 6 karakter" :class="['w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition pr-12',
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500']" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm">
              {{ showPassword ? 'Tutup' : 'Lihat' }}
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="isSubmitting" class="w-full bg-slate-900 text-white py-3 rounded-xl font-medium
                 hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="isSubmitting">Memproses...</span>
          <span v-else>Masuk</span>
        </button>

      </form>
    </div>
  </section>
</template>