// Register the `selectPlaylist` component on the `selectPlaylist` module
angular.
	module('youtubePlaylists').
	component('youtubePlaylists', {

		templateUrl: 'app/youtube-playlists/youtube-playlists.template.html',
		controller: ['$http',


			function youtubePlaylistsController($http){
			
				// object
				var self = this;
				
				// bool
				self.showLightbox = false;

				// bool
				self.noPlaylists = false;

				// string
				self.sApiKey = 'AIzaSyCEXvVE6JqoRGk58iaYtt9n5CDyOWsb3Vw';

				// string
				self.sChannelId = 'UCi8e0iOVk1fEOogdfu4YgfA';

				// string
				self.sUrlToPlaylists = 'https://www.googleapis.com/youtube/v3/playlists?' +
									   'part=snippet&fields=items(id,snippet(title,publishedAt,thumbnails(maxres(url))))&maxResults=50&' +
									   'channelId=' + self.sChannelId +
									   '&key=' + self.sApiKey;

				self.sUrlLatestVideo = 'https://www.googleapis.com/youtube/v3/search?' +
									   'key=' + self.sApiKey +
									   '&channelId=' + self.sChannelId +
									   '&part=id&fields=items(id(videoId))&order=date&maxResults=1';


				self.getLatestUrl = function () {
					
					$http.get( self.sUrlLatestVideo ).then(

						function( response ){

							self.latestVideoId = 'https://www.youtube.com/embed/' + response.data.items[0].id.videoId;

						}

					);
					
				}


				self.getListOfVideos = function () {
				
					$http.get( self.sUrlToPlaylists ).then(

						// Response function
						function( response ) {

							if( response.data.items.length === 0 )
							{
								self.noPlaylists = true;
							} // end if
							else
							{
								self.aOfPlaylistsObjects = response.data.items;

								self.selectQuery = response.data.items[0];

								self.getPlaylistVideos(response.data.items[0].id);

								if( response.data.items[0].snippet.thumbnails === undefined ) {

									self.showHeaderTitle = true;
									self.showHeaderThumb = false;
								} else {

									self.showHeaderTitle = false;
									self.showHeaderThumb = true;

								}

							} // end else

						},

						// catch errors function
						function(){

							console.log( "Somthing's wrong" );

						}

					); // end $http.get
				
				};




				// function:
				self.getPlaylistVideos = function( plid ){

					// string url to all items of playlist
					self.sUrlToPlaylistItems = 'https://www.googleapis.com/youtube/v3/playlistItems?' +
											   'playlistId=' + plid +
											   '&key=' + self.sApiKey +
											   '&part=snippet&fields=items(snippet(publishedAt,title,thumbnails(medium),resourceId(videoId)))' +
											   '&maxResults=50';

					$http.get( self.sUrlToPlaylistItems ).then( function( response ) {

							self.aOfItemObjects = response.data.items;

					},
						function(){

							console.log( "Somthing's wrong" );

						}
					);


				} // end getPlaylistVideos



				self.toggleShowVideo = function( videoId ){

					self.showLightbox = !self.showLightbox;

					self.videoUrl = 'https://www.youtube.com/embed/' + videoId;

				}
				
				var init = function(){
					
					self.getLatestUrl();
					self.getListOfVideos();
					
				};
				
				init();

			} // end selectPlaylistController

		]

	}); // end selectPlaylist component
