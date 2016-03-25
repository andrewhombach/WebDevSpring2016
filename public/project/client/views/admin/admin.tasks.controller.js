(function () {
    angular
        .module("CoLabApp")
        .controller("AdminTasksController", AdminTasksController);

    function AdminTasksController(TaskService, $rootScope, $scope) {
        $scope.deleteTask = deleteTask;
        $scope.addTask = addTask;
        $scope.updateTask = updateTask;
        $scope.selectTask = selectTask;
        $scope.changePicker = changePicker;

        var all = true;

        function init() {
            TaskService.findAllTasksByUserId($rootScope.cUser._id)
                .then(function (response) {
                    $scope.tasks = response.data;
                });
        }

        init();

        function seeAllTasks() {
            TaskService.findAllTasks()
                .then(function (response) {
                    $scope.tasks = response.data;
                });
        }


        function retrieveTasks (){
            if (!all) {
                seeAllTasks();
            }
            else {
                init();
            }
        }

        function changePicker() {
            if (all) {
                all = false;
                seeAllTasks();
            }
            else {
                all = true;
                init();
            }
        }

        function deleteTask(task) {
            TaskService.deleteTaskById(task._id)
                .then(retrieveTasks);
        }

        function addTask(task) {
            var userArray = task.userIds.split(",");
            task.userIds = userArray;
            TaskService.createTask(task)
                .then(retrieveTasks);
        }

        function updateTask(task) {
            TaskService.updateTask(task._id, task)
                .then(retrieveTasks);
            $scope.task = null;
        }

        function selectTask(pIndex) {
            $scope.task = $scope.tasks[pIndex];
        }
    }
})();