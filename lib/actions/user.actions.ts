'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";

export const signIn = async () => {
    try {
        //Mutation / Database / Make fecth
    } catch(error){
        console.error('Error', error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    const {email, password, firstName, lastName} = userData;

    try {
        const { account } = await createAdminClient();

        // Removed the {} and passed as separate positional arguments.
        // Used backticks (`) for proper string interpolation.
        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );
        
        // ... rest of your code
        const session = await account.createEmailPasswordSession({
            email,
            password
        });

        cookies().set("my-custom-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
    } catch(error){
        console.error('Error', error);
    }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}