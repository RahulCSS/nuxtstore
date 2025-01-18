<script setup lang="ts">

    // Static Meta Data
    definePageMeta({
        title: "Nuxt - Login",
        description: "Login to experience Nuxt",
        layout:false,
    });

    const email = ref('')
    const password = ref('')
    const emailError = ref('');
    const passwordError = ref('');
    const loginError = ref('');
    const loginSuccess = ref(false);
    const router = useRouter();

    // Form Validation
    function validateForm() {
        let valid = true
        emailError.value = ''
        passwordError.value = ''
        loginError.value = ''

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
        }
    return valid
    }   

    // Handle login (Simulated Login - Hashes password before sending to server)
    async function submit() {
        const mockUser = { email: email.value, password: password.value };
        if (validateForm()) {
            try {
                const response = await fetch('https://fakestoreapi.com/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: "johnd", 
                        password: "m38rmF$", 
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('authToken', data.token);
                    loginSuccess.value = true;
                    setTimeout(() => {
                        router.push('/');
                    }, 2000);
                } else {
                    loginError.value = 'Invalid credentials. Please try again.';
                }
            } catch (error) {
                loginError.value = 'Something went wrong. Please try again later.';
            }
        }
            console.log(mockUser);
    }
</script>


<template>
    <div class ="bg-black h-screen w-screen p-4 flex justify-center items-center">
        <div class="w-[30vw] h-[40vh]">

            <!-- Logo & Description -->
            <NuxtImg width="128px" density="2x" format="webp" src="/logo-green-white.png" alt=""/>
            <h1 class="text-white font-bold text-xl mt-8"> Experience the Nuxt Store</h1>
            <p class="text-zinc-300 text-m mt-1">Not registered? 
                <NuxtLink to ="/signup">
                    <span class="font-bold underline text-green-400">Sign up</span> for a free account
                </NuxtLink>
            </p>

            <!-- Login Form -->
            <form @submit.prevent = "submit">
                <div class="mt-8">
                    <label  class="text-zinc-300 text-m block mb-1" for="">Email Address</label>
                    <input 
                    v-model="email"
                    placeholder="you@example.com" 
                    class="text-zinc-300 block w-full bg-zinc-800 px-4 py-2 rounded placeholder:text-zinc-500"
                    type="e-mail">
                </div>
                <div class="mt-8">
                    <label  class="text-zinc-300 text-m block mb-1" for="">Password</label>
                    <input 
                    v-model="password"
                    placeholder="**************" 
                    class="text-zinc-300 block w-full bg-zinc-800 px-4 py-2 rounded placeholder:text-zinc-500"
                    type="password">
                </div>
                <div class="mt-8">
                    <button class="text-black block w-full bg-green-400 p-2 rounded-full">Login -> </button>
                </div>
            </form>

            <!-- Login Message -->
            <div v-if="loginSuccess" class="mt-8 p-4 bg-zinc-800 text-green-400 border-1 rounded-full">
                <p>Login successful! Redirecting...</p>
            </div>
            <p v-if="loginError" class="error">{{ loginError }}</p>

        </div>
        <slot />
    </div>
</template>