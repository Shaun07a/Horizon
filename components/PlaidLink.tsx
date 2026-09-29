import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import { Button } from '@base-ui/react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

const PlaidLink = ({ user, variant}: PlaidLinkProps) => {
  const router = useRouter();
  
  // FIX 1: Changed seToken to setToken
  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () =>{
        const data = await createLinkToken(user);
        setToken(data?.linkToken);
    }
    getLinkToken();
  }, [user]);

  // FIX 2: Removed `: string` to let TypeScript infer the correct type automatically, and added metadata
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token, metadata) =>{
    
        // Add a check to ensure public_token is a valid string before making the API call
        if (public_token) {
            await exchangePublicToken({
                publicToken: public_token,
                user,
            })
        }

        router.push('/');
    }, [user, router])

  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }
  
  // Note: You still need to call usePlaidLink(config) here to actually use the Plaid modal!
  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === 'primary' ? (
            <Button
                onClick={() => open()}
                disabled={!ready}
                className="plaidlink-primary"
            >
                Connect bank
            </Button>
        ): variant === 'ghost' ? (
            // FIX: Replaced plaidlink-ghost with sidebar-link to perfectly match other links
            <Button 
                onClick={() => open()} 
                disabled={!ready} 
                variant="ghost" 
                className="sidebar-link w-full bg-transparent shadow-none"
            >
                {/* FIX: Wrapped Image in the same relative container as other sidebar icons */}
                <div className="relative size-6">
                    <Image 
                        src="/icons/connect-bank.svg"
                        alt="connect bank"
                        fill
                    />
                </div>
                {/* FIX: Used sidebar-label to inherit the exact same text styling/spacing */}
                <p className='sidebar-label'>Connect bank</p>
            </Button>
        ):(
            <Button 
                onClick={() => open()} 
                disabled={!ready} 
                className="plaidlink-default"
            >
                <Image 
                    src="/icons/connect-bank.svg"
                    alt="connect bank"
                    width={24}
                    height={24}
                />
                <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
            </Button>
        )}
    </>
  )
}

export default PlaidLink