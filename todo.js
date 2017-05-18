var app = angular.module("myApp", ["ngStorage","mp.datePicker"]); 

app.controller("myCtrl", function($scope,$localStorage) {
    $scope.datenow=new Date();
    $scope.tag="default";
    $scope.col='white';
    $scope.currentIndex;
    $scope.editable=false;
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
                dateCreated:new Date(),targetDate:new Date($scope.targetDate),
                tags:$scope.tags.split(","),done:false,overdue:false});
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
        $scope.selectedOne=undefined;
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
    $scope.setSelected = function(selected,index){
        $scope.selectedOne=selected;
        $scope.currentIndex=index;
        // selected.done=false;
        //$scope.checkForOverdue(selected);
    }
    $scope.markAsDone = function(toMark){
        toMark.done=true;
        var a=$scope.todos[$scope.currentIndex];
        $scope.todos.splice($scope.currentIndex,1);
        $scope.todos.push(a);
        $localStorage.savedData=$scope.todos;
        $scope.selectedOne=undefined;
    }
    $scope.edit =function(selected){
        if(!$scope.editable){
            $scope.editable=true;
            document.getElementById('editsave').innerHTML='save';
        }else{
            $scope.update();
            document.getElementById('editsave').innerHTML='edit';
        }
    }
    $scope.indexOf = function(selected){
        for(var i = 0; i < $scope.todos.length; i++){
            if($scope.todos[i]===selected){
                return i;
            }
        };
        return -1;
    }
    $scope.checkForOverdue = function(selected){
        if(selected.targetDate<$scope.datenow){
            var ind=$scope.indexOf(selected);
            $scope.todos[ind].overdue=true;
            $localStorage.savedData=$scope.todos;
        }
    }
    $scope.delete = function(toDelete){
        $scope.todos.splice(toDelete,1);
        $localStorage.savedData=$scope.todos;
        $scope.selectedOne=undefined;
    }
    $scope.resetFunc=function(){
        $localStorage.$reset();
        $scope.todos=$localStorage.savedData;
    }
    $scope.update = function(){
        for(var i = 0; i < $scope.todos.length; i++){
            if(typeof $scope.todos[i].targetDate==='string'){
                $scope.todos[i].targetDate=new Date($scope.todos[i].targetDate);
            }
        };
        $scope.editable=false;
        $scope.selectedOne=undefined;
        $localStorage.savedData=$scope.todos;
    }

});