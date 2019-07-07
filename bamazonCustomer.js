// GLOBAL VARIABLES
// =====================================================================

var mysql = require("mysql");
var inquirer = require("inquirer");


// MySQL USER
// =====================================================================

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Dogwonder1!",
  database: "bamazon"
});


// MySQL CONNECTION
// =====================================================================

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayInventory();
  });

// FUNCTIONs
// =====================================================================

// read database and display inventory

function displayInventory(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    console.log("Current Inventory: ");
    console.log("-------------------------------------------------------------------------------");

    var itemInfo = "";
    for(var i = 0; i < res.length; i++) {
      itemInfo = "";
      itemInfo += "Item ID: " + res[i].item_id + " | ";
      itemInfo += "Product Name: " + res[i].product_name + " | ";
      itemInfo += "Department: " + res[i].department_name + " | ";
      itemInfo += "Price: $" + res[i].price; 

      console.log(itemInfo);
    }

    console.log("-------------------------------------------------------------------------------");
    
  });
};

// then ask the user what item ID they want to buy

// function promptUser(){
//   inquirer.prompt([
//     {
//       name: "itemId",
//       type: "input",
//       message: "what item do you want to purchase?"
//     },
//     {
//       name: "quantity",
//       type: "input",
//       message: "how many do you wish to purchase?"
//     }
//   ])
//   .then(function(answer) {

//   }
// }

// then ask the user how many they want to buy
// update the database
// display the updated database