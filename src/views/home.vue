<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Dava Listesi</h1>
            <button @click="this.addCaseModal = true" class="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-200">
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
                                    <p class="text-gray-600 text-xs">{{ lawyer?.role?.name }}</p>
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

    <general-Modal
        v-model="addCaseModal"
        title="Başlık"
        :full-height="false"
        :close-on-backdrop="true"
        :close-on-esc="true"
        @close="handleClose"
    >
    <template #content>
        <div class="flex flex-col w-full space-y-5 pb-[100px]">
            <div class="flex flex-col gap-y-1">
                <span class="xs-txt">Title</span>
                <input v-model="addObj.title" class="input-item" type="text">
            </div>
            <div class="flex flex-col gap-y-1">
                <span class="xs-txt">Description</span>
                <input v-model="addObj.description" class="input-item" type="text">
            </div>
            <div class="flex flex-col gap-y-1">
                <span class="xs-txt">Case Types</span>
                <select v-model="addObj.typeId" class="select-item" name="" id="">
                    <option  v-for="ct in caseTypes" :value="ct.id">{{ ct.name }}</option>
                </select>
            </div>
            <div class="flex flex-col gap-y-1">
                <span class="xs-txt">Employees</span>
                <div class="relative">
                    <div 
                        @click="toggleDropdown" 
                        class="select-item min-h-[38px] flex flex-wrap gap-2 p-1 cursor-pointer"
                    >
                        <div v-if="selectedLawyers.length === 0" class="text-gray-400 py-1 px-2 flex items-center">
                            Select employees...
                        </div>
                        <div 
                            v-for="lawyer in selectedLawyers" 
                            :key="lawyer.id"
                            class="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center gap-1 text-sm"
                        >
                            {{ lawyer.firstName }}
                            <button 
                                @click.stop="removeLawyer(lawyer)"
                                class="text-blue-600 hover:text-blue-800"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                    
                    <div 
                        v-if="isDropdownOpen" 
                        class="absolute z-[80] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                    >
                        <div class="p-2">
                            <input 
                                type="text"
                                v-model="searchQuery"
                                placeholder="Search employees..."
                                class="w-full px-3 py-2 xs-txt border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div class="py-1">
                            <div 
                                v-for="lawyer in filteredLawyers" 
                                :key="lawyer.id"
                                @click="toggleLawyerSelection(lawyer)"
                                class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 xs-txt"
                                :class="{ 'bg-blue-50': isSelected(lawyer) }"
                            >
                                <div class="w-4 h-4 border border-gray-300 rounded flex items-center justify-center"
                                    :class="{ 'bg-blue-500 border-blue-500': isSelected(lawyer) }"
                                >
                                    <svg v-if="isSelected(lawyer)" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                                    </svg>
                                </div>
                                {{ lawyer.firstName }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template #actions>
        <div class="flex items-center justify-center gap-x-5">
            <button @click="addCaseModal = false" class="outline-none h-[32px] flex items-center justify-center text-xs bg-red-500 text-white px-5 py-2 rounded-lg">Cancel</button>
            <button @click="addCase();" class="outline-none h-[32px] flex items-center justify-center text-xs bg-green-600 text-white px-5 py-2 rounded-lg">Save</button>
        </div>
    </template>
    </general-Modal>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Home',
    computed: {
        ...mapState(["user"]),
        filteredLawyers() {
            return this.employees.filter(lawyer => 
                lawyer.firstName.toLowerCase().includes(this.searchQuery.toLowerCase())
            )
        }
    },
    data() {
        return {
            addObj : {
                title :null,
                description : null,
                companyId  : this.user?.company?.id,
                typeId : null,
                lawyerIds : [],
            },
            cases: [],
            addCaseModal : false,
            employees : [],
            caseTypes : [],
            isDropdownOpen: false,
            searchQuery: '',
            selectedLawyers: [],
        }
    },
    watch : {
        addCaseModal(value){
            if(value == false){
                this.addObj = {
                    title :null,
                    description : null,
                    companyId  : this.user?.company?.id,
                    typeId : null,
                    lawyerIds : [],
                }
            }
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
        },
        async getCompanyLawyers(){
            let data = {
                companyId : this.user.company.id,
                roleId : 2
            }
            const response = await this.$appAxios.post('users/get-company-employees',data)
            if(response.success){
                this.employees = response.data
            }
        },
        async getCaseTypes(){
            const response = await this.$appAxios.get('case-types/get-all-case-types')
            if(response.success){
                this.caseTypes = response.data
            }
        },
        async addCase(){
            const response = await this.$appAxios.post('cases/add-case',this.addObj)
            if(response.success){
                this.addCaseModal = false
                await this.getMyCases();
            }
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen
        },
        toggleLawyerSelection(lawyer) {
            const index = this.selectedLawyers.findIndex(l => l.id === lawyer.id)
            if (index === -1) {
                this.selectedLawyers.push(lawyer)
                this.addObj.lawyerIds.push(lawyer.id)
            } else {
                this.selectedLawyers.splice(index, 1)
                this.addObj.lawyerIds = this.addObj.lawyerIds.filter(id => id !== lawyer.id)
            }
        },
        removeLawyer(lawyer) {
            this.selectedLawyers = this.selectedLawyers.filter(l => l.id !== lawyer.id)
            this.addObj.lawyerIds = this.addObj.lawyerIds.filter(id => id !== lawyer.id)
        },
        isSelected(lawyer) {
            return this.selectedLawyers.some(l => l.id === lawyer.id)
        }
    },
    async created() {
        await this.getMyCases();
        await this.getCompanyLawyers();
        await this.getCaseTypes();
    },
    mounted() {
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.relative')) {
                this.isDropdownOpen = false
            }
        })
    }
}
</script>

<style scoped>
.container {
    max-width: 1280px;
}
</style>