import React from 'react'

const StatCart = ({ value, label, color  }) => {
    return (
        <div className="w-[150px] h-[80px] bg-white/10 border-white/20 rounded-xl flex flex-col justify-center items-center">
            {value}
            <span className={`text-xs font-semibold ${color}`}>
                {label}
            </span>
        </div>
    )
}

export default StatCart