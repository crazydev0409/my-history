const { execSync } = require("child_process");
const { faker } = require("@faker-js/faker");

const startYear = 2017;
const endYear = 2024;
const commitsPerDay = 2;

for (let year = startYear; year <= endYear; year++) {
  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      for (let c = 0; c < commitsPerDay; c++) {
        const date = new Date(
          year,
          month,
          day,
          12,
          Math.floor(Math.random() * 60)
        );
        const isoDate = date.toISOString();
        const message = faker.hacker.phrase();

        execSync(`echo "${message}" >> file.txt`);
        execSync(`git add .`);
        execSync(`git commit --date="${isoDate}" -m "${message}"`);
      }
    }
  }
}
