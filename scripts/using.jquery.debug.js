(function($) {
    var registerNamespace = function (namespace) {
        var findParent = function (sections, index) {
            var parent = window;
            
            if (index >= 0 && index < sections.length) {
                for (var i = 0; i <= index; i++) {
                    parent = parent[sections[i]];
                }
            }
            
            return parent;
        };


        var sections = namespace.split('.');
        var context = null;
        
        for (var i = 0; i < sections.length; i++) {
            var parent = findParent(sections, i - 1);
            
            if (typeof parent[sections[i]] === "undefined") {
                parent[sections[i]] = {};
            }
            context = parent[sections[i]];
        }
        return context;
    };
    
    $.using = function(namespace, callback) {
        var context = registerNamespace(namespace);
        callback(context);
    };
})(jQuery);  