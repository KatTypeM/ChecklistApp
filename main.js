// Javascript
// Checklist app


// version and author from styles pate
const root = document.querySelector(":root");
let version =  getComputedStyle(root).getPropertyValue("--version");
let author =  getComputedStyle(root).getPropertyValue("--author");
let title =  getComputedStyle(root).getPropertyValue("--title");

// write version to footer
const authorDisplay = document.querySelector(".author");
authorDisplay.innerHTML = author;
const yearDisplay = document.querySelector(".year");
yearDisplay.innerHTML = new Date().getFullYear();
const versionDisplay = document.querySelector(".version");
versionDisplay.innerHTML = version;

// set document title
const pageTitle = document.querySelector(".page-title");
pageTitle.innerHTML = title;
// tab title
document.title = title + " " + version;

// Main Container reference
const containerMain = document.querySelector(".container-main");
// html reference 
const clearForm = document.querySelector("#clear-form");
const clearChecks = document.querySelector("#clear-checks");	
// variable to populate each section
let populatedList = "";
// array of check boxes
let checkBoxState = [];


// fills in data from lists
function populatePage(item){
	// set id from item
	let id = item.id;
	// sets name from item
	let name = item.name;
	// sets Description
	let desc = item.desc;
	// sets level of object to be output
	let subsetLevel = item.subsetLevel;
	
	/*
		0 - top level
		1 - Item
		2 - Setting / extension / mod
		3 - not used
		4 - not used
	*/
	// creates each individual item from array
	let level = "";
	for(let i = 0; i < subsetLevel; i++){
		if(subsetLevel == 0){
			level += "";
		}
		if(subsetLevel >= 1){
			level += "&emsp; ";
		}
	};
	populatedList += `
		<li>
			<label for="${id}">
			${level}
			<input type="checkbox" class="chkbox" id="${id}" value="${id}" />
			<span id="span-name-${id}"><strong>${name}</strong></span>
			<span id="span-desc-${id}">- ${desc}</span>
			</label>
		</li>
	`;
};


// reset populated list
function populatedListClear(){
	populatedList = "";
};


// builds state array from lists
function buildArray(input){
	for(let i = 0; i < input.length; i++){
		let temp = { 
			"id": input[i].id,
			"ischecked": input[i].ischecked,
			};
		checkBoxState.push(temp);
	};
};


// adds check box event listener and local storage update
function addCheckBoxEvent(){
	
	for(let i = 0; i < checkBoxState.length; i++){
		let tempId = checkBoxState[i].id;
		// remember to target the id using querry selector and #
		const c = document.querySelector(`#${tempId}`);
		// selectors for span elements
		const cSpanName = document.querySelector(`#span-name-${tempId}`);
		const cSpanDesc = document.querySelector(`#span-desc-${tempId}`);

		c.addEventListener("click", () => {
			if(c.checked){
				for(let j = 0; j < checkBoxState.length; j++){
					if(c.value == checkBoxState[j].id){
						checkBoxState[j].ischecked = 1;
						
					};
				};
				// add class grayed-out on check
				cSpanName.classList.add("grayed-out");
				cSpanDesc.classList.add("grayed-out");
				// store to local storage
				localStorage.setItem("NewComputerSetup", JSON.stringify(checkBoxState));

			}else{
				for(let k = 0; k < checkBoxState.length; k++){
					if(c.value == checkBoxState[k].id){
						checkBoxState[k].ischecked = 0;
					};
				};
				// remove class grayed-out on uncheck
				cSpanName.classList.remove("grayed-out");
				cSpanDesc.classList.remove("grayed-out");
				// store to local storage
				localStorage.setItem("NewComputerSetup", JSON.stringify(checkBoxState));
			};
		}, false);
	};
};


// retreived data from local storage, fill in ischecked
function getCheckLocalStorage(){
	
	// check if local storage has a value
	if(localStorage.getItem("NewComputerSetup") === null){
		// console.log("meow");
	} else {
		// puts localStorage into an array
		checkBoxState = JSON.parse(localStorage.getItem("NewComputerSetup"));
		
		// setting check boxes
		for(let i = 0; i < checkBoxState.length; i++){
			//  gets checkbox id
			let tempId = checkBoxState[i].id;
			// selectors of span elements
			const cSpanName = document.querySelector(`#span-name-${tempId}`);
			const cSpanDesc = document.querySelector(`#span-desc-${tempId}`);
			
			if(checkBoxState[i].ischecked == 1){
				// checks the checked checkboxes to checked
				document.querySelector(`#${checkBoxState[i].id}`).checked = true;
				// adds in grayed-out class on page reset
				cSpanName.classList.add("grayed-out");
				cSpanDesc.classList.add("grayed-out");
			}
		};
	};
	
};


