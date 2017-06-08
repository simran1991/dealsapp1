angular.module('dealsapp')
    .factory('ImageProcessingService', ['$cordovaFile', '$cordovaFileTransfer', '$q', function($cordovaFile, $cordovaFileTransfer, $q) {

        function getImageText(imgURI, options) {
            var deferred = $q.defer();
            var that = this;


            that.options = options;
            that.detection_type = 'TEXT_DETECTION';
            that.api_key = 'AIzaSyCQ0icowxP2c5ux5xGAhO9B2iz7T-x3sh4';
            var vision_api_json = {
                "requests": [{
                    "image": {
                        "content": imgURI
                    },
                    "features": [{
                        "type": that.detection_type,
                        "maxResults": 1
                    }]
                }]
            };
            var file_contents = JSON.stringify(vision_api_json);


            that.detection_types = {
                LABEL_DETECTION: 'label',
                TEXT_DETECTION: 'text',
                LOGO_DETECTION: 'logo',
                LANDMARK_DETECTION: 'landmark'
            };

            setTimeout(function() {
                $cordovaFile.writeFile(
                    cordova.file.applicationStorageDirectory,
                    'file.json',
                    file_contents,
                    true
                ).then(function(result) {
                        var headers = {
                            'Content-Type': 'application/json'
                        };

                        that.options.headers = headers;

                        var server = 'https://vision.googleapis.com/v1/images:annotate?key=' + that.api_key;
                        var filePath = cordova.file.applicationStorageDirectory + 'file.json';

                        $cordovaFileTransfer.upload(server, filePath, that.options, true)
                            .then(function(result) {
                                    var res = JSON.parse(result.response);
                                    var key = that.detection_types[that.detection_type] + 'Annotations';
                                    that.image_description = res.responses[0][key][0].description;
                                    //alert(that.image_description);
                                    deferred.resolve({ image_description: that.image_description })


                                },
                                function(err) {
                                    alert('An error occurred while uploading the file');
                                    deferred.reject(err);
                                });
                    },
                    function(err) {
                        alert('An error occurred while trying to write the file');
                        deferred.reject(err);
                    });


            }, 400);

            return deferred.promise;

        };


        return {
            getImageText: getImageText
        };
    }])
