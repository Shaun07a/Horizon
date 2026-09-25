'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();

        // 1. Create the session
        const response = await account.createEmailPasswordSession(email, password);

        // 2. Set the cookie so Next.js remembers the session
        (await cookies()).set("appwrite-session", response.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(response);
    } catch(error){
        console.error('Error', error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;

    try {
        const { account } = await createAdminClient();

        // 1. Create the user account using separate positional arguments
        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );
        
        // 2. Create the session using separate arguments (not an object)
        const session = await account.createEmailPasswordSession(email, password);

        // 3. Await the cookies() function before calling .set()
        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        // 4. Stringify and return the user object so the frontend state can update
        return parseStringify(newUserAccount);
    } catch(error){
        console.error('Error', error);
    }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        // 1. Invalidate the session on Appwrite's server
        await account.deleteSession('current');

        // 2. Await the cookies() function before calling .delete()
        (await cookies()).delete('appwrite-session');
        
        return true;
    } catch (error) {
        console.error('Error logging out:', error);
        return null;
    }
}