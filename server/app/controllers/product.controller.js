const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

exports.addProduct = (req, res) => {
  const {
    nume_produs,
    descriere_produs,
    unitate_masura,
    stoc_initial,
    pret,
    categorie,
  } = req.body;

  db.query(
    "SELECT nume_produs FROM produse WHERE nume_produs = ?",
    [nume_produs],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.send({
          message:
            "A product named " + nume_produs + " already exists in database!",
          status: 409,
        });
      }

      const Product = {
        nume_produs: nume_produs,
        descriere_produs: descriere_produs,
        unitate_masura: unitate_masura,
        stoc_initial: stoc_initial,
        pret: pret,
        categorie: categorie,
      };

      db.query("INSERT INTO produse SET ?", Product, (error, results) => {
        if (error) console.log(error);
        else {
          return res.json({
            message: "Product added successfully!",
            status: 200,
            product: Product,
          });
        }
      });
    }
  );
};

exports.getAllProducts = (req, res) => {
  const queryString =
    "SELECT produse.*, categorii.*, furnizori.nume_furnizor " +
    "FROM categorii inner join produse on categorii.id_categorie = produse.categorie " +
    "inner join furnizori on furnizori.cod_furnizor = produse.cod_furnizor";

  db.query(queryString, async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      let productsList = [];
      results.map((prod) => {
        productsList.push({
          cod_produs: prod.cod_produs,
          nume_produs: prod.nume_produs,
          descriere_produs: prod.descriere_produs,
          unitate_masura: prod.unitate_masura,
          stoc_initial: prod.stoc_initial,
          pret: prod.pret,
          categorie: prod.nume_categorie,
          data_creare: prod.data_creare,
          imagine_produs: prod.imagine_produs,
          cod_furnizor: prod.cod_furnizor,
          id_categorie: prod.id_categorie,
          descriere_categorie: prod.descriere_categorie,
          cantitate: 0,
          nume_furnizor: prod.nume_furnizor,
        });
      });
      return res.json({
        message: "Products fetched successfully!",
        status: 200,
        products: productsList,
      });
    } else {
      return res.send({
        message: "No products in database!",
        status: 409,
      });
    }
  });
};

exports.deleteProduct = (req, res) => {
  const productToDelete = req.params.name;

  db.query(
    "DELETE FROM produse WHERE nume_produs = ?",
    [productToDelete],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      return res.json({
        message: "Product deleted successfully!",
        status: 200,
      });
    }
  );
};

exports.updateProduct = (req, res) => {
  const {
    nume_produs,
    descriere_produs,
    unitate_masura,
    stoc_initial,
    pret,
    categorie,
  } = req.body;

  db.query(
    "UPDATE produse SET nume_produs = ?, descriere_produs = ?, unitate_masura = ?, stoc_initial = ?, pret = ?, categorie= ? WHERE nume_produs = ?",
    [
      nume_produs,
      descriere_produs,
      unitate_masura,
      stoc_initial,
      pret,
      categorie,
      req.params.identifier,
    ],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          message: error.code,
          status: 404,
        });
      }

      return res.json({
        message: "Product updated successfully!",
        status: 200,
        product: [
          {
            identifier: req.params.identifier,
            nume_produs: nume_produs,
            descriere_produs: descriere_produs,
            unitate_masura: unitate_masura,
            stoc_initial: stoc_initial,
            pret: pret,
            categorie: categorie,
          },
        ],
      });
    }
  );
};
