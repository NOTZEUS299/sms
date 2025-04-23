import React from 'react'

const Home_totle_card = (props) => {
    return (
        <div className="relative">
            <div className="flex relative lg:items-center md:items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200 max-w-sm max-[425px]:flex-col-reverse max-[425px]:content-start">
                <div className={`absolute left-0 top-[18px] bottom-[18px] w-2 rounded-r-lg ${props.totle_Noch}`}></div>
                <div>
                    <p className="text-gray-500 text-sm font-medium">{props.total_title}</p>
                    <p className="text-2xl font-bold text-gray-800 max-[365px]:text-lg">₹ {props.total_price}</p>
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-md ${props.totle_icon_bg_back}`}>
                    <div className={`${props.totle_color} ${props.totle_icon_bg} text-xl rounded-md flex items-center justify-center w-6 h-6 font-bold`}>{props.totle_simbol}</div>
                </div>
            </div>
            <div className={`absolute border-t-2 border-r-2 top-0 right-0 border-amber-500 rounded-tr-lg h-12 w-14 ${props.totle_bg_border}`}></div>
        </div>
    )
}

export default Home_totle_card
