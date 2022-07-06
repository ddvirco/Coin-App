import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from "./components/Navbar";
import { AuthContextProvider } from './context/AuthContext';
import { ThemeProvider } from "./context/ThemeContext";
import Account from './routes/Account';
import CoinPage from './routes/CoinPage';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import Signup from './routes/SignUp';


function App() {
    const [coins, setCoins] = useState([])
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=true'

    const getCoinsData = async () => {
        await fetch(url).then(resp => resp.json()).then(data => setCoins(data))
    }
    useEffect(() => {
        getCoinsData()
    }, [])

    return (
        <ThemeProvider>
            <AuthContextProvider>
                <Navbar />
                <Routes >
                    <Route path='/' element={<Home coins={coins} />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/coin/:coinId' element={<CoinPage />}>
                        <Route path=':coinId' />
                    </Route>
                </Routes>
                <Footer />
            </AuthContextProvider>
        </ThemeProvider>


    );
}

export default App;
