(function () {
    angular
        .module("CoLabApp")
        .controller("AdminTasksController", AdminTasksController);

    function AdminTasksController(TaskService, $rootScope) {
        var vm = this;

        vm.tasks = [];
        vm.deleteTask = deleteTask;
        vm.addTask = addTask;
        vm.updateTask = updateTask;
        vm.selectTask = selectTask;
        vm.changePicker = changePicker;
        vm.taskDictionary = null;

        var all = true;

        function init() {
            TaskService.findAllTasksByUserId($rootScope.cUser._id)
                .then(function (response) {
                    vm.tasks = response.data;
                    vm.task = null;
                });
        }

        function seeAllTasks() {
            TaskService.findAllTasks()
                .then(function (response) {
                    vm.tasks = [];
                    for (x in response.data) {
                        vm.tasks = vm.tasks.concat(response.data[x].tasks);
                    }
                    vm.taskDictionary = response.data;
                    vm.task = null;
                });
        }

        seeAllTasks();


        function retrieveTasks() {
            if (all) {
                seeAllTasks();
            }
            else {
                init();
            }
        }

        function changePicker() {
            if (!all) {
                all = false;
                seeAllTasks();
            }
            else {
                all = true;
                init();
            }
        }

        function deleteTask(task) {
            TaskService.deleteTaskById(task._id, taskProjectLookup(task))
                .then(retrieveTasks);
        }

        function addTask(task) {
            if (task.userIds) {
                var userArray = task.userIds.split(",");
            }
            task.userIds = userArray;
            TaskService.createTask(task, task.projectId)
                .then(retrieveTasks);
        }

        function updateTask(task) {
            TaskService.updateTask(task, taskProjectLookup(task))
                .then(retrieveTasks);
            vm.task = null;
        }

        function selectTask(pIndex) {
            vm.task = vm.tasks[pIndex];
        }

        function taskProjectLookup(task) {
            for (d in vm.taskDictionary) {
                console.log(vm.taskDictionary[d]);
                for (t in vm.taskDictionary[d].tasks) {
                    if (vm.taskDictionary[d].tasks[t]._id == task._id) {
                        return vm.taskDictionary[d]._id;
                    }
                }
            }
        }


    }
})();