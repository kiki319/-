import Vue from 'vue'
import VueRouter from 'vue-router'

const Front = () => import('../front/Front')
const Lines = () => import('../front/views/lines/Lines')
const Stations = () => import('../front/views/stations/Stations')
const Transfer = () => import('../front/views/transfer/Transfer')

const Admin = () => import('../admin/Admin')
const Increase = () => import('../admin/views/Increase')
const Delete = () => import('../admin/views/Delete')
const Edit = () => import('../admin/views/Edit')

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/front'
    },
    {
        path: '/front',
        component: Front,
        children: [
            {
                path: '',
                redirect: 'transfer'
            },
            {
                path: 'transfer',
                component: Transfer
            },
            {
                path: 'station',
                component: Stations
            },
            {
                path: 'line',
                component: Lines
            }
        ]
    },
    {
        path: '/admin',
        component: Admin,
        children: [
            {
                path: '',
                redirect: 'increase'
            },
            {
                path: 'increase',
                component: Increase
            },
            {
                path: 'delete',
                component: Delete
            },
            {
                path: 'edit',
                component: Edit
            }
        ]
    }
]

const router = new VueRouter({
    routes,
    mode:'history',
    linkActiveClass:'active'
})

export default router