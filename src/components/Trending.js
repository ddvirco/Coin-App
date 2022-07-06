import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

function Trending(){

    const [trending, setTrending] = useState([])

    const url = 'https://api.coingecko.com/api/v3/search/trending'

    const getTrendingData =async() => {
       await fetch(url).then(resp => resp.json()).then(data => setTrending(data.coins))
    }

    useEffect(() => {
        getTrendingData()
    },[])

    return(
        <div className='rounded-div my-12 py-8 text-primary' >
            <h2 className='text-2xl font-bold py-4'>Trending</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {trending.map((item) => 
                <div key={item.item.id} className='rounded-div flex justify-between p-4 hover:scale-105 ease-in-out duration-300'>
                    <NavLink to={`/coin/${item.item.id}`}>
                    <div className='flex w-full items-center justify-between'>
                        <div className='flex'>
                            <img className='mr-4 rounded-full'
                            src={item.item.small} alt='/' />
                            <div>
                                <p className='font-bold'>{item.item.name}</p>
                                <p>{item.item.symbol}</p> 
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <img
                            className='w-4 mr-2'
                            src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" 
                            alt="" />
                            <p>{item.item.price_btc.toFixed(7)}</p>
                        </div>
                    </div>
                    </NavLink>
                </div>
            )}

            </div>
        </div>
    )
}

export default Trending