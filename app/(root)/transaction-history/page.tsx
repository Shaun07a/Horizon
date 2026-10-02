import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { formatAmount } from '@/lib/utils';
import TransactionsTable from '@/components/TransactionsTable';
import { Pagination } from '@/components/Pagination';

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

    const rowsPerPage = 10;
    const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

    const currentTransactions = account?.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
  
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
            <p className='text-14 font-semibold tracking-[1.1px] text-white'>
                ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>

          <div className='transactions-account-balance'>
            <p className='text-14'>Current balance</p>
            <p className='text-24 text-center font-bold'>{formatAmount(account?.data.currentBalance)}</p>
          </div>
        </div>

        <section className='flex w-full flex-col gap-6'>
          <TransactionsTable 
          transactions={currentTransactions}
          />

            {totalPages > 1 && (
              <div className='my-4 w-full'>
                  <Pagination totalPages={totalPages} page={currentPage}/>
              </div>
            )}
        </section>
      </div>
    </section>
  )
}

export default TransactionHistory