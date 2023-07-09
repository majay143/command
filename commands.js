////const {prompt} = require('inquirer')

const  { prompt } = require('inquirer');
const program = require('commander');
const {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
} = require('./index')
// Customer questions
const questions = [
    {
        type:'input',
        name:'firstname',
        message:'wahat is the Customer First Name '
    },
    {
        type:'input',
        name:'lasttname',
        message:'Customer last Name '
    },
    {
        type:'input',
        name:'phone',
        message:'Customer phone Number '
    },
    {
        type:'input',
        name:'email',
        message:'Customer email '
    }
];
program
.version('1.0.0')
.description("Client Mangemnet System ")
/* This code is defining a command for the program. The command is called "add" and it has an alias
"a". The description of the command is "Add a customer". When this command is invoked, it will
execute the provided action, which is a function that prompts the user with the questions defined in
the `questions` array and then calls the `addCustomer` function with the answers provided by the
user. */
program
  .command('add')
  .alias('a')
  .description('Add a customer')
  .action(() => {  
    prompt(questions).then(answers => addCustomer(answers));
  });
// a shorter nae for a invoke the command instead of a full command line 
program
.command('find <name> ')
.alias('f') // finds the customer 
.description('Find a customer ')
.action(name => findCustomer(name));
// Update Command
program
  .command('update <_id>')
  .alias('u')
  .description('Update a customer')
  .action(_id => {
    prompt(questions).then(answers => updateCustomer(_id, answers));
  });

// Remove Command
program
  .command('remove <_id>')
  .alias('r')
  .description('Remove a customer')
  .action(_id => removeCustomer(_id));

// List Command
program
  .command('list')
  .alias('l')
  .description('List all customers')
  .action(() => listCustomers());

program.parse(process.argv);

// parse refers to process of analyzing the argument vector