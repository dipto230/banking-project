import TotalBalanceBox from '@/components/TotalBalanceBox';
import HeaderBox from '@/components/ui/HeaderBox'
import React from 'react'

const Home = () => {
    const loggedIn ={ firstName : 'Dipto'};
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox
                 type="greeting"
                 title ="welcome"
                 user ={loggedIn ?.firstName||'Guest'}
                 subtext = "Access and manage your account and  transaction  efficiently"
                
                
                />
                <TotalBalanceBox 
                accounts={[]}
                totalBanks ={1}
                totalCurrentBalance ={1230.56}
                
                
                
                />
                    
                
                   

            </header>

        </div>

    </section>
  )
}

export default Home