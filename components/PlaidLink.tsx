import { Button } from '@base-ui/react'
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

const PlaidLink = ({ user, variant}: PlaidLinkProps) => {
  const router = useRouter();
  
  // FIX 1: Changed seToken to setToken
  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () =>{
        // const data = await createLinkToken(user);
        // setToken(data?.linkToken);
    }
    getLinkToken();
  }, [user]);

  // FIX 2: Removed `: string` to let TypeScript infer the correct type automatically, and added metadata
  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token, metadata) =>{
    // await exchangePublicToken({
    //     publicToken: public_token,
    //     user,
    // })

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
            <Button onClick={() => open()} disabled={!ready}>
                Connect bank
            </Button>
        ):(
            <Button onClick={() => open()} disabled={!ready}>
                Connect bank
            </Button>
        )}
    </>
  )
}

export default PlaidLink