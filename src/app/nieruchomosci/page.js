"use client";
import "./nieruchomosci.css";
import ApartmentIcon from '@mui/icons-material/Apartment';
import HouseIcon from '@mui/icons-material/House';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeckIcon from '@mui/icons-material/Deck';
import { useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TuneIcon from '@mui/icons-material/Tune';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useRef, useEffect } from "react";

export default function Nieruchomosci() {
  const kontaktRef = useRef(null);
  const metrazRef = useRef(null);
  const photosRef = useRef(null);
  const tytulRef = useRef(null);
  const cenaRef = useRef(null);
  const [isShownKontakt, setShownKontakt] = useState(false);
  const [isShownMetraz, setShownMetraz] = useState(false);
  const [isShownPhotos, setShownPhotos] = useState(false);
  const [isShownTytul, setShownTytul] = useState(false);
  const [isShownCena, setShownCena] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const { data: session } = useSession();
  
  useEffect(() => {
    if (isShownKontakt && kontaktRef.current) {
      kontaktRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (isShownMetraz && metrazRef.current) {
      metrazRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (isShownPhotos && photosRef.current) {
      photosRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (isShownTytul && tytulRef.current) {
      tytulRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (isShownCena && cenaRef.current) {
      cenaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isShownKontakt, isShownMetraz, isShownPhotos, isShownTytul, isShownCena]);

  function showKontaktModal() { setShownKontakt(true); }
  function showMetrazModal() { setShownMetraz(true); }
  function showPhotosModal() { setShownPhotos(true); }
  function showTytulModal() { setShownTytul(true); }
  function showCenaModal() { setShownCena(true); }

  const [formData, setFormData] = useState({
    typ: '',
    imie: '',
    email: '',
    numer: '',
    dodanePrzez: '',
    metraz: '',
    liczbaPokoi: '',
    tytul: '',
    opis: '',
    cena: '',
    imageKey: ''
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);

    let uploadedFileName = "";

    try {
      if (file) {
        const uploadForm = new FormData();
        uploadForm.append('file', file);

        const uploadRes = await fetch('/api/s3-upload', {
          method: 'POST',
          body: uploadForm,
        });

        const uploadResult = await uploadRes.json();

        if (uploadRes.ok) {
          uploadedFileName = uploadResult.fileName;
        } else {
          alert("Błąd podczas przesyłania zdjęcia.");
          setUploading(false);
          return;
        }
      }

      const res = await fetch('/api/oferta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, imageKey: uploadedFileName }),
      });

      if (res.ok) {
        alert('Oferta dodana!');
        setFormData({ nazwa: '', cena: '', opis: '', lokalizacja: '', imageKey: '', kategoria: '' });
        setFile(null);
        router.push('/oferty');
      } else {
        alert('Wystąpił błąd przy dodawaniu oferty.');
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("Coś poszło nie tak.");
    } finally {
      setUploading(false);
    }
  }

  const propertyTypes = [
    { id: 'Mieszkanie', label: 'Mieszkanie', icon: <ApartmentIcon />, desc: 'Apartament lub mieszkanie' },
    { id: 'Dom', label: 'Dom', icon: <HouseIcon />, desc: 'Dom jednorodzinny' },
    { id: 'Działka', label: 'Działka', icon: <DeckIcon />, desc: 'Działka budowlana' },
  ];

  const currentStep = isShownCena ? 5 : isShownTytul ? 4 : isShownPhotos ? 3 : isShownMetraz ? 2 : isShownKontakt ? 1 : 0;

  // Tips that change based on current step
  const tips = [
    { title: "Wybierz typ", text: "Określ rodzaj nieruchomości, którą chcesz sprzedać." },
    { title: "Dane kontaktowe", text: "Podaj prawdziwe dane - kupujący będą się z Tobą kontaktować." },
    { title: "Szczegóły", text: "Dokładne informacje pomagają znaleźć odpowiednich kupujących." },
    { title: "Zdjęcia", text: "Dobre zdjęcia zwiększają zainteresowanie nawet o 80%!" },
    { title: "Opis", text: "Szczegółowy opis wyróżni Twoją ofertę spośród innych." },
    { title: "Prawie gotowe!", text: "Ustal konkurencyjną cenę, by szybko sprzedać." },
  ];

  return (
    <div className="nieruchomosciContainer">
      {/* Left Side - Tips */}
      <div className="sidePanel leftPanel">
        <div className="tipCard">
          <div className="tipIconWrapper">
            <TipsAndUpdatesIcon />
          </div>
          <h4>{tips[currentStep].title}</h4>
          <p>{tips[currentStep].text}</p>
        </div>
      </div>

      {/* Right Side - Benefits */}
      <div className="sidePanel rightPanel">
        <div className="benefitCard">
          <VerifiedUserIcon />
          <span>Bezpieczne transakcje</span>
        </div>
        <div className="benefitCard">
          <SpeedIcon />
          <span>Szybka publikacja</span>
        </div>
        <div className="benefitCard">
          <SupportAgentIcon />
          <span>Wsparcie 24/7</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progressBar">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className={`progressStep ${currentStep >= step ? 'active' : ''}`}>
            <div className="progressDot">
              {currentStep > step ? <CheckCircleIcon /> : step}
            </div>
            {step < 5 && <div className="progressLine"></div>}
          </div>
        ))}
      </div>

      <form className="nieruchomosciForm" onSubmit={handleSubmit}>
        {/* Step 0: Property Type Selection */}
        <div className="formSection">
          <div className="sectionHeader">
            <span className="stepBadge">Krok 1</span>
            <h1 className="sectionTitle">Co chcesz sprzedać?</h1>
            <p className="sectionSubtitle">Wybierz typ nieruchomości</p>
          </div>
          
          <div className="propertyTypeGrid">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className={`propertyTypeCard ${selectedType === type.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedType(type.id);
                  showKontaktModal();
                  setFormData({ ...formData, typ: type.id });
                }}
              >
                <div className="propertyIconWrapper">{type.icon}</div>
                <div className="propertyTypeInfo">
                  <span className="propertyTypeName">{type.label}</span>
                  <span className="propertyTypeDesc">{type.desc}</span>
                </div>
                {selectedType === type.id && (
                  <div className="selectedCheck"><CheckCircleIcon /></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step 1: Contact Info */}
        <div ref={kontaktRef} className={`formSection ${isShownKontakt ? "show" : "hidden"}`}>
          <div className="sectionHeader">
            <span className="stepBadge">Krok 2</span>
            <h1 className="sectionTitle">Dane kontaktowe</h1>
            <p className="sectionSubtitle">Jak kupujący mogą się z Tobą skontaktować?</p>
          </div>
          
          <div className="inputGrid">
            <div className="inputGroup">
              <label className="inputLabel">Imię</label>
              <input 
                type="text" 
                name="imie" 
                value={formData.imie} 
                onChange={handleChange} 
                placeholder="Twoje imię"
                className="formInput"
              />
            </div>
            <div className="inputGroup">
              <label className="inputLabel">Numer telefonu</label>
              <input 
                type="tel" 
                name="numer" 
                value={formData.numer} 
                onChange={handleChange} 
                placeholder="+48 000 000 000"
                className="formInput"
              />
            </div>
            <div className="inputGroup">
              <label className="inputLabel">E-mail</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="twoj@email.pl"
                className="formInput"
              />
            </div>
            <div className="inputGroup">
              <label className="inputLabel">Dodane przez</label>
              <select 
                name="dodanePrzez" 
                value={formData.dodanePrzez} 
                onChange={handleChange}
                className="formSelect"
                required
              >
                <option value="">Wybierz...</option>
                <option value="Osoba prywatna">Osoba prywatna</option>
                <option value="Firma">Firma</option>
                <option value="Deweloper">Deweloper</option>
              </select>
            </div>
          </div>
          
          <button type="button" className="nextButton" onClick={() => setShownMetraz(true)}>
            Dalej <ArrowForwardIcon />
          </button>
        </div>

        {/* Step 2: Property Details */}
        <div ref={metrazRef} className={`formSection ${isShownMetraz ? "show" : "hidden"}`}>
          <div className="sectionHeader">
            <span className="stepBadge">Krok 3</span>
            <h1 className="sectionTitle">Szczegóły nieruchomości</h1>
            <p className="sectionSubtitle">Podaj podstawowe informacje</p>
          </div>
          
          <div className="inputGrid twoColumns">
            <div className="inputGroup">
              <label className="inputLabel">Metraż</label>
              <div className="inputWithSuffix">
                <input 
                  type="number" 
                  name="metraz" 
                  value={formData.metraz} 
                  onChange={handleChange} 
                  placeholder="0"
                  className="formInput"
                />
                <span className="inputSuffix">m²</span>
              </div>
            </div>
            <div className="inputGroup">
              <label className="inputLabel">Liczba pokoi</label>
              <input 
                type="number" 
                name="liczbaPokoi" 
                value={formData.liczbaPokoi} 
                onChange={handleChange} 
                placeholder="0"
                className="formInput"
              />
            </div>
          </div>
          
          <button type="button" className="nextButton" onClick={showPhotosModal}>
            Dalej <ArrowForwardIcon />
          </button>
        </div>

        {/* Step 3: Photos */}
        <div ref={photosRef} className={`formSection ${isShownPhotos ? "show" : "hidden"}`}>
          <div className="sectionHeader">
            <span className="stepBadge">Krok 4</span>
            <h1 className="sectionTitle">Zdjęcia</h1>
            <p className="sectionSubtitle">Dodaj zdjęcia swojej nieruchomości</p>
          </div>
          
          <div className="photoUploadArea">
            <input
              className="photoInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="photoUpload"
            />
            <label htmlFor="photoUpload" className="photoUploadLabel">
              <div className="uploadIconWrapper">
                <AddPhotoAlternateIcon />
              </div>
              <span className="uploadTitle">
                {file ? file.name : 'Kliknij aby dodać zdjęcie'}
              </span>
              <span className="uploadHint">PNG, JPG do 10MB</span>
            </label>
          </div>
          
          <button type="button" className="nextButton" onClick={showTytulModal}>
            Dalej <ArrowForwardIcon />
          </button>
        </div>

        {/* Step 4: Title & Description */}
        <div ref={tytulRef} className={`formSection ${isShownTytul ? "show" : "hidden"}`}>
          <div className="sectionHeader">
            <span className="stepBadge">Krok 5</span>
            <h1 className="sectionTitle">Tytuł i opis</h1>
            <p className="sectionSubtitle">Opisz swoją nieruchomość</p>
          </div>
          
          <div className="inputStack">
            <div className="inputGroup">
              <label className="inputLabel">Tytuł ogłoszenia *</label>
              <input 
                type="text" 
                name="tytul" 
                value={formData.tytul} 
                onChange={handleChange} 
                placeholder="np. Przestronne mieszkanie w centrum"
                className="formInput"
              />
            </div>
            <div className="inputGroup">
              <label className="inputLabel">Opis</label>
              <textarea 
                name="opis" 
                value={formData.opis} 
                onChange={handleChange} 
                placeholder="Opisz swoją nieruchomość..."
                className="formTextarea"
                rows={4}
              />
            </div>
          </div>
          
          <button type="button" className="nextButton" onClick={showCenaModal}>
            Dalej <ArrowForwardIcon />
          </button>
        </div>

        {/* Step 5: Price */}
        <div ref={cenaRef} className={`formSection ${isShownCena ? "show" : "hidden"}`}>
          <div className="sectionHeader">
            <span className="stepBadge">Ostatni krok</span>
            <h1 className="sectionTitle">Cena</h1>
            <p className="sectionSubtitle">Ile kosztuje Twoja nieruchomość?</p>
          </div>
          
          <div className="priceInputWrapper">
            <div className="inputGroup">
              <label className="inputLabel">Cena *</label>
              <div className="inputWithSuffix large">
                <input 
                  type="number" 
                  name="cena" 
                  value={formData.cena} 
                  onChange={handleChange} 
                  placeholder="0"
                  className="formInput priceInput"
                />
                <span className="inputSuffix">PLN</span>
              </div>
            </div>
          </div>
          
          <button type="submit" className="submitButton" disabled={uploading}>
            {uploading ? 'Dodawanie...' : 'Opublikuj ogłoszenie'}
          </button>
        </div>
      </form>
    </div>
  );
}