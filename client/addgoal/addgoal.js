var numObjectives = 1

Template.addgoal.events = {
	'click #add-objective' : function(event,template) {
			console.log('Click add objective');
			numObjectives += 1
			let objectiveId = 'goal-objective-'+numObjectives
			let objectiveWeightId = 'goal-objective-wgt-'+numObjectives
			let containerId = 'goal-form-container-'+numObjectives
			var newObjective = '<div id="'+containerId+'"><label class="col-sm-2 text-center">Objective</label><div class="col-sm-8"><input type="text" class="form-control" id="'+objectiveId+
				'" placeholder="Objective"></div>'+
				'<div class="col-sm-2"><input type="text" class="form-control" id="'+objectiveWeightId+'"placeholder="wgt"'+'</div></div>'

     $('#objective-list').append(newObjective);
	},
	'click #remove-objective' : function(event,template) {
		console.log('Click remove objective');
		let objectiveId = '#goal-form-container-'+numObjectives
		numObjectives -= 1;
		console.log('Removing: '+objectiveId);
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
