app.controller("youtubeController", function($scope, $http){
    $scope.youtubePlaylists = [];
    $scope.init = function() {
      // DEEZER.
//      function createPlaylistDeezer() {
//        // https://api.deezer.com/2.0/user/5027124/playlists
//        $http({method: 'POST', url: "https://api.deezer.com/2.0/user/5027124/playlists", data: {title : "Test de nouvelle playlist"}}).
//          success(function(data, status, headers, config) {
//            alert("Playlist deezer créée avec succès.");
//          }).
//          error(function(data, status, headers, config) {
//            alert("La playlist deezer n'a pas pu etre créée.");
//          });
//      }
//      $http({method: 'GET', url: 'https://api.deezer.com/2.0/user/5027124/playlists'}).
//        success(function(data, status, headers, config) {
//          console.log(data);
//          var x2js = new X2JS();
//          var json = x2js.xml_str2json(data);
//          console.log(json);
//        }).
//        error(function(data, status, headers, config) {
//          console.log(data);
//          alert('error in deezer request');
//          // called asynchronously if an error occurs
//          // or server returns response with an error status.
//        });

      // YOUTUBE.
      $http({method: 'GET', url: 'https://gdata.youtube.com/feeds/api/users/garnett2125/playlists'}).
        success(function(data, status, headers, config) {
          var x2js = new X2JS();
          var json = x2js.xml_str2json( data );
          var playlists = json.feed.entry;
          angular.forEach(playlists, function(playlist, key){
            var playlistTitle = playlist.title.__text;
            // Get content of the playlist.
            $http({method: 'GET', url: playlist.feedLink._href + '?v=2'}).
              success(function(data, status, headers, config) {
                var x2js = new X2JS();
                var json = x2js.xml_str2json( data );
                var videos = json.feed.entry;
                var videoTitles = [];
                angular.forEach(videos, function(video, key){
                  videoTitles.push(video.title);
                });
                $scope.youtubePlaylists.push({title: playlistTitle, videos: videoTitles});
                console.log($scope.youtubePlaylists);
              }).
              error(function(data, status, headers, config) {
                alert('error in get request');
              });
          });
        }).
        error(function(data, status, headers, config) {
          alert('error in get request');
        });
    };
});

