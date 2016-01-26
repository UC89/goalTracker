var numObjectives = 0
var goalNumbers = []

Template.addgoal.rendered = function(){
	goalNumbers = []
	numObjectives = 0
}

Template.addgoal.helpers = {
	currentGoal : function(){
	let currentUser = Meteor.user();
	let currentUserId = Meteor.userId();
	console.log(currentUser);
	return 'Current Goal';
	}
}

Template.addgoal.events = {
	'click #add-objective' : function(event,template) {
			console.log('Click add objective');
			numObjectives += 1;
			var objectiveIdNum = Math.max.apply(null, goalNumbers)+1;
			console.log('ObjectiveIdNum Pre: '+objectiveIdNum);
			if (isNaN(objectiveIdNum)==true || objectiveIdNum==-Infinity) {
				console.log('isNan');
				objectiveIdNum=1;
			}
			console.log('ObjectiveIdNum: '+objectiveIdNum);
			goalNumbers.push(objectiveIdNum);
			console.log('Goal Numbers: '+goalNumbers);
			newObjective = createNewGoalTask(objectiveIdNum);
     $('#objective-list').append(newObjective);
	},
	'click .remove-goal' : function(event,template) {
		numObjectives -= 1;
		var goalId = $(event.target).attr('id');
		var goalNumber = Number(goalId.slice(-1));
		var positionOf = goalNumbers.indexOf(goalNumber);
		goalNumbers.splice(positionOf,1);
		let objectiveId = '#goal-form-container-'+goalNumber;
		console.log('Should remove: ' +objectiveId);
		$(objectiveId).empty();
		$(objectiveId).remove();
		numObjectives -= 1;
	},
	'click .completion-status' : function(event,template) {
		var complete_id =  $(event.target).attr('id');
		if ($(event.target).children().attr('class')=='glyphicon glyphicon-ok') {
			$(event.target).children().attr('class', 'glyphicon glyphicon-option-horizontal');
			$(event.target).attr('class','btn btn-danger center-button button-padding completion-status');
			$(event.target).attr('value','glyphicon glyphicon-option-horizontal');
		}
		else if ($(event.target).children().attr('class')=='glyphicon glyphicon-send') {
			$(event.target).children().attr('class', 'glyphicon glyphicon-ok');
			$(event.target).attr('class','btn btn-success center-button button-padding completion-status');
			$(event.target).attr('value','glyphicon glyphicon-ok');
		}
		else if($(event.target).children().attr('class')=='glyphicon glyphicon-option-horizontal') {
			$(event.target).children().attr('class', 'glyphicon glyphicon-send');
			$(event.target).attr('class','btn btn-info center-button button-padding completion-status');
			$(event.target).attr('value','glyphicon glyphicon-send');
		}


		console.log('Completion Status: '+complete_id)
	},
	'click #add-goal' : function(event,template) {
		var goalTitle = template.find('#goal-title').value
		var goalDescription = template.find('#goal-description').value

		var newGoalList = [];
		var objectivesAdded = 0;
		var totalWeight = 0;
		var goalsAdded = 0;
		var pendingWeight = 0;
		var completeWeight = 0;
		var inProgressWeight = 0;

		goalNumbers.forEach(function(item,index,array){
			console.log('Adding goal objectives');
			var newObjective = {};
			var objectiveName = template.find('#goal-objective-'+item).value;
			var objectiveWeight = parseInt(template.find('#goal-objective-wgt-'+item).value);
			var doneSymbol = template.find('#goal-objective-complete-'+item).value;
			var doneColor = template.find('#goal-objective-complete-'+item).getAttribute('class');

			newObjective['isComplete'] = objectiveCompleteStatus(item);
			console.log('Objective name: '+objectiveName);
			newObjective['objectiveWeight']=objectiveWeight;
			newObjective['objectiveName'] = objectiveName;
			newObjective['doneSymbol'] = doneSymbol;
			newObjective['doneColor'] = doneColor;
			totalWeight+=objectiveWeight;
			newGoalList.push(newObjective);
			goalsAdded+=1;
		});

		newGoalList.forEach(function(item,index,array) {
			if (item.isComplete == 0) {
				pendingWeight += item.objectiveWeight
			}
			else if(item.isComplete == 1) {
				inProgressWeight += item.objectiveWeight
			}
			else if(item.isComplete == 2) {
				completeWeight += item.objectiveWeight
			}
		});

		var files = document.getElementById('goal-image');
    // the file is the first element in the files property
    var file = files.files[0];
    var goalImage = Images.insert(file, function (error, fileObj) {
      // Insert error catch here...
    });

    const goalPictureUrl = goalImage.url({brokenIsFine: true});

    var pendingPercentage = Math.round((pendingWeight/totalWeight)*100)
    var inProgressPercentage = Math.round((inProgressWeight/totalWeight)*100)
    var completedPercentage = Math.round((completeWeight/totalWeight)*100)

    var goalDate = template.find('#goal-date').value;
    var isPublic = template.find('#public-goal').checked;

    var completedPercentage = Math.round((completeWeight/totalWeight)*100)

    var cardColorClass = getColorClass(completedPercentage);


    if (isPublic == true) {
    	Meteor.call('addGoal',goalTitle,goalDescription,inProgressPercentage,pendingPercentage,completedPercentage,cardColorClass,newGoalList,false,goalPictureUrl,goalDate);

    	//Create public goal
	    	newGoalList.forEach(function(item,index,array) {
					item.isComplete=0;
					item.doneSymbol='glyphicon glyphicon-option-horizontal'
					item.doneColor = 'btn btn-danger center-button button-padding completion-status'
				});

    	Meteor.call('addGoal',goalTitle,goalDescription,0,100,0,'journey-begun',newGoalList,true,goalPictureUrl,goalDate);
    }
    else {
    	Meteor.call('addGoal',goalTitle,goalDescription,inProgressPercentage,pendingPercentage,completedPercentage,cardColorClass,newGoalList,false,goalPictureUrl,goalDate);
    }

    delayRouteDashboard();

	},
	'change #goal-image': function(event, template) {
		console.log('Changed Image');
  }
}

