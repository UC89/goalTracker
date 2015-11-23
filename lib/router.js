Router.configure({
		'layoutTemplate':"layout"
});

//Homepage route
Router.route('/', {name:"homepage"});

Router.route('/dashboard',{name:'dashboard'});

Router.route('/navbar',{name:'navbar'});

Router.route('/addgoal',{name:'addgoal'});