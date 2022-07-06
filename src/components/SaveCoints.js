import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import {AiOutlineClose} from 'react-icons/ai'
import {doc, onSnapshot, updateDoc} from 'firebase/firestore';
import { db } from '../firebase'
import {UserAuth} from '../context/AuthContext'
function SaveCoins() {

    const [coins, setCoins] = useState([])
    const {user} = UserAuth()
    
    const coinPath = doc(db,'users',`${user?.email}`)
    const deleteCoin = async(passedId) => {
        try{
            const result = coins.filter((item) => item.id !== passedId)
            await updateDoc(coinPath ,{
                watchList: result
            })
        }
        catch(e){
            console.log(e.message)
        }
    }
    useEffect(() => {
        onSnapshot(doc(db,'users', `${user.email}`), (doc) => {
            setCoins(doc.data()?.watchList)
        })
    },[user?.email])

    return (
        <div>
            {coins?.length === 0 ?
                (<p>
                    You don't have any coins saved. Please save a coins to add it to your watch list

                    <NavLink to='/'>Click here to search coins</NavLink>
                </p>) :
                (<table className='w-full border-collapse text-center'>
                    <thead>
                        <tr className='border-b'>
                            <th className='px-4'>Rank #</th>
                            <th className='text-left'>Coin</th>
                            <th className='text-left'>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins?.map((coins) => (
                            <tr key={coins.id} className='h-[60px] overflow-hidden'>
                                <td>{coins?.rank}</td>
                                <td>
                                    <NavLink to={`/coin/${coins.id}`}>
                                        <div className='flex items-center'>
                                            <img className='w-8 mr-4' src={coins?.image} alt='/' />
                                            <div>
                                                <p className='hidden sm:table-cell'>{coins?.name}</p>
                                                <p className='text-gray-500 text-left text-sm'>{coins?.symbol.toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </td>
                                <td>
                                   <AiOutlineClose onClick={() => deleteCoin(coins.id)} className='cursor-pointer'/> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}
        </div>
    )
}

export default SaveCoins