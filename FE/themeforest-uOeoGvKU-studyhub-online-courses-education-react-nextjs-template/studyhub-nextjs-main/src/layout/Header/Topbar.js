import { setThemeCurrency, setThemeLanguage } from '@/redux/theme/actionCreator';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

export default function HeaderTopbar() {
  const dispatch = useDispatch();
  const { mode, language, currency } = useSelector((state) => state.theme.themeData || {});

  const languages = [
    { lang: 'english', label: 'English', img: '/images/english.svg' },
    { lang: 'deutsch', label: 'Deutsch', img: '/images/deutsch.svg' },
    { lang: 'portuguese', label: 'Portuguese', img: '/images/portuguese.svg' },
    { lang: 'russian', label: 'Russian', img: '/images/russian.svg' },
  ];

  const currencies = [
    { currency: 'usd', label: 'USD' },
    { currency: 'euro', label: 'Euro' },
    { currency: 'real', label: 'Real' },
    { currency: 'ruble', label: 'Ruble' },
  ];

  const handleThemeLanguage = (lang) => {
    dispatch(setThemeLanguage(lang));
  };

  const handleThemeCurrency = (currency) => {
    dispatch(setThemeCurrency(currency));
  };

  const selectedLangData = languages.find((l) => l.lang === language);
  const selectedCurrencyData = currencies.find((c) => c.currency === currency);

  return (
    <div className="header-top-one-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-top-one">
              <div className="left-information">
                <a href="mailto:someone@example.com" className="email">
                  <i className="fa-light fa-envelope"></i>info@studyhub.com
                </a>
                <a href="tel:+4733378901" className="email">
                  <i className="fa-light fa-phone"></i>+61 012 012 445
                </a>
              </div>
              <div className="right-information">
                {/* Language Dropdown */}
                <ul className="rts-dropdown-menu switcher-language">
                  <li className="has-child-menu">
                    <a href="#">
                      <Image
                        className="left-image"
                        src={selectedLangData?.img}
                        alt="Language Image"
                        width={26}
                        height={17}
                      />
                      <span className="menu-item">{selectedLangData?.label}</span>
                      <i className="fa-regular fa-chevron-down"></i>
                    </a>
                    <ul className="sub-menu">
                      {languages
                        .filter((l) => l.lang !== language)
                        .map((language) => (
                          <li key={language.lang}>
                            <a href="#" onClick={() => handleThemeLanguage(language.lang)}>
                              <Image
                                className="left-image"
                                src={language.img}
                                alt="Language Image"
                                width={26}
                                height={17}
                              />
                              <span className="menu-item">{language.label}</span>
                            </a>
                          </li>
                        ))}
                    </ul>
                  </li>
                </ul>

                {/* Currency Dropdown */}
                <ul className="rts-dropdown-menu switcher-currency">
                  <li className="has-child-menu">
                    <a href="#">
                      <span className="menu-item">{selectedCurrencyData?.label}</span>
                      <i className="fa-regular fa-chevron-down"></i>
                    </a>
                    <ul className="sub-menu">
                      {currencies
                        .filter((c) => c.currency !== currency)
                        .map((currency) => (
                          <li key={currency.currency}>
                            <a href="#" onClick={() => handleThemeCurrency(currency.currency)}>
                              <span className="menu-item">{currency.label}</span>
                            </a>
                          </li>
                        ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
