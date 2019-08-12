module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        app.get('/api/login',function(req,res){
          const {username,password} = req.query;
          if(username==='admin'&&password==='123'){
            res.json({
              code:0,
              token:'jksjdkskd'
            })
          }else{
            res.json({
              code:1,
              message:'用户名或密码不正确'
            })
          }
        });
        app.get('/api/logout',function(req,res){
          res.json({
            code:-1
          })
        });
      }
    }
  }
}
