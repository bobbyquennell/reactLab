if(process.env.NODE_ENV ==='production'){
    module.exports = require('./configureStore.prod');//module.exports is a object created by Node Module system:
    //see details: https://nodejs.org/api/modules.html#modules_module_exports
}else{
    module.exports = require('./configureStore.dev');
}
//Dynamic imports aren't supported by ES6. so we are using require instead of import here.
