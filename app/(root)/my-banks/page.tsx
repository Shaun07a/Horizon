import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react';

const MyBanks = async () => {
  const loggedIN = await getLoggedInUser();

  if (!loggedIN) redirect('/sign-in');

  const accounts = await getAccounts({
      userId: loggedIN.$id
    });

  return (
    <section className='flex'> 
      <div className='my-banks'>
        <HeaderBox 
        title='My Bank Accounts'
        subtext='Effortlessly manage your banking activities.'
        />

        <div className='space-y-4'>
          <h2 className='header-2'>
            Your cards
          </h2>
          <div className='flex flex-wrap gap-6'>
            {accounts && accounts.data.map((a : Account) => (
              <BankCard 
              // FIX 1: Use the individual account ID for the React key
              key={a.id} 
              account={a}
              // FIX 2: Pass the full combined name to match the RightSidebar implementation
              userName={`${loggedIN?.firstName} ${loggedIN?.lastName}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks;