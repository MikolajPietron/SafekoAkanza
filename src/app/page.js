'use client';

import "./page.css";
import ProfileMenu from "@/components/ProfileMenu/profileMenu";
import UserIcon from '@mui/icons-material/Person';
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSession, signOut } from "next-auth/react";


export default function Home() {
  
  const router = useRouter();
  const { data: session } = useSession();
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);
  function toggleProfileMenu() {
    setIsShowProfileMenu(prev => !prev);
  }
  const goToOffers = () =>{
    router.push("/oferty");
  }
  const goToLogin = () =>{
    router.push("api/auth/signin");
  }
  return (
    <div className="PageContainer">
      
      <div className="heroContainerLanding" onClick={goToOffers}>
        <div className="samochodyContainerLanding">
                <div className="overlay-gradientLanding"></div>
                <div className="contentLanding">
                    <h3>Premium Cars</h3>
                    <h2 className="font-serif">Motoryzacja</h2>
                    <div className="description-boxLanding">
                        <p>Ochrona klasyków i supersamochodów. Kompleksowe ubezpieczenie w transporcie i garażu.</p>
                        <a href="#" className="btnLanding">Zobacz ofertę <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            
           
            <div className="nieruchomosciContainerLanding" onClick={goToOffers}>
                <div className="overlay-gradientLanding"></div>
                <div className="contentLanding">
                    <h3>Real Estate</h3>
                    <h2 className="font-serif">Nieruchomości</h2>
                    <div className="description-boxLanding">
                        <p>Inteligentne systemy bezpieczeństwa dla Twojej willi. Monitoring i ochrona fizyczna 24/7.</p>
                        <a href="#" className="btnLanding">Zobacz ofertę <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            
            
            <div className="bizuteriaContainerLanding"onClick={goToOffers}>
                <div className="overlay-gradientLanding"></div>
                <div className="contentLanding">
                    <h3>Jewelry</h3>
                    <h2 className="font-serif">Biżuteria</h2>
                    <div className="description-boxLanding">
                        <p>Dyskrecja i bezpieczeństwo dla Twojej kolekcji sztuki oraz biżuterii.</p>
                        <a href="#" className="btnLanding">Zobacz ofertę <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
      </div>
      
    </div>
    
   
    

  );
}