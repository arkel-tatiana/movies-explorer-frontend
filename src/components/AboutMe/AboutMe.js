import './aboutMe.css';
import aboutMeFoto from '../../images/fotoMe.jpg';
import Portfolio from '../Portfolio/Portfolio';
function AboutMe() {
  return (
    <section className="aboutMe" id="project">
        <h3 className="aboutMe__title">Студент</h3>
            <div className="aboutMe__container">
                <div className="aboutMe__content">
                    <p className="aboutMe__text aboutMe__text_title">Татьяна</p>
                    <p className="aboutMe__text">Фронтенд-разработчик, 50 лет</p>
                    <p className="aboutMe__text aboutMe__text_me">Родилась и живу в г.Кемерово. Всегда хотела заниматься программированием.
                    Но....Закончила Кузбасский Технический Университет инженер-экономический факультет. с 1994 года работаю
                    в Территориальном подразделении федеральной службы государственной статистики по Кемеровской области. 
                    Веб-разработкой начала заниматься сравнительно недавно. Очень хочу поучаствовать в реальных проектах.
                    Поработать с профессионалами и надеюсь многому еще научиться. Я люблю собак, слушать музыку
                    и любой движ - бег, плавание, велосипед, ролики...</p>
                    <a href="https://github.com/arkel-tatiana" target="_blank" className="aboutMe__link" rel="noreferrer" >Github</a>
                </div>
                <img className="aboutMe__foto" alt="Фото автора" src={aboutMeFoto}/>
            </div>
        <Portfolio />  
    </section>
    );
  }

export default AboutMe;

