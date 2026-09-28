import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const RecentTransactions = ({
    accounts,
    transactions = [],
    appwriteItemId,
    page = 1,
}: RecentTransactionsProps) => {
  return (
    <section className='recent-transactions'>
        <header className='flex item-center justify-between'>
            <h2 className='recent-transactions-label'>
                Recent transactions
            </h2>
            <Link href={`/transaction-history/?id=${appwriteItemId}`} className='view-all-btn'>
                View all
            </Link>
        </header>

        <Tabs defaultValue={appwriteItemId} className="w-full">
            <TabsList className='recent-transactions-tablist'>
                
            </TabsList>
            
        </Tabs>
    </section>
  )
}

export default RecentTransactions