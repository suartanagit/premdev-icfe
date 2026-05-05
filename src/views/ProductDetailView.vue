<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { cart } from '@/stores/cart'

const route = useRoute()

// Interface TypeScript untuk struktur data dari FakeStoreAPI
interface ApiProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

// State untuk 1 produk — bisa ApiProduct atau null sebelum fetch selesai
const product = ref<ApiProduct | null>(null)
const isLoading = ref(true)

const fetchProduct = async () => {
  try {
    isLoading.value = true
    // Ambil ID dari URL params (/product/1, /product/2, dst)
    const response = await axios.get(`https://fakestoreapi.com/products/${route.params.id}`)
    product.value = response.data
  } catch (error) {
    console.error('Gagal mengambil detail produk:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-12 mt-10">

    <!-- Spinner loading -->
    <div v-if="isLoading" class="flex justify-center items-center py-32">
      <div class="w-10 h-10 border-4 border-gray-200 border-t-slate-900 rounded-full animate-spin"></div>
    </div>

    <!-- Konten detail produk setelah loading selesai -->
    <template v-else-if="product">

      <!-- Breadcrumb -->
      <div class="text-sm text-gray-500 mb-6">
        <RouterLink to="/" class="hover:text-gray-800">Home</RouterLink>
        <span class="mx-2">/</span>
        <span class="text-gray-800 font-medium">{{ product.title }}</span>
      </div>

      <!-- Grid: Foto + Info -->
      <div class="grid md:grid-cols-2 gap-10 items-start">

        <!-- Foto produk -->
        <div class="bg-white rounded-xl overflow-hidden p-6">
          <img :src="product.image" :alt="product.title" class="w-full h-96 object-contain" />
        </div>

        <!-- Info produk -->
        <div class="space-y-4">
          <h1 class="text-3xl font-bold">{{ product.title }}</h1>

          <!-- Rating dari API -->
          <div class="flex items-center gap-1 text-yellow-500">
            <StarIcon class="w-5 h-5" /> <!-- ulangi 5x -->
            <span class="text-sm text-gray-500 ml-2">
              {{ product.rating?.rate }} ({{ product.rating?.count }} reviews)
            </span>
          </div>

          <p class="text-sm text-gray-500 capitalize">{{ product.category }}</p>
          <p class="text-2xl font-semibold text-slate-900">${{ product.price }}</p>
          <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>

          <!-- Tombol action -->
          <div class="flex gap-4 pt-4">
            <button
              @click="cart.add({ id: product.id, name: product.title, price: product.price, image: product.image })"
              class="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition">
              Add to Cart
            </button>
            <button class="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>