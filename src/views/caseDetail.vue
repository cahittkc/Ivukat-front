<template>
    <div class="min-h-[calc(100svh-64px)] bg-gradient-to-b from-gray-900 to-black text-gray-300 py-8">
        <div class="container mx-auto px-4">
            <div v-if="selectedCase" class="space-y-8">

                <!-- Case Header: Title and Description -->
                <div>
                    <h1 class="text-4xl font-extrabold text-white mb-3">{{ selectedCase?.title }}</h1>
                    <p class="text-gray-400 text-lg leading-relaxed">{{ selectedCase?.description }}</p>
                </div>

                <!-- Separator -->
                <hr class="border-gray-700">

                <!-- Case Details and Company Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 class="text-xl font-semibold text-white mb-4">Dava Detayları</h2>
                        <div class="space-y-3">
                             <p><span class="font-medium text-gray-300">Dava Tipi:</span> <span class="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium">{{ selectedCase?.type?.name }}</span></p>
                             <p><span class="font-medium text-gray-300">Oluşturulma Tarihi:</span> {{ formatDate(selectedCase?.createdAt) }}</p>
                             <p><span class="font-medium text-gray-300">Son Güncelleme:</span> {{ formatDate(selectedCase?.updatedAt) }}</p>
                        </div>
                    </div>

                    <div>
                        <h2 class="text-xl font-semibold text-white mb-4">Şirket Bilgileri</h2>
                         <div class="space-y-3 text-gray-400">
                            <p><span class="font-medium text-gray-300">Adı:</span> {{ selectedCase?.company?.name }}</p>
                            <p><span class="font-medium text-gray-300">Adres:</span> {{ selectedCase?.company?.address }}</p>
                            <p><span class="font-medium text-gray-300">Telefon:</span> {{ selectedCase?.company?.phoneNumber }}</p>
                            <p><span class="font-medium text-gray-300">E-posta:</span> {{ selectedCase?.company?.email }}</p>
                        </div>
                    </div>
                </div>

                <!-- Separator -->
                <hr class="border-gray-700">

                <!-- Assigned Lawyers -->
                 <div>
                     <h2 class="text-xl font-semibold text-white mb-4">Atanan Avukatlar</h2>
                     <ul v-if="selectedCase?.lawyers && selectedCase.lawyers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                         <li v-for="lawyer in selectedCase.lawyers" :key="lawyer.id" class="flex items-center space-x-4 bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-700">
                              <div class="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-lg flex-shrink-0">{{ lawyer?.firstName?.charAt(0).toUpperCase() }}</div>
                              <div>
                                  <div class="text-white font-medium">{{ lawyer.firstName }} {{ lawyer.lastName }}</div>
                                  <div class="text-gray-400 text-sm">{{ lawyer.email }}</div>
                              </div>
                         </li>
                     </ul>
                      <p v-else class="text-gray-400">Bu davaya atanmış avukat bulunmamaktadır.</p>
                 </div>


            </div>
            <div v-else class="text-center text-white text-xl">
                Davalı bilgileri yükleniyor veya bulunamadı...
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
         return {
             selectedCase : null,
             selectedCaseId : null,
         }
    },
     methods : {
        formatDate(dateString) {
            if (!dateString) return 'N/A';
            return new Date(dateString).toLocaleDateString('tr-TR');
        },
         async getselectedCaseDetail(){
             this.selectedCaseId = this.$route.params.id
             const response = await this.$appAxios.get(`cases/get-case-details/${this.selectedCaseId}`)
             if(response.success){
                 this.selectedCase = response.data
             }
         }
     },
     async created(){
        await this.getselectedCaseDetail()
     }
}
</script>

<style scoped>
</style>