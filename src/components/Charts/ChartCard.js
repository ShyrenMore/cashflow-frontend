import React from 'react'
import './index.css'

function ChartCard({ children, title }) {
    return (
        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <p className="mb-4 fw-bolder text-gray-800 dark:text-gray-800 mx-auto text-center">{title}</p>
            {children}
        </div>
    )
}

export default ChartCard;
