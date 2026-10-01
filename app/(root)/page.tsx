export const dynamic = 'force-dynamic';

import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation'; 

// FIX: Remove the inline destructuring of searchParams here
const Home = async ({ searchParams }: SearchParamProps) => {
  // FIX: Await the searchParams Promise first, then extract id and page
  const { id, page } = await searchParams;
  
  const currentPage = Number(page as string) || 1;
  const loggedIN = await getLoggedInUser();

  if (!loggedIN) {
    redirect('/sign-in');
  }

  const accounts = await getAccounts({
    userId: loggedIN.$id
  })

  if(!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIN?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar 
        user={loggedIN}
        // FIX 2: Passed account?.transactions instead of accounts?.transactions
        transactions={account?.transactions} 
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home