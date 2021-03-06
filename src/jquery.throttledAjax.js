/**
 * jquery.throttledAjax
 * jQuery AJAX with throttling.
 *
 * Requires jquery.Threads.
 *
 * Part of the jQuery Utils family:
 * https://github.com/jstonne/jquery.utils
 *
 * Copyright (c) 2014 Jensen Tonne
 * http://jstonne.me
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function(){

var self = $.Ajax = function(options) {

	var request = $.Deferred(),
		args = arguments;

	// Allow others to decorate the request object
	$.isPlainObject(options) && $.isFunction(options.beforeCreate) && options.beforeCreate(request);

	self.queue.addDeferred(function(queue){

		request.xhr =
			$.ajax.apply(null, args)
				.pipe(
					request.resolve,
					request.reject,
					request.notify
				);

		// Mark this queue as resolved
		setTimeout(queue.resolve, self.requestInterval);
	});

	return request;
}

self.queue = $.Threads({threadLimit: 1});

self.requestInterval = 1200;

})();
