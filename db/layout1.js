var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
   $routeProvider
    .when('/home',{templateUrl:"home.html",controller:"homectrl"})
    .when("/about",{templateUrl:"gioithieu.html" })
     .when("/contact",{templateUrl:"lienhe.html"})
     .when('/gopy',{templateUrl:"gopy.html"})
     .when("/hoidap",{templateUrl:"hoidap.html" })
     .when("/tn/:id/:name",{templateUrl:"quiz.html",controller:"tnctrl"})   
     .when("/account/suatk",{templateUrl:"suatk.html",controller:"suatk"})
     .when("/account/doimk",{templateUrl:"doiMk.html",controller:"myctrl"})
    .otherwise({redirectTo:"home"})
    

});
app.filter('counter', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])
app.directive('quiz',function(quizfactory ,$routeParams,$interval){
    return{
        restrict: 'AE',
        scope:{},
        templateUrl:'quiz1.html',
        link:function(scope,elem,attrs){
            scope.homnay=new Date();
            scope.counter = 1800;
            $interval(function(){console.log(scope.counter--)},1000);
            scope.start=function(){
                quizfactory.getQuestion().then(function(){
                    scope.subjectName=$routeParams.name;
                    scope.id=0;
                    scope.inProgress=true;
                    scope.quizOver=false;// in complete
                    scope.getQuestions();
                });
             
            };
            scope.reset=function(){
                scope.inProgress=false
                scope.score=0;
            };
            scope.getQuestions=function(){
                var quiz=quizfactory.getQuestions(scope.id)
                if(quiz){
                    scope.question=quiz.Text;
                    scope.options=quiz.Answers;
                    scope.answer=quiz.AnswerId;
                    scope.answerMode=true;
                }else{
                    scope.quizOver=true;// in complete

                }
             
            }
         
            scope.nextQuestion=function(){
                scope.id++;
                scope.getQuestions();
            };
            scope.checkAnswer = function () {
                if (!$('input[name = answer]:checked').length) return;
                var ans = $('input[name = answer]:checked').val();
                if (ans == scope.answer) {
                    scope.score++;
                    scope.correctAns=true;
                } else {
                    scope.correctAns=false;
                }
                scope.answerMode=false;
            };
            scope.reset();
        }
    }
});
app.factory('quizfactory',function($http,$routeParams){
      
        return{
            getQuestion:function(){
               return $http.get('../db/Quizs/'+$routeParams.id+'.js').then(function(res){
                    questions=res.data;
                });
            },
            getQuestions:function(id){
                    var randomItem=questions[Math.floor(Math.random()*questions.length)];
                    var count=questions.length;
                    if(count>11){
                        count=11;
                    }if(id<count){
                        return randomItem;
                    }else{
                        return false;
                    }               
            }
        }
})
app.controller("tnctrl",function($scope,$routeParams,$http,quizfactory){
    $http.get("../db/Quizs/"+$routeParams.id+".js").then(
        function(d) {quizfactory.questions = d.data
        });
});
app.controller("homectrl",function($scope,$http){
    $scope.start=0;
    $scope.monhoc=[];
    $http.get("db/Subjects.js").then(function(d){$scope.monhoc=d.data; } );
    $scope.tiep=function(){
        $scope.start+=3;
    }
    $scope.truoc=function(){
        $scope.start-=3;
    }
});

app.controller("dkctrl",function($scope){
    $scope.$parent.students=[
        {
            "username": "teonv",
            "password": "iloveyou",
            "fullname": "Nguyễn Văn Tèo",
            "email": "teonv@fpt.edu.vn",
         
        }
    ];                
            $scope.student={};
            $scope.index= -1;
            $scope.insert=function(){
                $scope.students.push(angular.copy($scope.student));
                alert("success");
                sessionStorage.setItem("username",$scope.student.username);
                sessionStorage.setItem("password",$scope.student.password);
                sessionStorage.setItem("fullname",$scope.student.fullname);
                sessionStorage.setItem("email",$scope.student.email);
                document.location="login.html"

            }
       });

app.controller("myctrl",function($scope)
{
      $scope.dn=function(){
          var u=$scope.u;
          var p=$scope.p;
          var tc=false;
          var motsv;
          for(var i=0; i<list.length; i++){
              motsv = list[i];
              if(u==motsv.username&&p==motsv.password){
                  tc=true;
                  break;
              }
          }
          if(tc){
           
        document.location ="layout.html";
          }
      }
});
app.controller("suatk",function($scope)
{
  
  var username = sessionStorage.getItem("username");
  var password = sessionStorage.getItem("password");
  var email = sessionStorage.getItem("email");
  var fullname = sessionStorage.getItem("fullname");       
  $scope.user = username;
  $scope.name = fullname;
  $scope.email = email;

  $scope.update = function(){
    username = sessionStorage.setItem("username",$scope.user);
    email = sessionStorage.setItem("email",$scope.email);
    fullname = sessionStorage.setItem("fullname",$scope.fullname);
    alert("Cập Nhật Thành Công");
  }

     $scope.change = function(){
          if(username==$scope.pass)
        {
            password = sessionStorage.getItem("password",$scope.newpass);
            alert("Cập Nhật Thành Công");
        }
        else{
          alert("Sai Mật Khẩu Hiện Tại");
      } 
      }



})
app.controller("myctrl",function($scope)
{
  
  var username = sessionStorage.getItem("username");
  var password = sessionStorage.getItem("password");
  var email = sessionStorage.getItem("email");
  var fullname = sessionStorage.getItem("fullname");       
  $scope.pass = password;
  $scope.update = function(){
    password = sessionStorage.setItem("password",$scope.newpass);
    alert("Cập Nhật Thành Công");
  }

     $scope.change = function(){
          if(username==$scope.pass)
        {
            password = sessionStorage.getItem("password",$scope.newpass);
            alert("Cập Nhật Thành Công");
        }
        else{
          alert("Sai Mật Khẩu Hiện Tại");
      } 
      }
})
app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
    $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
    $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError', function () {
    $rootScope.loading = false;
    alert("Lỗi");
    });
   });