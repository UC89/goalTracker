var numObjectives = 1

Template.addgoal.events = {
	'click #add-objective' : function(event,template) {
			console.log('Click add objective');
			numObjectives += 1
			let objectiveId = 'goal-objective-'+numObjectives
			let objectiveWeightId = 'goal-objective-wgt-'+numObjectives
			let goalToRemove = 'remove-goal-' + numObjectives
			let containerId = 'goal-form-container-'+numObjectives
			var newObjective = '<div class="goal-line" id="'+containerId+'"><label class="col-sm-2 text-center">Objective</label><div class="col-sm-6"><input type="text" class="form-control" id="'+objectiveId+
				'" placeholder="Objective"></div>'+
				'<div class="col-sm-2"><input type="text" class="form-control" id="'+objectiveWeightId+'"placeholder="wgt"'+'</div></div>'+'<div class="col-sm-2"><button type="button" id="'+goalToRemove+'" class="btn btn-danger center-button button-padding remove-goal">X</button></div>'

     $('#objective-list').append(newObjective);
	},
	'click .remove-goal' : function(event,template) {
		console.log('Click remove objective');
		numObjectives -= 1;
		var goalId = $(event.target).attr('id');
		var goalNumber = goalId.slice(-1)
		let objectiveId = '#goal-form-container-'+goalNumber
		console.log('Clicked remove ID: '+goalId);

		$(objectiveId).empty();
		$(objectiveId).remove();
	},
	'click #add-goal' : function(event,template) {
		console.log('click add goal');
		//goal-objective-# and goal-objective-wgt-#
		var newGoalObject = {}
		var goalTitle = template.find('#goal-title').value
		var goalDescription = template.find('#goal-description').value

		newGoalObject['goalTitle'] = goalTitle
		newGoalObject['goalDescription'] = goalDescription
		newGoalObject['belongsTo'] = Meteor.userId()

		var newGoalList = [];
		var objectivesAdded = 0
		var totalWeight = 0
		var goalsAdded = 1

		while (goalsAdded <= numObjectives) {
			console.log('goal #'+objectivesAdded);
			var newObjective = {};
			var objectiveName = template.find('#goal-objective-'+goalsAdded).value;
			var objectiveWeight = parseInt(template.find('#goal-objective-wgt-'+goalsAdded).value);
			newObjective[objectiveName]=objectiveWeight;
			totalWeight+=objectiveWeight;
			console.log('totalWeight: '+totalWeight);
			console.log(newObjective);
			newGoalList.push(newObjective);
			goalsAdded+=1;
		}

		newGoalObject['goalObjectives'] = newGoalList
		newGoalObject['totalWeight'] = totalWeight
		console.log(newGoalObject)
		Goals.insert(newGoalObject)
		console.log('Added new goal')
	}
}
