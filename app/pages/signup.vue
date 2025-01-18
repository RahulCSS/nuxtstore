<script setup lang="ts">

    // Static Meta Data
    definePageMeta({
        title: "Nuxt - Signup",
        description: "Signup to experience Nuxt",
        layout: 'empty',
    });

    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const emailError = ref('')
    const passwordError = ref('')
    const confirmPasswordError = ref('')
    const signupError = ref('');
    const signupSuccess = ref(false);
    const router = useRouter();

    // Form Validation
    function validateForm() {
        let valid = true
        emailError.value = ''
        passwordError.value = ''
        confirmPasswordError.value = ''

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.value) {
            emailError.value = 'Email is required.'
            valid = false
        } else if (!emailRegex.test(email.value)) {
            emailError.value = 'Please enter a valid email address.'
            valid = false
        }

        if (!password.value) {
            passwordError.value = 'Password is required.'
            valid = false
        } else if (password.value.length < 6) {
            passwordError.value = 'Password must be at least 6 characters.'
            valid = false
        }

        if (password.value !== confirmPassword.value) {
            confirmPasswordError.value = 'Passwords do not match.'
            valid = false
        }

    return valid
    }   

    // Handle Signup (Simulated registration)
    async function submit() {
        const mockUser = { email: email.value, password: password.value };
        if (validateForm()) {
            signupSuccess.value = true;
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        }else {
            signupError.value = 'Invalid credentials. Please try again.';
        }
        console.log(mockUser);
    }
</script>


<template>
    <div class ="bg-black h-screen w-screen p-4 flex justify-center items-center">
        <div class="w-[30vw] h-[40vh]">

            <!-- Logo & Desciption -->
            <NuxtImg width="128px" density="2x" format="webp" src="/logo-green-white.png" alt=""/>
            <h1 class="text-white font-bold text-xl mt-8"> Register to experience the Nuxt Store</h1>
            <p class="text-zinc-300 text-m mt-1">Already registered? 
                <NuxtLink to ="/login">
                    <span class="font-bold underline text-green-400">Login</span> to your account
                </NuxtLink>
            </p>

            <!-- Signup Form -->
            <form @submit.prevent = "submit">
                <div class="mt-8">
                    <label  class="text-zinc-300 text-m block mb-1" for="">Email Address</label>
                    <input 
                    v-model="email"
                    placeholder="you@example.com" 
                    class="text-zinc-300 block w-full bg-zinc-800 px-4 py-2 rounded placeholder:text-zinc-500"
                    type="e-mail">
                    <p v-if="emailError" class="text-red-500 text-sm mt-2">{{ emailError }}</p>
                </div>
                <div class="mt-8">
                    <label  class="text-zinc-300 text-m block mb-1" for="">Password</label>
                    <input 
                    v-model="password"
                    placeholder="**************" 
                    class="text-zinc-300 block w-full bg-zinc-800 px-4 py-2 rounded placeholder:text-zinc-500"
                    type="password">
                    <p v-if="passwordError" class="text-red-500 text-sm mt-2">{{ passwordError }}</p>
                </div>
                <div class="mt-8">
                    <label  class="text-zinc-300 text-m block mb-1" for="">Confirm Password</label>
                    <input 
                    v-model="confirmPassword"
                    placeholder="**************" 
                    class="text-zinc-300 block w-full bg-zinc-800 px-4 py-2 rounded placeholder:text-zinc-500"
                    type="password">
                    <p v-if="confirmPasswordError" class="text-red-500 text-sm mt-2">{{ confirmPasswordError }}</p>
                </div>
                <div class="mt-8">
                    <button class="text-black block w-full bg-green-400 p-2 rounded-full">Signup -> </button>
                </div>
            </form>

            <!-- Signup Message -->
            <div v-if="signupSuccess" class="mt-8 p-4 bg-zinc-800 text-green-400 border-1 rounded-full">
                <p>Sign up successful! Redirecting...</p>
            </div>
            <p v-if="signupError" class="error">{{ signupError }}</p>
        </div>
        <slot />
    </div>
</template>