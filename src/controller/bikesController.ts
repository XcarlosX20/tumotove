const motos = require("../../motos.json");
import pg from "pg";
import { parseToTrue } from "../helpers/helper";
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  password: "admin",
  database: "tumotove",
  port: "5432",
});
const testSQL = {
  getTable: `SELECT * from motocicletas`,
  insert: `INSERT INTO motocicletas (id, precio, marca, modelo, cilindrada, segmento, tipoMotor, frenoTrasero, frenoDelantero, frenosABS, barrasSuspension, tacometro, contrapesoMotor, enfriamiento, conexionUSB, encendido, tipoRines, tamañoRinDelantero, tamañoRinTrasero, velocidadMax, relacionCoronaPiñon, sistemaCombustion) VALUES ('8', '1050', 'Empire keeway', 'new horse', '150', 'paseo standard', 'monocilindrico varillero', 'banda', 'disco', false, 'telescopicas', 'digital', false, 'aire', true, 'patada y mando', 'rayos', '18', '18', '105km/h', '38-15', 'pz27');`,
};
export const getAllBikes = async (req, res) => {
  const response = await pool.query(testSQL.getTable);
  console.log(response.rows);
  res.render("form", {
    title: "TumotoVE",
    name: "carlos",
    marcas: ["Bera", "Empire keeway", "MD", "Toro", "Escuda", " Forza"],
  });
};
export const searchBike = async (req, res) => {
  const keywords = getOnlyKeywordsSelected({ keywords: req.body });
  const {
    marca = "",
    modelo = "",
    segmento = "",
    tipoMotor = "",
    cilindrada = 0,
    precioMin = 0,
    precioMax = 999999999,
    barrasSuspension = "",
    contrapesomotor = false,
    frenosABS = false,
    tacometro = "",
    tipoRines = "",
    sistemacombustion = "",
    frenoTrasero = "",
    frenoDelantero = "",
    conexionusb = false,
    enfriamiento = "",
    tamañoRinTrasero = "",
    tamañoRinDelantero = ""
  } = keywords;
  console.log(keywords);
  // const results = filtrarProductos(motos,keywords)
  // console.log( results)
  // res.render('home', { title: 'TumotoVE', name: 'carlos', marcaSelected: 'Bera', marcas: ['Bera', 'Empire keeway', 'MD', 'Toro', 'Escuda', ' Forza']});
  // const whereClause = buildWhereClause(params);
  const sql = `SELECT * FROM motocicletas
WHERE
  (marca LIKE CONCAT('%', '${marca}', '%') OR '${marca}' IS NULL)
  AND (modelo LIKE CONCAT('%', '${modelo}', '%') OR '${modelo}' IS NULL)
  AND (segmento LIKE CONCAT('%', '${segmento}', '%') OR '${segmento}' IS NULL)
  AND (tipoMotor LIKE CONCAT('%', '${tipoMotor}', '%') OR '${tipoMotor}' IS NULL)
  AND (barrasSuspension LIKE CONCAT('%', '${barrasSuspension}', '%') OR '${barrasSuspension}' IS NULL)
  AND (tacometro LIKE CONCAT('%', '${tacometro}', '%') OR '${tacometro}' IS NULL)
  AND (frenoTrasero LIKE CONCAT('%', '${frenoTrasero}', '%') OR '${frenoTrasero}' IS NULL)
  AND (frenoDelantero LIKE CONCAT('%', '${frenoDelantero}', '%') OR '${frenoDelantero}' IS NULL)
  AND (sistemacombustion LIKE CONCAT('%', '${sistemacombustion}', '%') OR '${sistemacombustion}' IS NULL)
  AND (tipoRines LIKE CONCAT('%', '${tipoRines}', '%') OR '${tipoRines}' IS NULL)
  AND (enfriamiento LIKE CONCAT('%', '${enfriamiento}', '%') OR '${enfriamiento}' IS NULL)
  ${cilindrada ? `AND (cilindrada = '${cilindrada}' OR '${cilindrada}' IS NULL)` : ''}
  ${contrapesomotor ? `AND (contrapesoMotor = '${contrapesomotor}' OR '${contrapesomotor}' IS NULL)` : ''}
  ${frenosABS ? `AND (contrapesoMotor = '${frenosABS}' OR '${frenosABS}' IS NULL)` : ''}
  ${conexionusb ? `AND (conexionusb = '${conexionusb}' OR '${conexionusb}' IS NULL)` : ''}
  AND (precio BETWEEN ${precioMin} AND ${precioMax} OR ${precioMax} IS NULL AND ${precioMin} IS NULL);`;
  //console.log(sql);
  const response = await pool.query(sql);
  res.render("results", {
    title: "Resultados de la busqueda",
    motos: response.rows,
  });
  console.log(response.rows)
};
function getOnlyKeywordsSelected({ keywords }) {
  const filtersSelected = new Map();
  Object.keys(keywords).forEach((parameter) => {
    if (keywords[parameter].length) {
      filtersSelected[parameter] = keywords[parameter];
    }
  });
  return parseToTrue({ keywords: filtersSelected });
}
