import React from 'react'
import { calculateTrendPercentage, cn } from '~/lib/utils'
interface StatsCardProps {
  headerTitle: string;
  total: number;
  currentMonth: number;
  lastMonth: number;
}
const StatsCard = ({ headerTitle, total, currentMonth, lastMonth }: StatsCardProps) => {
    const {trend, percentage} = calculateTrendPercentage(currentMonth, lastMonth);
    const isDecrement = trend === "decrement";
  return (
    <article className='stats-card bg-white rounded-xl shadow p-3 sm:p-4 md:p-6 flex flex-col gap-2 md:gap-4 w-full h-full min-w-0'>
        <h3 className='text-base md:text-lg font-medium mb-1 md:mb-2'>
            {headerTitle}
        </h3>
        <div className='content flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 w-full'>
            <div className='flex flex-row md:flex-col gap-2 md:gap-2 flex-1'>
                <h2 className='text-2xl md:text-4xl font-semibold'>{total}</h2>
                <div className="flex items-center gap-2">
                    <figure className='flex items-center gap-1'>
                        <img src={`/assets/icons/${isDecrement ? 'arrow-down-red.svg' : 'arrow-up-green.svg'}`} className='w-4 h-4 md:size-5' alt="arrow" />
                        <figcaption className={cn("text-xs md:text-sm font-medium",
                            isDecrement ? "text-red-500" : "text-green-500")}> 
                            {Math.round(percentage)}%
                        </figcaption>
                    </figure>
                    <p className='text-xs md:text-sm font-medium text-gray-400 truncate'>vs last month</p>
                </div>
            </div>
            <img src={`/assets/icons/${isDecrement? 'decrement.svg' : 'increment.svg'}`} className='w-20 md:w-32 h-16 md:h-32 object-contain' alt="trend graph" />
        </div>
    </article>
  )
}

export default StatsCard