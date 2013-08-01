app.controller("musicshareController", function($scope, $http){
    $scope.youtubePlaylists = [];
    $scope.resultPlaylistsAndTracks = [];
    $scope.apiKey = "be88ad87cb242d2e88d6573c08278cb2";
    $scope.init = function() {

      // *********************   YOUTUBE.
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
              }).
              error(function(data, status, headers, config) {
                alert('Error when doing a request to Youtube to get playlist videos ');
              });
          });
        }).
        error(function(data, status, headers, config) {
          alert('Error when doing a request to Youtube to get playlists');
        });


      // *********************   SOUNDCLOUD.
      var userid = "33968042";

      $http({method: 'GET', url: 'http://api.soundcloud.com/users/' + userid + '/playlists?client_id=' + $scope.apiKey}).
        success(function(data, status, headers, config) {
          angular.forEach(data, function(value, index) {
            $scope.resultPlaylistsAndTracks.push(value);
          })
        }).
        error(function(data, status, headers, config) {
          alert('Error when doing a request to Soundcloud to get playlists ');
        });


      // *********************   CONVERT FROM YOUTUBE TO SOUNDCLOUD.
      SC.initialize({
        client_id: 'be88ad87cb242d2e88d6573c08278cb2'
      });

      // find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.
      SC.get('/tracks', { q: 'Ne-yo Because Of You'}, function(tracks) {
        console.log(tracks);
      });


      // DEEZER.
      // https://api.deezer.com/2.0/user/5027124/playlists
//      $http({method: 'POST', url: "https://api.deezer.com/2.0/user/5027124/playlists", data: {title : "Test de nouvelle playlist"}}).
//        success(function(data, status, headers, config) {
//          alert("Playlist deezer créée avec succès.");
//        }).
//        error(function(data, status, headers, config) {
//          alert("La playlist deezer n'a pas pu etre créée.");
//        });
//      https://connect.deezer.com/oauth/auth.php?app_id=122645&redirect_uri=file://localhost/Users/yohantillier/Documents/Commerceguys/Projects/musicshare/index.html&perms=manage_library
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
    };
});


app.controller('SubmitController', function($scope) {
  $scope.search = function(playlist) {
    //console.log(playlist);

    angular.forEach(playlist.tracks, function(value, index) {

      // Get full title name from playlist.
      console.log(value.title);

      // Start searching into youtube api search.

      /*$scope.searchtracks.push({
        title: playlistTitle,
        videos: videoTitles
      });*/
    })

    /*$params = $.param({
      "name": bookData.name,
      "price": bookData.price,
      "author_id": bookData.authorId
    })*/
    //sharedBooks.saveBooks($params);
  };
});
