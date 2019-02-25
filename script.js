var data = {
	Sites:[
		'Corporate Headquarters',
		'Sales & Support',
	],
	Departments:{
		'Corporate Headquarters':[
			'Accounting',
			'Administration',
			'Disaster Recovery',
			'Educational Resources',
			'Engineering',
			'Environmental Services',
			'Fiscal Services',
			'Human Resources',
			'Installations',
			'Operations',
			'Purchasing',
			'Shipping & Receiving',
			'Software Development',
			'Systems Administration',
		],
		'Sales & Support':[
			'Customer Service',
			'Sales & Marketing',
		],
	},
	Department_Groups:{
		'Multi-Site (Global) Groups':[
			'All Departments'
		],
		'Corporate Headquarters':[
			'Administration / Management',
		],
	},
	Categories:{
		'Document Type':{
			required: true,
			description: 'For filing purposes, all documents require a Document Type category to be selected.',
			referenceID: 1,
			subcategories:[
				'Activity',
				'Form',
				'Job Description',
				'Manual',
				'Performance Evaluation',
				'Policy',
				'Procedure',
				'Task',
			]
		},
		'FLSA':{
			required: false,
			description: 'Fair Labor Standards Act (FLSA): Please choose whether employees fulfilling this job description will be EXEMPT or NON-EXEMPT',
			referenceID: 2,
			subcategories:[
				'Exempt',
				'Non-Exempt',
			]
		},
		'Other':{
			required: false,
			description: '???',
			referenceID: 3,
			subcategories:[
				'Other 1',
				'Other 2',
				'Other 3',
				'Other 4',
				'Other 5',
			]
		},
	}
};

function showCategoryPopup(name){
	var categoryArea = document.querySelector('#select-category-popup .checkbox-tree');
	categoryArea.innerHTML = '';
	
	var category = data.Categories[name];
	for (var i = 0; i < category.subcategories.length; i++){
		var item = document.createElement('div');
		item.classList.add('checkbox');
		item.classList.add('cat-type');
		item.innerHTML = '<input type="checkbox" id="cat_cb' + i + '"/> <label onclick="subCategoryClicked()">' + category.subcategories[i] + '</label>';
		categoryArea.appendChild(item);
	}
	selectedCategory = category;
	$('#category-popup-title').text(name);
	$('#select-category-popup').show();
}

var selectedCategory = null;
function showCategoryDetailsPopup(){
	var category = selectedCategory;
	$('#category-name').text(name);
	$('#category-reference-id').text(category.referenceID);
	$('#category-description').text(category.description);
	$('#category-details-popup').show();
}

function toggleExpandIcon(id, icon){
	$('#'+id).toggle();
	$(icon).toggleClass('fa-plus-square').toggleClass('fa-minus-square');
}

// Init
function initItems(){
	// Sites
	var siteArea = document.querySelector('#select-site-popup .checkbox-tree');
	for (var i = 0; i < data.Sites.length; i++){
		var item = document.createElement('div');
		item.classList.add('checkbox');
		item.classList.add('site-type');
		item.innerHTML = '<input type="checkbox" id="site_cb' + i + '"/> <label for="site_cb' + i + '">' + data.Sites[i] + '</label>';
		siteArea.appendChild(item);
	}
	
	// Departments
	var deptArea = document.querySelector('#depts');
	var c = 0, n = 0;
	for (var i in data.Departments){
		deptArea.innerHTML += '<div class="checkbox site-type"><i class="fa fa-plus-square expand-icon" onclick="toggleExpandIcon(\'dept_tree'+n+'\', this);"></i> ' + i + '</div>';
		var item = document.createElement('div');
		item.classList.add('checkbox-tree');
		item.style.display = 'none';
		item.id = 'dept_tree'+n;
		n++;
		for (var j = 0; j < data.Departments[i].length; j++){
			item.innerHTML += '<div class="checkbox dept-type"><input type="checkbox" id="dept_cb' + c + '"/> <label onclick="deptClicked()">' + data.Departments[i][j] + '</label></div>';
			c++;
		}
		deptArea.appendChild(item);
	}
	
	// Department Groups
	var deptGroupsArea = document.querySelector('#dept-groups');
	c = 0; n = 0;
	for (var i in data.Department_Groups){
		deptGroupsArea.innerHTML += '<div class="checkbox site-type"><i class="fa fa-plus-square expand-icon" onclick="toggleExpandIcon(\'dept_group_tree'+n+'\', this);"></i> ' + i + '</div>';
		var item = document.createElement('div');
		item.classList.add('checkbox-tree');
		item.style.display = 'none';
		item.id = 'dept_group_tree'+n;
		n++;
		item.classList.add('checkbox-tree');
		for (var j = 0; j < data.Department_Groups[i].length; j++){
			item.innerHTML += '<div class="checkbox dept-type"><input type="checkbox" id="dept_group_cb' + c + '"/> <label onclick="deptClicked()">' + data.Department_Groups[i][j] + '</label></div>';
			c++;
		}
		deptGroupsArea.appendChild(item);
	}
	
	// Categories
	var categoryArea = document.querySelector('#categories-area');
	for (var i in data.Categories){
		var item = document.createElement('div');
		var category = data.Categories[i];
		if (category.required){
			item.innerHTML = '<li class="list-item" onclick="showCategoryPopup(\'' + i + '\')"><a>' + i + '</a>*</li>';
		} else {
			item.innerHTML = '<li class="list-item" onclick="showCategoryPopup(\'' + i + '\')"><a>' + i + '</a></li>';
		}
		categoryArea.appendChild(item);
	}
}
window.addEventListener('load', initItems);

function deptTypeChanged(dropdown){
	switch (parseInt(dropdown.value)){
		case 1:
		$('#dept-groups').hide();
		$('#depts').show();
		break;
		case 2:
		$('#depts').hide();
		$('#dept-groups').show();
		break;
	}
}

function subCategoryClicked(){
	alertHTML('Clicking on a subcategory\'s name will show additional details about that subcategory.<br/><br/>This is not working in this prototype.');
}

function deptClicked(){
	alertHTML('Clicking on a department or department group\'s name will show a list of all users in that department.<br/><br/>This is not working in this prototype.');
}

function contentLinkClicked(){
	alertHTML('Clicking this link will show additional information about items highlighted below.<br/><br/>This is not working in this prototype.');
}

function alertHTML(text){
	$('#alert-popup-text').html(text);
	$('#alert-popup').show();
}