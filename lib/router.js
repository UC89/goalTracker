Router.configure({
		'layoutTemplate':"layout"
});

//Homepage route
Router.route('/', function() {
	this.render('homepage');
});

Router.route('/editgoal/:_routeId', function() {
	this.render('editgoal', {
			data: function () {
				console.log('Goal: '+Goals.findOne())
				return Goals.findOne(this.params._routeId);
			}
		});
});

Router.route('/dashboard',{name:'dashboard'});

Router.route('/searchGoals', {name:'searchGoals'});

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