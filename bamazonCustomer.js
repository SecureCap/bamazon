var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    menu();
});


function menu() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Display Inventory",
                "Buy NOW!",
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "Display Inventory":
                    inventory();
                    break;

                case "Buy an item":
                    buyProduct();
                    break;
            }
        });
}


function buyProduct() {
            inquirer
            .prompt([{
                    name: "id",
                    type: "input",
                    message: "Enter the ID of the item you would like to purchase: ",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many units would you like?: ",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                    // SECOND VALIDATION HERE

                }
            ])
            .then(function(answer) {
                var item = answer.id;
                var amount = answer.amount;
                connection.query("SELECT * FROM products WHERE ?", {
                    id: item
                }, function(err, res) {
                    if (err) throw err;
                    var productRow = res[0];
                    var total = answer.amount * productRow.price;
                    // console.log(productRow);


                    if (amount <= productRow.stock) {

                        var query = "UPDATE products SET stock = stock - ? WHERE id = ?";
                        connection.query(query, [answer.amount, answer.id], function(err, res) {
                            console.log("Thank for your purchase!");
                            console.log("Your total was $: " + total);
                            console.log("You have now been disconnected.");
                            connection.end();
                        });
                    } else {
                        console.log("Insufficient stock amount to fullfill the order.");
                        console.log("Please try again");
                        menu();
                    }
                });
            // });
    });
}

function inventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item Id: " + res[i].id + " || Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Available: " + res[i].stock_quantity);
        };
        menu();
    });

};