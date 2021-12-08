const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

exports.addCategory = (req, res) => {
  const { nume_categorie, descriere_categorie } = req.body;

  db.query(
    "SELECT nume_categorie FROM categorii WHERE nume_categorie = ?",
    [nume_categorie],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.send({
          message:
            "A category named " +
            nume_categorie +
            " already exists in database!",
          status: 409,
        });
      }

      const Category = {
        nume_categorie: nume_categorie,
        descriere_categorie: descriere_categorie,
      };

      db.query("INSERT INTO categorii SET ?", Category, (error, results) => {
        if (error) console.log(error);
        else {
          return res.json({
            message: "Category added successfully!",
            status: 200,
            category: Category,
          });
        }
      });
    }
  );
};

exports.getAllCategories = (req, res) => {
  db.query("SELECT * FROM categorii", async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Categories fetched successfully!",
        status: 200,
        categories: results,
      });
    } else {
      return res.send({
        message: "No categories in database!",
        status: 409,
      });
    }
  });
};

exports.deleteCategory = (req, res) => {
  const categoryToDelete = req.params.name;

  db.query(
    "DELETE FROM categorii WHERE nume_categorie = ?",
    [categoryToDelete],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      return res.json({
        message: "Category deleted successfully!",
        status: 200,
      });
    }
  );
};

exports.updateCategory = (req, res) => {
  const { nume_categorie, descriere_categorie } = req.body;

  db.query(
    "UPDATE categorii SET nume_categorie = ?, descriere_categorie = ? WHERE nume_categorie = ?",
    [nume_categorie, descriere_categorie, req.params.identifier],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          message: error.code,
          status: 404,
        });
      }

      return res.json({
        message: "Category updated successfully!",
        status: 200,
        category: [
          {
            identifier: req.params.identifier,
            nume_categorie: nume_categorie,
            descriere_categorie: descriere_categorie,
          },
        ],
      });
    }
  );
};
