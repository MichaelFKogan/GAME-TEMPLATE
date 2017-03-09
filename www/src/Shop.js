// Add the following code to your project to create an IAP object and add an array called list to it.
// If you created more than one In App Purchase make sure to also add them to the array. Next we will create a load method for our IAP object.

IAP = {
  list: [ "adfree"]
};


// Here we are making use of the storekit object that the plugin has made available to our PhoneGap project. Storekit is used to interface between our application and the In App Purchases available in iTunes Connect. We call the init method which is supplied 4 callback functions: onReady, onPurchase, onRestore and onError. We will create those now.

IAP.load = function () {
 
     // Check availability of the storekit plugin
     if (!window.storekit) {
          console.log("In-App Purchases not available");
          return;
     }
 
     // Initialize
     storekit.init({
          debug:    true, // Enable IAP messages on the console
          ready:    IAP.onReady,
          purchase: IAP.onPurchase,
          restore:  IAP.onRestore,
          error:    IAP.onError
     });
 
};


IAP.onReady = function () {
     storekit.load(IAP.list, function (products, invalidIds) {
          IAP.products = products;
          IAP.loaded = true;
          for (var i = 0; i < invalidIds.length; ++i) {
               console.log("Error: could not load " + invalidIds[i]);
          }
     });
};


// This code will be triggered once a successful purchase has occurred. This is where you would place your code that removes the advertisements from the application. If you have multiple products, then you would place multiple if statements inside of this function testing for the different productId’s.

IAP.onPurchase = function (transactionId, productId, receipt) {
     if(productId === 'adfree'){
          alert("Ads Removed!");
          //Code to remove ads for the user
     }
};

// As I mentioned before, if someone deletes your application, changes devices or something else that would cause them to lose their purchase then they must be able to restore it. You must provide the ability to trigger this restore process from somewhere in your application otherwise you will not make it past Apple’s review process. All you need to do is provide the same code here that you would have for the onPurchase method – it’s just like they are buying it again.

IAP.onRestore = function (transactionId, productId, transactionReceipt) {
     if(productId == 'adfree'){
          //Code to remove ads for the user
     }
};

// Create an error method. 
// If something went wrong, let’s find out about it!

IAP.onError = function (errorCode, errorMessage) {
     console.log(errorCode);
     console.log(errorMessage);
};

// Create a buy method. 
//When we want to trigger a purchase, we will use this method to pass along the productId.
IAP.buy = function(productId){
     // storekit.purchase(productId);
};

// Create a restore method.
// This will be used to trigger the restore process mentioned above.
IAP.restore = function(){
     // storekit.restore();
};

// Call the load method once the device is ready
// Ok, we’re getting there! Our IAP object now has all the bells and whistles it needs. Now we just need to call the load method (make sure you trigger this after the deviceready event has fired)

document.addEventListener("deviceready", function(){
     IAP.load();
}, false);


//Now all that is left to do is trigger a purchase.
// Add the following code to trigger a purchase after the In App Purchases have been loaded

IAP.buy('adfree');









//     //http://www.joshmorony.com/how-to-create-ios-in-app-purchases-with-phonegap-build/


// This function will handle hiding and showing the shop overlay. We call overlay() when we want to open the shop, and we call overlay() again when we want to close it.


function overlay() {
    el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    window.scrollTo(0, 0);
}








// When I’m ready to load my shop content I call a function called renderIAPs that loops through all of my In App Purchases and regular items, and builds one big string that contains the HTML elements I require. Once I’ve got everything I need in the string, I change the innerHTML of the shopContent to include the string:

function renderIAPs (el) {
 
    var html = "<button class = 'close' onclick = 'overlay()'></button><ul>";
 
    //Note: this is using code that is not present in this example file. Please see
    //http://www.joshmorony.com/how-to-create-ios-in-app-purchases-with-phonegap-build/
    //For information on how to include In App Purchases. Otherwise you can just remove this

// Each of these buttons triggers another function when tapped that will handle the purchase. I haven’t included that code in this tutorial but essentially you will just check if the user has enough “currency” to purchase the item, and then trigger the code that activates the item. Also note that at the end of this function we are calling an overlay() function.

    if (IAP.loaded) {
        var adfree  = IAP.products["adfree"];
        var doubleshurikens = IAP.products["doubleshurikens"];
 
        //Add all available in app purchases
        for (var id in IAP.products) {
            var prod = IAP.products[id];
            html += "<li>" +
            "<h3>" + prod.title + "</h3>" +
            "<p><img src = 'assets/"+prod.id+".png' /> " + prod.description + "</p>" +
            "<button type='button' " +
            "onclick='IAP.buy(\"" + prod.id + "\")'>" +
            prod.price + "</button>" +
            "</li>";
        }
    }
 
    //Add all the normal items
    html += "<li>" +
    "<h3>Pink Headband</h3>" +
    "<p><img src = 'assets/buypinkheadband.png' /> Real ninjas wear pink! Let the colour of femininity and tenderness guide you on your path to greatness.</p>" +
    "<button id='pinkHeadband' type='button' " +
    "onclick='purchaseHeadband(\"pinkHeadband\", 5)'>5 <img class = 'shurikenPrice' src = 'assets/shurikenscore.png' /></button>" +
    "</li>";  
 
    html += "<li>" +
    "<h3>Blue Headband</h3>" +
    "<p><img src = 'assets/buyblueheadband.png' /> It is said that the colour blue brings depth and stability. Maybe this headband will stop you falling off the rope so much?</p>" +
    "<button id = 'blueHeadband' type='button' " +
    "onclick='purchaseHeadband(\"blueHeadband\", 5)'>5 <img class = 'shurikenPrice' src = 'assets/shurikenscore.png' /></button>" +
    "</li>";
 
    html += "<li>" +
    "<h3>Level Pack</h3>" +
    "<p><img src = 'assets/buylevels.png' /> A ninja gets bored playing on the same old levels all the time. Purchase this to unlock 4 new levels to play on!</p>" +
    "<button id = 'levels' type='button' " +
    "onclick='purchaseLevels(5)'>5 <img class = 'shurikenPrice' src = 'assets/shurikenscore.png' /></button>" +
    "</li>";  
 
    html += "<li>" +
    "<h3>Gold Ninja</h3>" +
    "<p><img src = 'assets/buygoldninja.png' /> The Gold Ninja is legend. It is prophecy that those who control the Gold Ninja will rise to the top of the leaderboards.</p>" +
    "<button id = 'goldninja' type='button' " +
    "onclick='purchaseNinja(5)'>5 <img class = 'shurikenPrice' src = 'assets/shurikenscore.png' /></button>" +
    "</li>";                  
 
    html += "</ul>";
    el.innerHTML = html;
 
    overlay();
};









