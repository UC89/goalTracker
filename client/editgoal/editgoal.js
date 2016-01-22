var newObjectivesArray = []

Template.editgoal.rendered = function(){
	console.log('editgoal rendered');
	console.log('data: '+this.data);
	var editGoalId = this.find('.editGoalId').getAttribute('id');
	console.log('Edit goal Id: '+editGoalId);
	goal = Goals.findOne({'_id':editGoalId});
	console.log('editGoalId: '+editGoalId);
	numNewObjectives = Object.keys(goal.objectives).length;
	newObjectivesArray = Object.keys(goal.objectives);
	newObjectivesArray.forEach(function(item,index,array){
			newObjectivesArray[index] = Number(item);
	});
	console.log('New Array: '+newObjectivesArray)
}



Template.editgoal.events = {
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
	},
	'click .remove-goal' : function(event,template) {
		var goalId = $(event.target).attr('id');
		var goalNumber = Number(goalId.slice(-1));
		var positionOf = newObjectivesArray.indexOf(goalNumber);
		console.log('Pre Array:L '+newObjectivesArray);
		console.log('Goal Number should be: '+goalNumber+'\n Position: '+positionOf)
		newObjectivesArray.splice(positionOf,1);
		console.log('Array After: '+newObjectivesArray);
		let objectiveId = '#goal-form-container-'+goalNumber;
		console.log('New Objectives Array: '+newObjectivesArray)
		$(objectiveId).empty();
		$(objectiveId).remove();
	},
	'click #add-objective' : function(event,template) {
		console.log('click add objective');
			var objectiveIdNum = Math.max.apply(null, newObjectivesArray)+1;
			if (isNaN(objectiveIdNum)==true || objectiveIdNum==-Infinity) {
				console.log('isNan');
				objectiveIdNum=1;
				}
		newObjectivesArray.push(objectiveIdNum);
		newObjective = createNewGoalTask(objectiveIdNum);
		console.log('After add: '+newObjectivesArray)
		$('#objective-list').append(newObjective);
	},
	'click #edit-goal' : function(event,template) {
		var editGoalId = template.find('.editGoalId').getAttribute('id');

		var imageUrl = template.find('.editGoalPicture').getAttribute('src');

		console.log('Should edit: '+editGoalId)
		var goalTitle = template.find('#goal-title').value
		var goalDescription = template.find('#goal-description').value
		var newGoalObject = {}
		var newColor = ''
		newGoalObject['goalTitle'] = goalTitle
		newGoalObject['goalDescription'] = goalDescription

		var editedObjectives = []

		var totalWeight = 0;
		var goalsAdded = 0;
		var pendingWeight = 0;
		var completeWeight = 0;
		var inProgressWeight = 0;

		newObjectivesArray.forEach(function(item,index,array){
			var newObjective = {};

			var objectiveName = template.find('#goal-objective-'+item).value;
			var objectiveWeight = parseInt(template.find('#goal-objective-wgt-'+item).value);
			var doneSymbol = template.find('#goal-objective-complete-'+item).value;
			var doneColor = template.find('#goal-objective-complete-'+item).getAttribute('class');

			newObjective['isComplete'] = Number(objectiveCompleteStatus(item));
			newObjective['objectiveName'] = objectiveName;
			newObjective['objectiveWeight'] = Number(objectiveWeight);
			console.log('Obj Weight: '+Number(objectiveWeight))
			newObjective['doneColor'] = doneColor;
			newObjective['doneSymbol'] = doneSymbol;

			editedObjectives.push(newObjective)
		});

		editedObjectives.forEach(function(item,index,array) {
				console.log('Weight added: '+item.objectiveWeight)
				if (item.isComplete == 0) {
					pendingWeight += item.objectiveWeight;
				}
				else if(item.isComplete == 1) {
					inProgressWeight += item.objectiveWeight;
				}
				else if(item.isComplete == 2) {
					completeWeight += item.objectiveWeight;
				}
				totalWeight+= item.objectiveWeight;
		});

		var pendingPercentage = Math.round((pendingWeight/totalWeight)*100)
	  var inProgressPercentage = Math.round((inProgressWeight/totalWeight)*100)
	  var completedPercentage = Math.round((completeWeight/totalWeight)*100)

	  console.log('PendingWeight '+pendingWeight);
	  console.log('totalWeight: '+totalWeight);
	  console.log('pendingPercentage: '+pendingPercentage)
	  var completedPercentage = Math.round((completeWeight/totalWeight)*100);
	  if (completedPercentage > 99) {
	  	newColor = 'success-color'
	  }
	  else if (completedPercentage > 70 && completedPercentage <=99) {
	  	newColor = 'work-to-go'
	  }
	  else if (completedPercentage > 50 && completedPercentage <=70) {
	  	newColor = 'halfway-there'
	  }
	  else if (completedPercentage > 30 && completedPercentage <=50) {
	  	newColor = 'almost'
	  }
	  else {
	  	newColor = 'journey-begun'
	   }

	   Goals.update({'_id':editGoalId},{'goalTitle':goalTitle,'goalDescription':goalDescription,'inProgressPercentage':inProgressPercentage,'pendingPercentage':pendingPercentage,'completedPercentage':completedPercentage,'goalCardColorClass':newColor,'objectives':editedObjectives,'belongsTo':Meteor.userId(),'isPublic':false,'goalPictureUrl':imageUrl},{'upsert':true})

	    setTimeout(function(){
    	Router.go('/dashboard'),3000});
	 }
}

var createNewGoalTask = function(indexNum) {
	let objectiveId = 'goal-objective-'+indexNum;
	let objectiveWeightId = 'goal-objective-wgt-'+indexNum;
	let goalObjectiveComplete = 'goal-objective-complete-'+indexNum;
	let goalToRemove = 'remove-goal-' + indexNum
	let containerId = 'goal-form-container-'+indexNum

	var newObjective = '<div class="goal-line" id="'+containerId+'"><label class="col-sm-1 text-center">New</label><div class="col-sm-8"><input type="text" class="form-control" id="'+objectiveId+
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