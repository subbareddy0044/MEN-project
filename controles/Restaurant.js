const RestaurantSchema = require("../models/Restaurant");
 exports.filterRestaurants =(req,res)=>{
    let {mealtype , cuisine, location, lcost, hcost , page,sort }= req.body;

    page = page ? page : 1;
    sort = sort ? sort : 1;

    let payload = {};
    const itemsperpage = 10;

    let startIndex = itemsperpage*page - itemsperpage;
    let endIndex = itemsperpage*page;

    if(mealtype){
        payload["type.mealtype"]= mealtype
    }
    if(mealtype && cuisine){
        payload["type.mealtype"]= mealtype
        payload["Cuisine.cuisine"]= {$in : cuisine};
    }
    if(mealtype && lcost && hcost){
        payload["type.mealtype"]= mealtype
        payload["cost"]= {$lte : hcost, $gte : lcost};
    }
    if(mealtype && cuisine && lcost && hcost){
        payload["type.mealtype"]= mealtype
        payload["Cuisine.cuisine"]= {$in : cuisine}
        payload["cost"]= {$lte : hcost, $gte : lcost};
    }
    if(mealtype&& location){
    payload["type.mealtype"]= mealtype;
    payload['locality']=location;
    } 
    if(mealtype&& location&& cuisine){
        payload["type.mealtype"]= mealtype;
        payload['locality']=location;
        payload["Cuisine.cuisine"]= {$in : cuisine}
    }
    if(mealtype&& location&&  lcost && hcost){
    payload["type.mealtype"]= mealtype;
    payload['locality']=location;
    payload["cost"]= {$lte : hcost, $gte : lcost};

    }
    if(mealtype&& location&&  lcost && hcost &&cuisine){
        payload["type.mealtype"]= mealtype;
        payload['locality']=location;
        payload["cost"]= {$lte : hcost, $gte : lcost};
        payload["Cuisine.cuisine"]= {$in : cuisine};
    }

    RestaurantSchema.find(payload).sort({cost: sort})
    .then(response =>{
        const filteredresponse = response.slice(startIndex,endIndex);
        res.status(200).json({
            message:"restaurants fetched succesfully",
            restaurants: filteredresponse
        })
    }).catch(err =>{
        res.status(400).json({err: err})
        console.log(filteredresponse);
    })
}