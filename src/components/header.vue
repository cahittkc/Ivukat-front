<template>
  <header class="h-[64px] min-h-[64px] bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 h-full">
      <div class="flex justify-between items-center h-full">
        <!-- Sol taraf - Logo -->
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-cyan-600">Ivukat</h1>
        </div>

        <!-- Sağ taraf - Kullanıcı menüsü -->
        <div class="flex items-center">
          <div class="relative">
            <button
              @click="isOpen = !isOpen"
              class="flex items-center space-x-3 focus:outline-none cursor-pointer"
            >
              <span class="text-sm font-medium text-gray-700 capitalize">{{ user?.firstName || 'Kullanıcı' }}</span>
              <div class="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <span class="text-cyan-600 font-medium text-sm">
                  {{ user?.firstName?.charAt(0).toUpperCase() || 'U' }}
                </span>
              </div>
              <svg
                class="h-5 w-5 text-gray-400"
                :class="{ 'transform rotate-180': isOpen }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- Dropdown menü -->
            <div
              v-if="isOpen"
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            >
              <div class="py-1">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Profilim
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Ayarlar
                </a>
                <div class="border-t border-gray-100"></div>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  @click="handleLogout"
                >
                  Çıkış Yap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch('logout');
    }
  },
  mounted() {
    // Dropdown menüyü dışarı tıklandığında kapat
    document.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        this.isOpen = false
      }
    })
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped>
/* Dropdown menü animasyonu */
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s ease-in-out;
}

/* Hover efektleri */
.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}
</style>           