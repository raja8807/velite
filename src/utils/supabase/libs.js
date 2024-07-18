// import supabase from "./auth";

import { createClient } from "./auth";

export const signIn = async ({ email, password }) => {
  const supabase = createClient()
  const res = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return res;
};

export const updateUser = async (data) => {
  const supabase = createClient()
  const res = await supabase.auth.updateUser({
    data,
  });

  return res;
};

export const signUpNewUser = async ({ email, password }) => {
  const supabase = createClient()
  const res = await supabase.auth.signUp({
    email,
    password,
  });

  return res;
};

export const signOut = async () => {
  const supabase = createClient()
  const res = await supabase.auth.signOut();
  return res;
};
