angular.
module('latestVideo').
component('latestVideo', {

	templateUrl: 'app/latest-video/latest-video.template.html',
	controller: ['$http',

		// @desription: Get the latest video from a channel
		function latestVideoController($http) {

			// @return: object
			var self = this;

			/*
			 * @desc: API Key
			 * @return: string
			 */
			self.sApiKey = 'AIzaSyCEXvVE6JqoRGk58iaYtt9n5CDyOWsb3Vw';

			/*
			 * @desc: Channel ID
			 * @return: string
			 */
			self.sChannelId = 'UCi8e0iOVk1fEOogdfu4YgfA';

			/*
			 * @desc: URL for API request returning id of latest video.
			 * @return: string
			 */
			self.sUrlLatestVideo = 'https://www.googleapis.com/youtube/v3/search?' +
				'key=' + self.sApiKey +
				'&channelId=' + self.sChannelId +
				'&part=id&fields=items(id(videoId))&order=date&maxResults=1';

			
			// Bindable Member
			self.getLatestUrl = getLatestUrl;

			/*
			 * @desc: Requesting latest video id and returns a catenated url.
			 * @return: sets property self.latestVideoUrl
			 */
			function getLatestUrl() {

				$http.get(self.sUrlLatestVideo).then(

					function (response) {

						self.latestVideoUrl = 'https://www.youtube.com/embed/' + response.data.items[0].id.videoId;

					}

				);

			}


			/*
			 * @desc: Initialize component
			 */
			var init = function () {
				
				self.getLatestUrl();
			
			};

			/*
			 * @desc: fire component
			 */
			init();

		} // end latestVideoController

	]

}); // end latestVideo component