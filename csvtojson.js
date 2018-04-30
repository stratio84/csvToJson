const fs = require('fs')
const path = require('path')
const csv = require('csvtojson')

const converter = () => {

	const csvFilePath  = path.join(__dirname, process.argv[2])

	csv().fromFile(csvFilePath)
	.on('json',(jsonObj)=>{
	    // combine csv header row and csv line to a json object
	    // jsonObj.a ==> 1 or 4
	    //console.log(jsonObj)
	})
	.on('end_parsed',(jsonArrObj)=>{
	    
	    fs.writeFile(path.join(__dirname, path.parse(process.argv[2]).name)+'.json', JSON.stringify(jsonArrObj, null, 2), function (err) {
                if (err) throw err;
                console.log('Json file written!');
            });
	})
	.on('done',(error)=>{
    	    if (error)
                console.log('Error:', error.message)
            //console.log('end')
	})
}

converter()
