var db = require('./lib/db.js');
var bodyParser = require('body-parser');
var template3 = require('./lib/template3.js');
const express = require('express');

const app = express()
app.use( bodyParser.urlencoded({extended:false}));
//########################################################################

app.get('/main/:loginId', (request, response, next)=>{
    db.query('SELECT * FROM login WHERE id = ?',[request.params.loginId], (err1, user)=>{
        if(err1)
            throw err1;
        request.userId = user[0].userId;
        request.userPw = user[0].userPw;
        request.userName = user[0].userName;
        request.userPhone = user[0].userPhone;
        next();  
    })
})
app.get('/mypage/:loginId', (request, response, next)=>{
    db.query('SELECT * FROM login WHERE id = ?',[request.params.loginId], (err1, user)=>{
        if(err1)
            throw err1;
        request.userId = user[0].userId;
        request.userPw = user[0].userPw;
        request.userName = user[0].userName;
        request.userPhone = user[0].userPhone;
        next();  
    })
})

app.get('/mypage/myinfo/:loginId', (request, response, next)=>{
    db.query('SELECT * FROM login WHERE id = ?',[request.params.loginId], (err1, user)=>{
        if(err1)
            throw err1;
        request.userId = user[0].userId;
        request.userPw = user[0].userPw;
        request.userName = user[0].userName;
        request.userPhone = user[0].userPhone;
        next();  
    })
})
app.get('/mypage/myfeed/:loginId', (request, response, next)=>{
    db.query('SELECT * FROM login WHERE id = ?',[request.params.loginId], (err1, user)=>{
        if(err1)
            throw err1;
        request.userId = user[0].userId;
        request.userPw = user[0].userPw;
        request.userName = user[0].userName;
        request.userPhone = user[0].userPhone;
        next();  
    })
})
app.get('/view/:loginId/:feedId', (request, response, next)=>{
    db.query('SELECT * FROM login WHERE id = ?',[request.params.loginId], (err1, user)=>{
        if(err1)
            throw err1;
        request.userId = user[0].userId;
        request.userPw = user[0].userPw;
        request.userName = user[0].userName;
        request.userPhone = user[0].userPhone;
        next();  
    })
})

app.post(`/search/:loginId`, (request, response, next)=>{
    db.query('SELECT * FROM login WHERE id = ?',[request.params.loginId], (err1, user)=>{
        if(err1)
            throw err1;
        request.userId = user[0].userId;
        request.userPw = user[0].userPw;
        request.userName = user[0].userName;
        request.userPhone = user[0].userPhone;
        next();  
    })
})


app.get(`/mypage/deleteaccount/:loginId`, (request, response, next)=>{
    db.query('SELECT * FROM login WHERE id = ?',[request.params.loginId], (err1, user)=>{
        if(err1)
            throw err1;
        request.userId = user[0].userId;
        request.userPw = user[0].userPw;
        request.userName = user[0].userName;
        request.userPhone = user[0].userPhone;
        next();  
    })
})




app.get('/main/:loginId', (request, response, next)=>{
    db.query(`SELECT feed.id,feed.title,feed.description,feed.login_id,login.userId,login.userPw,login.userName,login.userPhone FROM feed LEFT JOIN login ON feed.login_id = login.id`, (err1, feeds)=>{
        if(err1)
            throw err1;
        request.feeds = feeds;
        next();
    })
})

app.get('/view/:loginId/:feedId', (request, response,next)=>{
    db.query(`SELECT reply.id,reply.description,reply.feed_id,reply.login_id, reply.created, login.userName  FROM reply LEFT JOIN login ON reply.login_id = login.id WHERE reply.feed_id = ? ORDER BY reply.created DESC
        `,[request.params.feedId], (err1, replys)=>{
            if(err1)
                throw err1;
            request.replys = replys;
            next();
        })
})

app.post(`/search/:loginId`, (request,response,next)=>{
    db.query(`SELECT feed.id,feed.title,feed.description, feed.login_id,feed.created, login.userId,login.userName,login.userPw,login.userPhone FROM feed LEFT JOIN login ON feed.login_id = login.id`, (err1, feeds)=>{
        if(err1)
            throw err1;
        request.feeds = feeds;
        next();
    })
})

//########################################################################

