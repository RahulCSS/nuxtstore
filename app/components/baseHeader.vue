<script setup lang="ts">

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
                    <input
                    type="text"
                    placeholder="Search..."
                    class="w-full px-4 py-2 bg-zinc-800 text-white rounded-full focus:outline-none"
                    />
                    <search />
                </div>

                <!-- Navigation Section-->
                <ul class="flex gap-6 ml-auto text-xl font-bold">
                    <li>
                        <NuxtLink class="text-white font-bold text-xl" to="/">Home</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink class="text-white font-bold text-xl" to="/about">About</NuxtLink>
                    </li>
                    <li>
                        <span class="text-white font-bold text-xl"> Orders</span>
                    </li>
                    <li>
                        <span class="text-white font-bold text-xl">Profile</span>
                    </li>
                    <li>
                        <span class="text-white font-bold text-xl">Cart</span>
                    </li>
                </ul>
            </nav>
        </header>
</template>