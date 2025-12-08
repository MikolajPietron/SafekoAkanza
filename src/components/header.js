"use client"; 

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import UserIcon from '@mui/icons-material/Person';
import ProfileMenu from '@/components/ProfileMenu/profileMenu';


import FiltryMenu from '@/components/HamburgerFiltry/Filtry';



export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setIsShowProfileMenu((prev) => !prev);
  };

return (
    <>
    <div className="headerGlobal">
        {session && (
          <button className="UserProfileButtonGlobal" onClick={toggleProfileMenu}>
            <img
              src={session.user.image}
              alt={session.user.name}
              className="UserProfileImageGlobal"
            />
          </button>
        )}
        <img src="default_logo.svg" className="header-logoGlobal" onClick={() => router.push("/oferty")} />
        {session?.user ? (
          <>
            
          </>
        ) : (
          <UserIcon style={{ fontSize: 50, color: 'Black' }} className="UserIcon" />
        )}
        {session ? (
        <button className="dodajOferteGlobal" onClick={() => router.push('/dodajOferte')}>
          + Dodaj Ofertę
        </button>
      ) : (
        <button className="dodajOferteGlobal" onClick={() => signIn()}>
          + Dodaj Ofertę
        </button>
      )}
      </div>
      {/* <div className={`profileMenu ${isShowProfileMenu ? 'show' : ''}`}>
              <ProfileMenu />
      </div> */}
    </>
)
}