var search_html = function(loginId,userName,feeds, list){
    var title = `<a href = '/main/${loginId}'>main page</a>`;
    var login = `
        <p>
            <h3>Welcome Mr.${userName}</h3>
        </p>
        <p>
            <a href = '/posting/${loginId}'>posting</a>
            <a href = '/mypage/${loginId}'>mypage</a>
        </p>
    `;
    var control = `<a href = '/logout_process'>logout</a>`;
    var body = `
    <p>
        ${template3.search(loginId)}
    </p>
    <p>
        ${template3.loadSearchFeedLists(feeds, list, loginId)}
    </p>`;

    var html = template3.HTML(title, login, control, body);
    return html; 
}
var Nsearch_html = function(loginId,userName,feeds, list){
    var title = `<a href = '/main/${loginId}'>main page</a>`;
    var login = `
        <p>
            <h3>Welcome Mr.${userName}</h3>
        </p>
        <p>
            <a href = '/posting/${loginId}'>posting</a>
            <a href = '/mypage/${loginId}'>mypage</a>
        </p>
    `;
    var control = `<a href = '/logout_process'>logout</a>`;
    var body = `
    <p>
        ${template3.search(loginId)}
    </p>
    <p>
        there is no search results,,
    </p>`;

    var html = template3.HTML(title, login, control, body);
    return html; 
}
//########################################################################
app.get('/', (request,response)=>{
    var title = 'main page';
    var login = `
        <form action = '/login_process' method = 'post'>
            <p>
                <input type = 'text' name = 'userId' placeholder = 'userId'>
            </p>
            <p>
                <input type = 'password' name = 'userPw' placeholder = 'userPw'>
            </p>
            <p>
                <input type = 'submit' value = 'login'>
            </p>
        </form>
    `;
    var control = `<a href = '/create'>create</a>`;
    var body = `<p>hello world</p>`;
    var html = template3.HTML(title, login, control, body);
    response.send(html);
})
// 로그인 후
app.get('/main/:loginId', (request,response)=>{
    
    var title = `<a href = '/main/${request.params.loginId}'>main page</a>`;
    var login = `
        <p>
            <h3>Welcome Mr.${request.userName}</h3>
        </p>
        <p>
            <a href = '/posting/${request.params.loginId}'>posting</a>
            <a href = '/mypage/${request.params.loginId}'>mypage</a>
        </p>
    `;
    var control = `<a href = '/logout_process'>logout</a>`;
    var body = `
    <p>
        ${template3.search(request.params.loginId)}
    </p>
    <p>
        ${template3.loadFeedLists(request.feeds, request.params.loginId)}
    </p>`;
    var html = template3.HTML(title, login, control, body);
    response.send(html);
})

// 로그인 
app.post('/login_process', (request,response)=>{
    var post = request.body;
    db.query(`SELECT * FROM login`, (err1, users)=>{
        if(err1)
                throw err1;
        db.query(`SELECT * FROM login WHERE userId = ? AND userPw = ? `,[post.userId, post.userPw], (err2, user)=>{
            if(err2)
                throw err2;
            
            if (template3.checkLogin(users, post.userId, post.userPw) == true){
                response.redirect(`/main/${user[0].id}`);
            }
            else{
                response.redirect(`/`);
            }
        })
    })
})

// 로그아웃
app.get('/logout_process', (request,response)=>{
    response.redirect('/');
})

// 포스팅-상
app.get(`/posting/:loginId`, (request, response)=>{
    var title = `<a href = '/main/${request.params.loginId}'>main page</a>`;
    var login = template3.posting(request.params.loginId);
    var control = ``;
    var body = ``;
    var html = template3.HTML(title, login, control, body);
    response.send(html);
})

// 포스팅-하
app.post(`/posting_process/:loginId`,(request, response)=>{
    var post = request.body;
    db.query(`INSERT INTO feed(title, description, login_id, created) VALUES(?,?,?,NOW())`
    ,[post.title, post.description,request.params.loginId], (err1, result)=>{
        if(err1)
            throw err1;
        response.redirect(`/main/${request.params.loginId}`);
    })
})

