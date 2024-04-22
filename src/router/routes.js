
import { lazy } from "react"
import { AiOutlineCalendar, } from "react-icons/ai";
import { FaCarAlt, FaUser, } from "react-icons/fa";



const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */'../pages/LoginPage'));
const CalendarPage = lazy(() => import(/* webpackChunkName: "LoginPage" */'../calendar/pages/CalendarPage'));
const EmployeesPage = lazy(() => import(/* webpackChunkName: "LoginPage" */'../pages/EmployeesPage'));
const EquipmentPage = lazy(() => import(/* webpackChunkName: "LoginPage" */'../pages/EquipmentPage'));



export const routesPrev = [

    {
        path: '/Login/*',
        to: '/Login',
        component: LoginPage,
    }

]

export const routesNext = [

    {
        path: '/Empleados/*',
        to: '/Empleados',
        component: EmployeesPage,
        title: 'PAGINAS',
        name: 'Empleados',
        icon: FaUser
    },
    {
        path: '/Equipos/*',
        to: '/Equipos',
        component: EquipmentPage,

        name: 'Equipos',
        icon: FaCarAlt
    },
    {
        path: '/Calendar/*',
        to: '/Calendar',
        component: CalendarPage,
        title: 'Aplicaciones',
        name: 'Calendario',
        icon: AiOutlineCalendar
    },





]