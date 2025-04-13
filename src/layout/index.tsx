import {  useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { TodoStatus } from '../types/todo.types'

const Layout = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [status, setStatus]=useState<TodoStatus>(TodoStatus.ALL)
    return (
        <>
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} statusFilter={status} setStatusFilter={setStatus} />
            <Outlet context={{ search: searchQuery, status }} />

        </>
    )
}

export default Layout;