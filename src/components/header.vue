<template>
  <header v-if="user != null" class="h-[64px] min-h-[64px] bg-gray-900 backdrop-blur-md shadow-sm border-b border-gray-800 z-50 fixed top-0 left-0 right-0">
    <div class="container mx-auto px-4 h-full">
      <div class="flex justify-between items-center h-full">
        <!-- Sol taraf - Logo -->
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-cyan-500">Ivukat</h1>
        </div>

        <!-- Sağ taraf - Kullanıcı menüsü -->
        <div class="flex items-center">
          <div class="relative">
            <button
              @click="isOpen = !isOpen"
              class="flex items-center space-x-3 focus:outline-none cursor-pointer"
            >
              <div class="flex flex-col gap-y-0.5 items-start">
                <span class="text-sm font-medium text-gray-300 capitalize">{{ user?.firstName || 'Kullanıcı' }}</span>
                <span class="text-gray-400 text-xs capitalize">{{ user?.company?.name }}</span>
              </div>
              <div class="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <span class="text-cyan-500 font-medium text-sm">
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
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-700 ring-opacity-5 focus:outline-none z-50"
            >
              <div class="py-1">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  Profilim
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  Ayarlar
                </a>
                <div class="border-t border-gray-700"></div>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
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
/* Removed redundant hover style */
</style>           