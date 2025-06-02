<template>
  <div class="flex min-h-screen bg-gradient-to-b from-gray-900 to-black">
    <!-- Sol Taraf - Görsel Alan -->
    <div class="hidden lg:flex lg:w-[35%] bg-gradient-to-br from-gray-800 to-gray-900 items-center justify-center p-12 gradient-bg">
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
    <div class="w-full lg:w-[65%] flex items-center justify-center p-8">
      <div class="w-full items-center">
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

        <div class="flex flex-col gap-y-6 max-w-lg mx-auto">
          <div class="flex flex-col gap-y-3 w-full">
            <div class="flex flex-col gap-y-1">
              <span class="xs-txt">Şirket Adı</span>
              <input v-model="companyObj.name" type="text" class="input-item w-full">
            </div>
            <div class="flex flex-col gap-y-1">
              <span class="xs-txt">Şirket Email</span>
              <input  v-model="companyObj.email" type="email" class="input-item w-full">
            </div>
            <div class="flex flex-col gap-y-1">
              <span class="xs-txt">Şirket Adresi</span>
              <input  v-model="companyObj.address" type="text" class="input-item w-full">
            </div>
            <div class="flex flex-col gap-y-1">
              <span class="xs-txt">Şirket Telefon Numarası</span>
              <input  v-model="companyObj.phoneNumber" v-mask="'0(###) ### ## ##'" type="text" placeholder="0(" class="input-item w-full">
            </div>
          </div>

          <div class="flex flex-col gap-y-3 w-full">
            <div class="flex flex-col gap-y-1">
              <span class="xs-txt">Kullanıcı Adı</span>
              <input v-model="registerObj.username" type="text" class="input-item w-full">
            </div>
            <div class="flex flex-col gap-y-1">
              <span class="xs-txt">Adınız</span>
              <input v-model="registerObj.firstName" type="text" class="input-item w-full">
            </div>
            <div class="flex flex-col gap-y-1">
              <span class="xs-txt">İkinci Ad(opsiyonel)</span>
              <input v-model="registerObj.middleName" type="text" class="input-item w-full">
            </div>
            <div class="flex flex-col gap-y-1">
              <span class="xs-txt">Soyadınız</span>
              <input v-model="registerObj.lastName" type="text" class="input-item w-full">
            </div>
            <div class="flex flex-col gap-y-1">
              <span class="xs-txt">Email</span>
              <input v-model="registerObj.email" type="email" class="input-item w-full">
            </div>
            <div class="flex flex-col gap-y-1 relative">
              <span class="xs-txt">Password</span>
              <input v-model="registerObj.password" :type="showPass ? 'password' : 'text'" class="input-item w-full">
              <i v-if="showPass" @click="showPass = !showPass" class="fa-solid fa-eye-slash absolute right-4 top-[31px] cursor-pointer xs-txt !text-sm"></i>
              <i v-if="!showPass" @click="showPass = !showPass" class="fa-solid fa-eye absolute right-4 top-[31px] cursor-pointer xs-txt !text-sm"></i>
            </div>
          </div>

          <button
            @click="register();"
            :disabled="isLoading"
            class="w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isLoading ? 'Kayıt işlemi yapılıyor...' : 'Kayıt Ol' }}
          </button>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      showPass : true,
      isLoading :false,
      companyObj : {
          name : null,
          address : null,
          phoneNumber : null,
          email : null
      },
      registerObj : {
        username : null,
        firstName : null,
        middleName : null,
        lastName : null,
        email : null,
        password : null,
        companyId : null,
        roleId : null,
        isVerified : true,
        isOwner : true
      },
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
      
    }
  },
  methods: {
      async register(){
        this.isLoading = true
        const companyResponse = await this.$appAxios.post('companies/add-company', this.companyObj)
        if(companyResponse.success){
          this.registerObj.companyId = companyResponse.data.id
          const registerResponse = await this.$appAxios.post('auth/register', this.registerObj)
          if(registerResponse.success){
            const lgnUser = {
              username : this.registerObj.username,
              password : this.registerObj.password
            }
            const res = await this.$store.dispatch('login', lgnUser)
            if(res.success == false){
              this.isLoading = false
              alert('loginError')
            }else {
              this.$root.setRefreshTokenTime();
            }
          }
          this.isLoading = false
        }else {
          this.isLoading = false
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