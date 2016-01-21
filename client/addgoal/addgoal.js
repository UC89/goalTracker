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
	'click .remove-goal' : function(event,template) {
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

		goalNumbers.forEach(function(item,index,array){
			console.log('ADding goal objectives')
			var newObjective = {};
			var objectiveName = template.find('#goal-objective-'+item).value;
			var objectiveWeight = parseInt(template.find('#goal-objective-wgt-'+item).value);
			console.log('Objective name: '+objectiveName)
			newObjective[objectiveName]=objectiveWeight;
			totalWeight+=objectiveWeight;
			newGoalList.push(newObjective);
			goalsAdded+=1;
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

    Goals.insert(newGoalObject);

   	Router.go('/dashboard')
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

	var newObjective = '<div class="goal-line" id="'+containerId+'"><label class="col-sm-2 text-center">Objective</label><div class="col-sm-6"><input type="text" class="form-control" id="'+objectiveId+
		'" placeholder="Objective"></div>'+
		'<div class="col-sm-2"><input type="text" class="form-control" id="'+objectiveWeightId+'"placeholder="wgt"'+'</div></div>'+'<div class="col-sm-1"><button type="button" id="'+goalToRemove+'" class="btn btn-danger center-button button-padding remove-goal">X</button></div>'+
		'<div class="col-sm-1"><button type="button" class="btn btn-success center-button button-padding" id="'+goalObjectiveComplete+'""><span class="glyphicon glyphicon-ok"></span></button></div>'
		return newObjective
}

