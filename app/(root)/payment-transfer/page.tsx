import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react'

const Transfer = async () => {
  const loggedIN = await getLoggedInUser();

  // ADDED: Guard clause to redirect unauthenticated build-time requests
  if (!loggedIN) redirect('/sign-in');

  const accounts = await getAccounts({
      userId: loggedIN.$id
    })
  
    if(!accounts) return;
  
  const accountsData = accounts?.data;
  
  return (
    <section className='payment-transfer'>
      <HeaderBox 
      title='Payment Transfer'
      subtext='Please provide any specific details or notes related to the payment transfer'
      />

      <section className='size-full pt-5'>
        <PaymentTransferForm accounts={accountsData}/>
      </section>
    </section>
  )
}

export default Transfer