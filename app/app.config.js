'use strict';

angular.
	module('youtubeApp').
	config([

		'$sceDelegateProvider',

		function config($sceDelegateProvider) {

			$sceDelegateProvider.resourceUrlWhitelist([
				// Allow same origin resource loads.
				'self',
				// Allow loading from our assets domain.  Notice the difference between * and **.
				'https://www.youtube.com/**'
			]);

			// The blacklist overrides the whitelist so the open redirect here is blocked.
			$sceDelegateProvider.resourceUrlBlacklist([]);


		}
	  ]);