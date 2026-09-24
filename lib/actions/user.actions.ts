'use server';

import { createSessionClient } from "../appwrite";

export const signIn = async () => {
    try {
        //Mutation / Database / Make fecth
    } catch(error){
        console.error('Error', error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
        //Create a user account
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