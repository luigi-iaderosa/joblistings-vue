import {defineStore} from 'pinia';
const useUserStore = defineStore('user', {
    state: () => ({
        user_id : null,
        user_name: null,
        token: null,
        authorized: false
    }),
    actions: {
      fillUserProps() {
            this.user_id = localStorage.getItem('user_id');
            this.user_name = localStorage.getItem('user');
            this.token = localStorage.getItem('token');
    
            if (this.user_id!=null){
                this.authorized = true;
            }
            else {
                this.authorized = false;
            }
            console.log(this);
        },
    },
  });
  export default useUserStore;