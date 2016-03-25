(function () {
    angular
        .module("CoLabApp")
        .factory("SearchService", SearchService);

    function SearchService($http) {
        var api = {
            search: search
        };

        return api;

        function search(term) {
            return $http.get("/api/user/234/search?term=" + term);
        }
    }
})();