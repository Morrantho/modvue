#! /usr/bin/env node
const util   = require("./util");
const figlet = require("figlet");
const cmds   = require("./cmds");
let   args   = util.args();

console.log(figlet.textSync('modvue',{ horizontalLayout: 'full' })+"\n");

function init(){
	if(!util.isDir("src/components")){
		console.log("You must be at the root of a vue project.");
		return;
	}

	for(cmd in cmds){
		if(cmd == args[0]){
			cmds[args[0]].exec(args.splice(1));
			return;
		}
	}

	cmds["help"].exec(args[0]);
}
init();