// clear check boxes only
clearChecks.addEventListener("click", () =>{
	//sets all the checkboxes to unchecked
	for(let i = 0; i < checkBoxState.length; i++){
		if(checkBoxState[i].ischecked == 1){
			document.querySelector(`#${checkBoxState[i].id}`).checked = false;
		}
	};
	// removes grayed-out class
	let removeGray = document.querySelectorAll(".grayed-out");
	for(let j = 0; j < removeGray.length; j++){
		removeGray[j].classList.remove("grayed-out");
	};
	// sets checkBoxState to everything 0
	for(let k = 0; k < checkBoxState.length; k++){
		checkBoxState[k].ischecked = 0;
	};
	// sets new local storage
	localStorage.setItem("NewComputerSetup", JSON.stringify(checkBoxState));
});
// clear button
clearForm.addEventListener("click", () =>{
	//sets all the checkboxes to unchecked
	for(let i = 0; i < checkBoxState.length; i++){
		if(checkBoxState[i].ischecked == 1){
			document.querySelector(`#${checkBoxState[i].id}`).checked = false;
		}
	};
	// removes grayed-out class
	let removeGray = document.querySelectorAll(".grayed-out");
	for(let j = 0; j < removeGray.length; j++){
		removeGray[j].classList.remove("grayed-out");
	};

	// clears checkBoxState
	checkBoxState = [];
	// removes localStorage
	localStorage.removeItem("NewComputerSetup");
});

// takes input from array to populate fields
function moduleInput(sectionTitle, moduleClassRef, sectionColor, module){

	// this section dynamically creates section on html page
	const addSection = document.createElement("section");
	addSection.classList.add("container-section", `section-${moduleClassRef}`);
	addSection.innerHTML = `
		<h3><u>${sectionTitle}</u><span class="btn-collapse-${moduleClassRef}"> <i class="fas fa-chevron-up"></i></span></h3>
		<div class="container-${moduleClassRef}-list"></div>`;
	containerMain.appendChild(addSection);

	// background color of the section here
	document.querySelector(`.section-${moduleClassRef}`).style.backgroundColor = sectionColor;
	
	// this section adds the collapse function of a section
	function eventCollapse(){
		document.querySelector(`.btn-collapse-${moduleClassRef}`).addEventListener("click", () => {
			if(document.querySelector(`.container-${moduleClassRef}-list`).classList.contains("collapse")){
				document.querySelector(`.container-${moduleClassRef}-list`).classList.remove("collapse");
				document.querySelector(`.btn-collapse-${moduleClassRef}`).innerHTML = ` <i class="fas fa-chevron-up"></i>`;
			} else {
				document.querySelector(`.container-${moduleClassRef}-list`).classList.add("collapse");
				document.querySelector(`.btn-collapse-${moduleClassRef}`).innerHTML = ` <i class="fas fa-chevron-down"></i>`;
			}
		});
	}
	eventCollapse();
	
		// adds individual identifier for each item in array
	for(let i = 0; i < module.length; i++){
		module[i].id += moduleClassRef + "-" + i;
	};

	// clear temp list
	populatedListClear();
	//name here
	module.forEach(populatePage);
	// this inserts the populated list to the html page
	document.querySelector(`.container-${moduleClassRef}-list`).innerHTML = populatedList;
	// puts created module to array for checkboxes
	buildArray(module);
};


// control function
function kernal(){
// add module reference to load here
	/*
	format: const <name>, section title, section id references, background color, data array
	*/
	// module 1
	moduleInput(module1.sectionTitle, module1.moduleClassRef, module1.sectionColor, module1.module);
	// module 2
	moduleInput(module2.sectionTitle, module2.moduleClassRef, module2.sectionColor, module2.module);
	
	
// do not touch
	// adds event listners and set localStorage
	addCheckBoxEvent();
	// checks if there is a localStorage key
	getCheckLocalStorage();
};
kernal();











