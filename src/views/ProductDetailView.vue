<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { cart } from '@/stores/cart'

const route = useRoute()
const props = defineProps({
  id: String
})

// Format harga ke format Indonesia
function formatPrice(price) {
  return (price * 1000).toLocaleString('id-ID')
}

// Dummy data produk (seharusnya dari API/database)
const products = [
  {
    id: 1,
    name: 'Kaos Basic Ordinary Tee',
    category: 'T-Shirt',
    price: 129,
    image: '/src/assets/images/products/cloth-1.png',
  },
  {
    id: 2,
    name: 'Kaos Daily Comfort Wear',
    category: 'T-Shirt',
    price: 139,
    image: '/src/assets/images/products/cloth-2.png',
  },
  {
    id: 3,
    name: 'Kaos Urban Street Style',
    category: 'T-Shirt',
    price: 149,
    image: '/src/assets/images/products/cloth-3.png',
  },
  {
    id: 4,
    name: 'Kaos Essential Casual Fit',
    category: 'T-Shirt',
    price: 135,
    image: '/src/assets/images/products/cloth-4.png',
  },
  {
    id: 5,
    name: 'Kaos Modern Relax Tee',
    category: 'T-Shirt',
    price: 155,
    image: '/src/assets/images/products/cloth-5.png',
  },
  {
    id: 6,
    name: 'Kaos Minimal Classic Wear',
    category: 'T-Shirt',
    price: 145,
    image: '/src/assets/images/products/cloth-6.png',
  },
  {
    id: 7,
    name: 'Kaos Everyday Soft Touch',
    category: 'T-Shirt',
    price: 159,
    image: '/src/assets/images/products/cloth-7.png',
  },
  {
    id: 8,
    name: 'Kaos Premium Comfort Tee',
    category: 'T-Shirt',
    price: 169,
    image: '/src/assets/images/products/cloth-8.png',
  },
  // (Tambahkan sisa data dummy produk lainnya di sini)
]

// Cari produk berdasarkan ID dari props atau route params
const product = computed(() => {
  const productId = Number(props.id || route.params.id)
  return products.find(p => p.id === productId)
})
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-12 mt-10">
    <div class="text-sm text-gray-500 mb-6">
      <RouterLink to="/" class="hover:text-gray-800">Home</RouterLink>
      <span class="mx-2">›</span>
      <span class="text-gray-800 font-medium">{{ product?.name }}</span>
    </div>

    <div v-if="product" class="grid md:grid-cols-2 gap-10 items-start">

      <div class="bg-gray-100 rounded-xl overflow-hidden">
        <img :src="product.image" class="w-full h-full object-cover" />
      </div>

      <div class="space-y-4">
        <h1 class="text-3xl font-bold">{{ product.name }}</h1>
        <p class="text-2xl font-semibold text-blue-600">IDR {{ formatPrice(product.price) }}</p>
        <!-- <p class="text-gray-600 leading-relaxed">{{ product.description }}</p> -->

        <div class="space-y-2 text-sm text-gray-600 pt-2 border-t">
          <div>Material: Cotton Combed 24s</div>
          <div>Fit: Regular Fit</div>
          <div>Stok: Tersedia</div>
        </div>

        <div class="flex gap-4 pt-4">
          <button @click="cart.add(product)"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
          <button class="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
            Wishlist
          </button>
        </div>
      </div>

    </div>

    <div v-else class="text-center py-20">
      <p class="text-gray-500 text-lg">Produk tidak ditemukan</p>
      <RouterLink to="/" class="text-blue-600 hover:underline mt-4 inline-block">
        ← Kembali ke Home
      </RouterLink>
    </div>
  </section>
</template>