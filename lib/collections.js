Goals =  new Mongo.Collection('goals');

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

profileImages = new FS.Collection('profileImages', {
	stores: [new FS.Store.FileSystem('profileImages', {path: '~/uploads'})]
});

