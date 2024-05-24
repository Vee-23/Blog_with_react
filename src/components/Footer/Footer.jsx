import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {

    return (<section className="overflow-hidden py-2 bg-gray-800 h-auto m-t-2 border border-t-2 border-gray-950">
        <div className="flex h-full flex-row mx-4 justify-between items-center">
            <div className="mb-4 inline-flex items-center">
                <Logo width="40px" />
            </div>
            <div>
                <p className="text-sm text-gray-600">
                    &copy; Copyright 2024. All Rights Reserved by Vee.
                </p>
            </div>
        </div>
    </section>
    )
}

export default Footer
