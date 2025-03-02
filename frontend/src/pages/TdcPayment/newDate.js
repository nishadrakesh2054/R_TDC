export default function getCurrentDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
  
    return `${month}/${day}/${year}`;
  }
  
  // console.log(getCurrentDate()); // Output: "09/25/2024"
  