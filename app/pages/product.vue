<script setup lang="ts">

definePageMeta({
        title: "Nuxt Store",
        description: "Experience Nuxt",
        layout: 'default',
        middleware: 'auth',
    });
// Fetch products and categories using useFetch
const { data: products } = await useFetch('https://fakestoreapi.com/products');
const { data: productCategories } = await useFetch('https://fakestoreapi.com/products/categories');


const selectedCategories = ref<string[]>([]); 

// Reactive variable for sort option
const sortOption = ref('name-asc');

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 5;

// Filtering and sorting logic
const filteredProducts = computed(() => {
  if (!products.value) return [];
  let filtered = selectedCategories.value.length === 0 
    ? products.value 
    : products.value.filter(product => 
        selectedCategories.value.includes(product.category)
      );

  // Sorting based on selected option
  if (sortOption.value === 'name-asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption.value === 'name-desc') {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortOption.value === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption.value === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
});

const totalPages = computed(() => {
  if (!filteredProducts.value) return 0;
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  if (!filteredProducts.value) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});
</script>


<template>
  <div class="flex">
    <div class="w-[20vw] flex-grow bg-zinc-900 h-screen p-8">
      <h1 class="text-white font-bold text-xl mb-4">Filter</h1>
      <div class="text-white">
        <p class="mb-2">Select Categories:</p>
        <div v-for="(category, index) in productCategories" :key="index" class="mb-2">
          <UCheckbox 
            v-model="selectedCategories" 
            :value="category" 
            :label="category"
            class="text-white"
            style="margin-right: 0.5rem;"
          />
        </div>
      </div>

      <!-- Sorting Options -->
      <div class="mt-4">
        <label class="text-white mb-2">Sort By:</label>
        <select v-model="sortOption" class="bg-gray-800 text-white p-2 rounded">
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
    </div>

    <!-- Product Listings Section -->
    <div class="w-[80vw] flex-grow bg-zinc-950 h-screen p-8 overflow-y-auto">  
      <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
      <p class="text-lg lg:text-xl mb-8">Check out our most popular products!</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        <div v-for="product in paginatedProducts" :key="product.id" class="flex flex-col shadow rounded-md">
          <NuxtImg :src="product.image" alt="" class="rounded-t-md object-cover" />
          <div class="flex flex-col py-6 px-4 flex-1">
            <p class="text-xl lg:text-2xl font-semibold mb-2">{{ product.title }}</p>
            <div class="font-normal w-full bg-white/80 flex gap-8 text-lg mb-4 mt-auto">
              <span>${{ product.price }}</span>
              <div class="flex items-center gap-1">
                <Icon name="mdi:fire" style="color: #f79f1a" />
                <span>{{ product.rating.count }} votes</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="mdi:star" style="color: #f79f1a" />
                <span>{{ product.rating.rate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <UPagination 
        v-model="currentPage" 
        :page-count="totalPages" 
        :total="filteredProducts.length"
        class="mt-4 justify-center gap-4"
        style="margin-right: 0.5rem;"
      />
    </div>
  </div>
</template>


