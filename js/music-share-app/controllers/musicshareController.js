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
                console.log($scope.youtubePlaylists);
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
    };
});

