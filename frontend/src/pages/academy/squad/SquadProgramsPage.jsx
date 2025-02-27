import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import IndiPrograms from "../../../components/academy/individual/IndiPrograms";
// import grassrootcri from "../../../assets/academy/aquad/grassroot-cri.jpg";
import "./tennish.scss";

const items = [
  {
    id: 1,
    title: "Grassroots",
    titles: "cricket-academy",
    age: "6 – 11 years old",
    ages: "6 – 10 years old",
    academy: "TENNIS",
    dec: "Our Grassroots program is designed to introduce young athletes to the fundamentals of sports in a fun and engaging environment. Through age-appropriate training and activities, we nurture their passion for sports while building essential skills. Athletes in this category will have the opportunity to participate in beginner and non-beginner groups, ensuring tailored coaching that caters to their individual needs and abilities.",
  },
  {
    id: 2,
    age: "12 - 15 years old",
    ages: "11 – 15 years old",
    title: "Intermediate",
    titles: "cricket-academy",
    academy: "TENNIS",
    dec: "The Intermediate program focuses on refining skills and enhancing performance for young athletes ready to take their game to the next level. With a more structured approach, this level emphasizes skill development, teamwork, and competition. Athletes can choose between beginner and non-beginner groups to ensure they receive the right support and challenge, preparing them for future sporting endeavors.",
  },
  {
    id: 3,
    age: "16 – 19 years old",
    ages: "16 – 19 years old",
    titles: "cricket-academy",
    title: "Senior",
    academy: "TENNIS",
    dec: "Our Senior program is tailored for aspiring athletes looking to excel in their chosen sport. At this level, we focus on advanced training techniques, performance optimization, and competitive readiness. Athletes will benefit from specialized coaching in either beginner or non-beginner groups, allowing for personalized development that meets their individual goals and aspirations.",
  },
];

const SquadProgramsPage = () => {
  const { title } = useParams();

  return (
    <>
      <div className="tennish">
        <Container>
          <div className="tennis-aca-heading-conta">
            <h1>{title.toUpperCase().replace("-", " ")} (COMING SOON)</h1>
            <p>
              Our {title.toLowerCase().replace("-", " ")} Program offers
              comprehensive training for players of all levels, from beginners
              to advanced athletes. With expert coaching and a focus on
              developing technique, agility, and strategic play, we help
              participants enhance their skills and enjoy the game. Whether you
              are picking up a racket for the first time or aiming to compete at
              a higher level, our program provides the perfect environment for
              growth and success. Join us and elevate your{" "}
              {title.toLowerCase().replace("-", " ")} game!
            </p>
          </div>
          <IndiPrograms items={items} titles={title} />
        </Container>
      </div>
    </>
  );
};

export default SquadProgramsPage;
