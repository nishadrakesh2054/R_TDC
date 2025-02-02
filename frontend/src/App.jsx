import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom"; // Remove HashRouter from here
import { ToastContainer } from "react-toastify";
import NavigationSec from "./components/navigations/NavigationSec";
import Loading from "./components/loading/Loading";
import Footer from "./components/footer/Footer";
import PaymentResponse from "./pages/payment/PaymentResponse";
import PaymentForm from "./pages/payment/PaymentForm";
import SquadProgramsPage from "./pages/academy/squad/SquadProgramsPage";
import Academy from "./pages/academy/Academy";
import Career from "./pages/career/Career";
import CareerDec from "./pages/career/CareerDec";
import FootballLeague from "./components/Rfootball/FootballLeague";

const SwimmingAcademy = lazy(() =>
  import("./pages/academy/individual/SwimmingAcademy")
);
const TennisAcademy = lazy(() =>
  import("./pages/academy/individual/TennisAcademy")
);
const Contact = lazy(() => import("./pages/contact/ContactUs"));
const TdcRegistrationPage = lazy(() =>
  import("./components/events/TdcRegistration")
);
const Gallery = lazy(() => import("./pages/gallery/Gallery"));
const SpecialCamp = lazy(() =>
  import("./pages/academy/specialCamp/SpecialCamp")
);
const PageNotFound = lazy(() =>
  import("./components/pageNotFound/PageNotFound")
);
const Events = lazy(() => import("./pages/events/Events"));
const Esports = lazy(() => import("./pages/esports/Esports"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/about/About"));
const IndividualProgram = lazy(() =>
  import("./pages/academy/individual/IndividualProgram")
);
const SquadProgram = lazy(() => import("./pages/academy/squad/SquadProgram"));

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <NavigationSec />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/academy" element={<Academy />} />
          <Route
            path="/academy/individual-programs"
            element={<IndividualProgram />}
          />
          <Route path="/tennis-academy" element={<TennisAcademy />} />
          <Route path="/swimming-academy" element={<SwimmingAcademy />} />
          <Route path="/academy/squad-programs" element={<SquadProgram />} />
          <Route
            path="/academy/squad-programs/:title"
            element={<SquadProgramsPage />}
          />

          <Route path="/special-camps" element={<SpecialCamp />} />
          <Route path="/e-sports" element={<Esports />} />
          <Route path="/events/thunderboltscup" element={<Events />} />
          <Route path="/events/footballleague/*" element={<FootballLeague />} />

          <Route
            path="/register-thunderbolts-cup"
            element={<TdcRegistrationPage/>}
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment-response" element={<PaymentResponse />} />
          <Route path="/payment-form" element={<PaymentForm />} />

          <Route path="/career" element={<Career />} />
          <Route path="/career/:id/:title" element={<CareerDec />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
