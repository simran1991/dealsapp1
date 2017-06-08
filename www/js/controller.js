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
    .controller('CameraCtrl', function($scope, $state, $cordovaCamera, ImageProcessingService) {
        console.log("camera controler");

        $scope.deal = {
            description: null
        }
        console.log("picture description" + $scope.pictureDescription);
        var title = $scope.pictureDescription;
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
                    var data = UploadService.uploadImage(imgURI);

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
                var imageTextPromise = ImageProcessingService.getImageText(imageData, options)
                imageTextPromise.then(
                    // OnSuccess function
                    function(data) {
                        alert("Text inside image is " + data.image_description + " at " + $scope.deal.description);
                    },
                    // OnFailure function
                    function(reason) {
                        alert("got error" + reason)
                    }
                );
            }, function(err) {
                // An error occured. Show a message to the user
                alert("error");
            });
        }
    })
    .controller('ListCtrl', function($scope, $cordovaGeolocation, $ionicLoading) {

        $scope.map = { center: { latitude: 30.7049961, longitude: 76.691829 }, zoom: 16 };
        $scope.options = { scrollwheel: false, mapTypeId: "roadmap" };
        // $scope.markericon = "img/moose.png";
        $scope.markers = []
            // get position of user and then set the center of the map to that position
        $scope.markers.push({
            id: "1244g6g67j",
            latitude: 30.7049961,
            longitude: 76.691829,
            content: "Woodland 25% off at" + 76.691829 + " ," + 76.691829
        });
        $scope.markers.push({
            id: "1244g6g67k",
            latitude: 30.705515,
            longitude: 76.691468,
            content: "Addidas 60% off summer sale at " + 30.705515 + " ," + 76.691468
        });

        $scope.markers.push({
            id: "1244g6g67l",
            latitude: 30.705515,
            longitude: 76.691890,
            content: "Lee end of season sale at " + 30.705515 + " ," + 76.691890
        });
        $cordovaGeolocation
            .getCurrentPosition()
            .then(function(position) {
                var lat = position.coords.latitude
                var long = position.coords.longitude
                $scope.map = { center: { latitude: lat, longitude: long }, zoom: 18 };
                //just want to create this loop to make more markers
                for (var i = 0; i < 3; i++) {
                    $scope.markers.push({
                        id: $scope.markers.length,
                        latitude: lat + (i * 0.002),
                        longitude: long + (i * 0.002),
                        content: "I am located at " + lat + " ," + long
                    });
                }
                $scope.onMarkerClick = function(marker, eventName, model) {
                    model.show = !model.show;
                }

            }, function(err) {
                alert("error" + err); // error
            });
    })
    .controller('RateCtrl', function($scope, $state) {
        console.log("List controler");

    })
