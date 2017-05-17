var app = angular.module("myApp", ["ngStorage"]); 

app.controller("myCtrl", function($scope,$localStorage) {
    $scope.dnow=new Date();
    $scope.tag="default";
    $scope.col='white';
    if(!$scope.todos){
        $scope.todos=[];
        if($localStorage.savedData){
            $localStorage.savedData.forEach(function(entry){
                $scope.todos.push(entry);
            });
        }
    }

    if(!$localStorage.savedData && $scope.todos){
        $localStorage.savedData=$scope.todos;
    }

    $scope.addItem=function(){
    	
    	$scope.todos.push({name:$scope.name,description:$scope.description,
                dateCreated:new Date(),targetDate:$scope.targetDate,tags:$scope.tags.split(","),done:false});
        $localStorage.savedData=$scope.todos;

        $scope.selectedOne=undefined;
        $scope.tag='default';
        
        $scope.name="";
        $scope.description="";
        $scope.targetDate="";
        $scope.tags=[];
        
    }

    $scope.filterByTag = function(tag){
        $scope.tag=tag;
    }

    $scope.hasTag = function(list,tag){
        if(tag==='default') return true;
        var result=false;
        if(list==undefined) return false;
        list.forEach(function(member){
            if(member==tag){
                result = true;
                //break;  //no idea why break won't work.
            }
            
        });
        return result;
    }
    $scope.setSelected = function(selected){
        $scope.selectedOne=selected;
    }

    $scope.markAsDone = function(toMark){
        toMark.done=true;
    }

    $scope.delete = function(toDelete){
        delete $localStorage.savedData[toDelete];
        $scope.todos=$localStorage.savedData;
        $scope.selectedOne=undefined;
    }

    $scope.resetFunc=function(){
        $localStorage.$reset();
        $scope.todos=$localStorage.savedData;
    }

});