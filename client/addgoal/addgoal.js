var numObjectives = 1
Template.addgoal.events = {
	'click #add-objective' : function(event,template) {
			console.log('Click add objective');
			numObjectives += 1
			let objectiveId = 'goal-objective-'+numObjectives
			var newObjective = '<label class="col-sm-2 text-center">Objective</label><div class="col-sm-10"><input type="text" class="form-control" id="'+objectiveId+'" placeholder="Objective"></div>'

     $('#objective-list').append(newObjective);
	},
	'click #remove-objective' : function(event,template) {
		console.log('Click remove objective');
		let objectiveId = '#goal-objective-'+numObjectives
		numObjectives -= 1;
		$(objectiveId).remove();
	}
}

/*
<label class='col-sm-2 text-center'>Objective</label>
						<div class='col-sm-10'>
							<input type='text' class='form-control' id='goal-objective-1' placeholder='Objective'>
						</div>
*/