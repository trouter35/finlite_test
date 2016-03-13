"use strict";
angular.module('Authentication')
        .controller('LoginController', ['$scope', '$rootScope', '$location', '$http', '$cookieStore', 'AuthenticationService', '$localStorage',
            function($scope, $rootScope, $location, $http, $cookieStore, AuthenticationService, $localStorage) {

                $rootScope.CheckOnlineStatus = function(msg) {
                    var condition = navigator.onLine ? "true" : "false";
                    $rootScope.Nstatus = condition;
                    if ($rootScope.Nstatus === "false")
                        $rootScope.Nstatus = "";
                    else
                        $rootScope.Nstatus = true;
                };
                $rootScope.Pageloaded = function() {
                    $rootScope.CheckOnlineStatus("load");
                };
                $rootScope.Pageloaded();
                $rootScope.ClearCredentials();
                $http.get('data/zone.json').success(function(data) {
                    $localStorage.zonejson = data;
                });
                $localStorage.selectedZoneid = '';
                $localStorage.selectedDistrictid = '';
                $localStorage.selectedDistrictjson = '';
                $localStorage.selectedVdcjson = '';
                $rootScope.pageredirect = function() {
                    // alert($localStorage.category);
                    if ($localStorage.category === null) {
                        $location.path('/login');
                    }
                    //Head Office User
                    if ($localStorage.category === 1) {
                        $localStorage.headofficeid = $localStorage.userOfficejson[0].ID;
                        $localStorage.entry = 1;
                        $location.path('/home');
                    }
                    //Area Office User
                    if ($localStorage.category === 2 && $localStorage.JobTypeID === 2) {
                        $localStorage.entry = 2;
                        $localStorage.areaid = $localStorage.userOfficejson[0].ID;
                        $location.path('/home');
                    }
                    //Branch Office User
                    if ($localStorage.category === 3 && $localStorage.JobTypeID === 3) {
                        $localStorage.entry = 3;
                        $localStorage.branchid = $localStorage.userOfficejson[0].ID;
                        $location.path('/home');
                    }
                    //Staff as User
                    if ($localStorage.category === 3 && $localStorage.JobTypeID === 5) {
                        $localStorage.entry = 4;
                        $localStorage.branchid = $localStorage.userjson[0].BranchID;
                        $localStorage.staffid = $localStorage.userjson[0].StaffID;
                        $location.path('/home');
                    }
                };
                $scope.login = function() {
                    $rootScope.dataLoading = true;
                    AuthenticationService.Login($scope.username, $scope.password)
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            //console.log(JSON.stringify(response));
                                            $localStorage.now = new Date();
                                            $localStorage.today = $localStorage.now.getFullYear() + '/' + ($localStorage.now.getMonth() + 1) + '/' + $localStorage.now.getDate();  //AD date

                                            $localStorage.userjson = response.data.responseText.User;
                                            $localStorage.userOfficejson = response.data.responseText.UserOffice;
                                            $localStorage.userphoto = response.data.responseText.photo;
                                            $localStorage.FiscalYear = $localStorage.userOfficejson[0].FBsYear;

                                            $localStorage.set = false;
                                            $localStorage.lang = '';
                                            $localStorage.navSel = 0;
                                            $localStorage.userID = '';
                                            $localStorage.profiledetail = '';
                                            $localStorage.headofficeid = '';
                                            $localStorage.JobTypeId = '';
                                            $localStorage.arealistjson = '';
                                            $localStorage.choosenareajson = '';
                                            $localStorage.areaid = '';
                                            $localStorage.branchlistjson = '';
                                            $localStorage.choosenbranchjson = '';
                                            $localStorage.branchid = '';
                                            $localStorage.stafflistjson = '';
                                            $localStorage.choosenstaffjson = '';
                                            $localStorage.staffid = '';
                                            $localStorage.centerlistjson = '';
                                            $localStorage.choosencenterjson = '';
                                            $localStorage.centerid = '';
                                            $localStorage.memberlistjson = '';
                                            $localStorage.choosenmemberjson = '';
                                            $localStorage.memberid = '';
                                            $localStorage.Allbranchlistjson = '';
                                            $localStorage.Allstafflistjson = '';
                                            $localStorage.Allcenterlistjson = '';
                                            $localStorage.Allmemberlistjson = '';
                                            $localStorage.Allvoucherlistjson = '';

                                            $localStorage.memberProfileJson = '';

                                            $localStorage.NextCenterCode = '';
                                            $localStorage.NextCenterID = '';

                                            $localStorage.selCen = '';
                                            $localStorage.selOff = '';
                                            $localStorage.selectedMemberID = '';

                                            $localStorage.SavingType = '';
                                            $localStorage.FundType = '';
                                            $localStorage.FeeType = '';
                                            $localStorage.Saving = '';
                                            $localStorage.Fund = '';
                                            $localStorage.Fee = '';

                                            $localStorage.ChosenStaffID = '';
                                            $localStorage.SelOffice = '';
                                            $localStorage.lockScreen = false;
                                            $localStorage.CollectionSchedule = '';

                                            $localStorage.id = $localStorage.userOfficejson[0].ID;
                                            $localStorage.JobTypeID = $localStorage.userjson[0].JobTypeID;
                                            $localStorage.category = $localStorage.userOfficejson[0].CatagoryID;
                                            $localStorage.user = $localStorage.userjson[0].FirstName;
                                            $localStorage.userfullname = $localStorage.userjson[0].FirstName + " " + $localStorage.userjson[0].LastName;
                                            AuthenticationService.SetCredentials($scope.username, $scope.password);
                                            $rootScope.pageredirect();
                                        } else {
                                            $scope.error = "Invalid Username or Password";
                                            $scope.dataLoading = false;
                                        }
                                        $rootScope.dataLoading = false;
                                    },
                                    function(response) {
                                        $scope.dataLoading = false;
                                    },
                                    function(response) {
                                        $scope.dataLoading = false;
                                    });
                };
            }
        ]);
'use strict';
angular.module('Authentication')
        .factory('AuthenticationService', ['Base64', '$http', '$cookieStore', '$rootScope', '$q', '$localStorage',
            function(Base64, $http, $cookieStore, $rootScope, $q, $localStorage) {
                var deferred = $q.defer();
                var service = {};
                service.openModal = function() {
                    angular.element('modal').style.display = 'block';
                    document.getElementById('fade').style.display = 'block';
                }
                service.closeModal = function() {
                    document.getElementById('modal').style.display = 'none';
                    document.getElementById('fade').style.display = 'none';
                }
                service.Login = function(username, password) {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    var encodedString = 'username=' +
                            encodeURIComponent(username) +
                            '&password=' +
                            encodeURIComponent(password);
                    return $http({
                        method: 'POST',
                        url: getip() + '/check-login.php',
                        data: encodedString,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }, {timeout: 100}).then(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    })
                };
                service.SetCredentials = function(username, password) {
                    var authdata = Base64.encode(username + ':' + password);
                    $rootScope.globals = {
                        currentUser: {
                            username: username,
                            password: password
                        }
                    };
                    $cookieStore.put('globals', $rootScope.globals);
                };
                $rootScope.ClearCredentials = function() {
                    $rootScope.globals = {};
                    $cookieStore.remove('globals');
                    //Localstorage clear

                    //Date Today
                    $localStorage.now = '';
                    $localStorage.today = '';

                    //for language control
                    $localStorage.set = false;
                    $localStorage.lang = '';
                    $localStorage.navSel = 0;
                    // language control close

                    //Center Setting Variables
                    $localStorage.SavingType = '';
                    $localStorage.FundType = '';
                    $localStorage.FeeType = '';
                    $localStorage.Saving = '';
                    $localStorage.Fund = '';
                    $localStorage.Fee = '';

                    $localStorage.ChosenStaffID = '';
                    $localStorage.SelOffice = '';

                    $localStorage.userID = '';
                    $localStorage.profiledetail = '';
                    $localStorage.userjson = '';
                    $localStorage.userOfficejson = '';
                    $localStorage.headofficeid = '';
                    $localStorage.JobTypeId = '';
                    $localStorage.arealistjson = '';
                    $localStorage.choosenareajson = '';
                    $localStorage.areaid = '';
                    $localStorage.branchlistjson = '';
                    $localStorage.choosenbranchjson = '';
                    $localStorage.branchid = '';
                    $localStorage.stafflistjson = '';
                    $localStorage.choosenstaffjson = '';
                    $localStorage.staffid = '';
                    $localStorage.centerlistjson = '';
                    $localStorage.choosencenterjson = '';
                    $localStorage.centerid = '';
                    $localStorage.memberlistjson = '';
                    $localStorage.choosenmemberjson = '';
                    $localStorage.memberid = '';
                    $localStorage.Allbranchlistjson = '';
                    $localStorage.Allstafflistjson = '';
                    $localStorage.Allcenterlistjson = '';
                    $localStorage.Allmemberlistjson = '';
                    $localStorage.Allvoucherlistjson = '';

                    $localStorage.memberProfileJson = '';

                    $localStorage.NextCenterCode = '';
                    $localStorage.NextCenterID = '';

                    $localStorage.selCen = '';
                    $localStorage.selOff = '';
                    $localStorage.selectedMemberID = '';



                    $localStorage.lockScreen = false;
                    $localStorage.CollectionSchedule = '';
                };
                return service;
            }
        ])

        .factory('Base64',
                function() {
                    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                    return {
                        encode: function(input) {
                            var output = "";
                            var chr1, chr2, chr3 = "";
                            var enc1, enc2, enc3, enc4 = "";
                            var i = 0;
                            do {
                                chr1 = input.charCodeAt(i++);
                                chr2 = input.charCodeAt(i++);
                                chr3 = input.charCodeAt(i++);
                                enc1 = chr1 >> 2;
                                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                                enc4 = chr3 & 63;
                                if (isNaN(chr2)) {
                                    enc3 = enc4 = 64;
                                } else if (isNaN(chr3)) {
                                    enc4 = 64;
                                }
                                output = output +
                                        keyStr.charAt(enc1) +
                                        keyStr.charAt(enc2) +
                                        keyStr.charAt(enc3) +
                                        keyStr.charAt(enc4);
                                chr1 = chr2 = chr3 = "";
                                enc1 = enc2 = enc3 = enc4 = "";
                            } while (i < input.length);
                            return output;
                        },
                        decode: function(input) {
                            var output = "";
                            var chr1, chr2, chr3 = "";
                            var enc1, enc2, enc3, enc4 = "";
                            var i = 0;
                            var base64test = /[^A-Za-z0-9\+\/\=]/g;
                            if (base64test.exec(input)) {
                                window.alert("There were invalid base64 characters in the input text.\n" +
                                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                                        "Expect errors in decoding.");
                            }
                            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                            do {
                                enc1 = keyStr.indexOf(input.charAt(i++));
                                enc2 = keyStr.indexOf(input.charAt(i++));
                                enc3 = keyStr.indexOf(input.charAt(i++));
                                enc4 = keyStr.indexOf(input.charAt(i++));
                                chr1 = (enc1 << 2) | (enc2 >> 4);
                                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                                chr3 = ((enc3 & 3) << 6) | enc4;
                                output = output + String.fromCharCode(chr1);
                                if (enc3 != 64) {
                                    output = output + String.fromCharCode(chr2);
                                }
                                if (enc4 != 64) {
                                    output = output + String.fromCharCode(chr3);
                                }
                                chr1 = chr2 = chr3 = "";
                                enc1 = enc2 = enc3 = enc4 = "";
                            } while (i < input.length);
                            return output;
                        }
                    };
                });

