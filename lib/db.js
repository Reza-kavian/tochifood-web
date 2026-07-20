import sql from "mssql";      //zare_nk_050428_okk(1)
//////////////////////////for LocalDB
// const config = {
//   server: "(localdb)\\MSSQLLocalDB",  // استفاده از LocalDB یا MSSQLLocalDB
//   database: "testDb",  // نام دیتابیس که قبلاً ساختید
//   options: {
//     encrypt: false,  // برای اتصال محلی معمولاً این مقدار `false` است
//     trustServerCertificate: true,  // برای جلوگیری از خطای SSL در توسعه
//   },
// };
//////////////////////////for sql server authentication
const config = {
  user: "sa", // نام کاربری
  password: "Reza_1392",
  server: "localhost", // یا "127.0.0.1" یا "اسم سرور"
  port: 1433, // مطمئن شو TCP/IP فعاله و روی این پورت گوش می‌ده
  database: "testDb",
  options: {
    encrypt: false, // اگر از SSL استفاده نمی‌کنی
    trustServerCertificate: true,
  },
};

let pool;

export async function getConnection() {
  try {
    if (!pool) {
      pool = await sql.connect(config); 
    }
    return pool;
  } catch (err) {
    console.error("01-forsql-Database connection failed: ", err);
    throw err;
  }
}

export { sql };