import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const MyBanks = () => {
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
        </div>
      </div>
    </section>
  )
}

export default MyBanks