Meteor.methods({
	'fetchAPIData':function(postId){
		   var post = Posts.findOne({_id:postId});
      if(!post)
      	throw new Meteor.error("could not find post");
          
      this.unblock();
   
       var apikey = '42385db850311d0836bca7a00b3acbfd';
          var jsonparams = '&size=1&search=' + encodeURIComponent(post.title);
          var url = 'http://services.wine.com/api/beta2/service.svc/JSON/catalog?apikey=' + apikey + jsonparams;
          var data = Meteor.http.call("GET", url);
          var winedotcomData = _.first(JSON.parse(data.content).Products.List);
          //console.log(winedotcomData);


          //call other api
          //var snoothData

          //st68uj5u3iiugs6lq4a5w8xtpb160y8st7xil0iiltpaoqg6
          var snoothResponse = Meteor.http.call("GET","http://api.snooth.com/wines/",{
          	params:{
          		q:post.title,
          		n:1,
          		akey:"st68uj5u3iiugs6lq4a5w8xtpb160y8st7xil0iiltpaoqg6"
          	}
          });
          //console.log(snoothResponse);
          var snoothData = _.first(JSON.parse(snoothResponse.content).wines);

          //console.log(JSON.parse(snoothResponse.content));

          Posts.update(post._id, {$set: {
          	winedotcomData:winedotcomData,
          	snoothData:snoothData
          }}, {validate: false});
	}
});