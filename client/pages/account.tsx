import {
  Session,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { NextPage } from "next";
import Account from "../components/account";

interface AccountPageProps {}

const AccountPage: NextPage<AccountPageProps> = () => {
  const session: Session | null = useSession();
  const supabase = useSupabaseClient();

  return !session ? (
    <Auth
      providers={["github"]}
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
  ) : (
    <Account session={session} />
  );
};

export default AccountPage;
