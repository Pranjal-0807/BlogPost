// Part 3
const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(password, salt))
    .catch((error) => console.log(error));
};

const comparePassword = (password, hashedPasswordFromDB) => {
  return bcrypt
    .compare(password, hashedPasswordFromDB)
    .then((isMatch) => {
      console.log(`Password Match : ${isMatch}`);
      return isMatch; // Return the result of the comparison
    })
    .catch((error) => {
      console.log(error);
      throw error; // Propagate the error to be handled by the caller
    });
};

module.exports = { hashPassword, comparePassword };

// // Part 2 => By using promises
// const bcrypt = require("bcrypt");

// const hashPassword = (password) => {
//   return bcrypt
//     .genSalt(10)
//     .then((salt) => bcrypt.hash(password, salt))
//     .catch((error) => console.log(error));
// };
// hashPassword("password123")
//   .then((hashedPassword) => {
//     console.log(`Hashed Password`);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const hashedPasswordFromDB =
//   "$2b$10$7vqhoODx/HdhFniO80IRRuRvkqhenWvaSq7yDyI4qLlSiMDZ7NmA.";

// const comparePassword = (password, hashedPasswordFromDB) => {
//   return bcrypt
//     .compare(password, hashedPasswordFromDB)
//     .then((isMatch) => {
//       console.log(`Password Match : ${isMatch}`);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// comparePassword("password123", hashedPasswordFromDB);

// // Part 1 => By using async await
// const bcrypt = require("bcrypt");

// async function hashPassword(password) {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// }

// hashPassword("password123")
//   .then((hashedPassword) => {
//     console.log(hashedPassword);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const hashedPasswordFromDB =
//   "$2b$10$edQNZaOLpwxolilDjk9XxuystQWXGAayAiboNfOeBlHckWSduasFK";
// async function comparePassword(password, hashedPasswordFromDB) {
//   return await bcrypt.compare(password, hashedPasswordFromDB);
// }

// comparePassword("password123", hashedPasswordFromDB);
