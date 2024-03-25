import { defineStore } from 'pinia'
import { nhanVienAPI } from '~/services/nhanVienAPI'

export const useAdminStore = defineStore('admin', {
    state: () => ({
        isLoggedIn: false,
        admin: null,
    }),
    actions: {
        async login(Password, SoDienThoai) {
            try {
                const { data } = await nhanVienAPI.login({ Password, SoDienThoai })

                if (data) {
                    this.admin = data
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
            this.admin = null
        },
    },
})
