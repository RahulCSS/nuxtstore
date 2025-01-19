<script setup lang="ts">
  
  // Fetch products and categories using useFetch
  const { data: products } = await useFetch('https://fakestoreapi.com/products');
  const { data: productCategories } = await useFetch('https://fakestoreapi.com/products/categories');
  
  
  const selectedCategories = ref<string[]>([]); 
  
  // Pagination state
  const currentPage = ref(1);
  const itemsPerPage = 5;
  
  // Filtering and pagination
  const filteredProducts = computed(() => {
    if (!products.value) return [];
    if (selectedCategories.value.length === 0) return products.value;
    return products.value.filter(product => 
      selectedCategories.value.includes(product.category)
    );
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
        <!-- Filter Section -->
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
      </div>

      <!-- Product Listings Section-->
      <div class="w-[80vw] flex-grow bg-zinc-950 h-screen p-8 overflow-y-auto">  
        <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
        <p class="text-lg lg:text-xl mb-8">Check out our most popular products!</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            <div v-for="product in paginatedProducts" :key="product.id" class="flex flex-col shadow rounded-md">
                <NuxtImg :src="product.image" alt="" class="rounded-t-md object-cover" 
                        sizes="xs: 100vug sm: 50vw lg: 400px" format="webp" densities="x1"/>
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
  
  
  