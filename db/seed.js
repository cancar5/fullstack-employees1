import db from "#db/client";
import { faker } from "@faker-js/faker";
import {
  createEmployee,
  getEmployee,
  deleteEmployee,
} from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

//using FAKER for data
async function seedEmployees() {
  // TODO
  for (let i = 0; i < 10; i++) {
    const employee = {
      name: faker.person.fullName(),
      birthday: faker.date.birthdate(),
      salary: faker.number.int({ min: 40000, max: 100000 }),
    };
    await createEmployee(employee);
  }
}
