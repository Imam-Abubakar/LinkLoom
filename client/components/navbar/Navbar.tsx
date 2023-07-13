import Logo from "./Logo";
import Link from "next/link";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import "../../flow/config";
import { Menu } from "@mantine/core";
import Router from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { FiUser, FiMenu } from "react-icons/fi";
import { useControls } from "../../store/useControls";

//Components

const Navbar = () => {
  const { currentUser, logOut, logIn } = useAuth();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { authModal, setAuthModal } = useControls();
  return (
    <header className="w-[90vw] px-8 py-4 sticky top-0 backdrop-blur-xl  z-50 border-b border-b-gray-800 ">
      <nav className="flex w-[90vw] items-center mx-auto justify-between">
        <Logo />
        <div className="flex justify-between ">
          <div className="flex gap-3 items-center justify-center w-0 invisible lg:visible lg:mr-[9rem]">
            <Link
              href={"/explore"}
              className="text-lg mr-2 tracking-wider text-gray-400 hover:text-white duration-200 ease-out font-medium"
            >
              Discover
            </Link>

            <Link href={"/builder"}>
              <Button variant="primary">Create Thread</Button>
            </Link>
            {!currentUser?.addr && !user?.email && (
              <Button onClick={() => setAuthModal(true)}>Connect Wallet</Button>
            )}
            {(currentUser?.addr || user?.email) && (
              <Menu position="bottom-end" shadow="md" width={200}>
                <Menu.Target>
                  <Button className="flex gap-2">
                    {" "}
                    Account
                    <FiUser className="!stroke-gray-400 h-5 w-5" />
                  </Button>
                </Menu.Target>
                <Menu.Dropdown className="heading">
                  <Menu.Item onClick={() => Router.push("/dashboard")}>
                    Dashboard
                  </Menu.Item>
                  <Menu.Divider />
                  {currentUser?.addr && (
                    <Menu.Item onClick={logOut}>Disconnect Wallet</Menu.Item>
                  )}
                  {user?.email && (
                    <Menu.Item onClick={() => supabase.auth.signOut()}>
                      Logout
                    </Menu.Item>
                  )}
                </Menu.Dropdown>
              </Menu>
            )}
          </div>

          <div className="flex items-center justify-center mr-4 visible lg:w-0 lg:invisible">
            <Menu position="bottom-end" shadow="md" width={200}>
              <Menu.Target>
                <Button className="flex gap-2">
                  <FiMenu className="!stroke-gray-400 h-5 w-5" />
                </Button>
              </Menu.Target>
              <Menu.Dropdown className="heading">
                <Menu.Item>
                  <Link href={"/explore"}>Discover</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href={"/builder"}>Create Thread</Link>
                </Menu.Item>
                {!currentUser?.addr && !user?.email && (
                  <Menu.Item onClick={() => setAuthModal(true)}>
                    Connect Wallet
                  </Menu.Item>
                )}
                {(currentUser?.addr || user?.email) && (
                  <>
                   
                      <Menu.Item onClick={() => Router.push("/dashboard")}>
                        Dashboard
                      </Menu.Item>
                      <Menu.Divider />
                      {currentUser?.addr && (
                        <Menu.Item onClick={logOut}>
                          Disconnect Wallet
                        </Menu.Item>
                      )}
                      {user?.email && (
                        <Menu.Item onClick={() => supabase.auth.signOut()}>
                          Logout
                        </Menu.Item>
                      )}
                  </>
                )}
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
