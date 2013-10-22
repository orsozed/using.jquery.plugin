/*global test ok one a company proto revealing*/

test( "one level namespace", function() {
  $.using("one", function(context){
      ok(context !== undefined, "context was undefined");
      ok(context == window.one, "context is not the same");
  });
});

test( "two level namespace", function() {
  $.using("one.two", function(context){
      ok(context !== undefined, "context was undefined");
      ok(context == window.one.two, "context is not the same");
  });
});

test( "three level namespace with function", function() {
  $.using("one.two.three", function(context){
      context.doSomething = function (){ return true; };
      
      ok(context !== undefined, "context was undefined");
      ok(context == window.one.two.three, "context is not the same");
      ok(context == one.two.three, "context is not the same");
      ok(one.two.three.doSomething(), "function did not work");
  });
});

test( "four level namespace with pre-defined function", function() {
  $.using("one.two.three.four", function(context){
      ok(context !== undefined, "context was undefined");
      ok(context == window.one.two.three.four, "context is not the same");
      ok(context == one.two.three.four, "context is not the same");
      ok(one.two.three.doSomething(), "pre-defined function did not work");
  });
});

test( "call method in sub-namespace", function() {
  $.using("a.b.c", function(context){
      context.doSomething = function() { return true; };
      ok(a.b.c.doSomething(), "pre-defined function did not work");
  });    
    
  $.using("a.b", function(context){
      ok(context == window.a.b, "context is not the same");
      ok(context == a.b, "context is not the same");
      ok(context.c.doSomething(), "pre-defined function did not work");
  });
});

test( "prototype pattern", function() {
  $.using("proto.type.module", function(module){
      module.calculator = function() {
          this.count = 0;
      };
      
      module.calculator.prototype.add = function(x) {
          return this.count + x;
      };
      
      module.calculator.prototype.subtract = function(x){
          return this.count - x;
      };
      
      module.calculator.prototype.multiply = function(x){
          return this.count * x;
      };
      
      module.calculator.prototype.divide = function(x){
          return this.count / x;
      };
  });
  
  var calculator = new proto.type.module.calculator();
  ok(calculator.add(1) === 1);
});

test( "module pattern", function() {
  $.using("module.pattern", function(module){
      module.calculator = {
          count: 0,
          add: function(x) {
              return this.count + x;
          },
          subtract: function(x){
              return this.count - x;
          },
          multiply: function(x){
              return this.count * x;
          },
          divide: function(x){
              return this.count / x;
          }
      };
  });
  
  var calculator = module.pattern.calculator;
  ok(calculator.add(1) === 1);
});

test( "revealing module pattern", function() {
  $.using("revealing.module", function(module){
      module.calculator = function () {
          var count = 0;
          
          this.add = function(x) {
              return count + x;
          };
          
          this.subtract = function(x){
              return count - x;
          };
          this.multiply = function(x){
              return count * x;
          };
          
          this.divide = function(x){
              return count / x;
          };
      };
  });
  
  var calculator = new revealing.module.calculator();
  ok(calculator.add(1) === 1);
});

test( "revealing module pattern - alternative", function() {
  $.using("revealing.module.alternative", function(module){
      module.calculator = function () {
          var count = 0;
          
          var add = function(x) {
              return count + x;
          };
          
          var subtract = function(x){
              return count - x;
          };
          var multiply = function(x){
              return count * x;
          };
          
          var divide = function(x){
              return count / x;
          };
          
          return {
              add: add,
              subtract: subtract,
              multiply: multiply,
              divide: divide
          }
      };
  });
  
  var calculator = new revealing.module.alternative.calculator();
  ok(calculator.add(1) === 1);
});
