import { defineStore } from 'pinia'
import { docGiaAPI } from '~/services/docGiaAPI'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        user: null,
    }),
    actions: {
        async login(MATKHAU, DIENTHOAI) {
            try {
                const { data } = await docGiaAPI.login({ MATKHAU, DIENTHOAI })

                if (data) {
                    this.user = data
                    this.isLoggedIn = true
                } else {
                    console.error('Failed to login')
                }
            } catch (error) {
                console.error('Failed to login:', error)
            }
        },
        logout() {
            this.isLoggedIn = false
            this.user = null
        },
    },
})
