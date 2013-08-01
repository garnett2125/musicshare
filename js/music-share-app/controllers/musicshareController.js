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
        //console.log(tracks);
      });



      // *********************   BUTTONS
      $scope.searchtracks = [];
      $scope.search = function(playlists) {
        console.log(playlists);

        angular.forEach(playlists, function(value, index) {
          console.log(playlists);
          console.log(value);

          $scope.searchtracks.push({
            title: playlistTitle,
            videos: videoTitles
          });
        })

        $params = $.param({
          "name": bookData.name,
          "price": bookData.price,
          "author_id": bookData.authorId
        })
        //sharedBooks.saveBooks($params);
      };

    };
});



app.controller('SubmitController', function($scope, $http) {
  $scope.search = function(playlist) {
    //console.log(playlist);

    angular.forEach(playlist.tracks, function(value, index) {

      // Get full title name from playlist.

      var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+value.title+'&format=5&max-results=1&v=2&alt=jsonc';
      $http({method: 'GET', url: yt_url, dataType:"jsonp", }).
        success(function(data, status, headers, config) {

          console.log(data.data.items[0]);
          console.log(data.data.items[0].title);
        }).
        error(function(data, status, headers, config) {
          alert('Error when doing a request to Youtube to get playlist track');
        });



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


    /*$params = $.param({
      "name": bookData.name,
      "price": bookData.price,
      "author_id": bookData.authorId
    })*/
    //sharedBooks.saveBooks($params);
  };
});
