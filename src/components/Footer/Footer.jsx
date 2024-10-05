import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {

    return (<section className="overflow-hidden py-2 bg-gray-800 h-auto m-t-2 border border-t-2 border-purple-800">
        <div className="flex h-full flex-row mx-4 justify-between items-center">
            <div className="mb-4 inline-flex items-center justify-center">
                <Logo width="40px" />
            </div>
            <div>
                <p className="text-sm text-gray-600">
                <span>Github - </span>
                <span className='hover:text-blue-600  p-1'>
                    <a href="https://github.com/Vee-23">vee-23</a>
                </span>
                <span> | </span>
                <span>
                    my docs
                </span>
                </p>
            </div>
        </div>
    </section>
    )
}

export default Footer
