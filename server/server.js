Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  }
});

Meteor.publish("users", function(){
  return Meteor.users.find({},{fields:{profile:1}})
})

//Meteor.subscribe("users");