var app=angular.module("myapp",[]);
app.controller("myapp",function($scope){
    $scope.student={};
      $scope.index=-1;
    $scope.$parent.students =  [
{
    "username": "teonv",
    "password": "iloveyou",
    "fullname": "Nguyễn Văn Tèo",
    "email": "teonv@fpt.edu.vn"
 
},
{
    "username": "pheonv",
    "password": "iloveyou",
    "fullname": "Nguyễn Văn Chí Phèo",
    "email": "pheonv@fpt.edu.vn"
 
},
{
    "username": "nopt",
    "password": "iloveyou",
    "fullname": "Phạm Thị Nở",
    "email": "nopt@fpt.edu.vn"
 
}
];
        $scope.insert=function(){
            $scope.students.push(angular.copy($scope.student));
            sessionStorage.setItem("username",$scope.student.username);
            sessionStorage.setItem("password",$scope.student.password);
            sessionStorage.setItem("fullname",$scope.student.fullname);
            sessionStorage.setItem("email",$scope.student.email);
            document.location='login.html';
        }
   });
   app.controller("myctrl",function($scope)
   {
         $scope.dn=function(){
         
             
             var u=$scope.u;
             var p=$scope.p;
             var tc=false;
             var motsv;
             var username=sessionStorage.getItem("username");
             var password=sessionStorage.getItem("password");
             for(var i=0; i<list.length; i++){
             
             if(u==username &&p == password){
                    document.location="layout.html";
                    break;
                 }
                 motsv = list[i];
 
                 if(u==motsv.username&&p==motsv.password){
                     tc=true;
                     break;
                 }
                 else{
                   alert("Nhập tài khoản");
                   break;
                 }
             }
             if(tc){
       
           document.location ="layout.html";
   
             }
 
         }
   });