module.exports.config = {
	server_port: 3000,
	mongohq_url: 'mongodb://harishnk:hwbo21j81@linus.mongohq.com:10071/EasyFood?safe=true',

	foursquare_config: {
	  'secrets' : {
	    'clientId' : 'PIMYJVSE33F2BP2EO5ZLRABKIIJXOJSGTHXDDDKA421RV2V2',
	    'clientSecret' : 'M4ZSRUZCTLL4ZFEH5KDGY5RUEMLE1CJJG2WK04N5M013DJCM',
	    'redirectUrl' : 'http://localhost:3000/external/foursquare/callback' //Exactly the same as the callback URL in my Fsqr app
	  }
	}
};