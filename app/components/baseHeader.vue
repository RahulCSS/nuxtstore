<script setup lang="ts">
    const logout = () => {
        localStorage.removeItem('authToken');
        navigateTo('/login');
    };
</script>

<template>
        <header class="bg-black px-8 py-4 border-b border-zinc-900">
            <nav class="flex items-center bg-black gap-20">
                <!-- Logo section -->
                <NuxtLink to="/product" class="flex gap-1 items-center">
                    <NuxtImg width="128px" density="2x" format="webp" src="/logo-green-white.png" alt=""/>
                </NuxtLink>

                <!-- Search Section-->
                <div class="flex flex-grow mx-4 relative items-center gap-2">
                    <div class="relative w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            class="w-full pl-10 pr-4 py-2 bg-zinc-800 text-white rounded-full focus:outline-none"
                        />
                        <NuxtImg 
                            width="20px" 
                            density="2x" 
                            format="webp" 
                            src="/search.png" 
                            alt="" 
                            class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        />
                    </div>
                </div>

                <!-- Navigation Section-->
                <ul class="flex gap-6 ml-auto text-xl font-bold">
                    <li>
                        <NuxtLink class="text-white text-xl" to="/product">Home</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="text-white text-xl" to="/about">About</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="text-white text-xl" to="/orders">Orders</NuxtLink>
                    </li>
                    <li>
                        <span class="text-white text-xl">Profile</span>
                    </li>
                    <li>
                        <span class="text-white text-xl">Cart</span>
                    </li>
                    <button @click="logout">
                        <NuxtImg 
                                width="20px" 
                                density="2x" 
                                format="webp" 
                                src="/logout-rounded.png" 
                                alt="" 
                            />
                    </button>
                </ul>
            </nav>
        </header>
</template>