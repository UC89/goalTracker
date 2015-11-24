var numObjectives = 1
Template.addgoal.events = {
	'click #add-objective' : function(event,template) {
			console.log('Click add objective');
			numObjectives += 1
			let objectiveId = 'goal-objective-'+numObjectives
			var label = '<label class="col-sm-2 text-center">Objective</label><div class="col-sm-10">'
			var label_2 = 'col-sm-2 text-center'
			$(label).apppendTo("#objective-collection");
			$("<input type='text' class='form-control' />")
     .attr("id", objectiveId)
     .attr("name", "myfieldid")
     .appendTo("#objective-collection");
     $('</div>').appendTo('#objective-collection');
	}
}

/*
<label class='col-sm-2 text-center'>Objective</label>
						<div class='col-sm-10'>
							<input type='text' class='form-control' id='goal-objective-1' placeholder='Objective'>
						</div>
*/