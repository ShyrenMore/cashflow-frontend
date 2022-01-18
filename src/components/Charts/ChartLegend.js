import React from 'react'
import './index.css'

function ChartLegend({ legends }) {
    return (
        <div className="flex justify-center mt-4 px-3 text-sm text-dark">
            {legends.map((legend) => (
                <div className="flex items-center px-2" key={legend.title}>
                    <span className={`inline-block w-3 h-3 mr-1 ${legend.color} rounded-full`}></span>
                    <span>{legend.title}</span>
                </div>
            ))}
        </div>
    )
}

export default ChartLegend;
