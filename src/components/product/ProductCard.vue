<script setup>
defineProps({
  product: Object,
})
</script>

<template>
  <RouterLink :to="`/product/${product.id}`"
    class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer">
    <!-- // Sebelumnya: <div class="aspect-square overflow-hidden">
    // Sekarang: tambah bg-white dan p-4, ganti object-cover jadi object-contain -->
    <div class="aspect-square overflow-hidden bg-white p-4">
      <img :src="product?.image" :alt="product?.title"
        class="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
    </div>

    <!-- // Area Konten -->
    <div class="p-4 space-y-1">
      <!-- // product?.name diganti jadi product?.title -->
      <h3 class="font-semibold text-gray-900 line-clamp-2">{{ product?.title }}</h3>
      <p class="text-sm text-gray-500 capitalize">{{ product?.category }}</p>
      <!-- // Format harga dari API pakai $ bukan IDR -->
      <p class="font-bold text-gray-900 mt-2">${{ product?.price }}</p>
    </div>
  </RouterLink>
</template>