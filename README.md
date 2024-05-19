
## Build a basic version of PayTM


In the real world, you shouldn’t store `floats` for balances in the database.
You usually store an integer which represents the INR value with 
decimal places (for eg, if someone has 33.33 rs in their account, 
you store 3333 in the database).


There is a certain precision that you need to support (which for india is
2/4 decimal places) and this allows you to get rid of precision
errors by storing integers in your DB



A lot of times, you want multiple databases transactions to be atomic
Either all of them should update, or none should
 
This is super important in the case of a bank
 
Can you guess what’s wrong with the following code - 
 
const mongoose = require('mongoose');
const Account = require('./path-to-your-account-model');

const transferFunds = async (fromAccountId, toAccountId, amount) => {
    // Decrement the balance of the fromAccount
	  await Account.findByIdAndUpdate(fromAccountId, { $inc: { balance: -amount } });

    // Increment the balance of the toAccount
    await Account.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } });
}

// Example usage
transferFunds('fromAccountID', 'toAccountID', 100);
Copy
 
Answer
What if the database crashes right after the first request (only the balance is decreased for one user, and not for the second user)
What if the Node.js crashes after the first update?

It would lead to a database inconsistency. Amount would get debited from the first user, and not credited into the other users account.

If a failure ever happens, the first txn should rollback.

This is what is called a transaction in a database. We need to implement a transaction on the next set of endpoints that allow users to transfer INR




mongoose.startSession is a method provided by the Mongoose library in Node.js for managing sessions when interacting with MongoDB. Sessions in this context refer to MongoDB sessions, which allow you to start a transaction, run operations, and commit or abort the transaction as a unit of work.

Here's a brief overview of how you might use mongoose.startSession:

Starting a Session:
You can start a session using mongoose.startSession():

javascript
Copy code
const session = await mongoose.startSession();
Using the Session:
Once you have the session object, you can use it to run operations within a transaction or with certain options:

javascript
Copy code
await session.withTransaction(async () => {
  // Your transactional operations go here
});
Alternatively, you can use the session to execute operations with specific options:

javascript
Copy code
const options = { session };
await MyModel.findOneAndUpdate({ name: 'John' }, { age: 30 }, options);
Committing or Aborting:
After running operations within the session, you can commit the changes or abort the transaction based on your requirements:

javascript
Copy code
await session.commitTransaction();
session.endSession();
or

javascript
Copy code
await session.abortTransaction();
session.endSession();
Remember, sessions are particularly useful when you need to perform multiple operations as part of a transaction, ensuring either all operations succeed or none of them are applied, maintaining data consistency.



### other things that need to be worked out in frontend

1. How to add to loader while data is getting fetched
2. How to add debouncing behavior using  "lodash.debounce"
