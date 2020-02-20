import firebase from 'firebase'

export default {
    actions: {
        async auth({ commit }, { email, password }) {
            try {
                const addAdminRole = functions.httpsCallable('adminRole')
                addAdminRole({ email, password }).then(res => console.log(res))
            } catch (e) {}
        }
    }
}