
import { lazy } from "react"
import { AiOutlineCalendar } from "react-icons/ai";



const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */'../auth/LoginPage'));
const CalendarPage = lazy(() => import(/* webpackChunkName: "LoginPage" */'../calendar/pages/CalendarPage'));



export const routesPrev = [

    {
        path: '/Login/*',
        to: '/Login',
        component: LoginPage,
    }

]

export const routesNext = [

    {
        path: '/Calendar/*',
        to: '/Calendar',
        component: CalendarPage,
        title:'Aplicaciones',
        name:'Calendario',
        icon: AiOutlineCalendar
    },





]