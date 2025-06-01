<template>
  <div class="flex min-h-screen bg-gradient-to-b from-gray-900 to-black">
    <!-- Sol Taraf - Görsel Alan -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 items-center justify-center p-12 gradient-bg">
      <div class="max-w-lg text-white">
        <h1 class="text-5xl font-bold mb-6 animate-fade-in">Ivukat</h1>
        <p class="text-xl text-gray-300 mb-8 animate-fade-in-delay">Hukuk dünyasında dijital çözümler</p>
        <div class="space-y-4">
          <div v-for="(feature, index) in features" 
               :key="index"
               class="feature-card flex items-center space-x-3 p-4 rounded-lg transition-all duration-300"
               :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center float-animation">
              <component :is="feature.icon" class="w-6 h-6 text-cyan-500" />
            </div>
            <div>
              <h3 class="font-semibold text-white">{{ feature.title }}</h3>
              <p class="text-sm text-gray-300">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sağ Taraf - Register Formu -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <!-- Mobil Logo -->
        <div class="lg:hidden text-center mb-8 animate-fade-in">
          <h1 class="text-3xl font-bold text-cyan-500">Ivukat</h1>
        </div>

        <div class="text-center mb-8 animate-fade-in-delay">
          <h2 class="text-2xl font-semibold text-white">Kayıt Ol</h2>
          <p class="text-gray-300 mt-2">Yeni bir hesap oluşturun</p>
        </div>

        <!-- Hata Mesajı -->
        <div v-if="registerErr" 
             class="mb-6 p-4 rounded-lg bg-red-900/50 border border-red-800 shake">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-200">{{ registerErr }}</p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button
                  @click="registerErr = null"
                  class="inline-flex rounded-md p-1.5 text-red-400 hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <span class="sr-only">Kapat</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="space-y-4">
            <!-- Form inputs with animations -->
            <div v-for="(field, index) in formFields" 
                 :key="field.id"
                 :style="{ animationDelay: `${index * 0.1}s` }"
                 class="animate-fade-in-up">
              <label :for="field.id" class="block text-sm font-medium text-gray-300 mb-1">
                {{ field.label }}
              </label>
              <div class="relative">
                <input
                  :id="field.id"
                  v-model="field.model"
                  :type="(field.type === 'password' && field.id === 'password' && showPassword) || (field.type === 'password' && field.id === 'passwordConfirm' && showPasswordConfirm) ? 'text' : field.type"
                  required
                  :disabled="isLoading"
                  class="input-item"
                  :placeholder="field.placeholder"
                />
                 <button 
                    v-if="field.type === 'password'"
                    type="button"
                    @click="togglePasswordVisibility(field.id)"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-gray-300 focus:outline-none">
                    <svg v-if="(field.id === 'password' && showPassword) || (field.id === 'passwordConfirm' && showPasswordConfirm)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9.23-3.04-11.25-7 2.02-3.96 6.28-7 11.25-7a10.05 10.05 0 011.875.175M10 12a2 2 0 100-4 2 2 0 000 4zm-4.938 4.938A9.959 9.959 0 014 12c0-1.497.356-2.91.938-4.125m5.132 8.263c-1.18-.175-2.3-.6-3.275-1.25L19.75 4.25l-1.5-1.5L5.25 15.275l-1.5-1.5L.5 18.75l1.5 1.5L6.938 16.938z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full cursor-pointer h-[48px] flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed btn-hover"
          >
            Kayıt Ol
          </button>

          <div class="text-center animate-fade-in-delay">
            <p class="text-sm text-gray-400">
              Zaten hesabınız var mı?
              <router-link to="/login" class="font-medium text-cyan-500 hover:text-cyan-400 transition-colors duration-200">
                Giriş yap
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      registerObj : {
        username : null,
        firstName : null,
        middleName : null,
        lastName : null,
        email : null,
        password : null,
        companyId : null,
        roleId : null,
        isOwner : true
      },
      companyName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      isLoading: false,
      registerErr: null,
      showPassword: false,
      showPasswordConfirm: false,
      features: [
        {
          title: 'Kolay Kayıt',
          description: 'Hızlı ve güvenli kayıt süreci',
          icon: 'UserAddIcon'
        },
        {
          title: 'Şirket Yönetimi',
          description: 'Tüm dava süreçlerinizi yönetin',
          icon: 'OfficeBuildingIcon'
        },
        {
          title: 'Güvenli Erişim',
          description: 'Verileriniz güvende',
          icon: 'ShieldCheckIcon'
        }
      ],
      formFields: [
        {
          id: 'companyName',
          label: 'Şirket Adı',
          type: 'text',
          model: 'companyName',
          placeholder: 'Şirket adınızı girin'
        },
        {
          id: 'username',
          label: 'Kullanıcı Adı',
          type: 'text',
          model: 'username',
          placeholder: 'Kullanıcı adınızı girin'
        },
        {
          id: 'email',
          label: 'E-posta',
          type: 'email',
          model: 'email',
          placeholder: 'E-posta adresinizi girin'
        },
        {
          id: 'phone',
          label: 'Telefon',
          type: 'tel',
          model: 'phone',
          placeholder: 'Telefon numaranızı girin'
        },
        {
          id: 'password',
          label: 'Şifre',
          type: 'password',
          model: 'password',
          placeholder: 'Şifrenizi girin'
        },
        {
          id: 'passwordConfirm',
          label: 'Şifre Tekrar',
          type: 'password',
          model: 'passwordConfirm',
          placeholder: 'Şifrenizi tekrar girin'
        }
      ]
    }
  },
  methods: {
      togglePasswordVisibility(fieldId) {
          if (fieldId === 'password') {
              this.showPassword = !this.showPassword;
          } else if (fieldId === 'passwordConfirm') {
              this.showPasswordConfirm = !this.showPasswordConfirm;
          }
      }
  }
  // ... existing methods ...
}
</script>

<style scoped>
/* Additional animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.5s ease-out 0.3s both;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Form Animations */
.form-enter-active,
.form-leave-active {
  transition: all 0.5s ease;
}

.form-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Input Focus Animation */
.input-focus {
  transition: all 0.3s ease;
}

.input-focus:focus {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Button Hover Animation */
.btn-hover {
  transition: all 0.3s ease;
}

.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Feature Card Hover Animation */
.feature-card {
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  background-color: rgba(6, 182, 212, 0.1);
}

/* Background Gradient Animation */
.gradient-bg {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Floating Animation for Icons */
.float-animation {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Shake Animation for Error */
.shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

</style>