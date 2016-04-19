(function () {
    "use strict";
    angular
        .module("CoLabApp")
        .controller("AdminTasksController", AdminTasksController);

    function AdminTasksController(TaskService) {
        var vm = this;

        vm.tasks = [];
        vm.deleteTask = deleteTask;
        vm.addTask = addTask;
        vm.updateTask = updateTask;
        vm.selectTask = selectTask;

        function init() {
            TaskService.findAllTasks()
                .then(function (response) {
                    vm.tasks = [];
                    for (var x in response.data) {
                        vm.tasks = vm.tasks.concat(response.data[x].tasks);
                    }
                    vm.taskDictionary = response.data;
                    vm.task = null;
                });
        }

        init();

        function deleteTask(task) {
            TaskService.deleteTaskById(task._id, taskProjectLookup(task))
                .then(init);
        }

        function addTask(task) {
            TaskService.createTask(task, task.projectId)
                .then(init);
        }

        function updateTask(task) {
            TaskService.updateTask(task, taskProjectLookup(task))
                .then(init);
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