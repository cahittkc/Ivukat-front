<template>
  <div class="min-h-screen flex">
    <!-- Sol Taraf - Görsel Alan -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-500 to-cyan-700 items-center justify-center p-12 gradient-bg">
      <div class="max-w-lg text-white">
        <h1 class="text-5xl font-bold mb-6 animate-fade-in">Ivukat</h1>
        <p class="text-xl text-cyan-100 mb-8 animate-fade-in-delay">Hukuk dünyasında dijital çözümler</p>
        <div class="space-y-4">
          <div v-for="(feature, index) in features" 
               :key="index"
               class="feature-card flex items-center space-x-3 p-4 rounded-lg transition-all duration-300"
               :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center float-animation">
              <component :is="feature.icon" class="w-6 h-6" />
            </div>
            <div>
              <h3 class="font-semibold">{{ feature.title }}</h3>
              <p class="text-sm text-cyan-100">{{ feature.description }}</p>
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
          <h1 class="text-3xl font-bold text-cyan-600">Ivukat</h1>
        </div>

        <div class="text-center mb-8 animate-fade-in-delay">
          <h2 class="text-2xl font-semibold text-gray-800">Kayıt Ol</h2>
          <p class="text-gray-500 mt-2">Yeni bir hesap oluşturun</p>
        </div>

        <!-- Hata Mesajı -->
        <div v-if="registerErr" 
             class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 shake">
          <!-- ... existing error message content ... -->
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="space-y-4">
            <!-- Form inputs with animations -->
            <div v-for="(field, index) in formFields" 
                 :key="field.id"
                 :style="{ animationDelay: `${index * 0.1}s` }"
                 class="animate-fade-in-up">
              <label :for="field.id" class="block text-sm font-medium text-gray-700 mb-1">
                {{ field.label }}
              </label>
              <div class="relative">
                <input
                  :id="field.id"
                  v-model="field.model"
                  :type="field.type"
                  required
                  :disabled="isLoading"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200 disabled:bg-gray-50 input-focus"
                  :placeholder="field.placeholder"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full cursor-pointer h-[48px] flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed btn-hover"
          >
            Kayıt Ol<!-- ... existing button content ... -->
          </button>

          <div class="text-center animate-fade-in-delay">
            <p class="text-sm text-gray-600">
              Zaten hesabınız var mı?
              <router-link to="/login" class="font-medium text-cyan-600 hover:text-cyan-500 transition-colors duration-200">
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
      companyName: '',
      username :'',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      isLoading: false,
      registerErr: null,
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
          label: 'Kullanıc adı',
          type: 'username',
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
  background-color: rgba(255, 255, 255, 0.15);
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