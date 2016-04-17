(function(){
    angular
        .module("getServerFile", [])
        .directive("getServerFile", getServerFile);

    function getServerFile($http, $location) {

        function expandCollapse() {
            var element = $(this).parent().find("pre");
            var height = element.css("height");

            element.css("height", "auto");
        }
        function link(scope, element, attrs) {
            console.log(attrs);
            var file = attrs.file;
            $http.get("/api/file" + file)
                .success(function(response){

                    console.log(response);

                    var toggle = $("<a style='position:absolute;top:0px;right:20px'><span class='glyphicon glyphicon-plus'></span></a>")
                        .click(expandCollapse);

                    var url = $location.absUrl();
                    url = 'view-source:' + url;

                    var view = $("<a target='_blank' style='position:absolute;top:0px;right:40px'><span class='glyphicon glyphicon-fullscreen'></span></a>")
                        .attr("href", url);

                    var div = $("<div style='position:relative'>")
                        .append(toggle)
                        .append(view);

                    var pre = $("<pre>")
                        .append(response)
                        .css("height", "120px");

                    div.append(pre);

                    element
                        .append(div);
                });
        }
        return {
            link: link
        }
    }
})();