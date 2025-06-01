<template>
    <div class="">
        <div class="container mx-auto px-4 py-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-white">Dava Listesi</h1>
                <div class="flex items-center gap-4">
                    
                    <button @click="this.addCaseModal = true" class="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors duration-200">
                        Yeni Dava Ekle
                    </button>
                </div>
            </div>
           
            <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-700">
                    <thead class="bg-gray-900">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Başlık</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tip</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Şirket</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Oluşturulma</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Güncelleme</th>
                            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody class="bg-gray-800 divide-y divide-gray-700">
                        <tr  v-for="caseItem in cases" :key="caseItem.id" class="hover:bg-gray-700/50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-white">{{ caseItem.title }}</div>
                                <div class="text-sm text-gray-400">{{ caseItem.description }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium">
                                    {{ caseItem.type.name }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-white">{{ caseItem.company.name }}</div>
                                <div class="text-sm text-gray-400">{{ caseItem.company.email }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                {{ formatDate(caseItem.createdAt) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                {{ formatDate(caseItem.updatedAt) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div class="flex justify-end space-x-3">
                                    <button @click="goToCaseDetail(caseItem.id)" class="inline-flex items-center px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Detail
                                    </button>
                                    <button class="inline-flex items-center px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                        Sil
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        
    </div>
    <general-Modal
            v-model="addCaseModal"
            title="Başlık"
            :full-height="true"
            :close-on-backdrop="true"
            :close-on-esc="true"
            @close="handleClose"
        >
        <template #content>
            <div class="flex flex-col w-full space-y-5 pb-[100px]">
                <div class="flex flex-col gap-y-1">
                    <span class="text-sm font-medium text-gray-300">Title</span>
                    <input v-model="addObj.title" class="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200" type="text">
                </div>
                <div class="flex flex-col gap-y-1">
                    <span class="text-sm font-medium text-gray-300">Description</span>
                    <input v-model="addObj.description" class="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200" type="text">
                </div>
                <div class="flex flex-col gap-y-1">
                    <span class="text-sm font-medium text-gray-300">Case Types</span>
                    <select v-model="addObj.typeId" class="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200" name="" id="">
                        <option v-for="ct in caseTypes" :value="ct.id">{{ ct.name }}</option>
                    </select>
                </div>
                <div class="flex flex-col gap-y-1">
                    <span class="text-sm font-medium text-gray-300">Employees</span>
                    <div class="relative">
                        <div 
                            @click="toggleDropdown" 
                            class="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white min-h-[38px] flex flex-wrap gap-2 p-1 cursor-pointer"
                        >
                            <div v-if="selectedLawyers.length === 0" class="text-gray-400 py-1 px-2 flex items-center">
                                Select employees...
                            </div>
                            <div 
                                v-for="lawyer in selectedLawyers" 
                                :key="lawyer.id"
                                class="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-md flex items-center gap-1 text-sm"
                            >
                                {{ lawyer.firstName }}
                                <button 
                                    @click.stop="removeLawyer(lawyer)"
                                    class="text-cyan-400 hover:text-cyan-300"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        
                        <div 
                            v-if="isDropdownOpen" 
                            class="absolute z-[80] w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto"
                        >
                            <div class="p-2">
                                <input 
                                    type="text"
                                    v-model="searchQuery"
                                    placeholder="Search employees..."
                                    class="w-full px-3 py-2 text-sm text-white border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                />
                            </div>
                            <div class="py-1">
                                <div 
                                    v-for="lawyer in filteredLawyers" 
                                    :key="lawyer.id"
                                    @click="toggleLawyerSelection(lawyer)"
                                    class="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2 text-sm text-gray-300"
                                    :class="{ 'bg-cyan-500/10': isSelected(lawyer) }"
                                >
                                    <div class="w-4 h-4 border border-gray-600 rounded flex items-center justify-center"
                                        :class="{ 'bg-cyan-500 border-cyan-500': isSelected(lawyer) }"
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
                <button @click="addCaseModal = false" class="inline-flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    İptal
                </button>
                <button @click="addCase();" class="inline-flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Kaydet
                </button>
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
            viewMode: 'table',
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
        goToCaseDetail(id){
            this.$router.push({name : 'caseDetail', params : {id : id}})
        },
        async getMyCases() {
            const data = {
                companyId : this.user.company.id,
                userId : this.user.id,
                isOwner : this.user.isOwner
            }
            const response = await this.$appAxios.post(`cases/get-case-by-self`,data)
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
        if(this.user){
            await this.getMyCases();
            await this.getCompanyLawyers();
            await this.getCaseTypes();
        }
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
</style>