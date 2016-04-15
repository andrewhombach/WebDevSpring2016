module.exports = function(app, ProjectModel, DMModel, UserModel) {
    app.get("/api/user/:userId/search", search);

    function search(req, res) {
        var term = req.query.term;
        var userId = req.params.userId;
        var users = [];
        var results = {};

        searchUsers(term);

        function searchUsers(term) {
            UserModel
                .searchUsersByUsername(term)
                .then(
                    function (usersU) {
                        users = users.concat(usersU);
                        UserModel
                            .searchUsersByFirstName(term)
                            .then(
                                function (usersF) {
                                    var tempList = [];
                                    for (var x in usersF) {
                                        tempList.push(usersF[x]);
                                        for(var y in users) {
                                            if (usersF[x]._id.toString() === users[y]._id.toString()) {
                                                tempList.pop();
                                            }
                                        }
                                    }
                                    users = users.concat(tempList);
                                    UserModel
                                        .searchUsersByLastName(term)
                                        .then(
                                            function (usersL) {
                                                tempList = [];
                                                for (var n in usersL) {
                                                    tempList.push(usersL[n]);
                                                    for(var m in users) {
                                                        if (usersL[n]._id.toString() === users[m]._id.toString()) {
                                                            tempList.pop();
                                                        }
                                                    }
                                                }
                                                users = users.concat(tempList);
                                                results.users = users;
                                                ProjectModel
                                                    .searchProjectsByName(term)
                                                    .then(
                                                        function (projects) {
                                                            results.projects = projects;
                                                            ProjectModel
                                                                .searchTasksByName(term)
                                                                .then(
                                                                    function (tasks) {
                                                                        var rTasks = [];

                                                                        for (var t in tasks) {
                                                                            rTasks = rTasks.concat(tasks[t].tasks);
                                                                        }
                                                                        results.tasks = rTasks;
                                                                        res.json(results);

                                                                    },
                                                                    function (err) {
                                                                        res.status(400).send(err);
                                                                    }
                                                                )

                                                        },
                                                        function (err) {
                                                            res.status(400).send(err);
                                                        }
                                                    );


                                            },
                                            function (err) {
                                                res.status(400).send(err);
                                            });
                                    },
                                    function (err) {
                                        res.status(400).send(err);
                                    });
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }

    }

};