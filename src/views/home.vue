<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Dava Listesi</h1>
            <button class="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-200">
                Yeni Dava Ekle
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="caseItem in cases" :key="caseItem.id" class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                <!-- Dava Başlığı ve Tipi -->
                <div class="p-6 border-b border-gray-100">
                    <div class="flex justify-between items-start">
                        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ caseItem.title }}</h2>
                        <span class="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                            {{ caseItem.type.name }}
                        </span>
                    </div>
                    <p class="text-gray-600 text-sm mt-2">{{ caseItem.description }}</p>
                </div>

                <!-- Dava Detayları -->
                <div class="p-6">
                    <!-- Şirket Bilgileri -->
                    <div class="mb-4">
                        <h3 class="text-sm font-medium text-gray-500 mb-2">Şirket Bilgileri</h3>
                        <div class="bg-gray-50 rounded-lg p-3">
                            <p class="text-gray-800 font-medium">{{ caseItem.company.name }}</p>
                            <p class="text-gray-600 text-sm">{{ caseItem.company.email }}</p>
                            <p class="text-gray-600 text-sm">{{ caseItem.company.phoneNumber }}</p>
                        </div>
                    </div>

                    <!-- Avukatlar -->
                    <div class="mb-4">
                        <h3 class="text-sm font-medium text-gray-500 mb-2">Avukatlar</h3>
                        <div class="space-y-2">
                            <div v-for="lawyer in caseItem.lawyers" :key="lawyer.id" 
                                 class="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                                        <span class="text-cyan-800 font-medium text-sm">
                                            {{ lawyer.firstName.charAt(0) }}{{ lawyer.lastName.charAt(0) }}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p class="text-gray-800 font-medium text-sm">
                                        {{ lawyer.firstName }} {{ lawyer.lastName }}
                                    </p>
                                    <p class="text-gray-600 text-xs">{{ lawyer.role.name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tarih Bilgileri -->
                    <div class="flex justify-between text-sm text-gray-500">
                        <div>
                            <span class="font-medium">Oluşturulma:</span>
                            {{ formatDate(caseItem.createdAt) }}
                        </div>
                        <div>
                            <span class="font-medium">Güncelleme:</span>
                            {{ formatDate(caseItem.updatedAt) }}
                        </div>
                    </div>
                </div>

                <!-- Aksiyon Butonları -->
                <div class="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div class="flex justify-end space-x-3">
                        <button class="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>
                        <button class="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Home',
    computed: {
        ...mapState(["user"])
    },
    data() {
        return {
            cases: [],
        }
    },
    methods: {
        async getMyCases() {
            const response = await this.$appAxios.get(`cases/get-cases-by-company/${this.user?.company?.id}`)
            if (response.success) {
                this.cases = response.data
            }
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('tr-TR')
        }
    },
    async created() {
        await this.getMyCases();
    }
}
</script>

<style scoped>
.container {
    max-width: 1280px;
}
</style>