const mongoose = require('mongoose');

// Map global promise to get rid of warning
mongoose.Promise = global.Promise;

// Connect to DB
mongoose
  .connect('mongodb://127.0.0.1:27017/CustomerCLI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000, // Adjust the timeout value as needed
  })
  .then(() => {
    ////console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Import model
const Customer = require('./models/customer');

// Add customer
const addCustomer = (customer) => {
  return new Promise((resolve, reject) => {
    Customer.create(customer)
      .then((customer) => {
       /// resolve('New Customer Added');
       console.log('New Customer is added');
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        mongoose.connection.close();
      });
  });
};

// Find customer
const findCustomer = (name) => {
  // Make case insensitive
  const search = new RegExp(name, 'i');
  Customer.find({ $or: [{ firstname: search }, { lastname: search }] })
    .then((customers) => {
      console.info(customers);
      console.info(`${customers.length} matches`);
    })
    .catch((error) => {
      console.error('Error finding customer:', error);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}; // update customer 
/**
 * The function `updateCustomer` updates a customer in a database using their ID and the new customer
 * data.
 * @param _id - The _id parameter is the unique identifier of the customer that needs to be updated. It
 * is used to find the specific customer in the database.
 * @param customer - The `customer` parameter is an object that represents the updated information for
 * a customer. It contains the new values for the customer's properties, such as name, email, address,
 * etc.
 */
/*const updateCustomer = (_id,customer) => {
    Customer.updateOne({_id},customer)
    .then(customer => {
        console.info('Customer Updated ');
        db.close();
    });
}*/
const updateCustomer = (_id, customer) => {
    Customer.updateOne({ _id }, customer)
      .then(() => {
        console.log('Customer Updated');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error('Error updating customer:', error);
        mongoose.connection.close();
      });
  };
  const removeCustomer = (_id) => {
    Customer.deleteOne({ _id })
      .then(() => {
        console.log('Customer removed');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error('Error removing customer:', error);
        mongoose.connection.close();
      });
  };
/// list the customer to see new data after performing CRUD operations
const listCustomers = () => {
    Customer.find()
      .then(customers => {
        console.info(customers);
        console.info(`${customers.length} customers`);
        mongoose.connection.close();
       //// db.close();
      });
  }
// Export
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers
};