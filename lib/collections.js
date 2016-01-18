Goals =  new Mongo.Collection('goals');

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

/*Houston.add_collection(Meteor.users);
Houston.add_collection(Houston._admins);
*/