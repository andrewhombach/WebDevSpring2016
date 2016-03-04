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
        $scope.all = all;

        var all = true;

        function init() {
            var callback = function (response) {
                $scope.tasks = response;
                console.log(response);
            };
            TaskService.findAllTasksByUserId(123, callback)
        }

        init();

        function retrieveTasks (){
            if (!all) {
                seeAllTasks();
            }
            else {
                init();
            }
        }

        function seeAllTasks() {
            var callback = function (response) {
                $scope.tasks = response;
                console.log(response)
            };
            TaskService.findAllTasks(callback);
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
            TaskService.deleteTaskById(task._id, retrieveTasks);
        }

        function addTask(task) {
            var userArray = task.userIds.split(",");
            task.userIds = userArray;
            TaskService.createTask(task, retrieveTasks);
        }

        function updateTask(task) {
            TaskService.updateTask(task._id, task, retrieveTasks);
            $scope.task = null;
        }

        function selectTask(pIndex) {
            $scope.task = $scope.tasks[pIndex];
        }
    }
})();