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
      </div>
    </section>
  )
}

export default MyBanks