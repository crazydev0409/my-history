const { execSync } = require("child_process");
const { faker } = require("@faker-js/faker");

const startDate = new Date("2025-01-05");
const endDate = new Date("2025-04-17");
let currentDate = new Date(startDate);

while (currentDate <= endDate) {
  const dayOfWeek = currentDate.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  if (!isWeekend) {
    const commitsToday = faker.number.int({ min: 2, max: 4 });

    for (let i = 0; i < commitsToday; i++) {
      const commitTime = new Date(currentDate);
      commitTime.setHours(10 + i, faker.number.int({ min: 0, max: 59 }));

      const isoDate = commitTime.toISOString();
      const message = faker.hacker.phrase();

      execSync(`echo "${message}" >> file.txt`);
      execSync(`git add .`);
      execSync(`git commit --date="${isoDate}" -m "${message}"`);
    }
  }

  // Skip 1–3 days ahead
  const skipDays = faker.number.int({ min: 1, max: 3 });
  currentDate.setDate(currentDate.getDate() + skipDays);
}
