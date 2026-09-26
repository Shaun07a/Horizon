import { Button } from '@base-ui/react'
import { StyledString } from 'next/dist/build/swc/types';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

const PlaidLink = ({ user, variant}: PlaidLinkProps) => {
  const router = useRouter();
  const [token, seToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () =>{
        // const data = await createLinkToken(user);

        // setToken(data?.linkToken);
    }

    getLinkToken();

  }, []);

  const onSuccess = useCallback(async (public_token: StyledString) =>{
    // await exchangePublicToken({
    //     publicToken: public_token,
    //     user,
    // })

    router.push('/');
  }, [user])


  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }
  return (
    <>
        {variant === 'primary' ? (
            <Button
                className="plaidlink-primary"
            >
                Connect bank
            </Button>
        ): variant === 'ghost' ? (
            <Button>
                Connect bank
            </Button>
        ):(
            <Button>
                Connect bank
            </Button>
        )}
    </>
  )
}

export default PlaidLink