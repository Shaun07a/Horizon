import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

// 1. Added 'async' and removed inline destructuring of searchParams
const TransactionHistory = async ({ searchParams }: SearchParamProps) => {
    // 2. Await searchParams properly for Next.js 15
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
    <section className='transactions'>
      <div className='transactions-header'>
        <HeaderBox 
          title='Transaction History'
          subtext='See your bank details and transactions.'
        />
      </div>

      <div className='space-y-6'>
        <div className='transactions-account'>
          <div className='flex flex-col gap-2'>
            {/* Added a placeholder for your account name so it isn't empty */}
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className='text-14 text-blue-25'>
              {account?.data.officialName}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TransactionHistory