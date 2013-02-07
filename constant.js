Blocks = new Meteor.Collection("blocks");

if (Meteor.isClient) {

  Session.set('blocksLoading', true);
  Meteor.subscribe('blocks', function() {
    console.log('blocks received');
    Session.set('blocksLoading', false);
  });

  Template.block.created = function () {
    this.rndval = Math.random();
    console.log("created", this.rndval);
  };

  Template.block.destroyed = function () {
    console.log("destroyed", this.rndval);
  };

  Template.block.rendered = function () {
    console.log("rendered", this.rndval);
  };

  Template.main.blocksLoading = function () {
    return Session.equals('blocksLoading', true);
  };

  Template.blocks.blocks = function () {
    return Blocks.find();
  };

  Template.blocks.events({
    'click button': function () {
      Blocks.update(Blocks.findOne()._id, { $set: { foo: Math.random() } });
    }
  });
}
 
if (Meteor.isServer) {
  if(Blocks.find().count() == 0)
    Blocks.insert({text: "edit me"});
  
  Meteor.publish("blocks", function (s) {
    return Blocks.find();
  });
}
