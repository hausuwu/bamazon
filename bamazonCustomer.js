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
    console.log("---------------------------------------------------------------------------------------");

    var itemInfo = "";
    for(var i = 0; i < res.length; i++) {
      itemInfo = "";
      itemInfo += "Item ID: " + res[i].item_id + " | ";
      itemInfo += "Product Name: " + res[i].product_name + " | ";
      itemInfo += "Department: " + res[i].department_name + " | ";
      itemInfo += "Stock: " + res[i].stock_quantity + " | ";
      itemInfo += "Price: $" + res[i].price; 

      console.log(itemInfo);
    }

    console.log("---------------------------------------------------------------------------------------");
    
    promptUser();

  });
};

// then ask the user what item ID they want to buy

function promptUser(){
  inquirer.prompt([
    {
      name: "itemId",
      type: "input",
      message: "what item do you want to purchase?"
    },
    {
      name: "quantity",
      type: "input",
      message: "how many do you wish to purchase?"
    }
  ])
  .then(function(input) {

    var item = input.itemId;
    var quantity = input.quantity

    connection.query("SELECT * FROM products WHERE ?", {item_id: item}, function(err, res) {
      if (err) throw err;

      // if statement validates user input
      if (res.length === 0) {
        console.log("Please enter a valid item id.")
        console.log("-------------------------------------------------------------------------------");

          
        // restarts the application
        displayInventory()

      } else {

              // set varaible to grab our database response
              var itemData = res[0];

              // check database to see if item is in stock
              if (quantity <= itemData.stock_quantity){
              console.log("-------------------------------------------------------------------------------");
              console.log("Your item is in stock");

              // set variable query to update our database with the new stock quantity
              var updateInventory = 'UPDATE products SET stock_quantity = ' + (itemData.stock_quantity - quantity) + ' WHERE item_id = ' + item; 
              // connect to database and update the stock quantity
              connection.query(updateInventory, function(err, res) {
                if (err) throw err;

                console.log("Thank you for your order.")
                console.log("-------------------------------------------------------------------------------");

                // restarts the application
                displayInventory();

                })

              } else {
                console.log("Your order could not be completed");
                console.log("There is not enough of the product in stock");
                console.log("-------------------------------------------------------------------------------");

                // restarts the application
                displayInventory();

              }

              }

      })

  })

}
