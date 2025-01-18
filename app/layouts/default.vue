<script setup lang="ts">

</script>

<template>
     <div class="flex flex-col min-h-screen ">
        <baseHeader />
        <div class=" bg-black flex justify-center items-center flex-grow">
            <slot />
        </div>
        <baseFooter />
    </div>
</template>



