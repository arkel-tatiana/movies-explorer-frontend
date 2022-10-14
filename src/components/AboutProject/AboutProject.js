import './aboutProject.css'
function AboutProject() {
  return (
    <section className="aboutProject">
        <h1 className="aboutProject__title">О проекте</h1>
          <div className="aboutProject__content">
            <p className="aboutProject__text aboutProject__text_title">Дипломный проект включал 5 этапов</p>
            <p className="aboutProject__text aboutProject__text_title">На выполнение диплома ушло 5 недель</p>
            <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
          <div className="aboutProject__nedeli">
            <div className="aboutProject__text aboutProject__text_nedeli">1 неделя</div>
            <div className="aboutProject__text aboutProject__text_nedeli">4 недели</div>
            <div className="aboutProject__text aboutProject__text_nedeli">Back-end</div>
            <div className="aboutProject__text aboutProject__text_nedeli">Front-end</div>
          </div>
    </section>
    );
  }

export default AboutProject;
