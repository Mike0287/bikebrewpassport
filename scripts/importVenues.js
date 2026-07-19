import XLSX from "xlsx";
import fs from "fs";

const workbook = XLSX.readFile("./data/bike-brew-passport.xlsx");

const sheet = workbook.Sheets[workbook.SheetNames[0]];

const venues = XLSX.utils.sheet_to_json(sheet);

fs.writeFileSync(
  "./public/venues.json",
  JSON.stringify(venues, null, 2)
);

console.log(`Imported ${venues.length} venues`);