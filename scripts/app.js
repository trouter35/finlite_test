"use strict";
//  angular.module("app", ["ngRoute", "ngAnimate", "ui.bootstrap", "easypiechart", "mgo-angular-wizard", "textAngular", "ui.tree", "ngMap", "app.ui.ctrls", "app.ui.directives", "app.ui.services", "app.controllers", "app.directives", "app.form.validation", "app.ui.form.ctrls", "app.ui.form.directives", "app.tables", "app.map", "app.task", "app.localization", "app.chart.ctrls", "app.chart.directives"]).config(["$routeProvider", "KeepaliveProvider", "IdleProvider", function($routeProvider, KeepaliveProvider, IdleProvider) {

angular.module("Authentication", []),
        angular.module("Home", []),
        angular.module("BaseApp",
                ["Authentication", "Home","ngStorage", "ngIdle", "ngRoute", "ngCookies","angularFileUpload",
                    "ui.bootstrap", "ngTable", "ngSanitize", "ui.select", "ImageCropper"])
        .config(["$routeProvider", "IdleProvider", "KeepaliveProvider", function(e, IdleProvider, KeepaliveProvider) {
         e.when("/login", {
                    module: "Authentication",
                    controller: "LoginController",
                    templateUrl: "views/pages/login.html"
                }).when("/logout", {
                    module: "Authentication",
                    controller: "LoginController",
                    templateUrl: "views/pages/login.html"
                }).when("/todo", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/timeline", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/home", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/area", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/branch", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/staff", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/center", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/arealist", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/branchlist", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/stafflist", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/centerlist", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/memberlist", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/voucherlist", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/createcenter", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/centersetting", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/createmember", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"   
                }).when("/scheduleMeeting", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"   
                }).when("/editcenter", {
                    module: "Home",
                    templateUrl: "views/pages/userpage.html"
                }).when("/profile", {
                    templateUrl: "views/pages/userpage.html"
                }).when("/staffprofile", {
                    templateUrl: "views/pages/userpage.html"
                }).when("/report", {
                    templateUrl: "views/pages/userpage.html"
                }).when("/misreport", {
                     templateUrl: "views/pages/userpage.html"
                }).when("/centermember", {
                    templateUrl: "views/pages/userpage.html"
                }).when("/memberprofile", {
                    templateUrl: "views/pages/userpage.html"
                }).when("/tasks", {
                    templateUrl: "views/pages/userpage.html"
                }).otherwise({
                    redirectTo: "/login"
                });
                IdleProvider.idle(180);
                IdleProvider.timeout(180);
              KeepaliveProvider.interval(180);
                }]).run(["$rootScope", "$location", "$cookieStore", "$http", "$localStorage", "HomeService", "$interval","Idle", function(e, t, r, a, n, o, i, Idle) {
        e.globals = r.get("globals") || {};
        var c = [];
        e.$on("$routeChangeSuccess", function() {
            "/timeline" === t.$$path && 1 === n.entry && (n.category = 6),"/misreport" === t.$$path && (n.category = 6), "/scheduleMeeting" === t.$$path && (n.category = 6),"/centermember" === t.$$path && (n.category = 6), "/memberprofile" === t.$$path && (n.category = 6), "/centersetting" === t.$$path && (n.category = 6), "/home" === t.$$path && 1 === n.entry && (n.category = 1, n.navSel = 0, n.SelOffice = ''), "/arealist" === t.$$path && 1 === n.entry && (n.category = 1, n.navSel = 1), "/branchlist" === t.$$path && 1 === n.entry && (n.category = 2, n.areaid = 0, n.navSel = 2), "/stafflist" === t.$$path && 1 === n.entry && (n.category = 2, n.areaid = -1, n.navSel = 3), "/centerlist" === t.$$path && 1 === n.entry && (n.category = 2, n.areaid = 0, n.navSel = 4), "/memberlist" === t.$$path && 1 === n.entry && (n.category = 2, n.areaid = 0, n.navSel = 5), "/memberlist/2" === t.$$path && 1 === n.entry && (n.category = 2, n.areaid = 0), "/voucherlist" === t.$$path && 1 === n.entry && (n.category = 2, n.areaid = -1, n.navSel = 6), "/report" === t.$$path && (n.category = 6, n.navSel = 8), "/branchlist" === t.$$path && 2 === n.entry && (n.category = 2, n.areaid = n.userjson[0].BranchID, n.navSel = 1), "/stafflist" === t.$$path && 2 === n.entry && (n.category = 2, n.areaid = n.userjson[0].BranchID, n.navSel = 2), "/centerlist" === t.$$path && 2 === n.entry && (n.category = 2, n.areaid = n.userjson[0].BranchID, n.navSel = 3), "/memberlist" === t.$$path && 2 === n.entry && (n.category = 2, n.areaid = n.userjson[0].BranchID, n.navSel = 4), "/voucherlist" === t.$$path && 2 === n.entry && (n.category = 2, n.areaid = n.userjson[0].BranchID, n.navSel = 5), "/stafflist" === t.$$path && 3 === n.entry && (n.category = 3, n.branchid = n.userjson[0].BranchID, n.navSel = 1), "/centerlist" === t.$$path && 3 === n.entry && (n.category = 4, n.bid = n.userjson[0].BranchID, n.navSel = 2), "/memberlist" === t.$$path && 3 === n.entry && (n.category = 4, n.bid = n.userjson[0].BranchID, n.navSel = 3), "/voucherlist" === t.$$path && n.entry === 3 && (n.category = 6, n.navSel = 4), "/voucherlist" === t.$$path && n.entry > 3 && (n.category = 6, n.navSel = 3), "/tasks" === t.$$path && (n.category = 6), "/profile" === t.$$path && (n.category = 6, n.ChosenStaffID = ''), "/staffprofile" === t.$$path && (n.category = 6), "/createcenter" === t.$$path && (n.category = 3, n.branchid = n.userjson[0].BranchID), "/createmember" === t.$$path && (n.category = 3, n.branchid = n.userjson[0].BranchID), "/editcenter" === t.$$path && (n.category = 3, n.branchid = n.userjson[0].BranchID), "/centerlist" === t.$$path && 4 === n.entry && (n.category = 4, n.staffid = n.userjson[0].StaffID, n.stafflistjson = n.userjson, n.navSel = 1), "/memberlist" === t.$$path && 4 === n.entry && (n.category = 4, n.bid = n.userjson[0].BranchID, n.staffid = n.userjson[0].StaffID, n.navSel = 2), "/area" === t.$$path && 1 === n.entry && (n.category = 2), "/branch" === t.$$path && 1 === n.entry && (n.category = 3), "/staff" === t.$$path && 1 === n.entry && (n.category = 4), "/center" === t.$$path && 1 === n.entry && (n.category = 5), "/home" === t.$$path && 2 === n.entry && (n.category = 2, n.navSel = 0, n.SelOffice = ''), "/branch" === t.$$path && 2 === n.entry && (n.category = 3), "/staff" === t.$$path && 2 === n.entry && (n.category = 4), "/center" === t.$$path && 2 === n.entry && (n.category = 5), "/home" === t.$$path && 3 === n.entry && (n.category = 3, n.navSel = 0, n.SelOffice = ''), "/staff" === t.$$path && 3 === n.entry && (n.category = 4), "/center" === t.$$path && 3 === n.entry && (n.category = 5), "/home" === t.$$path && 4 === n.entry && (n.SelOffice = '', n.category = 4, n.navSel = 0), "/center" === t.$$path && 4 === n.entry && (n.category = 5), c.push(t.$$path)
        }), e.back = function() {
            var e = c.length > 1 ? c.splice(-2)[0] : "/";
            n.category = n.category - 1, t.path(e)
        }, e.$on("$locationChangeStart", function(r, a, n) {
            null !== e.globals.currentUser.username && "/login" === t.path() ? t.path("/home") : e.globals.currentUser || t.path("/login")
        });
       
    e.$on('IdleTimeout', function() { 
        n.lockScreen= true;
        e.lock =n.lockScreen;
    });
Idle.watch();
      
    }]).filter("propsFilter", function() {
    return function(e, t) {
        var r = [];
        if (angular.isArray(e)) {
            var a = Object.keys(t);
            e.forEach(function(e) {
                for (var n = !1, o = 0; o < a.length; o++) {
                    var c = a[o],
                            i = t[c].toLowerCase();
                    if (-1 !== e[c].toString().toLowerCase().indexOf(i)) {
                        n = !0;
                        break
                    }
                }
                n && r.push(e)
            })
        } else
            r = e;
        return r
    }
}).filter('capitalize', function() {
    return function(input, all) {
        var reg = (true) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
}).controller("AppCtrl", ["$scope", "$location", "$rootScope", "$localStorage", "$cookieStore", "$http", "http_defaults", function(e, t, r, a, n,  $http, http_defaults) {
     r.lock = false;
       // alert(r.lock);
         e.isLogin = function() {
            return r.globals = n.get("globals") || {}, r.globals.currentUser ? !0 : !1
        }, e.main = {
            brand: "FinLite-X"
        },
        
      
    r.neverEndingStory = function (add) { 
       
      $http.get(add, http_defaults)
              .success(success)
        .error(error);
    };
     function success() {
     
     }

   function error() {
      r.errmsg = "Server Connection Error";
        r.dataLoading = false;
     }
     
     
       
    }]).controller("NavCtrl", ["$scope", "$localStorage", "$rootScope", "$location", function(e, t, r, a) {
        r.navSel = t.navSel;
        var n = t.entry;
        if (1 === n) {
            var o = [{
                    Id: 1,
                    menu: "Dashboard",
                    ic: "fa fa-dashboard active"
                }, {
                    Id: 2,
                    menu: "Area",
                    ic: "fa fa-list"
                }, {
                    Id: 3,
                    menu: "Branch",
                    ic: "fa fa-list-alt"
                }, {
                    Id: 4,
                    menu: "Staff",
                    ic: "fa fa-user"
                }, {
                    Id: 5,
                    menu: "Center",
                    ic: "fa fa-sitemap"
                }, {
                    Id: 6,
                    menu: "Member",
                    ic: "fa fa-group"
                }, {
                    Id: 7,
                    menu: "Account",
                    ic: "fa fa-money"
                }, {
                    Id: 8,
                    menu: "Utility",
                    ic: "fa fa-calendar"
                }, {
                    Id: 9,
                    menu: "Reports",
                    ic: "glyphicon glyphicon-file"
                },
                {
                    Id: 10,
                    menu: "Log Out",
                    ic: "fa fa-sign-out"
                }];
            e.menus = o
        }
        if (2 === n) {
            var o = [{
                    Id: 1,
                    menu: "Dashboard",
                    ic: "fa fa-dashboard"
                }, {
                    Id: 2,
                    menu: "Branch",
                    ic: "fa fa-th-list"
                }, {
                    Id: 3,
                    menu: "Staff",
                    ic: "fa fa-user"
                }, {
                    Id: 4,
                    menu: "Center",
                    ic: "fa fa-sitemap"
                }, {
                    Id: 5,
                    menu: "Member",
                    ic: "fa fa-group"
                }, {
                    Id: 6,
                    menu: "Account",
                    ic: "fa fa-money"
                }, {
                    Id: 7,
                    menu: "Utility",
                    ic: "fa fa-calendar"
                }, {
                    Id: 8,
                    menu: "Log Out",
                    ic: "fa fa-sign-out"
                }];
            e.menus = o
        }
        if (3 === n) {
            var o = [{
                    Id: 1,
                    menu: "Dashboard",
                    ic: "fa fa-dashboard"
                }, {
                    Id: 2,
                    menu: "Staff",
                    ic: "fa fa-user"
                }, {
                    Id: 3,
                    menu: "Center",
                    ic: "fa fa-sitemap"
                }, {
                    Id: 4,
                    menu: "Member",
                    ic: "fa fa-group"
                }, {
                    Id: 5,
                    menu: "Account",
                    ic: "fa fa-money"
                }, {
                    Id: 6,
                    menu: "Utility",
                    ic: "fa fa-calendar"
                }, {
                    Id: 7,
                    menu: "Log Out",
                    ic: "fa fa-sign-out"
                }];
            e.menus = o
        }
        if (4 === n) {
            var o = [{
                    Id: 1,
                    menu: "Dashboard",
                    ic: "fa fa-dashboard"
                }, {
                    Id: 2,
                    menu: "Center",
                    ic: "fa fa-sitemap"
                }, {
                    Id: 3,
                    menu: "Member",
                    ic: "fa fa-group"
                }, {
                    Id: 4,
                    menu: "Account",
                    ic: "fa fa-money"
                }, {
                    Id: 5,
                    menu: "Utility",
                    ic: "fa fa-calendar"
                }, {
                    Id: 6,
                    menu: "Log Out",
                    ic: "fa fa-sign-out"
                }];
            e.menus = o
        }
        if (5 === n) {
            var o = [{
                    Id: 1,
                    menu: "Dashboard",
                    ic: "fa fa-dashboard"
                }, {
                    Id: 2,
                    menu: "Member",
                    ic: "fa fa-group"
                }, {
                    Id: 3,
                    menu: "Account",
                    ic: "fa fa-money"
                }, {
                    Id: 4,
                    menu: "Utility",
                    ic: "fa fa-calendar"
                }, {
                    Id: 5,
                    menu: "Log Out",
                    ic: "fa fa-sign-out"
                }];
            e.menus = o
        }
        e.getDetail = function(index, menu) {
            "Dashboard" === menu ? a.path("/home") : "Utility" === menu ? a.path("/utility") : "Log Out" === menu ? a.path("/logout") : "Area" === menu ? a.path("/arealist") : "Branch" === menu ? a.path("/branchlist") : "Staff" === menu ? a.path("/stafflist") : "Center" === menu ? a.path("/centerlist") : "Member" === menu ? a.path("/memberlist") : "Reports" === menu ? a.path("/report") : "Account" === menu && a.path("/voucherlist")
            t.navSel = index;
            r.navSel = index;
        }
    }])
        .controller("taskCtrl", ["$scope", "taskStorage", "filterFilter", "$rootScope", "logger", function($scope, taskStorage, filterFilter, $rootScope, logger) {
                alert("ctrl task");
                var tasks;
                return tasks = $scope.tasks = taskStorage.get(), $scope.newTask = "", $scope.remainingCount = filterFilter(tasks, {
                    completed: !1
                }).length, $scope.editedTask = null, $scope.statusFilter = {
                    completed: !1
                }, $scope.filter = function(filter) {
                    switch (filter) {
                        case "all":
                            return $scope.statusFilter = "";
                        case "active":
                            return $scope.statusFilter = {
                                completed: !1
                            };
                        case "completed":
                            return $scope.statusFilter = {
                                completed: !0
                            }
                    }
                }, $scope.add = function() {
                    alert("new task");
                    var newTask;
                    return newTask = $scope.newTask.trim(), 0 !== newTask.length ? (tasks.push({
                        title: newTask,
                        completed: !1
                    }), logger.logSuccess('New task: "' + newTask + '" added'), taskStorage.put(tasks), $scope.newTask = "", $scope.remainingCount++) : void 0
                }, $scope.edit = function(task) {
                    return $scope.editedTask = task
                }, $scope.doneEditing = function(task) {
                    return $scope.editedTask = null, task.title = task.title.trim(), task.title ? logger.log("Task updated") : $scope.remove(task), taskStorage.put(tasks)
                }, $scope.remove = function(task) {
                    var index;
                    return $scope.remainingCount -= task.completed ? 0 : 1, index = $scope.tasks.indexOf(task), $scope.tasks.splice(index, 1), taskStorage.put(tasks), logger.logError("Task removed")
                }, $scope.completed = function(task) {
                    return $scope.remainingCount += task.completed ? -1 : 1, taskStorage.put(tasks), task.completed ? $scope.remainingCount > 0 ? logger.log(1 === $scope.remainingCount ? "Almost there! Only " + $scope.remainingCount + " task left" : "Good job! Only " + $scope.remainingCount + " tasks left") : logger.logSuccess("Congrats! All done :)") : void 0
                }, $scope.clearCompleted = function() {
                    return $scope.tasks = tasks = tasks.filter(function(val) {
                        return !val.completed
                    }), taskStorage.put(tasks)
                }, $scope.markAll = function(completed) {
                    return tasks.forEach(function(task) {
                        return task.completed = completed
                    }), $scope.remainingCount = completed ? 0 : tasks.length, taskStorage.put(tasks), completed ? logger.logSuccess("Congrats! All done :)") : void 0
                }, $scope.$watch("remainingCount == 0", function(val) {
                    return $scope.allChecked = val
                }), $scope.$watch("remainingCount", function(newVal) {
                    return $rootScope.$broadcast("taskRemaining:changed", newVal)
                })
            }])

        .directive("imgHolder", [function() {
                return {
                    restrict: "A",
                    link: function(scope, ele) {
                        return Holder.run({
                            images: ele[0]
                        })
                    }
                }
            }]).directive("customBackground", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$location", function($scope, $element, $location) {
                var addBg, path;
                return path = function() {
                    return $location.path()
                }, addBg = function(path) {
                    switch ($element.removeClass("body-home body-special body-tasks body-lock"), path) {
                        case "/":
                            return $element.addClass("body-home");
                        case "/404":
                        case "/pages/500":
                        case "/pages/signin":
                        case "/pages/signup":
                            return $element.addClass("body-special");
                        case "/pages/lock-screen":
                            return $element.addClass("body-special body-lock");
                        case "/tasks":
                            return $element.addClass("body-tasks")
                    }
                }, addBg($location.path()), $scope.$watch(path, function(newVal, oldVal) {
                    return newVal !== oldVal ? addBg($location.path()) : void 0
                })
            }]
    }
}).directive("uiColorSwitch", [function() {
        return {
            restrict: "A",
            link: function(scope, ele) {
                return ele.find(".color-option").on("click", function(event) {
                    var $this, hrefUrl, style;
                    if ($this = $(this), hrefUrl = void 0, style = $this.data("style"), "loulou" === style)
                        hrefUrl = "styles/main.css", $('link[href^="styles/main"]').attr("href", hrefUrl);
                    else {
                        if (!style)
                            return !1;
                        style = "-" + style, hrefUrl = "styles/main" + style + ".css", $('link[href^="styles/main"]').attr("href", hrefUrl)
                    }
                    return event.preventDefault()
                })
            }
        }
    }]).directive("toggleMinNav", ["$rootScope", function($rootScope) {
        return {
            restrict: "A",
            link: function(scope, ele) {
                var $content, $nav, $window, Timer, app, updateClass;
                return app = $("#app"), $window = $(window), $nav = $("#nav-container"), $content = $("#content"), ele.on("click", function(e) {
                    return app.hasClass("nav-min") ? app.removeClass("nav-min") : (app.addClass("nav-min"), $rootScope.$broadcast("minNav:enabled")), e.preventDefault()
                }), Timer = void 0, updateClass = function() {
                    var width;
                    return width = $window.width(), 768 > width ? app.removeClass("nav-min") : void 0
                }, $window.resize(function() {
                    var t;
                    return clearTimeout(t), t = setTimeout(updateClass, 300)
                })
            }
        }
    }]).directive("collapseNav", [function() {
        return {
            restrict: "A",
            link: function(scope, ele) {
                var $a, $aRest, $lists, $listsRest, app;
                return $lists = ele.find("ul").parent("li"), $lists.append('<i class="fa fa-caret-right icon-has-ul"></i>'), $a = $lists.children("a"), $listsRest = ele.children("li").not($lists), $aRest = $listsRest.children("a"), app = $("#app"), $a.on("click", function(event) {
                    var $parent, $this;
                    return app.hasClass("nav-min") ? !1 : ($this = $(this), $parent = $this.parent("li"), $lists.not($parent).removeClass("open").find("ul").slideUp(), $parent.toggleClass("open").find("ul").slideToggle(), event.preventDefault())
                }), $aRest.on("click", function() {
                    return $lists.removeClass("open").find("ul").slideUp()
                }), scope.$on("minNav:enabled", function() {
                    return $lists.removeClass("open").find("ul").slideUp()
                })
            }
        }
    }]).directive("highlightActive", [function() {
        return {
            restrict: "A",
            controller: ["$scope", "$element", "$attrs", "$location", function($scope, $element, $attrs, $location) {
                    var highlightActive, links, path;
                    return links = $element.find("a"), path = function() {
                        return $location.path()
                    }, highlightActive = function(links, path) {
                        return path = "#" + path, angular.forEach(links, function(link) {
                            var $li, $link, href;
                            return $link = angular.element(link), $li = $link.parent("li"), href = $link.attr("href"), $li.hasClass("active") && $li.removeClass("active"), 0 === path.indexOf(href) ? $li.addClass("active") : void 0
                        })
                    }, highlightActive(links, $location.path()), $scope.$watch(path, function(newVal, oldVal) {
                        return newVal !== oldVal ? highlightActive(links, $location.path()) : void 0
                    })
                }]
        }
    }]).directive("toggleOffCanvas", [function() {
        return {
            restrict: "A",
            link: function(scope, ele) {
                return ele.on("click", function() {
                    return $("#app").toggleClass("on-canvas")
                })
            }
        }
    }]).directive("goBack", [function() {
        return {
            restrict: "A",
            controller: ["$scope", "$element", "$window", function($scope, $element, $window) {
                    return $element.on("click", function() {
                        return $window.history.back()
                    })
                }]
        }
    }])
        .factory("taskStorage", function() {
            var DEMO_TASKS, STORAGE_ID;
            return STORAGE_ID = "tasks", DEMO_TASKS = '[ {"title": "Finish homework", "completed": true}, {"title": "Make a call", "completed": true}, {"title": "Build a snowman!", "completed": false}, {"title": "Tango! Tango! Tango!", "completed": false}, {"title": "Play games with friends", "completed": false}, {"title": "Shopping", "completed": false} ]', {
                get: function() {
                    return JSON.parse(localStorage.getItem(STORAGE_ID) || DEMO_TASKS)
                },
                put: function(tasks) {
                    return localStorage.setItem(STORAGE_ID, JSON.stringify(tasks))
                }
            }
        })
        .directive("taskFocus", ["$timeout", function($timeout) {
                return {
                    link: function(scope, ele, attrs) {
                        return scope.$watch(attrs.taskFocus, function(newVal) {
                            return newVal ? $timeout(function() {
                                return ele[0].focus()
                            }, 0, !1) : void 0
                        })
                    }
                }
            }])
        .directive('ngConfirmClick', [
            function() {
                return {
                    link: function(scope, element, attr) {
                        var msg = attr.ngConfirmClick || "Are you sure?";
                        var clickAction = attr.confirmedClick;
                        element.bind('click', function(event) {
                            if (window.confirm(msg)) {
                                scope.$eval(clickAction)
                            }
                        });
                    }
                };
            }])
        

        .controller("AlertDemoCtrl", ["$scope", function($scope) {
                return $scope.alerts = [{
                        type: "success",
                        msg: "Well done! You successfully read this important alert message."
                    }, {
                        type: "info",
                        msg: "Heads up! This alert needs your attention, but it is not super important."
                    }, {
                        type: "warning",
                        msg: "Warning! Best check yo self, you're not looking too good."
                    }, {
                        type: "danger",
                        msg: "Oh snap! Change a few things up and try submitting again."
                    }], $scope.addAlert = function() {
                    var num, type;
                    switch (num = Math.ceil(4 * Math.random()), type = void 0, num) {
                        case 0:
                            type = "info";
                            break;
                        case 1:
                            type = "success";
                            break;
                        case 2:
                            type = "info";
                            break;
                        case 3:
                            type = "warning";
                            break;
                        case 4:
                            type = "danger"
                    }
                    return $scope.alerts.push({
                        type: type,
                        msg: "Another alert!"
                    })
                }, $scope.closeAlert = function(index) {
                    return $scope.alerts.splice(index, 1)
                }
            }]).controller("ProgressDemoCtrl", ["$scope", function($scope) {
        return $scope.max = 200, $scope.random = function() {
            var type, value;
            value = Math.floor(100 * Math.random() + 10), type = void 0, type = 25 > value ? "success" : 50 > value ? "info" : 75 > value ? "warning" : "danger", $scope.showWarning = "danger" === type || "warning" === type, $scope.dynamic = value, $scope.type = type
        }, $scope.random()
    }]).controller("AccordionDemoCtrl", ["$scope", function($scope) {
        $scope.oneAtATime = !0, $scope.groups = [{
                title: "Dynamic Group Header - 1",
                content: "Dynamic Group Body - 1"
            }, {
                title: "Dynamic Group Header - 2",
                content: "Dynamic Group Body - 2"
            }, {
                title: "Dynamic Group Header - 3",
                content: "Dynamic Group Body - 3"
            }], $scope.items = ["Item 1", "Item 2", "Item 3"], $scope.addItem = function() {
            var newItemNo;
            newItemNo = $scope.items.length + 1, $scope.items.push("Item " + newItemNo)
        }
    }]).controller("CollapseDemoCtrl", ["$scope", function($scope) {
        return $scope.isCollapsed = !1
    }]).controller("ModalDemoCtrl", ["$scope", "$modal", "$log", function($scope, $modal, $log) {
        $scope.items = ["item1", "item2", "item3"], $scope.open = function() {
            var modalInstance;
            modalInstance = $modal.open({
                templateUrl: "myModalContent.html",
                controller: "ModalInstanceCtrl",
                resolve: {
                    items: function() {
                        return $scope.items
                    }
                }
            }), modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem
            }, function() {
                $log.info("Modal dismissed at: " + new Date)
            })
        }
    }]).controller("ModalInstanceCtrl", ["$scope", "$modalInstance", "items", function($scope, $modalInstance, items) {
        $scope.items = items, $scope.selected = {
            item: $scope.items[0]
        }, $scope.ok = function() {
            $modalInstance.close($scope.selected.item)
        }, $scope.cancel = function() {
            $modalInstance.dismiss("cancel")
        }
    }]).controller("PaginationDemoCtrl", ["$scope", function($scope) {
        return $scope.totalItems = 64, $scope.currentPage = 4, $scope.maxSize = 5, $scope.setPage = function(pageNo) {
            return $scope.currentPage = pageNo
        }, $scope.bigTotalItems = 175, $scope.bigCurrentPage = 1
    }]).controller("TabsDemoCtrl", ["$scope", function($scope) {
        return $scope.tabs = [{
                title: "Dynamic Title 1",
                content: "Dynamic content 1.  Consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at."
            }, {
                title: "Disabled",
                content: "Dynamic content 2.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quidem, officiis, et ex laudantium sed cupiditate voluptatum libero nobis sit illum voluptates beatae ab. Ad, repellendus non sequi et at.",
                disabled: !0
            }], $scope.navType = "pills"
    }]).controller("MapDemoCtrl", ["$scope", "$http", "$interval", function($scope, $http, $interval) {
        var i, markers;
        for (markers = [], i = 0; 8 > i; )
            markers[i] = new google.maps.Marker({
                title: "Marker: " + i
            }), i++;
        $scope.GenerateMapMarkers = function() {
            var d, lat, lng, loc, numMarkers;
            for (d = new Date, $scope.date = d.toLocaleString(), numMarkers = Math.floor(4 * Math.random()) + 4, i = 0; numMarkers > i; )
                lat = 43.66 + Math.random() / 100, lng = -79.4103 + Math.random() / 100, loc = new google.maps.LatLng(lat, lng), markers[i].setPosition(loc), markers[i].setMap($scope.map), i++
        }, $interval($scope.GenerateMapMarkers, 2e3)
    }])
        .factory("logger", [function() {
                var logIt;
                return toastr.options = {closeButton: !0, positionClass: "toast-bottom-right", timeOut: "3000"}, logIt = function(message, type) {
                    return toastr[type](message)
                }, {log: function(message) {
                        logIt(message, "info")
                    }, logWarning: function(message) {
                        logIt(message, "warning")
                    }, logSuccess: function(message) {
                        logIt(message, "success")
                    }, logError: function(message) {
                        logIt(message, "error")
                    }}
            }])
    
    .value('http_defaults', {
    timeout: 10000
  });