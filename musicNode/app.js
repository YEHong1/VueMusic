let express = require('express');
//1.引入router.js
let router = require('./router');
//http.createServer()
let app = express();

//托管静态资源
app.use(express.static('./dist'));


//2.把路由器加载到服务中
app.use(router);


app.listen(3006, () => {
    console.log('server is running in 3006');
});