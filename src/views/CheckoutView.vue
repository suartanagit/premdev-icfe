<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { cart } from '@/stores/cart'
import { TruckIcon, ShieldCheckIcon, CreditCardIcon, ClockIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

// Form data
const form = ref({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  paymentMethod: 'transfer_bank',
})

const isProcessing = ref(false)
const orderPlaced = ref(false)

// Format harga ke format Indonesia
function formatPrice(price) {
  return (price * 1000).toLocaleString('id-ID')
}

// Handle order submission
const handlePlaceOrder = async () => {
  // Validasi form
  if (!form.value.fullName || !form.value.email || !form.value.phone || !form.value.address) {
    alert('Harap isi semua data pengiriman')
    return
  }

  isProcessing.value = true

  // Simulasi proses pembayaran
  setTimeout(() => {
    orderPlaced.value = true
    isProcessing.value = false

    // Clear cart setelah checkout sukses
    cart.state.items = []

    // Redirect ke home setelah 3 detik
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }, 2000)
}

// Back to cart
const backToCart = () => {
  router.push('/cart')
}
</script>

<template>
  <section v-if="!orderPlaced" class="max-w-6xl mx-auto px-6 py-16 mt-8 min-h-[80vh]">
    <div class="mb-6">
      <button @click="backToCart" class="text-blue-600 hover:text-blue-700 font-medium">
        ← Kembali ke Keranjang
      </button>
    </div>

    <h1 class="text-3xl font-bold mb-8">Checkout</h1>

    <div class="grid md:grid-cols-3 gap-10">
      <!-- Form Pengiriman -->
      <div class="md:col-span-2 space-y-8">
        <!-- Section: Data Pengiriman -->
        <div class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
          <h2 class="text-xl font-semibold mb-6">Data Pengiriman</h2>

          <div class="space-y-4">
            <!-- Nama Lengkap -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input v-model="form.fullName" type="text" placeholder="Masukkan nama lengkap"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input v-model="form.email" type="email" placeholder="email@example.com"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>

            <!-- No Telepon -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">No Telepon</label>
              <input v-model="form.phone" type="tel" placeholder="08xxxxxxxxxx"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>

            <!-- Alamat -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
              <textarea v-model="form.address" placeholder="Masukkan alamat lengkap" rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            </div>

            <!-- Kota dan Provinsi -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Kota</label>
                <input v-model="form.city" type="text" placeholder="Kota"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
                <input v-model="form.province" type="text" placeholder="Provinsi"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
            </div>

            <!-- Kode Pos -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
              <input v-model="form.postalCode" type="text" placeholder="12345"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
          </div>
        </div>

        <!-- Section: Metode Pembayaran -->
        <div class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-100">
          <h2 class="text-xl font-semibold mb-6">Metode Pembayaran</h2>

          <div class="space-y-3">
            <label
              class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition"
              :class="form.paymentMethod === 'transfer_bank' ? 'border-blue-600 bg-blue-50' : ''">
              <input v-model="form.paymentMethod" type="radio" value="transfer_bank" class="w-4 h-4" />
              <span class="ml-3">
                <span class="font-medium">Transfer Bank</span>
                <p class="text-sm text-gray-500">Transfer langsung ke rekening kami</p>
              </span>
            </label>

            <label
              class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition"
              :class="form.paymentMethod === 'ewallet' ? 'border-blue-600 bg-blue-50' : ''">
              <input v-model="form.paymentMethod" type="radio" value="ewallet" class="w-4 h-4" />
              <span class="ml-3">
                <span class="font-medium">E-Wallet</span>
                <p class="text-sm text-gray-500">OVO, DANA, LinkAja, GCash</p>
              </span>
            </label>

            <label
              class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition"
              :class="form.paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50' : ''">
              <input v-model="form.paymentMethod" type="radio" value="cod" class="w-4 h-4" />
              <span class="ml-3">
                <span class="font-medium">Cash on Delivery (COD)</span>
                <p class="text-sm text-gray-500">Bayar saat barang diterima</p>
              </span>
            </label>

            <label
              class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition"
              :class="form.paymentMethod === 'credit_card' ? 'border-blue-600 bg-blue-50' : ''">
              <input v-model="form.paymentMethod" type="radio" value="credit_card" class="w-4 h-4" />
              <span class="ml-3">
                <span class="font-medium">Kartu Kredit</span>
                <p class="text-sm text-gray-500">Visa, MasterCard, American Express</p>
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="bg-white rounded-2xl p-6 h-fit sticky top-20 space-y-6 shadow-sm ring-1 ring-gray-100">
        <h2 class="font-semibold text-lg">Ringkasan Pesanan</h2>

        <!-- Items List -->
        <div class="space-y-3 max-h-64 overflow-y-auto">
          <div v-for="item in cart.state.items" :key="item.id"
            class="flex items-center justify-between text-sm pb-3 border-b border-gray-100">
            <div class="flex-1">
              <p class="font-medium">{{ item.name }}</p>
              <p class="text-gray-500 text-xs">Qty: {{ item.qty }}</p>
            </div>
            <p class="font-medium">IDR {{ formatPrice(item.price * item.qty) }}</p>
          </div>
        </div>

        <!-- Pricing Details -->
        <div class="space-y-2 text-sm border-t border-gray-100 pt-4">
          <div class="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>IDR {{ formatPrice(cart.totalPrice) }}</span>
          </div>

          <div class="flex justify-between text-gray-500">
            <span>Ongkir</span>
            <span class="text-green-600 font-medium">Gratis</span>
          </div>

          <div class="flex justify-between font-semibold text-lg pt-3 border-t border-gray-100">
            <span>Total</span>
            <span>IDR {{ formatPrice(cart.totalPrice) }}</span>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="space-y-3 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
          <div class="flex items-center gap-3">
            <TruckIcon class="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span>Gratis ongkir seluruh Indonesia</span>
          </div>

          <div class="flex items-center gap-3">
            <ClockIcon class="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span>Garansi tiba 3-5 hari</span>
          </div>

          <div class="flex items-center gap-3">
            <ShieldCheckIcon class="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span>Jaminan kualitas</span>
          </div>

          <div class="flex items-center gap-3">
            <CreditCardIcon class="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span>Berbagai metode pembayaran</span>
          </div>
        </div>

        <!-- Checkout Button -->
        <button @click="handlePlaceOrder" :disabled="isProcessing"
          class="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed">
          {{ isProcessing ? 'Memproses...' : 'Bayar Sekarang' }}
        </button>

        <p class="text-xs text-gray-400 text-center">Transaksi aman & terenkripsi.</p>
      </div>
    </div>
  </section>

  <!-- Success Message -->
  <section v-else class="max-w-2xl mx-auto px-6 py-16 mt-8 min-h-[80vh] flex items-center justify-center">
    <div class="text-center space-y-6 bg-white rounded-2xl p-8 shadow-lg">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd" />
        </svg>
      </div>

      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h1>
        <p class="text-gray-600 text-lg">Terima kasih telah berbelanja bersama kami</p>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg text-left space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">Metode Pembayaran:</span>
          <span class="font-medium capitalize">{{ form.paymentMethod.replace('_', ' ') }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Total Pesanan:</span>
          <span class="font-medium">IDR {{ formatPrice(cart.totalPrice) }}</span>
        </div>
      </div>

      <p class="text-gray-500 text-sm">Anda akan diarahkan ke halaman utama dalam 3 detik...</p>

      <RouterLink to="/"
        class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
        Kembali ke Beranda
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
/* Add smooth transitions */
input,
textarea,
label {
  transition: border-color 0.3s, box-shadow 0.3s;
}
</style>
