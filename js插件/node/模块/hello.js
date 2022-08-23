function Hello(){
   var name;
   this.setName = function(thyName){
       name = thyName;
   }
   this.sayHello = function(){
       console.log('HELLO'+name)
   }
}
module.exports = Hello