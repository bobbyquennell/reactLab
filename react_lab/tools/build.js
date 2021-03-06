import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

/*eslint-disable no-console */
process.env.NODE_ENV = 'production'; //this assures the Babel dev config(for how reloading) doesn't apply.
console.log('Generating minified bundle for production via Webpack. This will take a moment...'.yellow);
webpack(webpackConfig).run((err, stats) =>{
    if(err){//so a fatal error occured. stop here
        console.log(err.bold.red);
        return 1;
    }
    const jsonStats = stats.toJson();
    if(jsonStats.hasErrors){
        return jsonStats.errors.map(error =>console.log(error.red));
    }
    if(jsonStats.hasWarnings){
        console.log('Webpack generated the following warnings: '.bold.yellow);
        jsonStats.warnngs.map(warning =>console.log(warning.yellow));
    }

    console.log('Webpack stats: ${stats}');

  //if we got this far, the build succeeded.
    console.log('Your app has been compiled in a production mode and written to /dist. It\'s ready to roll!'.green);
    return 0;
});
