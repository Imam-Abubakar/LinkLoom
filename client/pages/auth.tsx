import { Container } from "@mantine/core";
import {
  Session,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface AuthPageProps {}

const AuthPage: NextPage<AuthPageProps> = () => {
  const supabase = useSupabaseClient();
  const session: Session | null = useSession();
  const router = useRouter();
  const redirectUrl = router.query.redirectTo as string
  
  useEffect(() => {
    if(session){
      router.push(redirectUrl ?? "/")
    }
  }, [session,redirectUrl]);

  return (
    <Container>

    <div className="section__height flex  col items-center justify-center">
      <div className="max-w-md mx-auto flex-1">
        <Auth
          providers={["github"]}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          />
      </div>
    </div>
          </Container>
  );
};

export default AuthPage;