//Function creates html for newGoalTask
var createNewGoalTask = function(indexNum) {
	let objectiveId = 'goal-objective-'+indexNum;
	let objectiveWeightId = 'goal-objective-wgt-'+indexNum;
	let goalObjectiveComplete = 'goal-objective-complete-'+indexNum;
	let goalToRemove = 'remove-goal-' + indexNum
	let containerId = 'goal-form-container-'+indexNum

	var newObjective = '<div class="goal-line" id="'+containerId+'"><label class="col-sm-1 text-center">Obj</label><div class="col-sm-8"><input type="text" class="form-control" id="'+objectiveId+
		'" placeholder="Objective"></div>'+
		'<div class="col-sm-2"><input type="text" class="form-control" id="'+objectiveWeightId+'"placeholder="wgt"'+'</div></div>'+'<div class="col-sm-1"><button type="button" class="btn btn-danger center-button button-padding completion-status" value="glyphicon glyphicon-option-horizontal" id="'+goalObjectiveComplete+'""><span id="objective-span-'+indexNum+'"class="glyphicon glyphicon-option-horizontal"></span></button></div>'+'<div class="col-sm-12"><button type="button" id="'+goalToRemove+'" class="btn btn-danger center-button button-padding remove-goal">delete</button></div>'
		return newObjective
}

function objectiveCompleteStatus(objectiveId) {
	var objectiveId = $('#goal-objective-complete-'+objectiveId).attr('class')
	if (objectiveId == 'btn btn-info center-button button-padding completion-status') {
		console.log(1)
		return 1
	}
	else if (objectiveId == 'btn btn-danger center-button button-padding completion-status') {
		return 0
	}
	else if (objectiveId == 'btn btn-success center-button button-padding completion-status') {
		return 2
	}
	else {
		return NaN
	}
}

var getColorClass = function(percentage) {
	var completedPercentage = Math.round((percentage)*100)
    if (completedPercentage > 99) {
    	return 'success-color'
    }
    else if (completedPercentage > 70 && completedPercentage <=99) {
    	return 'work-to-go'
    }
    else if (completedPercentage > 50 && completedPercentage <=70) {
    	return 'halfway-there'
    }
    else if (completedPercentage > 30 && completedPercentage <=50) {
    	return 'almost'
    }
    else {
    	return 'journey-begun'
    }
}

function delayRouteDashboard() {
  var timeoutID = window.setTimeout(Router.go('/dashboard'), 1000);
}

