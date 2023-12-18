import { useState, useEffect, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import "./filter.css";
//language
import { LanguageContext } from "../../contexts/LanguageContext";
import LanguageSwitchButton from "../../contexts/LanguageSwitchButton";
import { translations } from "../../contexts/translations";

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
    return null;
  }

  const { language } = languageContext;
  const currentTranslation =
    translations[language as keyof typeof translations];

  return (
    <form className="form-home-filter">
      <header className="header-filter">
        <div className="logo">AutoScout</div>
        <nav className="navbar">
          <ul className="auth-lang-selector">
            <li>
              <Link to="/home">{currentTranslation.home}</Link>
            </li>
            <li>
              <Link to="/news">{currentTranslation.news}</Link>
            </li>
          </ul>
        </nav>
        <div className="auth-lang-selector nav-bar-auth">
          <LanguageSwitchButton />
          {auth.currentUser ? (
            <li>
              <Link to="/profile">{currentTranslation.profile}</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">{currentTranslation.login}</Link>
              </li>
              <li>
                <Link to="/register">{currentTranslation.register}</Link>
              </li>
            </>
          )}
        </div>
      </header>
      <div className="main-content">
        <div className="filters">
          <h3>{currentTranslation.filtersHeading}</h3>
          <div>
            <label htmlFor="brand">{currentTranslation.carBrandLabel}:</label>
            <select id="brand">
              <option value="audi">{currentTranslation.carBrands.audi}</option>
              <option value="bmw">{currentTranslation.carBrands.bmw}</option>
              <option value="mercedes">
                {currentTranslation.carBrands.mercedes}
              </option>
              <option value="toyota">
                {currentTranslation.carBrands.toyota}
              </option>
              <option value="honda">
                {currentTranslation.carBrands.honda}
              </option>
              <option value="volkswagen">
                {currentTranslation.carBrands.volkswagen}
              </option>
              <option value="ford">{currentTranslation.carBrands.ford}</option>
              <option value="nissan">
                {currentTranslation.carBrands.nissan}
              </option>
              <option value="hyundai">
                {currentTranslation.carBrands.hyundai}
              </option>
              <option value="kia">{currentTranslation.carBrands.kia}</option>
              <option value="mazda">
                {currentTranslation.carBrands.mazda}
              </option>
              <option value="chevrolet">
                {currentTranslation.carBrands.chevrolet}
              </option>
              <option value="subaru">
                {currentTranslation.carBrands.subaru}
              </option>
              <option value="peugeot">
                {currentTranslation.carBrands.peugeot}
              </option>
              <option value="fiat">{currentTranslation.carBrands.fiat}</option>
            </select>
          </div>
          <div>
            <label htmlFor="year">
              {currentTranslation.carReleaseYearLabel}:
            </label>
            <input type="text" id="year" />
          </div>
          <div>
            <label htmlFor="status">{currentTranslation.carStatusLabel}:</label>
            <select id="status">
              <option value="new">
                {currentTranslation.carStatusOptions.new}
              </option>
              <option value="used">
                {currentTranslation.carStatusOptions.used}
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="mileageFrom">
              {currentTranslation.mileageFromLabel}:
            </label>
            <input
              type="text"
              id="mileageFrom"
              placeholder={currentTranslation.mileageFromPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="mileageTo">
              {currentTranslation.mileageToLabel}:
            </label>
            <input
              type="text"
              id="mileageTo"
              placeholder={currentTranslation.mileageToPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="fuelType">
              {currentTranslation.fuelTypeLabel}:
            </label>
            <select id="fuelType">
              <option value="petrol">
                {currentTranslation.fuelTypeOptions.petrol}
              </option>
              <option value="diesel">
                {currentTranslation.fuelTypeOptions.diesel}
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="seats">{currentTranslation.seatsLabel}:</label>
            <select id="seats">
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
          </div>
          <div>
            <label htmlFor="engineVolumeFrom">
              {currentTranslation.engineVolumeFromLabel}:
            </label>
            <input
              type="text"
              id="engineVolumeFrom"
              placeholder={currentTranslation.engineVolumeFromPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="engineVolumeTo">
              {currentTranslation.engineVolumeToLabel}:
            </label>
            <input
              type="text"
              id="engineVolumeTo"
              placeholder={currentTranslation.engineVolumeToPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="region">{currentTranslation.carRegionLabel}:</label>
            <select id="region">
              <option value="vinnytska">
                {currentTranslation.carRegionOptions.vinnytska}
              </option>
              <option value="volynska">
                {currentTranslation.carRegionOptions.volynska}
              </option>
              <option value="dnipropetrovska">
                {currentTranslation.carRegionOptions.dnipropetrovska}
              </option>
              <option value="donetska">
                {currentTranslation.carRegionOptions.donetska}
              </option>
              <option value="zhytomyrska">
                {currentTranslation.carRegionOptions.zhytomyrska}
              </option>
              <option value="zakarpattya">
                {currentTranslation.carRegionOptions.zakarpattya}
              </option>
              <option value="zaporizka">
                {currentTranslation.carRegionOptions.zaporizka}
              </option>
              <option value="ivanoFrankivska">
                {currentTranslation.carRegionOptions.ivanoFrankivska}
              </option>
              <option value="kyivska">
                {currentTranslation.carRegionOptions.kyivska}
              </option>
              <option value="kirovohradska">
                {currentTranslation.carRegionOptions.kirovohradska}
              </option>
              <option value="luhanska">
                {currentTranslation.carRegionOptions.luhanska}
              </option>
              <option value="lvivska">
                {currentTranslation.carRegionOptions.lvivska}
              </option>
              <option value="mykolayivska">
                {currentTranslation.carRegionOptions.mykolayivska}
              </option>
              <option value="odeska">
                {currentTranslation.carRegionOptions.odeska}
              </option>
              <option value="poltavska">
                {currentTranslation.carRegionOptions.poltavska}
              </option>
              <option value="rivnenska">
                {currentTranslation.carRegionOptions.rivnenska}
              </option>
              <option value="sumska">
                {currentTranslation.carRegionOptions.sumska}
              </option>
              <option value="ternopilska">
                {currentTranslation.carRegionOptions.ternopilska}
              </option>
              <option value="kharkivska">
                {currentTranslation.carRegionOptions.kharkivska}
              </option>
              <option value="khersonska">
                {currentTranslation.carRegionOptions.khersonska}
              </option>
              <option value="khmelnytska">
                {currentTranslation.carRegionOptions.khmelnytska}
              </option>
              <option value="cherkaska">
                {currentTranslation.carRegionOptions.cherkaska}
              </option>
              <option value="chernivetska">
                {currentTranslation.carRegionOptions.chernivetska}
              </option>
              <option value="chernihivska">
                {currentTranslation.carRegionOptions.chernihivska}
              </option>
              <option value="krym">
                {currentTranslation.carRegionOptions.krym}
              </option>
            </select>
          </div>
        </div>
        <div className="container-search-filter">
          <div className="search-bar-filter">
            <input type="text" placeholder={currentTranslation.search} />
            <button>{currentTranslation.find}</button>
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
