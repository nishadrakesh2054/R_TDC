import React from "react";
import Contact from "../../components/contact/Contact";
import ContactHeader from "../../components/contact/ContactHeader";
import "./contact.scss";

const ContactUs = () => {
  return (
    <>
      <div className="contact-us">
        <ContactHeader />
        <Contact />
      </div>
    </>
  );
};

export default ContactUs;