// 마이페이지
app.get('/mypage/:loginId', (request,response)=>{
    var title = `<a href = '/main/${request.params.loginId}'>main page</a>`;
    var login = `
        <p>
            <h3>Welcome Mr.${request.userName}</h3>
        </p>
        <p>
            <a href = '/posting/${request.params.loginId}'>posting</a>
            <a href = '/mypage/${request.params.loginId}'>mypage</a>
        </p>
    `;
    var control = `<a href = '/logout_process'>logout</a>`;
    var body = `
    <h3></h3>
    <ol>
        <li><a href = '/mypage/myfeed/${request.params.loginId}'>My Feeds</a></li>
        <li><a href = '/mypage/myinfo/${request.params.loginId}'>My Info</a></li>
        <li><a href = '/mypage/deleteaccount/${request.params.loginId}'>Delete Account</a></li>
    </ol>
    `;
    var html = template3.HTML(title, login, control, body);
    response.send(html);
})

// 마이페이지-내가쓴글
app.get(`/mypage/myfeed/:loginId`, (request,response)=>{
    db.query(`SELECT feed.id,feed.title,feed.description,feed.login_id,login.userId,login.userPw,login.userName,login.userPhone FROM feed LEFT JOIN login ON feed.login_id = login.id WHERE feed.login_id = ? ORDER BY feed.created`
    ,[request.params.loginId], (err1, feeds)=>{
        if(err1)
            throw err1;
        var title = `<a href = '/main/${request.params.loginId}'>main page</a>`;
        var login = `
            <p>
                <h3>Welcome Mr.${request.userName}</h3>
            </p>
            <p>
                <a href = '/posting/${request.params.loginId}'>posting</a>
                <a href = '/mypage/${request.params.loginId}'>mypage</a>
            </p>
        `;
        var control = `<p><a href = '/logout_process'>logout</a></p>`;
        var body = template3.loadFeedLists(feeds, request.params.loginId);
        var html = template3.HTML(title, login, control, body);
        response.send(html);        
    })
})

// 마이페이지-사용자정보
app.get(`/mypage/myinfo/:loginId`, (request,response)=>{
    var title = `<a href = '/main/${request.params.loginId}'>main page</a>`;
    var login = `
        <p>
            <h3>Welcome Mr.${request.userName}</h3>
        </p>
        <p>
            <a href = '/posting/${request.params.loginId}'>posting</a>
            <a href = '/mypage/${request.params.loginId}'>mypage</a>
        </p>
    `;
    var control = `<a href = '/logout_process'>logout</a>`;
    var body = `
    <p>
        <form action = '/update_process/${request.params.loginId}' method = 'post'>
            <p>ID: <input type = 'text' name = 'userId' placeholder = 'userId' value = '${request.userId}' readonly> [can't update]</p>
            <p>PW: <input type = 'text' name = 'userPw' placeholder = 'userPw' value = '${request.userPw}'></p>
            <p>Name: <input type = 'text' name = 'userName' placeholder = 'userName' value = '${request.userName}'></p>
            <p>Phone: <input type = 'text' name = 'userPhone' placeholder = 'userPhone' value = '${request.userPhone}'></p>
            <p><input type = 'submit' value = 'update'></p>
        </form>
    </p>
    `;
    var html = template3.HTML(title, login, control, body);
    response.send(html);
})

// // 마이페이지-사용자정보 - 수정(수정자체는 되는데 리디렉션이 안된다)
app.post(`/update_process/:loginId`, (request, response)=>{
    var post = request.body;
    db.query('UPDATE login SET userPw = ?, userName = ?, userPhone = ? WHERE id = ?'
    ,[post.userPw,post.userName,post.userPhone,request.params.loginId]), (err1, result)=>{
        if(err1)
            throw err1;
        response.redirect(`./main/${request.params.loginId}`);
    }
})

// 마이페이지- 회원탈퇴 상
app.get(`/mypage/deleteaccount/:loginId`, (request,response)=>{
    var title = `<a href = '/main/${request.params.loginId}'>main page</a>`;
    var login = `
        <p>
            <h3>Welcome Mr.${request.userName}</h3>
        </p>
        <p>
            <a href = '/posting/${request.params.loginId}'>posting</a>
            <a href = '/mypage/${request.params.loginId}'>mypage</a>
        </p>
    `;
    var control = `<a href = '/logout_process'>logout</a>`;
    var body = `
    <p>
        <form action = '/delete_process/${request.params.loginId}' method = 'post'>
            <p>ID: <input type = 'text' name = 'userId' placeholder = 'userId' value = '${request.userId}' readonly> [o]</p>
            <p>PW: <input type = 'password' name = 'userPw' placeholder = 'userPw'></p><br><br>
            <p>삭제를 원하시면 'delete account'라고 정확히 작성해주세요<p>
            <p>PW: <input type = 'text' name = 'check' placeholder = 'delete account'></p>
            <p><input type = 'submit' value = 'delete'></p>
        </form>
    </p>
    `;
    var html = template3.HTML(title, login, control, body);
    response.send(html);
})

