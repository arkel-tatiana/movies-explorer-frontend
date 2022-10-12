import './portfolio.css';
import portfolio__logo from '../../images/strelka.svg';
function Portfolio() {
  return (
    <div className="portfolio">
        <p className="portfolio__text">Портфолио</p>
        <ul className="portfolio__list">
            <li className="portfolio__list-content">
                <a href="https://arkel-tatiana.github.io/mesto/" target="_blank" className="portfolio__list-text" rel="noreferrer" >Статичный сайт</a>
                <img className="portfolio__logo" alt="стрелочка" src={portfolio__logo}/>
            </li>
            <li className="portfolio__list-content">
                <a href="https://arkel-tatiana.github.io/russian-travel/" target="_blank" className="portfolio__list-text" rel="noreferrer" >Адаптивный сайт</a>
                <img className="portfolio__logo" alt="стрелочка" src={portfolio__logo}/>
            </li>
            <li className="portfolio__list-content">
                <a href="https://github.com/arkel-tatiana" target="_blank" className="portfolio__list-text" rel="noreferrer" >Одностраничное приложение</a>
                <img className="portfolio__logo" alt="стрелочка" src={portfolio__logo}/>
            </li>
          </ul>
    </div>
    );
  }

export default Portfolio;
