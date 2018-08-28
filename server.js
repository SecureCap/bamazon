var mysql = require("mysql");
var inquirer = require("inquirer");


//create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    //my port
    port: 8889,

    //username
    user: "root",

    //password
    password: "root",
    database: "bamazon"
});

//connect to the mysql and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
});

function displayProducts() {
    connection.query('SELECT id, product_name, department_name, price, stock_quanity FROM products', function (err, res) {
        if (err) throw err;
       console.log(res);
    });
};

function productSearch() {
    inquirer
     .prompt([
         { type: "input",
           message: "Enter the ID number for the product you would like to buy. ('q' to exit )",
           name: "id",
           validate: function(value) {
               if(value.toLowerCase() === 'q') {
                   process.exit(0);
               }
               if (isNaN(value) === false && parseInt(value) <= productSearch && parseInt(value > 0)) {
                   return true;
               }
               return false;
           }
    }, {
        type: 'input',
        message: "How many units would like to buy? ('q' to exit)",
        name: 'quantity',
        validate: function(value) {
            if(value.toLowerCase() === 'q') {
                process.exit(0);
            }
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }])
    .then(function(answer) {
        connection.query("SELECT stock_quanity FROM products WHERE id=?", answer.id, function (err, res) {
            if (err) throw err;
            var quantity = res[0].stock_quantity;
            if (quantity >= answer.quantity) {
                
                var remainder = quantity - answer.quantity;
                connection.query("UPDATE products SET ? WHERE ?", [
                    {stock_quanity: remainder}, {id: answer.id}
                ], function (err, res) {
                    if (err) throw err;
                    var total = answer.quantity * res[0].price;
                    var departName = res[0].department_name;
                });
            };
        });
    });
};



// for (var i = 0; i < res.length; i++) {
//     table.push([res[i].id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quanity]);
// };

  