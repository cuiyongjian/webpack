/*
  登录验证。若node层session有，则认为已登录。
  若node层session无，则看ticket，
  若有ticket，则请求tof，若无ticket，则跳到passport
*/


var auth = function(options) {
    next()
};

module.exports = auth
