import './portfolio.css';
import portfolio__logo from '../../images/strelka.svg';
function Portfolio() {
  return (
    <div className="portfolio">
        <p className="portfolio__text">Портфолио</p>
        <ul className="portfolio__list">
            <li className="portfolio__list-content">
                <a href="https://arkel-tatiana.github.io/mesto/" target="_blank" className="portfolio__list-link" rel="noreferrer" >
                    <p className="portfolio__list-text">Статичный сайт</p>
                    <img className="portfolio__logo" alt="стрелочка" src={portfolio__logo}/>
                </a>
            </li>
            <li className="portfolio__list-content">
                <a href="https://arkel-tatiana.github.io/russian-travel/" target="_blank" className="portfolio__list-link" rel="noreferrer" >
                    <p className="portfolio__list-text">Адаптивный сайт</p>
                    <img className="portfolio__logo" alt="стрелочка" src={portfolio__logo}/>
                </a>
            </li>
            <li className="portfolio__list-content">
                <a href="https://github.com/arkel-tatiana" target="_blank" className="portfolio__list-link" rel="noreferrer" >
                    <p className="portfolio__list-text">Одностраничное приложение</p>
                    <img className="portfolio__logo" alt="стрелочка" src={portfolio__logo}/>
                </a>
            </li>
          </ul>
    </div>
    );
  }

export default Portfolio;
