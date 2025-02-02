import axios from "axios";

export const getActiveAcademies = () => {
  const options = {
    method: "GET",
    url: "/api/active-academies",
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
