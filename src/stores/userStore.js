import {defineStore} from 'pinia';
const useUserStore = defineStore('user', {
    state: () => ({
        user_id : null,
        user_name: null,
        token: null,
        authorized: false,
        role: null
    }),
    actions: {
      fillUserProps() {
            this.user_id = localStorage.getItem('user_id');
            this.user_name = localStorage.getItem('user');
            this.token = localStorage.getItem('token');
            this.roles = localStorage.getItem('roles');
            console.log(localStorage);
            if (this.user_id!=null){
                this.authorized = true;
            }
            else {
                this.authorized = false;
            }
        },
        canAccessToPath($path){
            //console.log(this,this.role,'hey');
            switch($path){
                case '/jobs/add':
                    return true;
                    //return this.role.filter((item) => item.id_role == 1).length > 0;
                default:
                    return false;
            }
        }
    },
  });
  export default useUserStore;