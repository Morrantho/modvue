const util       = require("./util");
const templates  = require("./templates");
const fs         = require("fs");

const components = "src/components";

const cmds = {
	component:{
		exec:(args)=>{
			if(args.length < 1 || args.length > 1){
				console.log("Usage: modvue component yourComponent");
				console.log("Usage: modvue c yourComponent");
				return;
			}

			let component = components+"/"+args[0];

			if(util.isDir(component)){
				console.log("Component: ",component,"already exists.");
				return;
			}

			fs.mkdir(component,(err)=>{
				if(err){
					console.log(err);
				}else{
					let vue = templates["vue"];
					vue = util.parse(vue,"Component",args[0]);
					let vueExt = component+"/"+args[0]+".vue";

					let js = templates["js"];
					js = util.parse(js,"Component",args[0]);
					let jsExt = component+"/"+args[0]+".js";

					let html = templates["html"];
					let htmlExt = component+"/"+args[0]+".html";

					let css = templates["css"];
					let cssExt = component+"/"+args[0]+".css";

					util.file(htmlExt,html);
					util.file(cssExt,css);
					util.file(jsExt,js);
					util.file(vueExt,vue);

					let imp = templates["imp"];
					imp = util.parse(imp,"Component",args[0]);

					let main = "src/App.vue";

					fs.readFile(main,"utf8",(err,data)=>{
						data = util.parse(data,"<script>","<script>\n\t"+imp);

						data = util.parse(data,"components: {","components: {\n\t\t\t"+args[0]+",");

						fs.writeFile(main,data,(err)=>{
							if(err) throw err;
						});
					});
				}
			});
		}
	},

	help:{
		exec:(args)=>{
			console.log("Command:",args,"not found\n");
			console.log("Available Commands:\n");

			for(cmd in cmds)
				console.log(cmd);
		}
	}
}

// Aliases
cmds["c"] = cmds["component"];

module.exports = cmds;
