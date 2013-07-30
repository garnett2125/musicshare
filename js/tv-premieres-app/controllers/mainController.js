app.controller("mainController", function($scope, $http){

    $scope.init = function() {
      $http({method: 'GET', url: 'https://gdata.youtube.com/feeds/api/users/garnett2125/playlists'}).
        success(function(data, status, headers, config) {
          console.log(data.feed);
          var x2js = new X2JS();
          var json = x2js.xml_str2json( data );
          var playlists = json.feed.entry;
          for (var playlist in playlists) {
            var playlist = playlists[playlist];
            var h1 = document.createElement('h1');
            document.body.appendChild(h1);
            h1.innerHTML = playlist.title.__text;
            var ul = document.createElement('ul');
            document.body.appendChild(ul);
            $http({method: 'GET', url: playlist.feedLink._href + '?v=2'}).
              success(function(data, status, headers, config) {
                var x2js = new X2JS();
                var json = x2js.xml_str2json( data );
                var videos = json.feed.entry;
                for (var video in videos) {
                  var video  = videos[video];
                  var li = document.createElement("li");
                  ul.appendChild(li);
                  li.innerHTML = video.title;
                }
              }).
              error(function(data, status, headers, config) {
                alert('error in get request');
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
          }
        }).
        error(function(data, status, headers, config) {
          alert('error in get request');
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };

});

