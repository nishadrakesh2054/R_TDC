import React, { lazy, Suspense, useState, useEffect } from "react";
import Loading from "../components/loading/Loading";
import WhyTdc from "../components/whytdc/WhyTdc";

const HeroSec = lazy(() => import("../components/heroSec/HeroSec"));
const About = lazy(() => import("../components/aboutSec/About"));
const WelcomeMessage = lazy(() =>
  import("../components/welcome/WelcomeMessage")
);
const ProgramsOffered = lazy(() =>
  import("../components/programs/ProgramsOffered")
);
const Partners = lazy(() => import("../components/partners/Partners"));
const Contact = lazy(() => import("../components/contact/Contact"));
const NoticeModel = lazy(() =>
  import("../components/noticeModels/NoticeModel")
);

const Home = () => {
  const [showNoticeModel, setShowNoticeModel] = useState(false);
  useEffect(() => {
    setShowNoticeModel(true);
  }, []);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <HeroSec />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <WelcomeMessage />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <ProgramsOffered />
      </Suspense>
      <WhyTdc />
      {/* <Suspense fallback={<Loading />}></Suspense> */}
      <Suspense fallback={<Loading />}>
        <Partners />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Contact />
      </Suspense>
      {/* <Suspense fallback={<Loading />}>
        <NoticeModel
          show={showNoticeModel}
          onHide={() => setShowNoticeModel(false)}
        />
      </Suspense> */}
    </div>
  );
};

export default Home;
