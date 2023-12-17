import React, { useState, useEffect, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import { LanguageContext } from '../../contexts/LanguageContext'; // Adjust the path as needed
import LanguageSwitchButton from '../../contexts/LanguageSwitchButton'; // Adjust the path as needed
import "./filter.css";


const translations = {
  ua: {
    // ...other translations...
    news: 'Новини',
      login: 'Вхід',
      register: 'Регістрація',
    filterLink: 'Оголошення',
    newsLink: 'Новини',
    loginLink: 'Вхід',
    registerLink: 'Регістрація',
    filtersHeading: 'Фільтри',
    carBrandLabel: 'Марка',
    carBrands: {
      audi: 'Ауді',
      bmw: 'БМВ',
      mercedes: 'Мерседес-Бенц',
      toyota: 'Тойота',
      honda: 'Хонда',
      volkswagen: 'Фольксваген',
      ford: 'Форд',
      nissan: 'Ніссан',
      hyundai: 'Хюндай',
      kia: 'Кіа',
      mazda: 'Мазда',
      chevrolet: 'Шевроле',
      subaru: 'Субару',
      peugeot: 'Пежо',
      fiat: 'Фіат',
    },
    carReleaseYearLabel: 'Рік випуску авто', // Correct translation in Ukrainian
    carStatusLabel: 'Статус авто',
    carStatusOptions: {
      new: 'Новий',
      used: 'Б/у',
    },
    mileageFromLabel: 'Пробіг від',
    mileageFromPlaceholder: 'Від, км',
    mileageToLabel: 'Пробіг до',
    mileageToPlaceholder: 'До, км',
    fuelTypeLabel: 'Тип палива',
    fuelTypeOptions: {
      petrol: 'Бензин',
      diesel: 'Дизель',
    },
    seatsLabel: 'Кількість місць',
    engineVolumeFromLabel: "Об'єм двигуна від",
    engineVolumeFromPlaceholder: 'Від, л',
    engineVolumeToLabel: 'Объем двигателя до',
    engineVolumeToPlaceholder: 'До, л',
    carRegionLabel: 'Регіон авто',
    carRegionOptions: {
      vinnytska: 'Вінницька',
      volynska: 'Волинська',
      dnipropetrovska: 'Дніпропетровська',
      donetska: 'Донецька',
      zhytomyrska: 'Житомирська',
      zakarpattya: 'Закарпатська',
      zaporizka: 'Запорізька',
      ivanoFrankivska: 'Івано-Франківська',
      kyivska: 'Київська',
      kirovohradska: 'Кіровоградська',
      luhanska: 'Луганська',
      lvivska: 'Львівська',
      mykolayivska: 'Миколаївська',
      odeska: 'Одеська',
      poltavska: 'Полтавська',
      rivnenska: 'Рівненська',
      sumska: 'Сумська',
      ternopilska: 'Тернопільська',
      kharkivska: 'Харківська',
      khersonska: 'Херсонська',
      khmelnytska: 'Хмельницька',
      cherkaska: 'Черкаська',
      chernivetska: 'Чернівецька',
      chernihivska: 'Чернігівська',
      krym: 'Крим',
    },
    search: 'Пошук...',
      find: 'Знайти',
  },
  en: {
    // ...other translations...
    news: 'News',
      login: 'Login',
      register: 'Register',
    filterLink: 'Filter',
    newsLink: 'News',
    loginLink: 'Login',
    registerLink: 'Register',
    filtersHeading: 'Filters',
    carBrandLabel: 'Brand',
    carBrands: {
      audi: 'Audi',
      bmw: 'BMW',
      mercedes: 'Mercedes-Benz',
      toyota: 'Toyota',
      honda: 'Honda',
      volkswagen: 'Volkswagen',
      ford: 'Ford',
      nissan: 'Nissan',
      hyundai: 'Hyundai',
      kia: 'Kia',
      mazda: 'Mazda',
      chevrolet: 'Chevrolet',
      subaru: 'Subaru',
      peugeot: 'Peugeot',
      fiat: 'Fiat',
    },
    carReleaseYearLabel: 'Year of car release',
    carStatusLabel: 'Car status',
    carStatusOptions: {
      new: 'New',
      used: 'Used',
    },
    mileageFromLabel: 'Mileage from',
    mileageFromPlaceholder: 'From, km',
    mileageToLabel: 'Mileage to',
    mileageToPlaceholder: 'To, km',
    fuelTypeLabel: 'Fuel type',
    fuelTypeOptions: {
      petrol: 'Petrol',
      diesel: 'Diesel',
    },
    seatsLabel: 'Number of seats',
    engineVolumeFromLabel: 'Engine volume from',
    engineVolumeFromPlaceholder: 'From, l',
    engineVolumeToLabel: 'Engine volume to',
    engineVolumeToPlaceholder: 'To, l',
    carRegionLabel: 'Region of car',
    carRegionOptions: {
      vinnytska: 'Vinnytska',
      volynska: 'Volynska',
      dnipropetrovska: 'Dnipropetrovska',
      donetska: 'Donetska',
      zhytomyrska: 'Zhytomyrska',
      zakarpattya: 'Zakarpattya',
      zaporizka: 'Zaporizka',
      ivanoFrankivska: 'Ivano-Frankivska',
      kyivska: 'Kyivska',
      kirovohradska: 'Kirovohradska',
      luhanska: 'Luhanska',
      lvivska: 'Lvivska',
      mykolayivska: 'Mykolayivska',
      odeska: 'Odeska',
      poltavska: 'Poltavska',
      rivnenska: 'Rivnenska',
      sumska: 'Sumska',
      ternopilska: 'Ternopilska',
      kharkivska: 'Kharkivska',
      khersonska: 'Khersonska',
      khmelnytska: 'Khmelnytska',
      cherkaska: 'Cherkaska',
      chernivetska: 'Chernivetska',
      chernihivska: 'Chernihivska',
      krym: 'Krym',
    },
    search: 'Search...',
      find: 'Find',
  },
  
  
};

interface filter {
  imageURL: string;
  id: string;
  name: string;
  text_1: string;
  text_2: string;
  text_3: string;
}

function Filter() {
  const languageContext = useContext(LanguageContext);
  const { id } = useParams<{ id: string }>();
  const [filter, setfilter] = useState<filter | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const filterDoc = await getDoc(doc(db, "filter", id as string));
      const data = { id: filterDoc.id, ...filterDoc.data() } as filter;
      setfilter(data);
    };


    fetchData();
  }, [id]);

  if (!languageContext) {
    return null; // or handle the case where the context is undefined
  }

  const { language } = languageContext;

  return (
    <form className="form-home">
      <header className="header">
        <div className="logo">AutoScout</div>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/news">{translations[language as keyof typeof translations].news}</Link>
            </li>
            <li>
              <Link to="/login">{translations[language as keyof typeof translations].login}</Link>
            </li>
            <li>
              <Link to="/register">{translations[language as keyof typeof translations].register}</Link>
            </li>
          </ul>
        </nav>
        <LanguageSwitchButton /> {/* Add LanguageSwitchButton */}
      </header>
      <div className="main-content">
        <div className="filters">
        <h3>{translations[language as keyof typeof translations].filtersHeading}</h3>
          <div>
          <label htmlFor="brand">{translations[language as keyof typeof translations].carBrandLabel}:</label>
          <select id="brand">
              <option value="audi">{translations[language as keyof typeof translations].carBrands.audi}</option>
              <option value="bmw">{translations[language as keyof typeof translations].carBrands.bmw}</option>
              <option value="mercedes">{translations[language as keyof typeof translations].carBrands.mercedes}</option>
              <option value="toyota">{translations[language as keyof typeof translations].carBrands.toyota}</option>
              <option value="honda">{translations[language as keyof typeof translations].carBrands.honda}</option>
              <option value="volkswagen">{translations[language as keyof typeof translations].carBrands.volkswagen}</option>
              <option value="ford">{translations[language as keyof typeof translations].carBrands.ford}</option>
              <option value="nissan">{translations[language as keyof typeof translations].carBrands.nissan}</option>
              <option value="hyundai">{translations[language as keyof typeof translations].carBrands.hyundai}</option>
              <option value="kia">{translations[language as keyof typeof translations].carBrands.kia}</option>
              <option value="mazda">{translations[language as keyof typeof translations].carBrands.mazda}</option>
              <option value="chevrolet">{translations[language as keyof typeof translations].carBrands.chevrolet}</option>
              <option value="subaru">{translations[language as keyof typeof translations].carBrands.subaru}</option>
              <option value="peugeot">{translations[language as keyof typeof translations].carBrands.peugeot}</option>
            <option value="fiat">{translations[language as keyof typeof translations].carBrands.fiat}</option>
            </select>
          </div>     
          <div>
          <label htmlFor="year">{translations[language as keyof typeof translations].carReleaseYearLabel}:</label>
            <input type="text" id="year" />
          </div>
          <div>
          <label htmlFor="status">{translations[language as keyof typeof translations].carStatusLabel}:</label>
            <select id="status">
              <option value="new">{translations[language as keyof typeof translations].carStatusOptions.new}</option>
              <option value="used">{translations[language as keyof typeof translations].carStatusOptions.used}</option>
            </select>
          </div>
          <div>
            <label htmlFor="mileageFrom">{translations[language as keyof typeof translations].mileageFromLabel}:</label>
            <input type="text" id="mileageFrom" placeholder={translations[language as keyof typeof translations].mileageFromPlaceholder} />
          </div>
          <div>
          <label htmlFor="mileageTo">{translations[language as keyof typeof translations].mileageToLabel}:</label>
          <input type="text" id="mileageTo" placeholder={translations[language as keyof typeof translations].mileageToPlaceholder} />
          </div>
          <div>
            <label htmlFor="fuelType">{translations[language as keyof typeof translations].fuelTypeLabel}:</label>
            <select id="fuelType">
            <option value="petrol">{translations[language as keyof typeof translations].fuelTypeOptions.petrol}</option>
            <option value="diesel">{translations[language as keyof typeof translations].fuelTypeOptions.diesel}</option>
            </select>
          </div>
          <div>
          <label htmlFor="seats">{translations[language as keyof typeof translations].seatsLabel}:</label>
            <select id="seats">
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
          </div>
          <div>
            <label htmlFor="engineVolumeFrom">{translations[language as keyof typeof translations].engineVolumeFromLabel}:</label>
            <input type="text" id="engineVolumeFrom" placeholder={translations[language as keyof typeof translations].engineVolumeFromPlaceholder} />
          </div>
          <div>
            <label htmlFor="engineVolumeTo">{translations[language as keyof typeof translations].engineVolumeToLabel}:</label>
             <input type="text" id="engineVolumeTo" placeholder={translations[language as keyof typeof translations].engineVolumeToPlaceholder} />
          </div>
          <div>
          <label htmlFor="region">{translations[language as keyof typeof translations].carRegionLabel}:</label>
            <select id="region">
            <option value="vinnytska">{translations[language as keyof typeof translations].carRegionOptions.vinnytska}</option>
            <option value="volynska">{translations[language as keyof typeof translations].carRegionOptions.volynska}</option>
            <option value="dnipropetrovska">{translations[language as keyof typeof translations].carRegionOptions.dnipropetrovska}</option>
            <option value="donetska">{translations[language as keyof typeof translations].carRegionOptions.donetska}</option>
            <option value="zhytomyrska">{translations[language as keyof typeof translations].carRegionOptions.zhytomyrska}</option>
            <option value="zakarpattya">{translations[language as keyof typeof translations].carRegionOptions.zakarpattya}</option>
            <option value="zaporizka">{translations[language as keyof typeof translations].carRegionOptions.zaporizka}</option>
            <option value="ivanoFrankivska">{translations[language as keyof typeof translations].carRegionOptions.ivanoFrankivska}</option>
            <option value="kyivska">{translations[language as keyof typeof translations].carRegionOptions.kyivska}</option>
            <option value="kirovohradska">{translations[language as keyof typeof translations].carRegionOptions.kirovohradska}</option>
            <option value="luhanska">{translations[language as keyof typeof translations].carRegionOptions.luhanska}</option>
            <option value="lvivska">{translations[language as keyof typeof translations].carRegionOptions.lvivska}</option>
            <option value="mykolayivska">{translations[language as keyof typeof translations].carRegionOptions.mykolayivska}</option>
            <option value="odeska">{translations[language as keyof typeof translations].carRegionOptions.odeska}</option>
            <option value="poltavska">{translations[language as keyof typeof translations].carRegionOptions.poltavska}</option>
            <option value="rivnenska">{translations[language as keyof typeof translations].carRegionOptions.rivnenska}</option>
            <option value="sumska">{translations[language as keyof typeof translations].carRegionOptions.sumska}</option>
            <option value="ternopilska">{translations[language as keyof typeof translations].carRegionOptions.ternopilska}</option>
            <option value="kharkivska">{translations[language as keyof typeof translations].carRegionOptions.kharkivska}</option>
            <option value="khersonska">{translations[language as keyof typeof translations].carRegionOptions.khersonska}</option>
            <option value="khmelnytska">{translations[language as keyof typeof translations].carRegionOptions.khmelnytska}</option>
            <option value="cherkaska">{translations[language as keyof typeof translations].carRegionOptions.cherkaska}</option>
            <option value="chernivetska">{translations[language as keyof typeof translations].carRegionOptions.chernivetska}</option>
            <option value="chernihivska">{translations[language as keyof typeof translations].carRegionOptions.chernihivska}</option>
            <option value="krym">{translations[language as keyof typeof translations].carRegionOptions.krym}</option>
            </select>
          </div>
        </div>
        <div className="container-search-filter">
          <div className="search-bar-filter">
            <input type="text" placeholder={translations[language as keyof typeof translations].search} />
            <button>{translations[language as keyof typeof translations].find}</button>
          </div>
          <div className="container-filter">
            <div className="block-filter">
              <img src={filter?.imageURL} alt="image" />
              <div className="text-container-filter">
                <h2>{filter?.name}</h2>
                <p>{filter?.text_1}</p>
                <p>{filter?.text_2}</p>
                <p>{filter?.text_3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}


export default Filter;
