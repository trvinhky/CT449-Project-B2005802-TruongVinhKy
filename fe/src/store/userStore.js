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
                const { data, message } = await docGiaAPI.login({ MATKHAU, DIENTHOAI })

                if (data) {
                    this.user = data
                    this.isLoggedIn = true
                    alert(message)
                } else {
                    console.error('Failed to login')
                }
            } catch (error) {
                console.error('Failed to login: ', error)
            }
        },
        async setInfo(MADOCGIA) {
            try {
                const { data } = await docGiaAPI.getInfo(MADOCGIA)

                if (data) {
                    this.user = data
                } else {
                    console.error('Failed to get info')
                }
            } catch (error) {
                console.error('Failed to get info: ', error)
            }
        },
        logout() {
            this.isLoggedIn = false
            this.user = null
        },
    },
})
