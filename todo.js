var app = angular.module("myApp", ["ngStorage"]); 

app.controller("myCtrl", function($scope,$localStorage) {
    $scope.dnow=new Date();
   
   //window.localStorage['data']=JSON.stringify(fst);
    
    var fst=[{name:"GoHOME",description:"Need to go home",dateCreated:'15/05/2017',
        targetDate:'20/05/2017',tags:["first","second"]}];
    var snd=[{name:"haha",description:"asdfadsf",dateCreated:'15/1/2017',
        targetDate:'20/01/2017',tags:["frst","scnd"]}];
    //$scope.saved = localStorage.getItem('data');
    
   
    if(!$scope.todos){
        $scope.todos=[];
        if($localStorage.savedData){
            $localStorage.savedData.forEach(function(entry){
                $scope.todos.push(entry);
            });
        }
    }
    if(!$localStorage.savedData && $scope.todos){
        //if(!$scope.todos)$scope.todos=[$localStorage.savedData];
        $localStorage.savedData=$scope.todos;
    }
    $scope.addItem=function(){
    	
    	$scope.todos.push({name:$scope.name,description:$scope.description,
                dateCreated:new Date(),targetDate:$scope.targetDate,tags:$scope.tags.split(",")});
        //localStorage.setItem('data', JSON.stringify($scope.todos));
        $localStorage.savedData=$scope.todos;

        $scope.name="";
        $scope.description="";
        $scope.targetDate="";
        $scope.tags=[];
        
    }

    $scope.resetFunc=function(){
        $localStorage.$reset();
        $scope.todos=$localStorage.savedData;
    }

});