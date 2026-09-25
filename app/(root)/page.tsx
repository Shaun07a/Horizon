import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation'; // 1. Import redirect

const Home = async () => {
  const loggedIN = await getLoggedInUser();

  // 2. Add this protection check before rendering anything
  if (!loggedIN) {
    redirect('/sign-in');
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIN.name || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar 
        user={loggedIN}
        transactions={[]}
        banks={[{currentBalance: 123.50}, {currentBalance: 500.50}]}
      />
    </section>
  )
}

export default Home