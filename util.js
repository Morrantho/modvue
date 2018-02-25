const fs       = require("fs");
const path     = require("path");
const OS       = require("os");

module.exports = {
	os:()=>{
		return OS.platform();
	},

	pwd:()=>{
		return path.basename(process.cwd());
	},

	isDir:(dir)=>{
		try{
			return fs.statSync(dir).isDirectory();
		}catch(err){
			return false;
		}
	},

	isFile:(file)=>{
		try{
			return fs.statSync(file).isFile();
		}catch(err){
			return false;
		}
	},

	args(){
		return process.argv.slice(2);
	},

	files(dir){
		return fs.readdirSync(dir);
	},

	file(file,content){
		fs.appendFile(file,content,(err)=>{
			if(err)
				throw err;
			else{
				console.log("Created: ",file);
			}
		});
	},

	parse(data,str,rep){
		for(let i=0;i < data.length-str.length; i++){
			let s = data.substring(i,i+str.length);

			if(s == str){
				data = data.substring(0,i)+rep+data.substring(i+str.length);
			}
		}

		return data;
	},
}
