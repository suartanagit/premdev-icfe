<script setup>
defineProps({
  product: Object,
})
</script>

<template>
  <RouterLink :to="`/product/${product.id}`"
    class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer">
    <div class="aspect-square overflow-hidden">
      <img :src="product.image" :alt="product.name"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
    </div>

    <div class="p-4 space-y-1">
      <h3 class="font-semibold text-gray-900 line-clamp-2">
        {{ product.name }}
      </h3>
      <p class="text-sm text-gray-500">{{ product.category }}</p>
      <p class="font-bold text-gray-900 mt-2">IDR {{ product.price }}K</p>
    </div>
  </RouterLink>
</template>