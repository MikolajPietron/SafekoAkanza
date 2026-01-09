'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import './ofertyadd.css';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WatchIcon from '@mui/icons-material/Watch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function DodajOferte() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  const categories = [
    { 
      id: "nieruchomosci",
      name: "Nieruchomości", 
      subtitle: "Domy, mieszkania, działki",
      icon: <HomeIcon className='categoryIcon' />,
      route: '/nieruchomosci',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      id: "bizuteria",
      name: "Biżuteria", 
      subtitle: "Złoto, srebro, diamenty",
      icon: <WatchIcon className='categoryIcon' />,
      route: '/bizuteria',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      id: "samochody",
      name: "Samochody", 
      subtitle: "Auta osobowe, sportowe",
      icon: <DirectionsCarIcon className='categoryIcon' />,
      route: '/samochody',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id);
    router.push(category.route);
  };

  return (
    <div className="addOfferPage">
      {/* Background decoration */}
      <div className="bgDecoration">
        <div className="bgCircle bgCircle1"></div>
        <div className="bgCircle bgCircle2"></div>
        <div className="bgCircle bgCircle3"></div>
      </div>

      <div className="addOfferContent">
        {/* Header Section */}
        <div className="addOfferHeader">
          <span className="headerBadge">Nowe ogłoszenie</span>
          <h1 className="headerTitle">Co chcesz sprzedać?</h1>
          <p className="headerSubtitle">
            Wybierz kategorię, która najlepiej opisuje Twój przedmiot
          </p>
        </div>

        {/* Category Cards */}
        <div className="categoryCards">
          {categories.map((category) => (
            <div 
              key={category.id}
              className={`categoryCard ${selectedCategory === category.id ? 'selected' : ''} ${hoveredCategory === category.id ? 'hovered' : ''}`}
              onClick={() => handleCategoryClick(category)}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div 
                className="categoryIconWrapper"
                style={{ background: category.gradient }}
              >
                {category.icon}
              </div>
              <div className="categoryInfo">
                <h3 className="categoryName">{category.name}</h3>
                <p className="categorySubtitle">{category.subtitle}</p>
              </div>
              <div className="categoryArrow">
                <ArrowForwardIcon />
              </div>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="addOfferFooter">
          <p>Nie wiesz jak zacząć? <a href="#">Zobacz poradnik</a></p>
        </div>
      </div>
    </div>
  );
}