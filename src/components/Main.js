import React, { useEffect, useState } from 'react';
import Navbar from './navigationbar/Navbar'
import Employee from './navigationbar/Employee'

const Main = () => {

    const [role, setRole] = useState('')

    useEffect(() => {
       setRole("Employee")
    }, [])

    return (
        <div>
            <div>
                {role === "Employee" && <Employee/>}
                {role === "Teamleader" &&  <h1>Teamleader</h1>}
                {role === "Admin" &&  <h1>Admin</h1>}
            </div>
        </div>
    )
}

export default Main