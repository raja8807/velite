// import supabase from "../auth";

import { createClient } from "../../../../utils/supabase/client";

export const createNewEmployer = async (userData, role, companyData) => {
  let supabase = createClient();
  const { data, error } = await supabase
    .from("Companies")
    .insert({ ...companyData })
    .select();

  if (data?.[0]) {
    supabase = createClient();
    const company_id = data[0]?.id;
    const res = await supabase.from(role).insert({ ...userData, company_id });
    const x = supabase.auth.updateUser({
      data: {
        role,
      },
    });

    return {
      data: !res?.error
        ? { ...userData, company: { ...companyData, id: company_id } }
        : null,
      error: res.error,
    };
  }

  return {
    data: null,
    error,
  };
};
