import { useEffect, useState } from "react"
import { Sparklines, SparklinesLine } from 'react-sparklines';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from 'react-icons/fa';
import {useParams} from 'react-router-dom';
import {UserAuth} from '../context/AuthContext';
import {db} from '../firebase';
import {arrayUnion, doc, updateDoc} from 'firebase/firestore'


function CoinPage() {

    const [coinDetails, setCoinDetails] = useState({})
    const [saved , setSaved] = useState(false)
    const {user} = UserAuth()
    const params = useParams()
    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`

    const getCoinDetails = async () => {
        await fetch(url).then(resp => resp.json()).then(data => setCoinDetails(data))
    }

    const coinDescription = (JSON.stringify(coinDetails.description?.en))
    if(coinDescription){
            const jsonP = (JSON.parse(coinDescription))
    console.log(jsonP)
    }

    const coinPath = doc(db,'users', `${user?.email}`);
    const saveCoin = async()=> {
        if(user?.email){
            setSaved(true)
            console.log(coinPath.watchList)
            await updateDoc(coinPath , {
                watchList: arrayUnion({
                    id: coinDetails.id ,
                    name: coinDetails.name ,
                    image: coinDetails.image.large ,
                    rank: coinDetails.market_cap_rank,
                    symbol: coinDetails.symbol,
                })
            })
        }
        else{
            alert('Please sign in to save a coin to your watch list');
        }
    }

    useEffect(() => {
        getCoinDetails()
        window.scrollTo({ 
            top: 0,
            left: 0,
            behavior: 'smooth'})
    }, [url])

    return (
        <div className='rounded-div my-12 py-8'>
            {coinDetails?.image ? 
            <div className='flex py-8'>
                <img className='w-20 mr-8'
                    src={coinDetails.image?.large} alt="/" />
                <div>
                    <p className='text-3xl font-bold'>{coinDetails?.name} price</p>
                    <p>({coinDetails.symbol?.toUpperCase()}/ USD) {saved === false? (<AiOutlineStar onClick={saveCoin}/>) : (<AiFillStar /> )}  </p>
                </div>
            </div>
            : null }

            <div className='grid md:grid-cols-2 gap-8'>
                <div>
                    <div className='flex justify-between'>
                        {coinDetails.market_data?.current_price ?
                            (<p className='text-3xl font-bold'>${coinDetails.market_data?.current_price.usd.toLocaleString()}</p>)
                            : null
                        }
                        <p>7 Days</p>
                    </div>
                    <div>
                        <Sparklines data={coinDetails.market_data?.sparkline_7d.price} >
                            <SparklinesLine color='teal' />
                        </Sparklines>
                    </div>
                    <div className='flex justify-between py-4 '>
                        <div>
                            <p className='text-gray-500 text-sm'>Market Cap</p>
                            {coinDetails.market_data?.market_cap ?
                                (<p>${coinDetails.market_data.market_cap.usd.toLocaleString()}</p>) : null}
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm text-end'>Volume</p>
                            {coinDetails.market_data?.market_cap ?
                                (<p>${coinDetails.market_data.total_volume.usd.toLocaleString()}</p>) : null}
                        </div>
                    </div>

                    <div className='flex justify-between py-4'>
                        <div >
                            <p className='text-gray-500 text-sm'>24H High</p>
                            ${coinDetails.market_data?.high_24h.usd.toLocaleString()}
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm text-end'>24H Low</p>
                            ${coinDetails.market_data?.low_24h.usd.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div>
                    <p className='text-xl font-bold'>Market Stats</p>
                    <div className='flex justify-between py-4'>
                        <div>
                            <p className='text-gray-500 text-sm'>Market Rank</p>
                            {coinDetails.market_cap_rank}
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Hashing Algorithm</p>
                            {coinDetails?.hashing_algorithm}
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Trust Score</p>
                            {coinDetails.tickers ? <p>{coinDetails.liquidity_score.toFixed(2)}</p> : null}
                        </div>
                    </div>
                    <div className='flex justify-between py-4'>
                        <div>
                            <p className='text-gray-500 text-sm'>Price Change 24h</p>
                            <p>{coinDetails.market_data?.price_change_percentage_24h.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Price Change 7d</p>
                            <p>{coinDetails.market_data?.price_change_percentage_7d.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Price Change 14d</p>
                            <p>{coinDetails.market_data?.price_change_percentage_14d.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='flex justify-between py-4'>
                        <div>
                            <p className='text-gray-500 text-sm'>Price Change 30d</p>
                            <p>{coinDetails.market_data?.price_change_percentage_30d.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Price Change 60d</p>
                            <p>{coinDetails.market_data?.price_change_percentage_60d.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Price Change 1y</p>
                            <p>{coinDetails.market_data?.price_change_percentage_1y.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='flex justify-around p-8 text-accent'>
                        <FaTwitter />
                        <FaFacebook />
                        <FaReddit />
                        <FaGithub />
                    </div>
                </div>
            </div>

            {/* <div className='py-4'>
                <p className='text-xl font-bold'>About {coinDetails.name}</p>
            </div> */}
        </div>
    )
}

export default CoinPage