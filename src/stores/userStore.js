import {defineStore} from 'pinia';
export const useUserStore = defineStore('user', {
    state: () => ({
        user_id : null,
        user_name: null,
        token: null,
        authorized: false,
        role:  null
    }),
    actions: {
      fillUserProps() {
            this.user_id = localStorage.getItem('user_id');
            this.user_name = localStorage.getItem('user');
            this.token = localStorage.getItem('token');
            this.roles = JSON.parse(localStorage.getItem('roles'));
            if (this.user_id!=null){
                this.authorized = true;
            }
            else {
                this.authorized = false;
            }
        },
        canAccessToPath($path){
            if (this.roles==undefined){
                return false;
            }
            //console.log(this,this.role,'hey');
            switch($path){
                case '/jobs/subscriptions':
                    return this.roles.filter((item) => item.id_role == 1).length > 0;  
                case '/jobs/apply':
                    return this.roles.filter((item) => item.id_role == 3).length > 0;
                case '/jobs/add':
                case '/jobs/edit':
                case '/companies/add':
                    //return true;
                    return this.roles.filter((item) => item.id_role == 1).length > 0;
                case '/jobs/search':
                    return this.roles.filter((item)=> item.id_role == 3).length > 0;
                case '/subscriptions':
                    return this.roles.filter((item) => item.id_role == 3).length > 0;
                default:
                    return false;
            }
        },
        emptyUserProps(){
            this.user_id = null
            this.user_name = null
            this.token = null
            this.roles = null
            this.authorized = false
        }
    },
  });
  