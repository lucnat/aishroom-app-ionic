
// executed on startup

Storage = {
	get: function(key) {
		return JSON.parse(localStorage.getItem(key))
	},
	set: function(key, obj) {
		localStorage.setItem(key,JSON.stringify(obj));
	}
};

if(!localStorage.getItem('currentModel')) {
	const model = {
		"name": "committee",
		"url": "assets/models/committee/model.json",
		"description": "9 Klassen, mit einem Committee. Momentan unser bestes Modell.",
		"inputSize": 224,
		"labels": [ "Amanita Muscaria","Cantharellus Cibariusa,Infundibuliformis","Coprinus Comatus","Craterellus Cornucopioides","Good_Boletes","Macrolepiota Procera","Morchella Esculenta","Pleurotus Eryngii","Red_Boletes"]
	}
	Storage.set('currentModel',model);
}
