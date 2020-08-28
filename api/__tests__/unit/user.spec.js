const rewire = require('rewire');
let UserDatabase = rewire('../../app/src/database/user');

// describe('should create a new partner in database.', () => {

//     it('Receive OK for creation', async () => {
//         // logError().should.equal('OK');
//         // done();
//         let logError = new UserDatabase.__set__('formatUserUrlIds', [{url_id: 1}]); 
//         console.log(logError)
//     });

// });
