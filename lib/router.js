Router.configure({
		'layoutTemplate':"layout"
});

//Homepage route
Router.route('/', function() {
	this.render('homepage');
});

Router.route('/addgoal/:_id', function() {
	this.render('addgoal', {
			data: function (){
				console.log('Router ID: '+this.params._id)
				return Goals.findOne({_id: this.params._id});
			},
			addNewGoal: function (){
				console.log('Router: '+Session.get('addNewGoal'));
				return true;
			}
		});
});

Router.route('/dashboard',{name:'dashboard'});

Router.route('/navbar',{name:'navbar'});

Router.route('/addgoal',{name:'addgoal'});


/*Router.route('/post/:_id', function () {
  this.render('Post', {
    data: function () {
      return Posts.findOne({_id: this.params._id});
    }
  });
});

*/