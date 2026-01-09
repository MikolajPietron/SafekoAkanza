import { useState } from 'react';
import './Filtry.css';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WatchIcon from '@mui/icons-material/Watch';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

export default function Filtry({ setSelectedCategory }) {
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const categories = [
        { id: null, label: 'Wszystkie', icon: null },
        { id: 'nieruchomość', label: 'Nieruchomości', icon: <HomeIcon /> },
        { id: 'samochód', label: 'Samochody', icon: <DirectionsCarIcon /> },
        { id: 'bizuteria', label: 'Biżuteria', icon: <WatchIcon /> },
    ];

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        setSelectedCategory(categoryId);
    };

    return (
        <div className="filtry-wrapper">
            {/* Search Bar */}
            <div className="search-container">
                <SearchIcon className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Szukaj ofert..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button 
                        className="clear-search"
                        onClick={() => setSearchQuery('')}
                    >
                        <CloseIcon style={{ fontSize: 18 }} />
                    </button>
                )}
            </div>

            {/* Category Pills */}
            <div className="category-pills">
                {categories.map((category) => (
                    <button
                        key={category.id ?? 'all'}
                        className={`category-pill ${activeCategory === category.id ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        {category.icon && (
                            <span className="pill-icon">{category.icon}</span>
                        )}
                        <span className="pill-label">{category.label}</span>
                    </button>
                ))}
            </div>

            {/* Advanced Filters Toggle */}
            <button 
                className={`advanced-filters-btn ${showAdvanced ? 'active' : ''}`}
                onClick={() => setShowAdvanced(!showAdvanced)}
            >
                <FilterListIcon style={{ fontSize: 20 }} />
                <span>Filtry</span>
            </button>

            {/* Advanced Filters Panel */}
            {showAdvanced && (
                <div className="advanced-filters-panel">
                    <div className="filter-group">
                        <label className="filter-label">Cena</label>
                        <div className="price-inputs">
                            <input type="number" placeholder="Od" className="filter-input" />
                            <span className="price-separator">—</span>
                            <input type="number" placeholder="Do" className="filter-input" />
                            <span className="currency">PLN</span>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Lokalizacja</label>
                        <input 
                            type="text" 
                            placeholder="Miasto lub region" 
                            className="filter-input full-width" 
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Sortuj według</label>
                        <select className="filter-select">
                            <option value="newest">Najnowsze</option>
                            <option value="price-asc">Cena: rosnąco</option>
                            <option value="price-desc">Cena: malejąco</option>
                            <option value="popular">Najpopularniejsze</option>
                        </select>
                    </div>

                    <div className="filter-actions">
                        <button className="filter-reset">Wyczyść filtry</button>
                        <button className="filter-apply">Zastosuj</button>
                    </div>
                </div>
            )}
        </div>
    );
}