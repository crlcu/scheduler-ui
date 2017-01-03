import React from 'react'

import Navbar from '../components/Navbar'
import '../../public/css/style.min.css'

const Root = ({children}) => (
    <div className="App">
        <Navbar />
        <div className="container">
            {children}
        </div>
    </div>
)

export default Root
