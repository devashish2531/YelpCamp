var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment")
var data=[
	{
		name: "Waterfall",
		image:"https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		description: "Lorem ipsum dolor sit amet, pri ex melius vulputate voluptaria. Omnes scripserit sea in. Vix no labore semper salutandi, et iusto consul mei, eu perpetua argumentum nec. Enim wisi aliquip has ne. Antiopam delicata contentiones eu vix, ex liber meliore posidonium duo, in apeirian hendrerit suscipiantur per. Tation virtute eam in. Causae accumsan detracto ex vel."
	},
	{
		name:"Mountains",
		image:"https://images.pexels.com/photos/1428277/pexels-photo-1428277.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		description:"No pri aliquam maiestatis. Et per labore scaevola, vis latine scriptorem an. Ut equidem eligendi pro, ne nulla iuvaret feugiat vis, brute lobortis ad pro. Est summo nominavi postulant id, prima epicurei delicatissimi ne pro. Mea et hinc novum pertinax, mel iusto contentiones ad. Eum ad nisl argumentum, ut regione expetendis est.An mea tamquam ocurreret. Ea augue postea reformidans vis. Ius placerat percipit ei, percipitur ullamcorper per at, has tibique repudiare inciderint et. Quo delenit indoctum ne."
	},
	{
		name:"Lake",
		image:"https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
		description:"Ei cum facer constituto, illud ullum tempor sea in. Sit et maiorum argumentum. At solet legimus definitiones has, an mucius putent deleniti eum. Ut vim oblique menandri legendos, ex cum reque iisque mandamus. Eu sit duis explicari, eleifend dissentiunt id sit. Ad prima discere vulputate usu, harum volumus efficiendi et vix."
	}
];

function seedDB(){
	//REMOVE ALL THE CAMPGROUNDS
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log("removed Campgrounds");

			data.forEach(function(seed){
				Campground.create(seed,function(err,campground){
					if(err){
						console.log(err);
					}else{
						console.log("ADDED A CAMPGROUND");
						//CREATE A COMMENT
						Comment.create({
							text:"This place is great,but I wish there was Internet!",
							author:"Homer"
						},function(err,comment){
							if(err){
								console.log(err);
							}else{ 
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}
						});
					}
				});
			});
		}
	});

	//ADD A FEW CAMPGROUNDS


}

module.exports=seedDB;
