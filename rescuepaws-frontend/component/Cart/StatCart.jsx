import React from 'react'

const StatCart = ({ value, label, color  }) => {
    return (
        <div className={`bg-white/10 border border-white/20 rounded-xl p-5 flex flex-col gap-1 ${color}`}>
            <span className='text-2xl font-extrabold'>{value}</span>
            <span className={`text-xs font-semibold text-white/60`}>
                {label}
            </span>
        </div>
    )
}

export default StatCart