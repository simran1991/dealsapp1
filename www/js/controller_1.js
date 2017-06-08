angular.module('dealsapp')
    .controller('LoginCtrl', function($scope, $state, $ionicLoading, $cordovaOauth, $http) {
        $scope.Login = function() {


            console.log("current state" + $state.current);
            console.log("all states" + $state.get());
            $state.go("tab.camera");
            var access_token;
            /*$cordovaOauth.google("1016431376279-ahdusf3an7hvunrdf9nd0sgf0qqa7olg.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email",
             "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/plus.me"]).then(function(result) {
               //alert("logged in as "+Object.keys(result));

               console.log("google login success");

               //$location.url('/scan');
               console.log(JSON.stringify(result));
               accessToken = JSON.stringify(result);
               console.log(result.access_token);
               console.log(typeof(result.access_token));
               console.log("access token"+result.access_token);
               console.log("token type:"+result.token_type);
               console.log("expires in :"+result.expires_in);
               console.log("id token:"+result.id_token);
            }, function(error) {
               alert("Auth Failed..!!"+error);
               $ionicLoading.hide();
             });*/

            /*$http({method:"GET", url:"https://www.googleapis.com/plus/v1/people/me?access_token="+access_token}).
                    success(function(response){
                         console.log("initail response"+JSON.stringify(response));

                          $ionicLoading.hide();
                          console.log("going to camera");
                          $state.go('tab.camera');
                            */
            /*var param = {
                                  provider: 'google',
                                    google: {
                                                  uid: response["id"],
                                                  provider: 'google',
                                                  first_name: response["name"]["givenName"],
                                                  last_name: response["name"]["familyName"],
                                                  email: response.emails[0]["value"],
                                                  image: response.image.url
                                              }
                                  };
                                  console.log("user data from google"+param);
                                  alert("logged in as "+param.first_name+" "+param.last_name);*/
            /*
                          }, function(error) {
                               console.log(error);
                        });*/
        };
    })
    .controller('CameraCtrl', function($scope, $state, $cordovaCamera,UploadService) {
        console.log("camera controler");


        console.log("picture description" + $scope.pictureDescription);

        $scope.takePhoto = function() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    alert(imageData);
                    UploadService.uploadImage(imgURI);
                },
                function(err) {
                    // An error occured. Show a message to the user
                    alert("error");
                });
        }



        $scope.choosePhoto = function() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
                alert(imageData);
                alert(options);
                UploadService.uploadImage($scope.imgURI,options);
            }, function(err) {
                // An error occured. Show a message to the user
                alert("error");
            });
        }
    })

.controller('ListCtrl', function($scope, $state, $cordovaGeolocation) {
        console.log("List controler");



        var options = { timeout: 10000, enableHighAccuracy: true };

        $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            alert("your current position is" + latLng);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            google.maps.event.addListenerOnce($scope.map, 'idle', function() {

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });

                var infoWindow = new google.maps.InfoWindow({
                    content: "Deal of the day"
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.open($scope.map, marker);
                });

            });
        }, function(error) {
            console.log("Could not get location");
            console.log("Could not get location" + error);
        });

        //Wait until the map is loaded



    })
    .controller('RateCtrl', function($scope, $state) {
        console.log("List controler");

    })
