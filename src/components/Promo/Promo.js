import './promo.css'
import promoLogo from '../../images/logoColorLanding.svg';
function Promo() {
    return (
    <section className="promo">
        <div className="promo__container">
            <div className="promo__content">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a className="promo__link" href="#project">Узнать больше</a>
            </div>
            <img className="promo__logo" alt="Логотип проекта" src={promoLogo}/>
        </div>
    </section>
    );
}
export default Promo;
