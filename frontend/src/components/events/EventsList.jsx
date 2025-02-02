import React from "react";
import "./EventsList.scss";

const squadEvents = [
  {
    name: "FOOTBALL U-16 BOYS",
    registration: "7TH OCTOBER",
    dates: "23rd Nov. – 24th Dec.",
  },
  {
    name: "FOOTBALL U-12 BOYS",
    registration: "22ND NOVEMBER",
    dates: "16th – 24th Dec.",
  },
  {
    name: "FUTSAL U-13 GIRLS",
    registration: "22ND NOVEMBER",
    dates: "14th – 15th Dec.",
  },
  {
    name: "FUTSAL U-18 BOYS",
    registration: "22ND NOVEMBER",
    dates: "20th – 22nd Dec.",
  },
  {
    name: "FUTSAL U-18 GIRLS",
    registration: "22ND NOVEMBER",
    dates: "14th – 15th Dec.",
  },
  {
    name: "BASKETBALL U-16 BOYS",
    registration: "22ND NOVEMBER",
    dates: "14th – 24th Dec.",
  },
  {
    name: "BASKETBALL U-18 BOYS",
    registration: "22ND NOVEMBER",
    dates: "14th – 24th Dec.",
  },
  {
    name: "BASKETBALL U-18 GIRLS",
    registration: "22ND NOVEMBER",
    dates: "14th – 24th Dec.",
  },
  {
    name: "CRICKET U-12 BOYS",
    registration: "22ND NOVEMBER",
    dates: "14th – 24th Dec.",
  },
  {
    name: "CRICKET U-16 BOYS",
    registration: "22ND NOVEMBER",
    dates: "14th – 24th Dec.",
  },
  {
    name: "CRICKET U-18 BOYS",
    registration: "22ND NOVEMBER",
    dates: "14th – 24th Dec.",
  },
  {
    name: "VOLLEYBALL U-18 BOYS",
    registration: "22ND NOVEMBER",
    dates: "15th – 18th Dec.",
  },
  {
    name: "VOLLEYBALL U-18 GIRLS",
    registration: "22ND NOVEMBER",
    dates: "15th – 18th Dec.",
  },
];

const individualEvents = [
  { name: "SWIMMING", dates: "5th – 6th December" },
  {
    name: "CHESS U-14 BOYS",
    registration: "22ND NOVEMBER",
    dates: "19th – 20th December",
  },
  {
    name: "CHESS U-14 GIRLS",
    registration: "22ND NOVEMBER",
    dates: "19th – 20th December",
  },
  {
    name: "CHESS U-18 BOYS",
    registration: "22ND NOVEMBER",
    dates: "19th – 20th December",
  },
  {
    name: "CHESS U-18 GIRLS",
    registration: "22ND NOVEMBER",
    dates: "19th – 20th December",
  },
  {
    name: "TAEKWONDO BOYS",
    registration: "22ND NOVEMBER",
    dates: "20th – 21st December",
  },
  {
    name: "TAEKWONDO GIRLS",
    registration: "22ND NOVEMBER",
    dates: "20th – 21st December",
  },
  {
    name: "JUDO BOYS",
    registration: "22ND NOVEMBER",
    dates: "20th – 21st December",
  },
  {
    name: "JUDO GIRLS",
    registration: "22ND NOVEMBER",
    dates: "20th – 21st December",
  },
  {
    name: "TABLE TENNIS U-12 BOYS",
    registration: "22ND NOVEMBER",
    dates: "17th – 19th December",
  },
  {
    name: "TABLE TENNIS U-12 GIRLS",
    registration: "22ND NOVEMBER",
    dates: "17th – 19th December",
  },
  {
    name: "TABLE TENNIS U-15 BOYS",
    registration: "22ND NOVEMBER",
    dates: "17th – 19th December",
  },
  {
    name: "TABLE TENNIS U-15 GIRLS",
    registration: "22ND NOVEMBER",
    dates: "17th – 19th December",
  },
  {
    name: "TABLE TENNIS U-18 BOYS",
    registration: "22ND NOVEMBER",
    dates: "17th – 19th December",
  },
  {
    name: "TABLE TENNIS U-18 GIRLS",
    registration: "22ND NOVEMBER",
    dates: "17th – 19th December",
  },
  {
    name: "TENNIS U-18 BOYS",
    registration: "22ND NOVEMBER",
    dates: "20th – 22nd December",
  },
  {
    name: "TENNIS U-18 GIRLS",
    registration: "22ND NOVEMBER",
    dates: "20th – 22nd December",
  },
  {
    name: "ARCHERY BOYS",
    registration: "22ND NOVEMBER",
    dates: "21st December",
  },
  {
    name: "ARCHERY GIRLS",
    registration: "22ND NOVEMBER",
    dates: "21st December",
  },
];

const EventsList = () => {
  const sortEvents = (events) =>
    events.sort((a, b) => a.name.localeCompare(b.name));
  const renderTable = (events, title) => (
    <div className="events-table-container">
      <h2>{title}</h2>
      <table className="events-table">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Particulars</th>
            <th>Event Dates</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{event.name}</td>
              <td>{event.dates}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="events-list">
      {renderTable(sortEvents([...squadEvents]), "Squad Events")}
      {renderTable(sortEvents([...individualEvents]), "Individual Events")}
    </div>
  );
};
export default EventsList;
