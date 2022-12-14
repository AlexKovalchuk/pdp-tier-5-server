const mod = require('../modules').module;
const router = mod.express.Router();

router.get('/AuthPage', function (req, res) {
  // console.log('get /AuthPage', req)
  let state = mod.crypto.randomBytes(16).toString('hex');
  res.cookie('XSRF-TOKEN', state);
  res.send({
    authUrl: "https://github.com/login/oauth/authorize?client_id=" + mod.config.CLIENT_ID
      + '&redirect_uri=' + mod.config.REDIRECT_URI
      + '&scope=read:user&allow_signup=' + true
      + '&state=' + state
  });
})

router.post('/getAccessToken', function (req, res) {
  let state = req.headers['x-xsrf-token'];
  mod.axios({
    url: 'https://github.com/login/oauth/access_token?client_id=' + mod.config.CLIENT_ID
      + '&client_secret=' + mod.config.CLIENT_SECRET
      + '&code=' + req.body.code
      + '&redirect_uri=' + mod.config.REDIRECT_URI
      + '&state=' + state,
    method: 'POST',
    headers: {'Accept': 'application/json'}
  })
    .then(function (resp) {
      // console.log('getAccessToken', resp?.data);
      if (resp?.data?.access_token) {
        req.session.token = resp.data.access_token;
      }
      res.send(resp.data);
    })
    .catch(function (err) {
      // console.log(err);
      res.send(err);
    })

})

router.get('/getUserDetails', function (req, res) {
  // console.log('getUserDetails', req.session)
  if (req.session.token) {
    // console.log('getUserDetails req.session.token')
    mod.axios({
      url: 'https://api.github.com/user',
      method: 'GET',
      headers: {'Authorization': "token" + " " + req.session.token}
    })
      .then(function (resp) {
        // console.log('getUserDetails then:')
        res.cookie('login', resp?.data?.login, {httpOnly: true});
        res.send(resp.data);
      })
      .catch(function (err) {
        // console.log('getUserDetails catch:')
        res.send(err);
      })
  } else {
    // console.log('getUserDetails else, no token:')
    res.status(401).send();
  }
})

router.get('/logout', function (req, res) {
  req.session = null;
  res.clearCookie('sess');
  res.clearCookie('login');

  res.status(200).send();
})

module.exports = router;
