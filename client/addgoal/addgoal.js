var numObjectives = 0
var goalNumbers = []

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
	'click #remove-goal' : function(event,template) {
		console.log('Click remove objective');
		numObjectives -= 1;
		var goalId = $(event.target).attr('id');
		var goalNumber = Number(goalId.slice(-1));
		var positionOf = goalNumbers.indexOf(goalNumber);
		console.log(typeof goalNumber);
		console.log(typeof goalNumbers[1]);
		console.log('Position of: '+goalNumber+' is: '+positionOf);
		goalNumbers.splice(positionOf,1);
		let objectiveId = '#goal-form-container-'+goalNumber;
		console.log('Clicked remove ID: '+goalNumber);
		console.log('Goal Numbers after remove: '+goalNumbers);

		$(objectiveId).empty();
		$(objectiveId).remove();
		numObjectives -= 1;
	},
	'click .completion-status' : function(event,template) {
		var complete_id =  $(event.target).attr('id');
		if ($(event.target).children().attr('class')=='glyphicon glyphicon-ok') {
			$(event.target).children().attr('class', 'glyphicon glyphicon-option-horizontal')
			$(event.target).attr('class','btn btn-danger center-button button-padding completion-status');
		}
		else if ($(event.target).children().attr('class')=='glyphicon glyphicon-send') {
			$(event.target).children().attr('class', 'glyphicon glyphicon-ok')
			$(event.target).attr('class','btn btn-success center-button button-padding completion-status');
		}
		else if($(event.target).children().attr('class')=='glyphicon glyphicon-option-horizontal') {
			$(event.target).children().attr('class', 'glyphicon glyphicon-send')
			$(event.target).attr('class','btn btn-info center-button button-padding completion-status');
		}


		console.log('Completion Status: '+complete_id)
	},
	'click #add-goal' : function(event,template) {
		var newGoalObject = {}
		var goalTitle = template.find('#goal-title').value
		var goalDescription = template.find('#goal-description').value

		newGoalObject['goalTitle'] = goalTitle
		newGoalObject['goalDescription'] = goalDescription
		newGoalObject['belongsTo'] = Meteor.userId()

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
			newObjective['isComplete'] = objectiveCompleteStatus(item);
			console.log('Objective name: '+objectiveName);
			newObjective['objectiveWeight']=objectiveWeight;
			newObjective['objectiveName'] = objectiveName;
			totalWeight+=objectiveWeight;
			newGoalList.push(newObjective);
			goalsAdded+=1;
		});

		newGoalList.forEach(function(item,index,array) {
			console.log('item: '+ item);
			console.log('index: '+ index);
			console.log('array: '+ array);
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
    newGoalObject['goalPictureUrl'] = goalPictureUrl;
    newGoalObject['objectives'] = newGoalList
    newGoalObject['pendingPercentage'] = Math.round((pendingWeight/totalWeight)*100)
    newGoalObject['inProgressPercentage'] = Math.round((inProgressWeight/totalWeight)*100)
    newGoalObject['completedPercentage'] = Math.round((completeWeight/totalWeight)*100)

    var goalDate = template.find('#goal-date').value
    var isPublic = template.find('#public-goal').checked

    newGoalObject['isPublic'] = isPublic;

    if (newGoalObject['isPublic']==true) {
    	console.log('Reset completions vars');
    }
    Goals.insert(newGoalObject);

    if (isPublic == true) {
    	var newGoalObjectSelf = newGoalObject;
    	newGoalObjectSelf['isPublic'] = false;
    	Goals.insert(newGoalObjectSelf)
    }
    setTimeout(function(){
    	Router.go('/dashboard'),3000});
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
		'<div class="col-sm-2"><input type="text" class="form-control" id="'+objectiveWeightId+'"placeholder="wgt"'+'</div></div>'+'<div class="col-sm-1"><button type="button" class="btn btn-danger center-button button-padding completion-status" id="'+goalObjectiveComplete+'""><span class="glyphicon glyphicon-option-horizontal"></span></button></div>'+'<div class="col-sm-12"><button type="button" id="'+goalToRemove+'" class="btn btn-danger center-button button-padding remove-goal">delete</button></div>'
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

