<template>
    <Transition name="fade">
        <div v-if="modelValue" 
            style="background: rgba(0, 0, 0, 0.5)" 
            class="fixed top-0 left-0 w-full h-full z-20 flex text-black"
            @click="handleBackdropClick"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId">
            <div @click="stopClose($event)" 
                id="content" 
                :class="[`${width}`, { 'max-h-[90vh]': !fullHeight }]" 
                class="bg-white  z-50 max-[450px]:!w-[98%] rounded-lg absolute top-1/2 transition-all left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-y-auto shadow-xl">
                <div class="p-4 border-b  border-gray-200 flex justify-between items-center">
                    <span></span>
                    <span :id="titleId" class="text-lg  text-gray-800 max-lg:text-base font-semibold">{{title}}</span>
                    <button 
                        @click="close()" 
                        class="text-gray-500 hover:text-red-500 transition-colors duration-200"
                        aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="p-4 max-sm:p-3 overflow-y-auto dark:text-gray-200 text-gray-700">
                    <slot name="content"></slot>
                </div>
                <div v-if="$slots.actions" class="mt-auto py-4 px-4 flex items-center justify-center gap-x-4 border-t  border-gray-200 w-full">
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'GeneralModal',
    computed: {
        ...mapState(["language"]),
        titleId() {
            return `modal-title-${this._uid}`
        }
    },
    watch: {
        modelValue: {
            handler(newValue) {
                this.handleBodyScroll(newValue)
                if (newValue) {
                    this.addKeyboardListener()
                } else {
                    this.removeKeyboardListener()
                }
            },
            immediate: true
        }
    },
    props: {
        title: { 
            type: String, 
            default: "Modal Title"
        },
        modelValue: { 
            type: Boolean,
            default: false
        },
        width: { 
            type: String, 
            default: "w-[500px]"
        },
        fullHeight: {
            type: Boolean,
            default: false
        },
        closeOnBackdrop: {
            type: Boolean,
            default: true
        },
        closeOnEsc: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handleBodyScroll(isOpen) {
            const body = document.querySelector("body")
            body.style.overflow = isOpen ? "hidden" : "auto"
        },
        toggle() {
            this.$emit('update:modelValue', true)
        },
        close() {
            this.$emit('update:modelValue', false)
            this.$emit('close')
        },
        stopClose(e) {
            e.stopPropagation()
        },
        handleBackdropClick(e) {
            if (this.closeOnBackdrop && e.target === e.currentTarget) {
                this.close()
            }
        },
        handleKeydown(e) {
            if (this.closeOnEsc && e.key === 'Escape') {
                this.close()
            }
        },
        addKeyboardListener() {
            document.addEventListener('keydown', this.handleKeydown)
        },
        removeKeyboardListener() {
            document.removeEventListener('keydown', this.handleKeydown)
        }
    },
    beforeUnmount() {
        this.removeKeyboardListener()
        this.handleBodyScroll(false)
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
