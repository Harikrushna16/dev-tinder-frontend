import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
    return (
        <>
            <Navbar />
            <div className='min-h-[calc(100vh-132px)]'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Body