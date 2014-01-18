var hash = require('./pass').hash;
var UserProvider = require('./UserProvider').UserProvider;
exports.authenticate = function(name, pass, fn) {
	console.log('authenticating %s:%s', name, pass);

var userProvider= new UserProvider('localhost', 27017);
	
 // Fetch from databasae
  var user = userProvider.find(name, pass, function(err, response) {
	  console.log(typeof response);
	  console.log(response); });
  
  // query the db for the given username
  if ( !user ) {
	  console.log("Cannot find user");
	  return fn(new Error('cannot find user'));
  }
  
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
/*  hash(pass, user.salt, function(err, hash){
	  console.log("Hashing");
    if ( err ) {
    	return fn(err);
    }
    
    if ( hash == user.hash ) {
    	return fn(null, user);
    }
    
    // Final possibility
    fn(new Error('invalid password'));
  });*/
};