Blocks = new Meteor.Collection("blocks");
 
function saveBlock() {
	var block = Blocks.findOne({});
	var o = block.text;
	var n = $('.editor').html();
	if(o != n) {
		Blocks.update(block._id, { $set: { text: n } });
		console.log("save");
	}
}
 
if (Meteor.isClient) {
 
	Session.set('blocksLoading', true);
  
	Meteor.subscribe('blocks', function() {
			console.log('block subs completed');
			Session.set('blocksLoading', false);
		});
 
	Template.blocks.blocksLoading = function () {
		return Session.equals('blocksLoading', true);
	};
 
	Template.block.random = function () {
		return Math.random();
	};
 
	Template.blocks.blocks = function () {
		return Blocks.find();
	};
 
	Meteor.setInterval(function() { saveBlock(); }, 1000);
}
 
if (Meteor.isServer) {
	if(Blocks.find().count() == 0)
		Blocks.insert({text: "edit me"});
  
	Meteor.publish("blocks", function (s) {
			return Blocks.find();
		});
}