// 마이페이지- 회원탈퇴 하
app.post(`/delete_process/:loginId`, (request, response)=>{
    var post = request.body;
    db.query(`SELECT * FROM login WHERE id = ?`,[request.params.loginId],(err1, user)=>{
        if(err1)
            throw err1;
        if(post.userPw == user[0].userPw){
            if(post.check == 'delete account'){
                db.query(`DELETE login, feed, reply FROM login 
                    JOIN feed ON login.id = feed.login_id
                    JOIN reply ON feed.login_id = reply.login_id 
                    WHERE login.id = ?`
                    , [request.params.loginId],(err2,result)=>{
                    if(err2)
                        throw err2;
                    response.redirect(`/`);
                    });
            };
        }
        else{
            response.redirect(`/mypage/deleteaccount/${request.params.loginId}`);
        }
    })
})

// 회원가입 - 상
app.get(`/create`, (request, response)=>{
    var title = `<a href = '/'>main page</a>`;
    var login = template3.createUser();
    var control = ``;
    var body = ``;
    var html = template3.HTML(title, login, control, body);
    response.send(html);
})

// 회원가입 - 하
app.post('/create_process', (request, response)=>{
    var post = request.body;
    var post_userPhone = post.userPhone1+post.userPhone2+post.userPhone3;
    db.query(`INSERT INTO login(userId,userPw,userName,userPhone) VALUES(?,?,?,?)`
    ,[post.userId,post.userPw,post.userName,post_userPhone], (err1, result)=>{
        if(err1)
            throw err1;
        response.redirect(`/main/${result.insertId}`);
    })
})


// 글 상세보기
app.get('/view/:loginId/:feedId', (request, response)=>{
    db.query(`SELECT * FROM login LEFT JOIN feed ON login.id = feed.login_id WHERE feed.id = ?`, [request.params.feedId],(err1,user)=>{
        if(err1)
            throw err1;
        db.query(`SELECT * FROM feed WHERE id = ?`,[request.params.feedId],(err2, feed)=>{
            if(err2)
                throw err2;
            var title = `<a href = '/main/${request.params.loginId}'>main page</a>`;
            var login = `
                <p>
                    <h3>Welcome Mr.${request.userName}</h3>
                </p>
                <p>
                    <a href = '/mypage/${request.params.loginId}'>mypage</a>
                </p>
            `;
            var control = `<a href = '/logout_process'>logout</a>`;
            var body = `
            <p>
                ${template3.loadFeed(feed, user[0].userName)}
            </p>
            <p>
                ${template3.loadReplyList(request.replys,request.params.loginId,request.params.feedId )}
            </p>
            `;
            var html = template3.HTML(title, login, control, body);
            response.send(html);
        })
    })
    
})

// 댓글달기 
app.post(`/reply_process/:loginId/:feedId`, (request, response)=>{
    var post = request.body;
    db.query(`INSERT INTO reply(description, feed_id, login_id,created) VALUES(?,?,?,NOW())`
    ,[post.description, request.params.feedId,request.params.loginId], (err1, result)=>{
        if(err1)
            throw err1;
        response.redirect(`/view/${request.params.loginId}/${request.params.feedId}`);
    })
})

// 검색 기능
/*
1. 글쓴이를 검색 
2. 제목
3. 내용
*/ 
app.post(`/search/:loginId`, (request, response)=>{
    var post = request.body;
    var list = [];
    if (post.select == "author")
        list = template3.check_author(post.content, request.feeds);
            
    else if(post.select == "title")
        list = template3.check_title(post.content, request.feeds);
    
    else // post.select == "description"
        list = template3.check_description(post.content, request.feeds);
    

    if(list.length > 0){
        var html = search_html(request.params.loginId, request.userName,request.feeds, list);
        response.send(html);
        }
    else {
        var html = Nsearch_html(request.params.loginId, request.userName,request.feeds, list);
        response.send(html);
    }
})





app.listen(3004, function(){
    console.log('Example app listening on port 3004!');
  })

