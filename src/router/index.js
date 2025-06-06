import { createRouter,createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import JobView from '@/views/JobView.vue';
import AddJobView from '@/views/AddJobView.vue';
import EditJob from '@/views/EditJobView.vue';
import DeleteJob from '@/views/DeleteJobView.vue';
import CompaniesView from '@/views/CompaniesView.vue';
import EditCompanyView from '@/views/EditCompanyView.vue';
import WelcomeView from '@/views/WelcomeView.vue';
import AddCompanyView from '@/views/AddCompanyView.vue';
import DeleteCompanyView from '@/views/DeleteCompanyView.vue';
const router = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
                {
                    path:'/welcome',
                    name: 'welcome',
                    component: WelcomeView
                },
                {
                    path: '/',
                    name: 'home',
                    component: HomeView
                },
                {
                    path: '/jobs',
                    name: 'jobs',
                    component: JobsView
                },
                {
                    path: '/jobs/:id',
                    name: 'job',
                    component: JobView
                },
                {
                    path: '/jobs/add',
                    name: 'add-job',
                    component: AddJobView
                },
                
                {
                    path: '/jobs/edit/:id',
                    name: 'edit-job',
                    component: EditJob
                },
                {
                    path: '/jobs/delete/:id',
                    name: 'delete-job',
                    component: DeleteJob
                },
                {
                    path: '/companies',
                    name: 'companies',
                    component: CompaniesView
                },
                {
                    path: '/companies/edit/:id',
                    name: 'edit-company',
                    component: EditCompanyView
                },
                {
                    path: '/companies/add',
                    name: 'add-company',
                    component: AddCompanyView
                },
                {
                    path: '/companies/delete/:id',
                    name: 'delete-company',
                    component: DeleteCompanyView
                },
                {
                    path: '/:catchAll(.*)',
                    name: 'not-found',
                    component: NotFoundView
                },
        ]

    });

export default router;