'use strict';
angular.module('Home')
        .directive("uiWizardForm", [function() {
                return{link: function(scope, ele) {
                        return ele.steps()
                    }}
            }])
        .controller('IdleCtrl',
                function($scope, Idle, Keepalive, $modal, $location, $rootScope) { //alert("in");
                    $scope.started = false;


                    function closeModals() {
                        if ($scope.warning) {
                            $scope.warning.close();
                            $scope.warning = null;
                        }

                        if ($scope.timedout) {
                            $scope.timedout.close();
                            $scope.timedout = null;

                        }

                    }

                    $scope.$on('IdleStart', function() {
                        if ($rootScope.lock == true) {

                        }
                        else {
                            closeModals();
                            $scope.warning = $modal.open({
                                //  templateUrl: '',
                                windowClass: 'modal-warning'
                            });
                        }
                    });

                    $scope.$on('IdleEnd', function() {
                        closeModals();
                    });


                    $scope.$on('IdleTimeout', function() {
                        closeModals();
                        $scope.timedout = $modal.open({
                            templateUrl: 'timedout-dialog.html',
                            windowClass: 'modal-danger'
                        });

                    });


                    $scope.start = function() {
                        closeModals();
                        Idle.watch();
                        $scope.started = true;
                    };

                    $scope.stop = function() {
                        closeModals();
                        Idle.unwatch();
                        $scope.started = false;

                    };
                    $scope.start();
                })

        .controller('LockScreenCtrl', ['$scope', 'Idle', '$localStorage', '$rootScope', '$location', '$cookieStore', 'HomeService',
            function($scope, Idle, $localStorage, $rootScope, $location, $cookieStore, HomeService) {
                $rootScope.lock = $localStorage.lockScreen;
                $scope.check = function() {
                    //$rootScope.globals.currentUser.password 
                    if ($scope.password === '1234') {
                        $localStorage.lockScreen = false;
                        $rootScope.lock = $localStorage.lockScreen;
                        Idle.watch();
                        //alert($rootScope.lock);
                    }
                    else {
                        HomeService.notify('invalidpassword');
                    }
                };
            }
        ])

        .controller('UserpageController', ['$scope', '$localStorage', '$rootScope', '$route', '$location', '$cookieStore', '$routeParams',
            function($scope, $localStorage, $rootScope, $route, $location, $cookieStore, $routeParams) {
                $rootScope.dataLoading = false;

                // date_default_timezone_set("Asia/Kathmandu");
                $rootScope.errmsg = '';

                $scope.isLogin = function() {
                    $rootScope.globals = $cookieStore.get("globals") || {}, $rootScope.globals.currentUser ? !0 : !1;
                    if (!$rootScope.globals.currentUser)
                        $location.path('/login');
                };


                if ($localStorage.category === 1)
                    $localStorage.id = $localStorage.headofficeid;
                if ($localStorage.category === 2)
                    $localStorage.id = $localStorage.areaid;
                if ($localStorage.category === 3)
                    $localStorage.id = $localStorage.branchid;
                if ($localStorage.category === 4) {
                    $localStorage.id = $localStorage.staffid;
                }
                if ($localStorage.category === 5)
                    $localStorage.id = $localStorage.centerid;
                $rootScope.contentarea = function() {
                    $scope.contentarea = 'views/pages/contentarea.html';
                };
                $scope.isLogin();
                $rootScope.contentarea();
            }
        ])

        .controller('HeaderController', ['$scope', '$localStorage', '$rootScope', '$location', '$cookieStore',
            function($scope, $localStorage, $rootScope, $location, $cookieStore) {
                $scope.logout = function() {
                    $location.path('/logout');
                };
                $scope.lock = function() {
                    $rootScope.lock = true;
                };
                $rootScope.name = $localStorage.userfullname;
                $rootScope.photo = $localStorage.userphoto[0];
                $rootScope.userid = $localStorage.userjson[0].StaffID;
                $scope.selectedOffice = $localStorage.userOfficejson[0].Name;

            }
        ])

        .controller('ContentAreaController', ['$scope', '$localStorage', '$rootScope', '$location', '$cookieStore',
            function($scope, $localStorage, $rootScope, $location, $cookieStore) {


                $scope.user1 = $localStorage.userfullname;
                $scope.vc = "";
                $scope.misR = "";
                $scope.createC = "";
                $scope.setarea = "";
                $scope.setareadash = "";
                $scope.setbranch = "";
                $scope.setstaff = "";
                $scope.setcenter = "";
                $scope.setmember = "";
                $scope.setvoucher = "";
                $scope.setprofile = "";
                $scope.settasks = "";
                $scope.createmember = "";
                $scope.setreport = "";
                $scope.settimeline = "";
                $scope.setcentermember = "";
                $scope.setcentersetting = "";
                $scope.mempro = "";
                $scope.meetSchedule = "";
                $rootScope.MisR = function() {
                    $scope.misR = "true";
                    $scope.MisR = 'views/report/r1.html';
                };
                $rootScope.scheduleMeeting = function() {
                    $scope.meetSchedule = "true";
                    $scope.scheduleMeeting = 'views/center/meetingSchedule.html';
                };
                $rootScope.centermember = function() {
                    $scope.setcentermember = "true";
                    $scope.centermember = 'views/member/centermember.html';
                };
                $rootScope.memberprofile = function() {
                    $scope.mempro = "true";
                    $scope.memberprofile = 'views/member/memberprofile.html';
                };
                $rootScope.centersetting = function() {
                    $scope.setcentersetting = "true";
                    $scope.centersetting = 'views/center/setting.html';
                };

                $rootScope.timeline = function() {
                    $scope.settimeline = "true";
                    $scope.timeline = 'views/pages/timeline.html';
                };
                $rootScope.report = function() {
                    $scope.setreport = "true";
                    $scope.report = 'views/report/report.html';
                };
                $rootScope.tasks = function() {
                    $scope.settasks = "true";
                    $scope.tasks = 'views/tasks/tasks.html';
                };
                $rootScope.createcenterpage = function() {
                    //  $scope.setcenter = "";
                    $scope.createC = "true";
                    $scope.centerpage = 'views/center/createcenter.html';
                };
                $rootScope.creatememberpage = function() {
                    $scope.createmember = "true";
                    $scope.memberpage = 'views/member/createmember.html';
                };
                $rootScope.arealist = function() {
                    $scope.setarea = "true";
                    $scope.arealist = 'views/office/officelist.html';
                };
                $rootScope.branchlist = function() {
                    $scope.setbranch = "true";
                    $scope.branchlist = 'views/office/officelist.html';
                };
                $rootScope.staffs = function() {
                    $scope.setstaff = "true";
                    $scope.staffs = 'views/staff/stafflist.html';
                };
                $rootScope.centers = function() {
                    $scope.setcenter = "true";
                    $scope.centers = 'views/center/centerlist.html';
                };
                $rootScope.members = function() {
                    $scope.setmember = "true";
                    $scope.members = 'views/member/memberlist.html';
                };
                $rootScope.vouchers = function() {
                    $scope.setvoucher = "true";
                    $scope.vouchers = 'views/account/voucherlist.html';
                };
                $rootScope.profile = function() {
                    $scope.setprofile = "true";
                    $scope.profile = 'views/staff/profile.html';
                };
                $rootScope.dashboard = function() {
                    $scope.dashboard = 'views/pages/dashboard.html';
                };
                $rootScope.detail = function() {
                    $scope.centerdetail = 'views/center/viewcenter.html';
                };
                $rootScope.areadetail = function() {
                    $scope.setareadash = "true";
                    $scope.areadetail = 'views/pages/dashboard.html';
                };
                $rootScope.list = function() {
                    $scope.list = 'views/pages/list.html';
                };
                $rootScope.getLoadPage = function() {
                    $rootScope.dashboard();
                    $rootScope.list();
                };
                $rootScope.SwitchFuction = function() {
                    switch ($location.$$path) {
                        case '/center':
                            $scope.vc = "true";
                            $rootScope.detail();
                            break;
                        case '/area':
                            $rootScope.areadetail();
                            break;
                        case '/timeline':
                            $rootScope.timeline();
                            break;
                        case '/tasks':
                            $rootScope.tasks();
                            break;
                        case '/arealist':
                            $rootScope.arealist();
                            break;
                        case '/branchlist':
                            $rootScope.branchlist();
                            break;
                        case '/stafflist':
                            $rootScope.staffs();
                            break;
                        case '/centerlist':
                            $rootScope.centers();
                            break;
                        case '/memberlist':
                            $rootScope.members();
                            break;
                        case '/voucherlist':
                            $rootScope.vouchers();
                            break;
                        case '/profile':
                        case '/staffprofile':
                            $rootScope.profile();
                            break;
                        case '/report':
                            $rootScope.report();
                            break;
                        case '/centermember':
                            $rootScope.centermember();
                            break;
                        case '/memberprofile':
                            $rootScope.memberprofile();
                            break;
                        case '/centersetting':
                            $rootScope.centersetting();
                            break;
                        case '/createcenter':
                        case '/editcenter':
                            $rootScope.createcenterpage();
                            break;
                        case '/createmember':
                            $rootScope.creatememberpage();
                            break;
                        case '/scheduleMeeting':
                            $rootScope.scheduleMeeting();
                            break;
                        case '/misreport':
                            $rootScope.MisR();
                            break;

                           
                        default:

                    }
                };
                $rootScope.SwitchFuction();
                $rootScope.dashboard();
            }
        ])

        .controller('DashboardController', ['$scope', '$http', '$localStorage', '$rootScope', '$cookieStore', 'HomeService',
            function($scope, $http, $localStorage, $rootScope, $cookieStore, HomeService) {
                $rootScope.dataLoading = true;
                if ($localStorage.SelOffice !== '') {
                    $scope.office = $localStorage.SelOffice;
                }
                else {
                    $scope.office = $localStorage.userOfficejson[0].Name;
                }
                $scope.today = AD2BS($localStorage.today) + " (" + $localStorage.today + ")"; //today's AD date 
                $scope.fyear = $localStorage.FiscalYear;



                var data1 = [];
                var data2 = [];
                var SavingType = [];
                var LoanType = [];
                var Balance = [];
                var Balance1 = [];
                var SavingTotal = 0,
                        LoanTotal = 0,
                        diff = 0;
                if ($localStorage.entry === 4) {
                    $localStorage.id = $localStorage.branchid;
                }
                HomeService.branchwiseBalance()
                        .then(
                                function(response) {
                                    if (response.data.Status === 'Success') {
                                        $scope.ActiveMember = response.data.responseText.MemberCount[0].ActiveMember;
                                        $scope.DropMember = response.data.responseText.MemberCount[0].DropMember;
                                        $scope.Borrower = response.data.responseText.MemberCount[0].Borrower;
                                        $scope.NonLonee = 0;//response.data.responseText.MemberCount[0].NonLonee;
                                        $scope.Passive = response.data.responseText.MemberCount[0].Passive;
                                        $scope.Branches = response.data.responseText.BranchCount[0].Branches;
                                        $scope.Staffs = response.data.responseText.StaffCount[0].Staffs;
                                        $scope.Trainee = response.data.responseText.TraineeCount[0].Trainee;
                                        //  $scope.StaffDrop = response.data.responseText.DropCount[0].Drops;
                                        $scope.FieldStaff = response.data.responseText.FieldStaff[0].FieldStaff;
                                        $scope.Incharge = response.data.responseText.Incharge[0].Code + "-" + response.data.responseText.Incharge[0].FirstName + " " + response.data.responseText.Incharge[0].LastName;

                                        for (var i = 0; i < response.data.responseText.SavingBalanceList.length; i++) {
                                            SavingType.push(response.data.responseText.SavingBalanceList[i].SavingType);
                                            Balance.push(parseInt(response.data.responseText.SavingBalanceList[i].Balance));
                                        }
                                        for (var j = 0; j < response.data.responseText.LoanBalanceList.length; j++) {
                                            LoanType.push(response.data.responseText.LoanBalanceList[j].LoanType);
                                            Balance1.push(parseInt(response.data.responseText.LoanBalanceList[j].Balance));
                                        }
                                        for (var i = 0; i < SavingType.length; i++) {
                                            data1[i] = {
                                                "label": SavingType[i],
                                                "value": Balance[i]
                                            }
                                        }
                                        for (var j = 0; j < LoanType.length; j++) {
                                            data2[j] = {
                                                "label": LoanType[j],
                                                "value": Balance1[j]
                                            }
                                        }
                                        //Sum of Savings
                                        for (var i = 0; i < Balance.length; i++) {
                                            SavingTotal += Balance[i];
                                        }
                                        //sum of loans
                                        for (var i = 0; i < Balance1.length; i++) {
                                            LoanTotal += Balance1[i];
                                        }
                                        var data3 = [{
                                                "label": "Saving",
                                                "value": SavingTotal
                                            }, {
                                                "label": "Loan",
                                                "value": LoanTotal
                                            }
                                        ];
                                        var SavingbarLineChart = new FusionCharts(DrawLine('column2d', 'bar-balance', "Balance", "", "", data3)).render();
                                        var SavingbarLineChart = new FusionCharts(DrawLine('column2d', 'bar-saving', "Saving", "", "", data1)).render();
                                        var LoanbarLineChart = new FusionCharts(DrawLine('column2d', 'bar-loan', 'Loan', "", "", data2)).render();
                                        var SavingPieChart = new FusionCharts(DrawPie('pie2d', 'pie-saving', "Saving", data1)).render();
                                        var LoanPieChart = new FusionCharts(DrawPie('pie2d', 'pie-loan', "Loan", data2)).render();
                                        var SavingFootfallChart = new FusionCharts(DrawLine('area2d', 'footfall-saving', "Saving", "", "", data1)).render();
                                        var LoanFootfallChart = new FusionCharts(DrawLine('area2d', 'footfall-loan', "Loan", "", "", data2)).render();
                                        var SavingCSChart = new FusionCharts(DrawLine('line', 'cs-saving', "Saving", "", "", data1)).render();
                                        var LoanCSChart = new FusionCharts(DrawLine('line', 'cs-loan', "Loan", "", "", data2)).render();
                                        $rootScope.dataLoading = false;
                                    } else {
                                        $rootScope.errmsg = 'Response Error';
                                        $rootScope.dataLoading = false;
                                    }
                                }
                        );
            }
        ])

        .controller('ListController', ['$scope', '$localStorage', '$rootScope', 'HomeService', '$cookieStore', '$http',
            function($scope, $localStorage, $rootScope, HomeService, $cookieStore, $http) {

                $rootScope.getListPage = function(category, id) {
                    $rootScope.getLoadPage();
                };
                $rootScope.blist = function() {
                    $scope.listPage = 'views/office/officelist.html';
                };
                $rootScope.stafflist = function() {
                    $scope.listPage = 'views/staff/stafflist.html';
                };
                $rootScope.centerlist = function() {
                    $scope.listPage = 'views/center/centerlist.html';
                };
                $rootScope.memberlist = function() {
                    $scope.listPage = 'views/member/memberlist.html';
                };
                $rootScope.CheckPage = function() {
                    switch ($localStorage.category) {
                        case 1:
                        case 2:
                            {
                                $rootScope.blist();
                                break;
                            }

                        case 3:
                            {
                                $rootScope.stafflist();
                                break;
                            }
                        case 4:
                            {
                                $rootScope.centerlist();
                                break;
                            }
                        case 5:
                            {
                                $rootScope.memberlist();
                                break;
                            }

                        case 6:
                            {
                                break;
                            }
                        default:
                            {

                            }
                    }
                };
                $rootScope.CheckPage();
            }
        ])

        .controller('BListController', ['$scope', '$localStorage', '$rootScope', '$location', '$cookieStore', 'HomeService', 'NgTableParams',
            function($scope, $localStorage, $rootScope, $location, $cookieStore, HomeService, NgTableParams) {
                $rootScope.dataLoading = true;
                var self = this;
                var data = "";
                $scope.sortType = 'Name'; // set the default sort type
                $scope.sortReverse = false;
                $rootScope.branchList = function(id, name) {
                    $localStorage.id = id;
                    $localStorage.SelOffice = name;
                    $localStorage.category = $localStorage.category + 1;
                    if ($localStorage.entry === 1) {
                        if ($localStorage.category === 2) {
                            $localStorage.areaid = id;
                            $location.path('/area');
                        }
                        if ($localStorage.category === 3) {
                            $localStorage.branchid = id;
                            $location.path('/branch');
                        }
                    }
                    if ($localStorage.entry === 2) {
                        if ($localStorage.category === 3) {
                            $localStorage.branchid = id;
                            $location.path('/branch');
                        }
                    }
                    $rootScope.getBranchListData();
                };
                $rootScope.getBranchListData = function() {
                    switch ($localStorage.category) {
                        case 1:
                        case 2:
                            {
                                HomeService.BranchList()
                                        .then(
                                                function(response) {
                                                    if (response.data.Status === 'Success') {
                                                        if ($localStorage.category === 1) {
                                                            $localStorage.arealistjson = response.data.responseText.BranchList;
                                                            // console.log($localStorage.arealistjson);
                                                            $localStorage.choosenareajson = response.data.responseText.ChoosenOffice;
                                                            data = $localStorage.arealistjson;
                                                            self.tableParams = new NgTableParams({
                                                                count: 5
                                                            }, {
                                                                counts: [
                                                                    {'value': 5, 'show': 5},
                                                                    {'value': 10, 'show': 10},
                                                                    {'value': 25, 'show': 25},
                                                                    {'value': data.length, 'show': "All"}
                                                                ],
                                                                dataset: data
                                                            });
                                                            $rootScope.dataLoading = false;
                                                        } else if ($localStorage.category === 2) {
                                                            if (($location.$$path) === '/branchlist') {
                                                                $localStorage.Allbranchlistjson = response.data.responseText.BranchList;
                                                                data = $localStorage.Allbranchlistjson;
                                                                self.tableParams = new NgTableParams({
                                                                    count: 5
                                                                }, {
                                                                    counts: [
                                                                        {'value': 5, 'show': 5},
                                                                        {'value': 10, 'show': 10},
                                                                        {'value': 25, 'show': 25},
                                                                        {'value': data.length, 'show': "All"}
                                                                    ],
                                                                    dataset: data
                                                                });
                                                                $rootScope.dataLoading = false;
                                                            } else {
                                                                $localStorage.branchlistjson = response.data.responseText.BranchList;
                                                                $localStorage.choosenbranchjson = response.data.responseText.ChoosenOffice;
                                                                data = $localStorage.branchlistjson;
                                                                self.tableParams = new NgTableParams({
                                                                    count: 5
                                                                }, {
                                                                    counts: [
                                                                        {'value': 5, 'show': 5},
                                                                        {'value': 10, 'show': 10},
                                                                        {'value': 25, 'show': 25},
                                                                        {'value': data.length, 'show': "All"}
                                                                    ],
                                                                    dataset: data
                                                                });
                                                                $rootScope.dataLoading = false;
                                                            }
                                                        }

                                                    } else {
                                                        $rootScope.errmsg = 'Response Error';
                                                    }
                                                }
                                        )
                                break;
                            }
                        case 3:
                        case 4:
                        case 5:
                            {
                                $rootScope.CheckPage();
                            }
                        default:
                            {
                            }
                    }
                };
                $rootScope.getBranchListData();
            }
        ])

        .controller('StaffListController', ['$scope', '$localStorage', '$rootScope', '$location', 'HomeService', '$cookieStore', '$http', 'NgTableParams',
            function($scope, $localStorage, $rootScope, $location, HomeService, $cookieStore, $http, NgTableParams) {
                $rootScope.dataLoading = true;
                var self = this;
                var data = "";
                $rootScope.bWiseStaff = function(id) {
                    $rootScope.dataLoading = true;
                    $localStorage.id = id;
                    //  var total = tableParams.total();
                    data = "";
                    self.tableParams = new NgTableParams({
                        count: 5
                    }, {
                        counts: [
                            {'value': 5, 'show': 5},
                            {'value': 10, 'show': 10},
                            {'value': 25, 'show': 25},
                            {'value': data.length, 'show': "All"}
                        ],
                        dataset: data
                    });
                    HomeService.BranchList()
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            $localStorage.stafflistjson = response.data.responseText.StaffList;
                                            data = $localStorage.stafflistjson;
                                            self.tableParams = new NgTableParams({
                                                count: 5
                                            }, {
                                                counts: [
                                                    {'value': 5, 'show': 5},
                                                    {'value': 10, 'show': 10},
                                                    {'value': 25, 'show': 25},
                                                    {'value': data.length, 'show': "All"}
                                                ],
                                                dataset: data

                                            });
                                            $rootScope.dataLoading = false;
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };
                $rootScope.staffProfile = function(id) {
                    $localStorage.ChosenStaffID = id;
                    $location.path('/staffprofile');

                };



                $rootScope.getStaffListData = function() {
                    HomeService.BranchList()
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            if (($location.$$path) === '/stafflist' && $localStorage.entry === 3) {
                                                $scope.offices = $localStorage.userOfficejson;
                                                $scope.selectedOption = $scope.offices[0];
                                                $rootScope.bWiseStaff($scope.selectedOption.ID);
                                            } else if (($location.$$path) === '/stafflist') {
                                                $localStorage.Allbranchlistjson = response.data.responseText.BranchList;
                                                $scope.offices = $localStorage.Allbranchlistjson;
                                                $localStorage.category = 3;
                                                $.each(($scope.offices), function(idx, obj) {
                                                    if (obj.ID == $localStorage.userOfficejson[0].ID) {
                                                        $scope.selectedOption = obj;
                                                    }
                                                });
                                                // alert(JSON.stringify($scope.selectedOption));
                                                $rootScope.bWiseStaff($scope.selectedOption.ID);

                                            } else {
                                                $localStorage.stafflistjson = response.data.responseText.StaffList;
                                                $localStorage.choosenbranchjson = response.data.responseText.ChoosenOffice;
                                                data = $localStorage.stafflistjson;
                                                self.tableParams = new NgTableParams({
                                                    count: 5
                                                }, {
                                                    counts: [
                                                        {'value': 5, 'show': 5},
                                                        {'value': 10, 'show': 10},
                                                        {'value': 25, 'show': 25},
                                                        {'value': data.length, 'show': "All"}
                                                    ],
                                                    dataset: data
                                                });
                                                $rootScope.dataLoading = false;
                                            }
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };
                $rootScope.getStaffListData();
            }
        ])

        .controller('CenterListController', ['$scope', '$localStorage', '$rootScope', '$modal', '$timeout', '$location', 'HomeService', 'NgTableParams', '$cookieStore', '$http',
            function($scope, $localStorage, $rootScope, $modal, $timeout, $location, HomeService, NgTableParams, $cookieStore, $http) {
                $rootScope.dataLoading = true;
                $scope.Active = 0;

                $rootScope.filter = function(value) {
                    alert(value);
                };
                if ($localStorage.entry > 2) {
                    $scope.entry = true;
                } else
                    $scope.entry = false;
                $rootScope.self = this;
                var data = "";
                $scope.CreateCenter = function(office) {
                    $localStorage.selOff = office;
                    $localStorage.selCen = '';
                    $location.path('/createcenter');
                };

                $rootScope.bWiseCenter = function(office, active) {
                    $scope.Active = active;
                    $scope.selectedOption = office;
                    var id = $scope.selectedOption.ID;
                    //alert($scope.selectedOption.ID + " " + active);
                    $rootScope.dataLoading = true;
                    data = "";
                    $rootScope.self.tableParams = new NgTableParams({
                        count: 5
                    }, {
                        counts: [
                            {'value': 5, 'show': 5},
                            {'value': 10, 'show': 10},
                            {'value': 25, 'show': 25},
                            {'value': data.length, 'show': "All"}
                        ],
                        dataset: data
                    });
                    if (active == 0) {
                        HomeService.branchWiseCenter(id);
                    }
                    else
                        HomeService.BranchStatusWiseCenter(id, active);
                };
                $rootScope.memberList = function(office, center) {
                    var branchid = office.ID;
                    var centerid = center.CenterID;
                    $localStorage.selOff = office;
                    $localStorage.selCen = center;

                    $localStorage.id = centerid;
                    $localStorage.category = $localStorage.category + 1;
                    if ($localStorage.entry === 1) {
                        if ($localStorage.category === 5) {
                            $localStorage.selCen.CenterID = centerid;
                            $localStorage.selOff.ID = branchid;
                            $location.path('/center');
                        }
                    }
                    if ($localStorage.entry === 2) {
                        if ($localStorage.category === 5) {
                            $localStorage.selCen.CenterID = centerid;
                            $localStorage.selOff.ID = branchid;
                            $location.path('/center');
                        }
                    }
                    if ($localStorage.entry === 3) {
                        if ($localStorage.category === 5) {
                            $localStorage.selCen.CenterID = centerid;
                            $localStorage.selOff.ID = branchid;
                            $location.path('/center');
                        }
                    }
                    if ($localStorage.entry === 4) {
                        if ($localStorage.category === 5) {
                            $localStorage.selCen.CenterID = centerid;
                            $localStorage.selOff.ID = branchid;
                            $location.path('/center');
                        }
                    }
                };
                $rootScope.getCenterListData = function() {
                    // alert($localStorage.category);
                    HomeService.BranchList()
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            if (($location.$$path) === '/centerlist' && $localStorage.entry === 4) {
                                                $scope.offices = $localStorage.userOfficejson;
                                                $scope.selectedOption = $scope.offices[0];
                                                $localStorage.centerlistjson = response.data.responseText.CenterList;
                                                // alert(JSON.stringify($localStorage.centerlistjson));
                                                $localStorage.NextCenterCode = response.data.responseText.NewCenterCode[0].NewCode;
                                                data = $localStorage.centerlistjson;
                                                $rootScope.self.tableParams = new NgTableParams({
                                                    count: 5
                                                }, {
                                                    counts: [
                                                        {'value': 5, 'show': 5},
                                                        {'value': 10, 'show': 10},
                                                        {'value': 25, 'show': 25},
                                                        {'value': data.length, 'show': "All"}
                                                    ],
                                                    dataset: data
                                                });
                                                $rootScope.dataLoading = false;
                                            } else if (($location.$$path) === '/centerlist' && $localStorage.entry === 3) {
                                                $scope.offices = $localStorage.userOfficejson;
                                                $scope.selectedOption = $scope.offices[0];
                                                $localStorage.selOff.Name = $scope.selectedOption.Name;
                                                HomeService.branchWiseCenter($localStorage.bid);
                                            } else if (($location.$$path) === '/centerlist') {
                                                $localStorage.Allbranchlistjson = response.data.responseText.BranchList;
                                                $scope.offices = $localStorage.Allbranchlistjson;
                                                $localStorage.category = 4;
                                                $rootScope.dataLoading = false;
                                            } else {
                                                $localStorage.centerlistjson = response.data.responseText.CenterList;
                                                $localStorage.choosenstaffjson = response.data.responseText.ChoosenStaff;
                                                $scope.centers = $localStorage.centerlistjson;
                                                $rootScope.dataLoading = false;
                                            }
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };
                $rootScope.getCenterListData();
            }
        ])

        .controller('MemberListController', ['$scope', '$localStorage', '$rootScope', '$location', 'HomeService', '$cookieStore', '$http', 'NgTableParams',
            function($scope, $localStorage, $rootScope, $location, HomeService, $cookieStore, $http, NgTableParams) {
                $rootScope.dataLoading = true;
                $scope.status = 0;
                var data = "";
                var self = $rootScope.tbl = this;
                $rootScope.memberProfile = function(mid, center, office) {
                    // alert("memberprofile: " + mid + " Center: " + center.CenterID + " Office: " + office.ID);
                    $localStorage.selectedMemberID = mid;
                    $localStorage.selCen.CenterID = center.CenterID;
                    $localStorage.selOff.ID = office.ID;
                    $localStorage.selOff = office;
                    $localStorage.selCen = center;

                    $location.path('/memberprofile');
                };

                $rootScope.bWiseCenter = function(office, status) {
                    $scope.status = status;
                    $scope.selectedOption = office;
                    data = "";
                    $localStorage.category = 4;
                    $rootScope.dataLoading = true;
                    self.tableParams = new NgTableParams({
                        count: 5
                    }, {
                        counts: [
                            {'value': 5, 'show': 5},
                            {'value': 10, 'show': 10},
                            {'value': 25, 'show': 25},
                            {'value': data.length, 'show': "All"}
                        ],
                        dataset: data
                    });
                    HomeService.branchWiseCenter($scope.selectedOption.ID);
                };
                $rootScope.CenterWiseMember = function(office, center, status) {
                    $localStorage.selCen = center;
                    $rootScope.dataLoading = true;
                    $scope.selectedOption = office;
                    $scope.center = center;
                    $localStorage.category = 5;
                    $localStorage.centerid = center.CenterID;
                    $localStorage.branchid = $scope.selectedOption.ID;
                    HomeService.GetCenterWiseMember($localStorage.branchid, $localStorage.centerid, status);
                };


                $rootScope.getMemberListData = function() {
                    HomeService.BranchList()
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            if (($location.$$path) === '/memberlist' && $localStorage.entry === 4) {
                                                $scope.offices = $localStorage.userOfficejson;
                                                $scope.selectedOption = $scope.offices[0];
                                                $localStorage.centerlistjson = response.data.responseText.CenterList;
                                                $rootScope.centers = $localStorage.centerlistjson;
                                                $rootScope.dataLoading = false;
                                            } else if (($location.$$path) === '/memberlist' && $localStorage.entry === 3) {
                                                $scope.offices = $localStorage.userOfficejson;
                                                $scope.selectedOption = $scope.offices[0];
                                                $localStorage.selOff = $localStorage.userOfficejson;
                                                HomeService.branchWiseCenter($scope.selectedOption.ID);
                                            } else if (($location.$$path) === '/memberlist') {
                                                $localStorage.Allbranchlistjson = response.data.responseText.BranchList;
                                                $scope.offices = $localStorage.Allbranchlistjson;
                                                $localStorage.category = 4;
                                                $rootScope.dataLoading = false;
                                            } else {
                                                $localStorage.memberlistjson = response.data.responseText.MemberList;
                                                $localStorage.choosencenterjson = response.data.responseText.ChoosenCenter;
                                                $scope.members = $localStorage.memberlistjson;
                                                $rootScope.dataLoading = false;
                                            }
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };


                $rootScope.showMember = true;
                if ($localStorage.entry > 2) {
                    $scope.entry = true;
                } else {
                    $scope.entry = false;
                }
                $rootScope.getMemberListData();

            }
        ])

        .controller('CenterMemberCtrl', ['$scope', '$localStorage', '$rootScope', '$location', 'HomeService', '$cookieStore', '$http', 'NgTableParams',
            function($scope, $localStorage, $rootScope, $location, HomeService, $cookieStore, $http, NgTableParams) {
                $rootScope.dataLoading = true;
                if ($localStorage.entry <= 2) {
                    $scope.entry = false;
                } else
                    $scope.entry = true;
                $scope.status = 0;
                $rootScope.tbl = this;
                $scope.office = $localStorage.selOff.Name;
                $scope.center = $localStorage.selCen.CenterName;
                $localStorage.category = 5;
                $scope.selectedCenterID = $localStorage.centerid = $localStorage.selCen.CenterID;
                $scope.selectedBranchID = $localStorage.branchid = $localStorage.selOff.ID;

                $rootScope.memberProfile = function(mid, cid, oid) {
                    alert("memberprofile: " + mid + " Center: " + cid + " Office: " + oid);
                    $localStorage.selectedMemberID = mid;
                    $location.path('/memberprofile');
                };
                $rootScope.CreateMember = function(id) {
                    $location.path('/createmember');
                };
                $rootScope.StatusMember = function(status) {
                    $localStorage.category = 5;
                    HomeService.GetCenterWiseMember($localStorage.branchid, $localStorage.centerid, status);
                };

                HomeService.GetCenterWiseMember($localStorage.branchid, $localStorage.centerid, $scope.status);

            }
        ])

        .controller('MeetingScheduleCtrl', ['$scope', '$localStorage', '$rootScope', '$location', 'HomeService', '$cookieStore', '$http', 'NgTableParams',
            function($scope, $localStorage, $rootScope, $location, HomeService, $cookieStore, $http, NgTableParams) {
                // $rootScope.dataLoading = true;
                $scope.centerName = $localStorage.selCen.CenterName;
                $scope.office = $localStorage.selOff.Name;
                var today = $localStorage.today;  //Today's AD date
                $scope.center = {};

                HomeService.getMeetingSchedule($localStorage.selCen.CenterID, $localStorage.selOff.ID)
                        .then(
                                function(response) {
                                    if (response.data.Status === 'Success') {
                                        console.log(JSON.stringify(response.data.responseText.CollectionSchedule));
                                        $localStorage.CollectionSchedule = response.data.responseText.CollectionSchedule;
                                        $scope.center.NextDefaultMeetingDate = $localStorage.CollectionSchedule[0].NextDefaultMeetingDate;
                                        $scope.center.NextMeetingDate = $localStorage.CollectionSchedule[0].NextMeetingDate;
                                        $scope.center.RescheduledReason = $localStorage.CollectionSchedule[0].RescheduledReason;

                                    } else {
                                        $rootScope.errmsg = 'Response Error';
                                    }
                                }
                        );

                $scope.differenceInDays = function(fDate, sDate) {

                    var dt1 = fDate.split('/'),
                            dt2 = sDate.split('/'),
                            one = new Date(dt1[0], dt1[1], dt1[2]),
                            two = new Date(dt2[0], dt2[1], dt2[2]);

                    var millisecondsPerDay = 1000 * 60 * 60 * 24;
                    var millisBetween = two.getTime() - one.getTime();
                    var days = millisBetween / millisecondsPerDay;

                    return Math.floor(days);
                };

                $scope.color = function() {
                    alert('compared');
                    if ($scope.diff > 1) {
                        alert("green");
                    }
                    else {
                        alert("Red");
                    }

                };

                $scope.$watch('[center.LastMeetingDate, center.NextMeetingDate]', function(currScope, newVal, oldVal) {

                    $scope.diff = $scope.differenceInDays($scope.center.LastMeetingDate, $scope.center.NextMeetingDate);
                    $scope.color();
                });








                $scope.SaveSchedule = function(center) {
                    //$scope.center.RescheduledDate = AD2BS(today);


                    $scope.center = {
                        CalendarID: $localStorage.CollectionSchedule[0].CalendarID,
                        // OfficeID: $localStorage.selOff.ID,
                        // CenterID: $localStorage.selCen.CenterID,
                        OfficeID: 4,
                        CenterID: 2,
                        LastMeetingDate: $localStorage.CollectionSchedule[0].LastMeetingDate,
                        NextDefaultMeetingDate: $localStorage.CollectionSchedule[0].NextDefaultMeetingDate,
                        NextMeetingDate: center.NextMeetingDate,
                        RescheduledMeetingDate: $localStorage.CollectionSchedule[0].NextMeetingDate,
                        RescheduledReason: center.RescheduledReason,
                        RescheduledBy: $localStorage.userjson[0].StaffID,
                        RescheduledDate: AD2BS(today),
                        MeetingDateAD: BS2AD(center.NextMeetingDate)
                    };
                    console.log(JSON.stringify($scope.center));
                    HomeService.SaveSchedule($scope.center)
                            .then(
                                    function(response) {
                                        $rootScope.dataLoading = false;
                                        //  alert(JSON.stringify(response));
                                        if (response.data.Status === 'Success') {

                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };


            }
        ])

        .controller('MemProfileCtrl', ['$route', '$http', '$upload', '$scope', 'HomeService', '$localStorage', '$rootScope', '$cookieStore', 'NgTableParams', '$modal',
            function($route, $http, $upload, $scope, HomeService, $localStorage, $rootScope, $cookieStore, NgTableParams, $modal) {
                $rootScope.dataLoading = true;
                $scope.selectedMemberID = $localStorage.selectedMemberID;
                $scope.office = $localStorage.selOff.Name;
                $scope.center = $localStorage.selCen.CenterName;
                $rootScope.localstream = null;

                $rootScope.upload = function(result) {
                    $rootScope.file = new File([result], 'abc.png', {type: "image/png"});

                    $rootScope.dataLoading = true;
                    if ($rootScope.file) {
                        $upload.upload({
                            url: getip() + '/img.php',
                            data: {
                                MemberID: $localStorage.selectedMemberID,
                                BranchID: $localStorage.selOff.ID
                            },
                            file: $rootScope.file,
                        }).then(function(response) {

                            // alert(JSON.stringify(response));
                            if (response.data.Status === "Success") {
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }

                                $scope.modalInstance.opened.then(function() {
                                    $scope.modalInstance.dismiss('dismiss');
                                });
                                if ($rootScope.localstream !== null) {
                                    $rootScope.localstream.stop();
                                    HomeService.notify('update');
                                }
                                else {
                                    HomeService.notify('upload');
                                }
                                $route.reload();
                            }
                            else {
                                //  $rootScope.errmsg =(response.data.Error);
                                alert(response.data.Error);
                                $rootScope.dataLoading = false;
                            }
                        });
                    }
                    else
                    {
                        $rootScope.dataLoading = false;
                        alert("No file selected");
                    }
                };

                $scope.uploadPic = function() {
                    $scope.modalInstance = $modal.open({
                        templateUrl: 'uploadpic.html',
                        controller: UploadPicCtrl,
                        backdrop: 'static',
                        keyboard: false
                    });
                };
                var UploadPicCtrl = function($scope, $modalInstance, $rootScope) {

                    $scope.fileChanged = function(e) {
                        var files = e.target.files;
                        var fileReader = new FileReader();
                        fileReader.readAsDataURL(files[0]);

                        fileReader.onload = function(e) {
                            $scope.imgSrc = this.result;
                            $scope.$apply();
                        };

                    };

                    $scope.clear = function() {
                        $scope.imageCropStep = 1;
                        delete $scope.imgSrc;
                        delete $scope.result;
                        delete $scope.resultBlob;
                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };

                };

                $scope.capturePic = function() {
                    $scope.modalInstance = $modal.open({
                        templateUrl: 'capturepic.html',
                        controller: CapturePicCtrl,
                        backdrop: 'static',
                        keyboard: false
                                //  windowClass: 'modalwidth800'
                    });
                };
                var CapturePicCtrl = function($scope, $modalInstance) {
                    $scope.video = null;
                    $scope.picture = null;
                    $scope.error = null;


                    $scope.loadPic = function() {
                        // Grab elements, create settings, etc.
                        var video = document.getElementById("video"),
                                videoObj = {"video": true},
                        errBack = function(error) {
                            console.log("Video capture error: ", error.code);
                        };

                        // Put video listeners into place
                        if (navigator.getUserMedia) {
                            // Standard 
                            navigator.getUserMedia(videoObj, function(stream) {
                                $rootScope.localstream = stream;
                                video.src = stream;
                                video.play();
                            }, errBack);
                        } else if (navigator.webkitGetUserMedia) {
                            // WebKit-prefixed
                            navigator.webkitGetUserMedia(videoObj, function(stream) {
                                video.src = window.webkitURL.createObjectURL(stream);
                                $rootScope.localstream = stream;
                                video.play();
                            }, errBack);
                        } else if (navigator.mozGetUserMedia) {
                            // WebKit-prefixed
                            navigator.mozGetUserMedia(videoObj, function(stream) {
                                video.src = window.URL.createObjectURL(stream);
                                $rootScope.localstream = stream;
                                video.play();


                            }, errBack);

                        }

                        $scope.video = video;

                    };


                    $scope.onVideoError = function(err) {
                        alert("onVideoError");
                        if (typeof err != "undefined")
                            $scope.error = err.message + '(' + err.name + ')';
                    };

                    $scope.takeScreenshot = function() {

                        var picCanvas = document.createElement('canvas');
                        var width = $scope.video.width;
                        var height = $scope.video.height;

                        picCanvas.width = width;
                        picCanvas.height = height;
                        var ctx = picCanvas.getContext("2d");
                        ctx.drawImage($scope.video, 0, 0, width, height);
                        var imageData = ctx.getImageData(0, 0, width, height);
                        document.querySelector('#canvas').getContext("2d").putImageData(imageData, 0, 0);
                        $scope.picture = picCanvas.toDataURL("image/png");
                    };


                    $scope.clear = function() {
                        $scope.imageCropStep = 1;
                        delete $scope.picture;
                        delete $scope.resultBlob;

                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                        $rootScope.localstream.stop();
                    };
                    $scope.reset = function() {
                        $scope.picture = null;
                    };
                };

                $scope.deletePic = function() {
                    $modal.open({
                        templateUrl: 'deletePic.html',
                        controller: DeletePicCtrl,
                        backdrop: 'static',
                        keyboard: false
                    });
                };
                var DeletePicCtrl = function($scope, $modalInstance) {
                    $scope.delete = function() {
                        $rootScope.dataLoading = true;
                        var encodedString = 'MemberID=' +
                                encodeURIComponent($localStorage.selectedMemberID) +
                                '&BranchID=' +
                                encodeURIComponent($localStorage.selOff.ID) +
                                '&Delete=' +
                                encodeURIComponent(1);
                        $http({
                            method: 'POST',
                            url: getip() + '/img.php',
                            data: encodedString,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }

                        }).then(function(response) {
                            if (response.data.Status === "Success") {
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                                $rootScope.dataLoading = false;
                                $modalInstance.close('delete');
                                HomeService.notify('delete');
                                $route.reload();
                            }
                            else {
                                alert(response.data.Error);
                                $rootScope.dataLoading = false;
                            }
                        });
                    };
                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                };

                $rootScope.MemberProfile = function() {
                    HomeService.getMemberProfile($scope.selectedMemberID, $localStorage.selOff.ID)
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success')
                                        {
                                            $localStorage.memberProfileJson = response.data.responseText.Member;
                                            $scope.Name = $localStorage.memberProfileJson[0].FirstName + " " + $localStorage.memberProfileJson[0].LastName;
                                            $scope.MemberCode = $localStorage.memberProfileJson[0].MemberCode;
                                            $scope.Gender = $localStorage.memberProfileJson[0].Gender;
                                            $scope.DOB = $localStorage.memberProfileJson[0].DOB;
                                            $scope.age = calculateAge($localStorage.memberProfileJson[0].DOB);
                                            $scope.MaritalStatus = $localStorage.memberProfileJson[0].MaritalStatus;
                                            $scope.EducationLevel = $localStorage.memberProfileJson[0].EducationLevel;
                                            $scope.Tole = $localStorage.memberProfileJson[0].Tole;
                                            $scope.WardNo = $localStorage.memberProfileJson[0].WardNo;
                                            $scope.MobileNo = $localStorage.memberProfileJson[0].MobileNo;
                                            $scope.Photo = response.data.responseText.Photo[0];

                                            $rootScope.dataLoading = false;
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                            $rootScope.dataLoading = false;
                                        }
                                    }
                            );
                };
                $rootScope.MemberProfile();

            }
        ])

        .controller('CenterSettingCtrl', ['$scope', '$localStorage', '$route', '$rootScope', '$location', 'HomeService', '$cookieStore', '$http', 'NgTableParams',
            function($scope, $localStorage, $route, $rootScope, $location, HomeService, $cookieStore, $http, NgTableParams) {
                $scope.selectedTab = 1;
                $scope.setradio = 1;
                var data = "";
                var data1 = "";
                var data2 = "";
                var self = this;
                $scope.office = $localStorage.selOff.Name;
                $scope.center = $localStorage.selCen.CenterName;
                $scope.selectedCenterID = $localStorage.selCen.CenterID;
                $scope.selectedOfficeID = $localStorage.selOff.ID;
                //alert($scope.selectedCenterID +" "+ $scope.selectedBranchID);

                $scope.removeRow = function(type, ID) {

                    HomeService.DelCenSetting(type, ID, $scope.selectedOfficeID, $scope.selectedCenterID)
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            HomeService.notify('delete');
                                            $route.reload();

                                        }
                                        else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }

                            );
                };

                $scope.editRow = function(type, typeID, amount) {
                    if (type === 'SAVING') {
                        $.each(($localStorage.SavingType), function(idx, obj) {
                            if (obj.SavingTypeID == typeID) {
                                $scope.selectedSaving = obj.SavingTypeID;
                                $scope.Amount = amount;
                            }
                        });
                    }
                    if (type === 'FUND') {
                        $.each(($localStorage.FundType), function(idx, obj) {
                            if (obj.InsuranceTypeID == typeID) {
                                $scope.selectedFund = obj.InsuranceTypeID;
                                $scope.Amount = amount;
                            }
                        });
                    }
                    if (type === 'FEE') {
                        $.each(($localStorage.FeeType), function(idx, obj) {
                            if (obj.IncomeTypeID == typeID) {
                                $scope.selectedFee = obj.IncomeTypeID;
                                $scope.Amount = amount;
                            }
                        });
                    }


                };
                $scope.Add = function(selType, amount) {
                    var type, typeID;
                    $scope.data = {};
                    if (selType == 1) {
                        type = 'SAVING';
                        typeID = $scope.selectedSaving;
                    }
                    if (selType == 2) {
                        type = 'FUND';
                        typeID = $scope.selectedFund;
                    }
                    if (selType == 3) {
                        type = 'FEE';
                        typeID = $scope.selectedFee;
                    }
                    $scope.data = {
                        ID: '',
                        CenterID: 1, //$scope.selectedCenterID
                        TypeID: typeID,
                        Type: type,
                        Amount: amount,
                        IsActive: 'Y',
                        OfficeID: 46  //$scope.selectedOfficeID
                    };
                    // console.log(JSON.stringify($scope.data));
                    HomeService.InsUpdSetting($scope.data)
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            HomeService.notify(response.data.Command);
                                            $route.reload();

                                        }
                                        else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }

                            );
                };

                HomeService.CenterSetting($localStorage.selOff.ID, $localStorage.selCen.CenterID)
                        .then(
                                function(response) {
                                    if (response.data.Status === 'Success') {
                                        $scope.SavingType = $localStorage.SavingType = response.data.responseText.SavingType;
                                        $scope.FundType = $localStorage.FundType = response.data.responseText.FundType;
                                        $scope.FeeType = $localStorage.FeeType = response.data.responseText.FeeType;
                                        $localStorage.Saving = response.data.responseText.Saving;
                                        $localStorage.Fund = response.data.responseText.Fund;
                                        $localStorage.Fee = response.data.responseText.Fee;
                                        data = $localStorage.Saving;
                                        self.tableParams = new NgTableParams({
                                            count: 5
                                        }, {
                                            dataset: data
                                        });
                                        data1 = $localStorage.Fund;
                                        self.tableParams1 = new NgTableParams({
                                            count: 5
                                        }, {
                                            dataset: data1
                                        });
                                        data2 = $localStorage.Fee;
                                        self.tableParams2 = new NgTableParams({
                                            count: 5
                                        }, {
                                            dataset: data2
                                        });

                                        $rootScope.dataLoading = false;
                                    } else {
                                        $rootScope.errmsg = 'Response Error';
                                    }
                                }
                        );
            }])

        .controller('VoucherListController', ['$scope', '$parse', '$localStorage', '$rootScope', '$location', 'HomeService', 'NgTableParams', '$cookieStore', '$http',
            function($scope, $parse, $localStorage, $rootScope, $location, HomeService, NgTableParams, $cookieStore, $http) {
                // $rootScope.dataLoading = true;
                var self = this;
                var data = "";
                var today = $localStorage.today; //today's AD date 
                $scope.fyear = $localStorage.FiscalYear;
                $scope.selectedOption = '';
                $scope.fromDate = AD2BS(today);
                var date = $scope.fromDate.toString();
                $scope.y = (date.split('/')[0]);
                $scope.m = (date.split('/')[1]);
                $scope.d = '01';
                $scope.fromDate = $scope.y + '/' + $scope.m + '/' + $scope.d;  //AD date
                $scope.toDate = AD2BS(today);

                $('#nepaliDate').nepaliDatePicker({
                    onChange: function() {
                        $scope.fromDate = ($('#nepaliDate').val());
                        if ($scope.selectedOption !== '')
                            $rootScope.bWiseVoucher($scope.selectedOption, $scope.fromDate, $scope.toDate);

                    }
                });

                $('#nepaliDate1').nepaliDatePicker({
                    onChange: function() {
                        $scope.toDate = ($('#nepaliDate1').val());
                        if ($scope.selectedOption !== '')
                            $rootScope.bWiseVoucher($scope.selectedOption, $scope.fromDate, $scope.toDate);
                    }
                });


                $rootScope.bWiseVoucher = function(office, fDate, toDate) {
                    $scope.selectedOption = office;
                    $rootScope.dataLoading = true;
                    HomeService.Vouchers($scope.selectedOption.ID, $localStorage.FiscalYear, fDate, toDate)
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            $localStorage.Allvoucherlistjson = response.data.responseText.VoucherList;
                                            data = $localStorage.Allvoucherlistjson;
                                            self.tableParams = new NgTableParams({
                                                count: 5
                                            }, {
                                                counts: [
                                                    {'value': 5, 'show': 5},
                                                    {'value': 10, 'show': 10},
                                                    {'value': 25, 'show': 25},
                                                    {'value': data.length, 'show': "All"}
                                                ],
                                                dataset: data
                                            });
                                            $rootScope.dataLoading = false;
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };
                $rootScope.getVoucherListData = function() {
                    HomeService.BranchList()
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {

                                            if (($location.$$path) === '/voucherlist') {
                                                $localStorage.Allbranchlistjson = response.data.responseText.BranchList;
                                                $scope.offices = $localStorage.Allbranchlistjson;
                                                $rootScope.dataLoading = false;
                                            }

                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };
                if (($location.$$path) === '/voucherlist' && $localStorage.entry >= 3) {
                    $scope.offices = $localStorage.userOfficejson;
                    $scope.selectedOption = $scope.offices[0];
                    $rootScope.bWiseVoucher($scope.selectedOption, $scope.fromDate, $scope.toDate);
                } else {
                    $rootScope.getVoucherListData();
                }
            }
        ])

        .controller('ProfileCtrl', ['$scope', 'HomeService', '$localStorage', '$rootScope', '$cookieStore', 'NgTableParams',
            function($scope, HomeService, $localStorage, $rootScope, $cookieStore, NgTableParams) {
                $rootScope.dataLoading = true;
                var self = this;
                var data = "", data1 = "";
                $scope.sid = "";

                if ($localStorage.ChosenStaffID !== '') {

                    $scope.sid = $localStorage.ChosenStaffID;
                }
                else {
                    $scope.sid = $localStorage.userjson[0].StaffID;
                }
                $rootScope.getProfile = function(sid) {
                    HomeService.getStaffDetail(sid)
                            .then(
                                    function(response) {
                                        //console.log(JSON.stringify(response));
                                        if (response.data.Status === 'Success') {
                                            $localStorage.profiledetail = response.data.responseText.Staff;
                                            // alert(JSON.stringify($localStorage.profiledetail));
                                            $scope.TotalCenter = response.data.responseText.CenterCount[0].TotalCenter;
                                            $scope.ActiveMember = response.data.responseText.MemberCount[0].ActiveMember;
                                            $scope.DropMember = response.data.responseText.MemberCount[0].DropMember;
                                            $scope.Passive = response.data.responseText.MemberCount[0].Passive;
                                            $scope.Borrower = response.data.responseText.MemberCount[0].Borrower;
                                            $scope.StaffAcademic = response.data.responseText.StaffAcademic;
                                            $scope.JobHistory = response.data.responseText.JobHistory;

                                            $scope.PGTCount = response.data.responseText.PGTCount[0].PGT;
                                            $scope.GRTCount = response.data.responseText.GRTCount[0].GRT;
                                            $scope.ApprovedCount = response.data.responseText.ApprovedCount[0].Approved;
                                            data = $scope.StaffAcademic;

                                            // alert(JSON.stringify(data1));
                                            self.tableParams = new NgTableParams({
                                                count: 5
                                            }, {
                                                counts: [
                                                    {'value': 5, 'show': 5},
                                                    {'value': 10, 'show': 10},
                                                    {'value': 25, 'show': 25},
                                                    {'value': data.length, 'show': "All"}
                                                ],
                                                dataset: data
                                            });
                                            data1 = $scope.JobHistory;
                                            self.tableParams1 = new NgTableParams({
                                                count: 5
                                            }, {
                                                counts: [
                                                    {'value': 5, 'show': 5},
                                                    {'value': 10, 'show': 10},
                                                    {'value': 25, 'show': 25},
                                                    {'value': data1.length, 'show': "All"}
                                                ],
                                                dataset: data1
                                            });
                                            $scope.DOB = $localStorage.profiledetail[0].DOB;
                                            $scope.age = calculateAge($localStorage.profiledetail[0].DOB);
                                            $scope.name = $localStorage.profiledetail[0].FirstName + " " + $localStorage.profiledetail[0].LastName;
                                            $scope.photo = response.data.responseText.photo[0];
                                            $scope.CitizenshipNo = $localStorage.profiledetail[0].CitizenshipNo;
                                            $scope.ucode = $localStorage.profiledetail[0].Code;
                                            $scope.name = $localStorage.profiledetail[0].FirstName + " " + $localStorage.profiledetail[0].LastName;
                                            $scope.email = $localStorage.profiledetail[0].Email;
                                            $scope.position = $localStorage.profiledetail[0].PositionName;
                                            $scope.address = $localStorage.profiledetail[0].vdcName + "-" + $localStorage.profiledetail[0].WardNo + ", " + $localStorage.profiledetail[0].Tole;
                                            $scope.contact = $localStorage.profiledetail[0].Mobile;
                                            if ($localStorage.profiledetail[0].IsMarried == 'Y')
                                                $scope.married = "Married";
                                            else
                                                $scope.married = "Single";

                                            $rootScope.dataLoading = false;
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                            $rootScope.dataLoading = false;
                                        }
                                    }
                            );
                };
                $rootScope.getProfile($scope.sid);
            }
        ])

        .controller('CreateEditCenterController', ['$scope', '$filter', '$localStorage', '$rootScope', '$http', 'HomeService', '$cookieStore', '$location',
            function($scope, $filter, $localStorage, $rootScope, $http, HomeService, $cookieStore, $location) {
                $rootScope.dataLoading = true;
                // $scope.isDisabled = false;
                $scope.office = $localStorage.selOff.Name;
                $scope.officeid = $localStorage.selOff.ID;
                $scope.center = {};
                $scope.data = {};
                var today = $localStorage.today;  //Today's AD date
                $scope.zones = $localStorage.zonejson;
                $scope.center.NFormedDate = $scope.center.NPgtDate = $scope.center.NGrtDate = $scope.center.NApprovedDate = AD2BS(today);
                $scope.center.CenterDress = $scope.center.CenterHouse = $scope.center.AttendanceRegister = false;
                $('#nepaliDate').nepaliDatePicker({
                    onChange: function() {
                        $scope.center.NFormedDate = ($('#nepaliDate').val());
                    }
                });
                $('#nepaliDate1').nepaliDatePicker({
                    onChange: function() {
                        $scope.center.NPgtDate = ($('#nepaliDate1').val());
                    }
                });
                $('#nepaliDate2').nepaliDatePicker({
                    onChange: function() {
                        $scope.center.NGrtDate = ($('#nepaliDate2').val());
                    }
                });
                $('#nepaliDate3').nepaliDatePicker({
                    onChange: function() {
                        $scope.center.NApprovedDate = ($('#nepaliDate3').val());
                    }
                });
                $scope.$watch('center.CenterName', function(val) {
                    $scope.center.CenterName = $filter('capitalize')(val);
                }, true);
                $scope.$watch('center.MeetingPlace', function(val) {
                    $scope.center.MeetingPlace = $filter('capitalize')(val);
                }, true);

                $rootScope.padToThree = function(number) {
                    if (number <= 999) {
                        number = ("00" + number).slice(-3);
                    }
                    return number;
                };
                $localStorage.id = 0;
                HomeService.BranchList()
                        .then(
                                function(response) {
                                    if (response.data.Status === 'Success') {
                                        $localStorage.stafflistjson = response.data.responseText.StaffList;
                                        $scope.staffs = $localStorage.stafflistjson;
                                        //  alert(JSON.stringify($localStorage.stafflistjson));
                                        $rootScope.dataLoading = false;
                                    } else {
                                        $rootScope.errmsg = 'Response Error';
                                    }
                                }
                        );


                $rootScope.ZoneChanged = function(zoneid) {
                    $rootScope.dataLoading = true;
                    $localStorage.selectedZoneid = zoneid;
                    HomeService.DistrictList()
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            $localStorage.selectedDistrictjson = response.data.responseText.DistrictList;
                                            $scope.districts = $localStorage.selectedDistrictjson;
                                            $rootScope.dataLoading = false;
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };
                $rootScope.DistrictChanged = function(districtid) {
                    $rootScope.dataLoading = true;
                    $localStorage.selectedDistrictid = districtid;
                    HomeService.VdcList()
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            $localStorage.selectedVdcjson = response.data.responseText.VDCList;
                                            $scope.vdcs = $localStorage.selectedVdcjson;
                                            if ($localStorage.selCen.CenterID && $localStorage.selOff.ID) {
                                                var a = $scope.vdcs;
                                                for (var i = 0; i < $scope.vdcs.length; i++) {
                                                    if (a[i].VdcID == ($localStorage.centerdetailjson[0].VDCID)) {
                                                        $scope.center.vdc = $scope.vdcs[i];
                                                    }
                                                }
                                            }
                                            $rootScope.dataLoading = false;
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };

                $scope.Save = function(center) {
                    $rootScope.dataLoading = true;

                    if (center.CenterHouse == true)
                        center.CenterHouse = 'Y';
                    else
                        center.CenterHouse = 'N';

                    if (center.CenterDress == true)
                        center.CenterDress = 'Y';
                    else
                        center.CenterDress = 'N';

                    if (center.AttendanceRegister == true)
                        center.AttendanceRegister = 'Y';
                    else
                        center.AttendanceRegister = 'N';

                    $scope.data.CenterMain = {};
                    $scope.data.CenterDetail = {};
                    $scope.data.CenterMain = {
                        //For CenterMain 

                        CenterID: center.CenterID,
                        CenterCode: $rootScope.padToThree(center.CenterCode),
                        CenterName: center.CenterName,
                        FormedDate: center.NFormedDate,
                        ZoneID: center.zone.ZoneID,
                        DistrictID: center.district.DistrictID,
                        VDCID: center.vdc.VdcID,
                        WardNo: center.WardNo,
                        GroupNo: 0,
                        MemberNo: 0,
                        CenterHouse: center.CenterHouse,
                        CenterDress: center.CenterDress,
                        AttendanceRegister: center.AttendanceRegister,
                        MeetingType: center.MeetingType,
                        MeetingDay: center.MeetingDay,
                        MeetingTime: center.MeetingTime,
                        MeetingPlace: center.MeetingPlace,
                        MeetingDate: '',
                        CenterChief: '',
                        Active: 'Y',
                        CenDis: center.CenDis,
                        officeID: $scope.officeid,
                        OCenterid: 0,
                        StaffID: center.StaffID,
                        DissolvedDate: '    /  /  ',
                        IsRural: 'N',
                        cUserID: center.cUserID,
                        cDate: center.cDate,
                        mUserID: center.mUserID,
                        mDate: center.mDate
                    };
                    $scope.data.CenterDetail = {
                        //For CenterDetail
                        OfficeID: $scope.officeid,
                        CenterID: center.CenterID,
                        PgtBy: center.PgtBy.StaffID,
                        PgtDate: center.NPgtDate,
                        GrtBy: center.GrtBy.StaffID,
                        GrtDate: center.NGrtDate,
                        ApprovedBy: center.ApprovedBy.StaffID,
                        ApprovedDate: center.NApprovedDate,
                        ChiefID: '0'
                    };
                    // console.log(JSON.stringify($scope.data));
                    HomeService.Save($scope.center.CenterID, $scope.data)
                            .then(
                                    function(response) {
                                        $rootScope.dataLoading = false;
                                        //  alert(JSON.stringify(response));
                                        if (response.data.Status === 'Success') {
                                            HomeService.notify(response.data.responseText.Command);
                                            $location.path('/centerlist');
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };
                if ($localStorage.selCen !== '' && $localStorage.selOff !== '') {
                    $rootScope.dataLoading = true;
                    $rootScope.edit = true;
                    $rootScope.create = false;
                    HomeService.CenterDetail()
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            $localStorage.centerdetailjson = response.data.responseText.CenterDetail;
                                            $scope.center.CenterID = $localStorage.centerdetailjson[0].CenterID;
                                            $scope.center.CenterCode = $localStorage.centerdetailjson[0].CenterCode;
                                            $scope.center.CenterName = $localStorage.centerdetailjson[0].CenterName;
                                            $scope.center.NFormedDate = $localStorage.centerdetailjson[0].FormedDate;
                                            $scope.center.WardNo = $localStorage.centerdetailjson[0].WardNo;
                                            $scope.center.MeetingTime = $localStorage.centerdetailjson[0].MeetingTime;
                                            $scope.center.MeetingDay = $localStorage.centerdetailjson[0].MeetingDay;
                                            $scope.center.MeetingPlace = $localStorage.centerdetailjson[0].MeetingPlace;
                                            $scope.center.MeetingType = $localStorage.centerdetailjson[0].MeetingType;
                                            $scope.center.CenDis = $localStorage.centerdetailjson[0].CenDis;
                                            $scope.center.StaffID = $localStorage.centerdetailjson[0].StaffID;
                                            $scope.center.cUserID = $localStorage.centerdetailjson[0].cUserID;
                                            $scope.center.cDate = $localStorage.centerdetailjson[0].cDate;
                                            $scope.center.mUserID = $localStorage.userjson[0].StaffID;
                                            $scope.center.mDate = '    /  /  ';
                                            if ($localStorage.centerdetailjson[0].CenterHouse == 'Y')
                                                $scope.center.CenterHouse = true;
                                            if ($localStorage.centerdetailjson[0].CenterDress == 'Y')
                                                $scope.center.CenterDress = true;
                                            if ($localStorage.centerdetailjson[0].AttendanceRegister == 'Y')
                                                $scope.center.AttendanceRegister = true;
                                            $scope.center.NPgtDate = $localStorage.centerdetailjson[0].PgtDate;
                                            $scope.center.NGrtDate = $localStorage.centerdetailjson[0].GrtDate;
                                            $scope.center.NApprovedDate = $localStorage.centerdetailjson[0].ApprovedDate;


                                            $scope.center.PgtBy = response.data.responseText.PGT[0];
                                            $scope.center.GrtBy = response.data.responseText.GRT[0];
                                            $scope.center.ApprovedBy = response.data.responseText.Approved[0];

                                            if ($scope.center.NPgtDate === "    /  /  ") {
                                                $scope.center.NPgtDate = "";
                                            }
                                            if ($scope.center.NGrtDate === "    /  /  ") {
                                                $scope.center.NGrtDate = "";
                                            }
                                            if ($scope.center.NApprovedDate === "    /  /  ") {
                                                $scope.center.NApprovedDate = "";
                                            }
                                            if ($scope.center.NFormedDate === "    /  /  ") {
                                                $scope.center.NFormedDate = "";
                                            }
                                            var a = $scope.zones;
                                            for (var i = 0; i < $scope.zones.length; i++) {
                                                if (a[i].ZoneID == ($localStorage.centerdetailjson[0].ZoneID)) {
                                                    $scope.center.zone = $scope.zones[i];
                                                }
                                            }
                                            ;
                                            $http({
                                                method: 'GET',
                                                url: getip() + "/districtlist.php?ZoneID=" + $localStorage.centerdetailjson[0].ZoneID,
                                                headers: {
                                                    'Content-Type': 'application/x-www-form-urlencoded'
                                                }
                                            }).success(function(response) {
                                                $localStorage.selectedDistrictjson = response.responseText.DistrictList;
                                                $scope.districts = $localStorage.selectedDistrictjson;
                                                var a = $scope.districts;
                                                for (var i = 0; i < $scope.districts.length; i++) {
                                                    if (a[i].DistrictID == ($localStorage.centerdetailjson[0].DistrictID)) {
                                                        $scope.center.district = $scope.districts[i];
                                                    }
                                                }
                                                $rootScope.DistrictChanged($localStorage.centerdetailjson[0].DistrictID);
                                                $rootScope.dataLoading = true;
                                            });
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                } else {
                    $rootScope.edit = false;
                    $rootScope.create = true;

                    $scope.center.CenterID = 0;
                    $scope.center.cUserID = $localStorage.userjson[0].StaffID;
                    $scope.center.cDate = '    /  /  ';
                    $scope.center.mUserID = 0;
                    $scope.center.mDate = '    /  /  ';

                    $scope.center.StaffID = $localStorage.userjson[0].StaffID;
                    $scope.center.EFormedDate = today;
                    $scope.center.CenterCode = $rootScope.padToThree($localStorage.NextCenterCode);
                    $scope.staffs = $localStorage.stafflistjson;

                    /*
                     //Adding days function in nepali.datepicker.v2.min.js
                     var nextDate = addDays($scope.center.NFormedDate, 10);
                     var nextDate = nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + nextDate.getDate();
                     $scope.center.NFormedDate = AD2BS(nextDate);
                     */
                    $rootScope.dataLoading = false;


                }

            }
        ])

        .controller('CenterDashboard', ['$scope', '$localStorage', '$rootScope', 'HomeService', '$cookieStore', '$location',
            function($scope, $localStorage, $rootScope, HomeService, $cookieStore, $location) {
                $rootScope.dataLoading = true;
                $scope.selectedCenterID = $localStorage.selCen.CenterID;
                $scope.selectedBranchID = $localStorage.selOff.ID;
                $rootScope.editCenter = function(centerid, selectedBranchid) {
                    $location.path('/editcenter');
                };
                $rootScope.getMemberList = function() {
                    $location.path('/centermember');
                };
                $rootScope.Setting = function() {
                    $location.path('/centersetting');
                };
                $rootScope.scheduleMeeting = function() {
                    $location.path('/scheduleMeeting');
                };
                var data1 = [];
                var data2 = [];
                var SavingType = [];
                var LoanType = [];
                var Balance = [];
                var Balance1 = [];
                var SavingTotal = 0, LoanTotal = 0;
                HomeService.centerwiseBalance()
                        .then(
                                function(response) {
                                    if (response.data.Status === 'Success') {
                                        $scope.ActiveMember = response.data.responseText.MemberCount[0].ActiveMember;
                                        $scope.DropMember = response.data.responseText.MemberCount[0].DropMember;
                                        $scope.Borrower = response.data.responseText.MemberCount[0].Borrower;
                                        // $scope.NonLonee = 0;//response.data.responseText.MemberCount[0].NonLonee;
                                        $scope.Passive = response.data.responseText.MemberCount[0].Passive;

                                        $scope.centerdetailjson = response.data.responseText.CenterDetail;
                                        if ($scope.centerdetailjson[0].PgtBy == 0) {
                                            $scope.PgtStaff = "None";
                                        }
                                        else {
                                            $scope.PGT = response.data.responseText.PGT;
                                            $scope.PgtStaff = $scope.PGT[0].FirstName + " " + $scope.PGT[0].LastName;
                                        }
                                        if ($scope.centerdetailjson[0].GrtBy == 0) {
                                            $scope.GrtStaff = "None";
                                        }
                                        else {
                                            $scope.GRT = response.data.responseText.GRT;
                                            $scope.GrtStaff = $scope.GRT[0].FirstName + " " + $scope.GRT[0].LastName;
                                        }
                                        if ($scope.centerdetailjson[0].ApprovedBy == 0) {
                                            $scope.ApproveStaff = "None";
                                        }
                                        else {
                                            $scope.Approved = response.data.responseText.Approved;
                                            $scope.ApproveStaff = $scope.Approved[0].FirstName + " " + $scope.Approved[0].LastName;
                                        }


                                        $localStorage.selOff.Name = $scope.office = $scope.centerdetailjson[0].OfficeName;
                                        $localStorage.selCen.CenterName = $scope.center = $scope.centerdetailjson[0].CenterName;


                                        $scope.formedDate = $scope.centerdetailjson[0].FormedDate;
                                        $scope.MeetingTime = $scope.centerdetailjson[0].MeetingTime;
                                        $scope.MeetingPlace = $scope.centerdetailjson[0].MeetingPlace;
                                        $scope.CenterCode = $scope.centerdetailjson[0].CenterCode;
                                        $scope.MeetingType = $scope.centerdetailjson[0].MeetingType;
                                        $scope.CenDis = $scope.centerdetailjson[0].CenDis;
                                        $scope.Staff = $scope.centerdetailjson[0].Staff;
                                        $scope.zone = $scope.centerdetailjson[0].ZoneName;
                                        $scope.district = $scope.centerdetailjson[0].DistrictName;
                                        $scope.vdc = $scope.centerdetailjson[0].VdcName;
                                        //  $scope.CenterCheif = response.data.responseText.CenterChief[0].FirstName + " " + response.data.responseText.CenterChief[0].LastName;
                                        // $scope.ChiefContact = response.data.responseText.CenterChief[0].MobileNo;

                                        for (var i = 0; i < response.data.responseText.SavingBalanceList.length; i++) {
                                            SavingType.push(response.data.responseText.SavingBalanceList[i].SavingType);
                                            Balance.push(parseInt(response.data.responseText.SavingBalanceList[i].Balance));
                                        }
                                        for (var j = 0; j < response.data.responseText.LoanBalanceList.length; j++) {
                                            LoanType.push(response.data.responseText.LoanBalanceList[j].LoanType);
                                            Balance1.push(parseInt(response.data.responseText.LoanBalanceList[j].Balance));
                                        }
                                        for (var i = 0; i < SavingType.length; i++) {
                                            data1[i] = {
                                                "label": SavingType[i],
                                                "value": Balance[i]
                                            }
                                        }
                                        for (var j = 0; j < LoanType.length; j++) {
                                            data2[j] = {
                                                "label": LoanType[j],
                                                "value": Balance1[j]
                                            }
                                        }
                                        $scope.SavingTotal = $scope.LoanTotal = 0;
                                        //Sum of Savings
                                        for (var i = 0; i < Balance.length; i++) {
                                            $scope.SavingTotal += Balance[i];
                                        }
                                        //sum of loans
                                        for (var i = 0; i < Balance1.length; i++) {
                                            $scope.LoanTotal += Balance1[i];
                                        }
                                        // $scope.
                                        var SavingbarLineChart = new FusionCharts(DrawLine('column2d', 'bar-saving', "Saving", "", "", data1)).render();
                                        var LoanbarLineChart = new FusionCharts(DrawLine('column2d', 'bar-loan', 'Loan', "", "", data2)).render();
                                        var SavingPieChart = new FusionCharts(DrawPie('pie2d', 'pie-saving', "Saving", data1)).render();
                                        var LoanPieChart = new FusionCharts(DrawPie('pie2d', 'pie-loan', "Loan", data2)).render();
                                        var SavingFootfallChart = new FusionCharts(DrawLine('area2d', 'footfall-saving', "Saving", "", "", data1)).render();
                                        var LoanFootfallChart = new FusionCharts(DrawLine('area2d', 'footfall-loan', "Loan", "", "", data2)).render();
                                        var SavingCSChart = new FusionCharts(DrawLine('line', 'cs-saving', "Saving", "", "", data1)).render();
                                        var LoanCSChart = new FusionCharts(DrawLine('line', 'cs-loan', "Loan", "", "", data2)).render();

                                        $rootScope.dataLoading = false;
                                    } else {
                                        $rootScope.errmsg = 'Response Error';
                                        $rootScope.dataLoading = false;
                                    }
                                }
                        );
            }
        ])

        .controller('AreaDashboard', ['$scope', '$localStorage', '$rootScope', 'HomeService', '$cookieStore', '$location',
            function($scope, $localStorage, $rootScope, HomeService, $cookieStore, $location) {
                $rootScope.dataLoading = true;

                var data1 = [];
                var data2 = [];
                var SavingType = [];
                var LoanType = [];
                var Balance = [];
                var Balance1 = [];
                var SavingTotal = 0,
                        LoanTotal = 0,
                        diff = 0;
                if ($localStorage.entry === 4) {
                    $localStorage.id = $localStorage.branchid;
                }
                HomeService.branchwiseBalance()
                        .then(
                                function(response) {
                                    if (response.data.Status === 'Success') {
                                        // alert(JSON.stringify(response));
                                        $scope.ActiveMember = response.data.responseText.MemberCount[0].ActiveMember;
                                        $scope.DropMember = response.data.responseText.MemberCount[0].DropMember;
                                        $scope.Borrower = response.data.responseText.MemberCount[0].Borrower;
                                        $scope.NonLonee = 0;//response.data.responseText.MemberCount[0].NonLonee;

                                        for (var i = 0; i < response.data.responseText.SavingBalanceList.length; i++) {
                                            SavingType.push(response.data.responseText.SavingBalanceList[i].SavingType);
                                            Balance.push(parseInt(response.data.responseText.SavingBalanceList[i].Balance));
                                        }
                                        for (var j = 0; j < response.data.responseText.LoanBalanceList.length; j++) {
                                            LoanType.push(response.data.responseText.LoanBalanceList[j].LoanType);
                                            Balance1.push(parseInt(response.data.responseText.LoanBalanceList[j].Balance));
                                        }
                                        for (var i = 0; i < SavingType.length; i++) {
                                            data1[i] = {
                                                "label": SavingType[i],
                                                "value": Balance[i]
                                            }
                                        }
                                        for (var j = 0; j < LoanType.length; j++) {
                                            data2[j] = {
                                                "label": LoanType[j],
                                                "value": Balance1[j]
                                            }
                                        }
                                        var SavingbarLineChart = new FusionCharts(DrawLine('column2d', 'bar-saving', "Saving", "", "", data1, '525', '300')).render();
                                        var LoanbarLineChart = new FusionCharts(DrawLine('column2d', 'bar-loan', 'Loan', "", "", data2, '525', '300')).render();
                                        var SavingPieChart = new FusionCharts(DrawPie('pie2d', 'pie-saving', "Saving", data1, '525', '300')).render();
                                        var LoanPieChart = new FusionCharts(DrawPie('pie2d', 'pie-loan', "Loan", data2, '525', '300')).render();
                                        var SavingFootfallChart = new FusionCharts(DrawLine('area2d', 'footfall-saving', "Saving", "", "", data1, '525', '300')).render();
                                        var LoanFootfallChart = new FusionCharts(DrawLine('area2d', 'footfall-loan', "Loan", "", "", data2, '525', '300')).render();
                                        var SavingCSChart = new FusionCharts(DrawLine('line', 'cs-saving', "Saving", "", "", data1, '300', '200')).render();
                                        var LoanCSChart = new FusionCharts(DrawLine('line', 'cs-loan', "Loan", "", "", data2, '300', '200')).render();
                                        $rootScope.dataLoading = false;
                                    } else {
                                        $rootScope.errmsg = 'Response Error';
                                        $rootScope.dataLoading = false;
                                    }
                                }
                        );
            }
        ])

        .controller('CreateMemberCtrl', ['$scope', '$filter', '$localStorage', '$rootScope', '$http', 'HomeService', '$cookieStore', '$location',
            function($scope, $filter, $localStorage, $rootScope, $http, HomeService, $cookieStore, $location) {
                $scope.office = $localStorage.selOff.Name;
                $scope.center = $localStorage.selCen.CenterName;
                $scope.member = {};

                $scope.member.CenterName = $localStorage.selCen.CenterCode;
                //  alert($scope.member.CenterName);
            }])









        .controller("myController",
                function($http, $scope, $location) {
                    $scope.reportType = "";
                    $scope.callPage = function() {
                        $location.path('/misreport');
                    };
                    $scope.callthat = function() {
                        if ($scope.reportType !== "") {
                            $scope.callThis();
                        }
                    };
                    $scope.callThis = function() {
                        $http.get("http://110.34.13.19:81/finlite_ver_1/report.php?ReportType=" + $scope.reportType + "&Month=" + $scope.month)
                                .then(function(response) {
                                    $scope.columns = response.data.responseText.columns;
                                    $scope.elements = response.data.responseText.entity;
                                    var text = "<table id='example'  width=100%><thead><tr style='cursor: pointer;'>";
                                    for (var i = 0; i < $scope.columns.length; i++) {
                                        text = text + "<th>" + $scope.columns[i] + "</th>";
                                    }
                                    text += "</tr></thead></table>";
                                    document.getElementById("table").innerHTML = text;
                                    var t = $('#example').DataTable();
                                    for (i = 0; i < $scope.elements.length; i++) {
                                        t.row.add([
                                            $scope.elements[i][$scope.columns[0]],
                                            $scope.elements[i][$scope.columns[1]],
                                            $scope.elements[i][$scope.columns[2]],
                                            $scope.elements[i][$scope.columns[3]],
                                            $scope.elements[i][$scope.columns[4]],
                                            $scope.elements[i][$scope.columns[5]],
                                            $scope.elements[i][$scope.columns[6]],
                                            $scope.elements[i][$scope.columns[7]]
                                        ]).draw();
                                    }
                                });
                    };
                })



'use strict';
angular.module('Home')
        .factory('HomeService', ['$http', 'logger', '$cookieStore', '$rootScope', '$q', '$localStorage', 'NgTableParams',
            function($http, logger, $cookieStore, $rootScope, $q, $localStorage, NgTableParams) {
                var deferred = $q.defer();
                var service = {};
                service.notify = function(type) {
                    switch (type) {
                        case "insert":
                            return logger.log("Successfully Inserted.");
                        case "delete":
                            return logger.logSuccess("Successfully Deleted.");
                        case "update":
                            return logger.logWarning("Successfully Updated.");
                        case "invalidpassword":
                            return logger.logError("Incorrect Password.");
                        case "upload":
                            return logger.logError("Successfully Uploaded.")
                        case "error":
                            return logger.logError("Error.")
                    }
                }
                service.BranchList = function() {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    if ($localStorage.category < 3 && $localStorage.category > 0) {
                        return $http({
                            method: 'GET',
                            url: getip() + "/branchlist.php?BranchID=" + $localStorage.id,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function(response) {
                            // console.log(response);
                            deferred.resolve(response);
                            return deferred.promise;
                        }, function(response) {
                            deferred.reject(response.data.Status);
                            return deferred.promise;
                        });
                    }
                    if ($localStorage.category === 3) {
                        $rootScope.neverEndingStory(getip() + "/auth.php");
                        return $http({
                            method: 'GET',
                            url: getip() + "/stafflist.php?BranchID=" + $localStorage.id,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).success(function(response) {
                            deferred.resolve(response);
                            return deferred.promise;
                        }, function(response) {
                            deferred.reject(response.data.Status);
                            return deferred.promise;
                        });
                    }
                    if ($localStorage.category === 4) {
                        // alert($localStorage.id);
                        //Area Office
                        if ($localStorage.bid && $localStorage.entry !== 4) {
                            $rootScope.neverEndingStory(getip() + "/auth.php");
                            return $http({
                                method: 'GET',
                                url: getip() + "/centerlist.php?BranchID=" + $localStorage.bid,
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                deferred.resolve(response);
                                return deferred.promise;
                            }, function(response) {
                                deferred.reject(response.data.Status);
                                return deferred.promise;
                            });
                        } else if ($localStorage.entry == 4) {
                            $rootScope.neverEndingStory(getip() + "/auth.php");
                            return $http({
                                method: 'GET',
                                url: getip() + "/centerlist.php?StaffID=" + $localStorage.id,
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                //  alert(JSON.stringify(response.data.responseText.CenterList));
                                deferred.resolve(response);
                                return deferred.promise;
                            }, function(response) {
                                deferred.reject(response.data.Status);
                                return deferred.promise;
                            });
                        }
                        else {
                            $rootScope.neverEndingStory(getip() + "/auth.php");
                            return $http({
                                method: 'GET',
                                url: getip() + "/centerlist.php?StaffID=" + $localStorage.id + "&&Status=" + status,
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).then(function(response) {
                                //alert(JSON.stringify(response.data.responseText.CenterList));
                                deferred.resolve(response);
                                return deferred.promise;
                            }, function(response) {
                                deferred.reject(response.data.Status);
                                return deferred.promise;
                            });
                        }
                    }
                    if ($localStorage.category === 5) {
                        $rootScope.neverEndingStory(getip() + "/auth.php");
                        return $http({
                            method: 'GET',
                            url: getip() + "/memberlist.php?BranchID=" + $localStorage.branchid + "&CenterID=" + $localStorage.centerid,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).success(function(response) {
                            deferred.resolve(response);
                            return deferred.promise;
                        }, function(response) {
                            deferred.reject(response.data.Status);
                            return deferred.promise;
                        });
                    }
                };
                service.StatusWiseMember = function(branchid, centerid, status) {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    return $http({
                        method: 'GET',
                        url: getip() + "/memberlist.php?BranchID=" + branchid + "&CenterID=" + centerid + "&Status=" + status,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).success(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });
                };

                service.StatusWiseCenter = function(id, status) {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    // alert("StatusWiseCenter " +id+ " "+status );
                    return $http({
                        method: 'GET',
                        url: getip() + "/centerlist.php?BranchID=" + id + "&Status=" + status,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).success(function(response) {
                        // alert(JSON.stringify(response));
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });
                };
                service.BranchStatusWiseCenter = function(id, status) { //alert("BranchStatusWiseCenter " +id+ " "+status );
                    var data = "";
                    service.StatusWiseCenter(id, status)
                            .then(
                                    function(response) {  //alert(JSON.stringify(response));

                                        if (response.data.Status === 'Success') {
                                            $localStorage.Allcenterlistjson = response.data.responseText.CenterList;
                                            $rootScope.centers = $localStorage.Allcenterlistjson;
                                            $localStorage.NextCenterCode = response.data.responseText.NewCenterCode[0].NewCode;
                                            $localStorage.NextCenterID = response.data.responseText.NewCenterCode[0].NewCenterID;

                                            $rootScope.dataLoading = false;
                                            data = $localStorage.Allcenterlistjson;
                                            $rootScope.self.tableParams = new NgTableParams({
                                                count: 5
                                            }, {
                                                counts: [
                                                    {'value': 5, 'show': 5},
                                                    {'value': 10, 'show': 10},
                                                    {'value': 25, 'show': 25},
                                                    {'value': data.length, 'show': "All"}
                                                ],
                                                dataset: data
                                            });
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };

                service.GetCenterWiseMember = function(office, center, status) {
                    var data = "";
                    if (status == 0) {
                        service.BranchList()
                                .then(
                                        function(response) {
                                            if (response.data.Status === 'Success') {
                                                $localStorage.Allmemberlistjson = response.data.responseText.MemberList;
                                                data = $localStorage.Allmemberlistjson;
                                                $rootScope.tbl.tableParams = new NgTableParams({
                                                    count: 5
                                                }, {
                                                    counts: [
                                                        {'value': 5, 'show': 5},
                                                        {'value': 10, 'show': 10},
                                                        {'value': 25, 'show': 25},
                                                        {'value': data.length, 'show': "All"}
                                                    ],
                                                    dataset: data
                                                });
                                                $rootScope.dataLoading = false;
                                                $localStorage.category = 4;
                                            } else {
                                                $rootScope.errmsg = 'Response Error';
                                            }
                                        }
                                );
                    }
                    else {
                        service.StatusWiseMember(office, center, status)
                                .then(
                                        function(response) {
                                            if (response.data.Status === 'Success') {
                                                $localStorage.Allmemberlistjson = response.data.responseText.MemberList;
                                                data = $localStorage.Allmemberlistjson;
                                                $rootScope.tbl.tableParams = new NgTableParams({
                                                    count: 5
                                                }, {
                                                    counts: [
                                                        {'value': 5, 'show': 5},
                                                        {'value': 10, 'show': 10},
                                                        {'value': 25, 'show': 25},
                                                        {'value': data.length, 'show': "All"}
                                                    ],
                                                    dataset: data
                                                });
                                                $rootScope.dataLoading = false;
                                                $localStorage.category = 4;
                                            } else {
                                                $rootScope.errmsg = 'Response Error';
                                            }
                                        }
                                );
                    }
                };

                service.branchWiseCenter = function(id) {
                    var data = "";
                    $localStorage.bid = id;

                    service.BranchList()
                            .then(
                                    function(response) {
                                        if (response.data.Status === 'Success') {
                                            $localStorage.Allcenterlistjson1 = '';
                                            $localStorage.Allcenterlistjson = response.data.responseText.CenterList;
                                            $rootScope.centers = $localStorage.Allcenterlistjson;
                                            $localStorage.NextCenterCode = response.data.responseText.NewCenterCode[0].NewCode;
                                            $rootScope.dataLoading = false;
                                            data = $localStorage.Allcenterlistjson;
                                            $rootScope.self.tableParams = new NgTableParams({
                                                count: 5
                                            }, {
                                                counts: [
                                                    {'value': 5, 'show': 5},
                                                    {'value': 10, 'show': 10},
                                                    {'value': 25, 'show': 25},
                                                    {'value': data.length, 'show': "All"}
                                                ],
                                                dataset: data
                                            });
                                        } else {
                                            $rootScope.errmsg = 'Response Error';
                                        }
                                    }
                            );
                };
                service.DistrictList = function() {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    return $http({
                        method: 'GET',
                        url: getip() + "/districtlist.php?ZoneID=" + $localStorage.selectedZoneid,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).success(function(response) {
                        deferred.resolve(response);
                        // alert(JSON.stringify(deferred.promise));
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });

                };

                service.VdcList = function() {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    return $http({
                        method: 'GET',
                        url: getip() + "/vdclist.php?DistrictID=" + $localStorage.selectedDistrictid,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).success(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });

                };

                service.getMemberProfile = function(mid, offid) {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    return $http({
                        method: 'GET',
                        url: getip() + "/memberprofile.php?MemberID=" + mid + "&BranchID=" + offid,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).success(function(response) {
                        console.log(JSON.stringify(response));
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });
                };

                service.Save = function(CenterID, cdata) {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    var deferred = $q.defer();
                    var encodedString = 'CenterID=' +
                            encodeURIComponent(CenterID) +
                            '&Center=' +
                            encodeURIComponent(JSON.stringify(cdata));//JSON.stringify(cdata) encodeURIComponent
                    // console.log(encodedString);
                    return $http({
                        method: 'POST',
                        url: getip() + '/createcenter.php',
                        data: encodedString,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'

                        }
                    }).then(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });

                };

                service.getMeetingSchedule = function(CenterId, OfficeId) {
                    //  alert(CenterId + " "  + OfficeId );
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    return $http({
                        method: 'GET',
                        // url: getip() + "/meetingschedule.php?CenterID=" + CenterId + "&BranchID="+ OfficeId,
                        url: getip() + "/meetingschedule.php?CenterID=2&BranchID=4",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).success(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });

                };

                service.SaveSchedule = function(cdata) {
                    alert(cdata);
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    var deferred = $q.defer();
                    var encodedString =
                            'MeetingSchedule=' +
                            encodeURIComponent(JSON.stringify(cdata));//JSON.stringify(cdata) encodeURIComponent
                    return $http({
                        method: 'POST',
                        url: getip() + '/meetingschedule.php',
                        data: encodedString,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'

                        }
                    }).then(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });

                };
                service.getStaffDetail = function(staffid) {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    return $http({
                        method: 'GET',
                        url: getip() + '/staffdetail.php?staffid=' + staffid,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    },
                            function(response) {
                                deferred.reject(response.data.Status);
                                return deferred.promise;
                            });
                };
                service.Vouchers = function(id, Fyear, fromDate, toDate) {
                    // alert(id+" "+Fyear+" "+fromDate+" "+toDate);
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    return $http({
                        method: 'GET',
                        url: getip() + '/voucherlist.php?BranchID=' + id + '&FYear=' + Fyear + '&FDate=' + fromDate + '&TDate=' + toDate,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });
                };
                service.branchwiseBalance = function() {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    return $http({
                        method: 'GET',
                        url: getip() + "/branchwisebalance.php?BranchID=" + $localStorage.id,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).success(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });
                };
                service.centerwiseBalance = function() {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    return $http({
                        method: 'GET',
                        url: getip() + "/centerwisebalance.php?BranchID=" + $localStorage.selOff.ID + "&CenterID=" + $localStorage.selCen.CenterID,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });

                };
                service.CenterSetting = function(officeid, centerid) {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    return $http({
                        method: 'GET',
                        // url: getip() + "/centersetting.php?BranchID=" + officeid + "&CenterID=" + centerid,
                        url: getip() + "/centersetting.php?BranchID=46&CenterID=1",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function(response) {
                        // alert(JSON.stringify(response));
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });

                };
                service.DelCenSetting = function(type, ID, officeid, centerid, todo) {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    return $http({
                        method: 'GET',
                        url: getip() + "/changecensetting.php?BranchID=46&CenterID=1&Type=" + type + "&ID=" + ID + "&TODO=" + todo,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function(response) {
                        //alert(JSON.stringify(response));
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });

                };

                service.InsUpdSetting = function(data) {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    var deferred = $q.defer();
                    var encodedString = 'CenterSetting=' +
                            encodeURIComponent(JSON.stringify(data));
                    return $http({
                        method: 'POST',
                        url: getip() + '/changecensetting.php',
                        data: encodedString,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'

                        }
                    }).then(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });

                };

                service.CenterDetail = function() {
                    $rootScope.neverEndingStory(getip() + "/auth.php");
                    deferred = $q.defer();
                    return $http({
                        method: 'GET',
                        url: getip() + "/centerdetail.php?BranchID=" + $localStorage.selOff.ID + "&CenterID=" + $localStorage.selCen.CenterID,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).success(function(response) {
                        deferred.resolve(response);
                        return deferred.promise;
                    }, function(response) {
                        deferred.reject(response.data.Status);
                        return deferred.promise;
                    });
                };
                return service;
            }
        ])

        .factory("localize", ["$http", "$rootScope", "$localStorage", "$window",
            function($http, $rootScope, $localStorage, $window) {
                var localize;
                return localize = {
                    language: "",
                    url: void 0,
                    resourceFileLoaded: !1,
                    successCallback: function(data) {
                        return localize.dictionary = data, localize.resourceFileLoaded = !0, $rootScope.$broadcast("localizeResourcesUpdated")
                    },
                    setLanguage: function(value) {
                        $localStorage.set = true;
                        return localize.language = value.toLowerCase().split("-")[0], localize.initLocalizedResources()
                    },
                    setUrl: function(value) {
                        return localize.url = value, localize.initLocalizedResources()
                    },
                    buildUrl: function() {
                        return localize.language || (localize.language = ($window.navigator.userLanguage || $window.navigator.language).toLowerCase(), localize.language = localize.language.split("-")[0]), "i18n/resources-locale_" + localize.language + ".json"
                    },
                    initLocalizedResources: function() {
                        var url;
                        return url = localize.url || localize.buildUrl(), $http({
                            method: "GET",
                            url: url,
                            cache: !1
                        }).success(localize.successCallback).error(function() {
                            return $rootScope.$broadcast("localizeResourcesUpdated")
                        })
                    },
                    getLocalizedString: function(value) {
                        var result, valueLowerCase;
                        return result = void 0, localize.dictionary && value ? (valueLowerCase = value.toLowerCase(), result = "" === localize.dictionary[valueLowerCase] ? value : localize.dictionary[valueLowerCase]) : result = value, result
                    }
                }
            }])
        .directive("i18n", ["localize",
            function(localize) {
                var i18nDirective;
                return i18nDirective = {
                    restrict: "EA",
                    updateText: function(ele, input, placeholder) {
                        var result;
                        return result = void 0, "i18n-placeholder" === input ? (result = localize.getLocalizedString(placeholder), ele.attr("placeholder", result)) : input.length >= 1 ? (result = localize.getLocalizedString(input), ele.text(result)) : void 0
                    },
                    link: function(scope, ele, attrs) {
                        return scope.$on("localizeResourcesUpdated", function() {
                            return i18nDirective.updateText(ele, attrs.i18n, attrs.placeholder)
                        }), attrs.$observe("i18n", function(value) {
                            return i18nDirective.updateText(ele, value, attrs.placeholder)
                        })
                    }
                }
            }]).directive('datepic', ['$parse', function($parse) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) { //alert(element);
                parsed = $parse(attrs.datepic);
                alert(parsed);
                $('.nepali-calendar').nepaliDatePicker({
                    onSelect: function(dateText, inst) {
                        alert(attrs);
                        scope.$apply(function() {
                            parsed.assign(scope, dateText);
                        });
                    }
                })
            }
        }
    }])

        .controller("LangCtrl", ["$scope", "localize", "$localStorage",
            function($scope, localize, $localStorage) {
                var ChosenLang;
                if ($localStorage.set === true) {
                    ChosenLang = $localStorage.lang;
                }
                else {
                    ChosenLang = "English";
                }

                return $scope.lang = ChosenLang, $scope.setLang = function(lang) {//alert("jnj");
                    $localStorage.set = true;
                    $localStorage.lang = lang;
                    //  alert($localStorage.set + " " + $localStorage.lang);
                    switch (lang) {
                        case "English":
                            localize.setLanguage("EN-US");
                            break;
                        case "नेपाली‬":
                            localize.setLanguage("NP-NP");
                            break;
                        case "हिन्दी‬":
                            localize.setLanguage("IN-IN")
                    }
                    return $scope.lang = lang
                }, $scope.getFlag = function() {
                    var lang;
                    switch (lang = $scope.lang) {
                        case "English":
                            return "flags-english";
                        case "नेपाली‬":
                            return "flags-nepali";
                        case "हिन्दी‬":
                            return "flags-hindi"
                    }
                },
                        $scope.setLang(ChosenLang);

            }]);