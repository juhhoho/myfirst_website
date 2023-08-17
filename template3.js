var template3 = require('./template3.js');
module.exports = {
    HTML:function(title, login, control, body){
        return `
        <!doctype html>
        <html>
        <head>
          <title>Web by Junho</title>
          <meta charset="utf-8">
        </head>
        <body>
            <h1>${title}</h1>
            ${login}
            ${control}
            ${body}
        </body>
        </html>
        `;
    },
    checkLogin:function(users,id, pw){
        for(var i = 0 ; i < users.length; i++){
            if (users[i].userId == id && users[i].userPw == pw){
                return true;
            }
        }
        return false
    },
    createUser:function(){
        return `
        <form action = '/create_process' method = 'post'>
            <p>
                <input type = 'text' name = 'userId' placeholder = 'userId' minlength="1">
            </p>
            <p>
                <input type = 'password' name = 'userPw' placeholder = 'userPw' minlength="1">
            </p>
            <p>
                <input type = 'text' name = 'userName' placeholder = 'userName' minlength="1">
            </p>
            <p>
                <select name = 'userPhone1'>
                    <option value = '010' selected>010</option>
                    <option value = '011' >011</option>
                    <option value = '016' >016</option>
                <select>
                <input type = 'text' name = 'userPhone2' placeholder = '0000' minlength="1" maxlength="4">
                <input type = 'text' name = 'userPhone3' placeholder = '0000' minlength="1" maxlength="4">
            </p>
            <p>
                <input type = 'submit' value = 'create'>
            </p>
        </form>
    `;
    },
    loadFeedLists:function(feeds, loginId){
        var tag = `
        <tr>
          <th>index</th> <th>author</th> <th>title</th> 
        </tr>
        `;
        for(var i = 0 ; i < feeds.length; i++){
          tag += `
          <tr>
            <th><a href = '/view/${loginId}/${feeds[i].id}'>${i+1}</a></th> <th>${feeds[i].userName}</th> <th>${feeds[i].title}</th>   
          </tr>
          `
        }
        return `
        <table border="1">
          ${tag}
        </table>
        `
    },
    loadFeed:function(feed, userName){
        return `
        <p>
        <h3><strong>[title]</strong></h3>
        ${feed[0].title} (author : ${userName})
        </p>
        <p>
        <h3><strong>[description]</strong></h3>
        ${feed[0].description}  
        </p>
        `
    },
    posting:function(loginId){
        return `
        <form action = '/posting_process/${loginId}' method = 'post'>
            <p>
                <input type = 'text' name = 'title' placeholder = 'title' minlength="1">
            </p>
            <p>
                <textarea name = 'description' placeholder = 'description'></textarea>
            </p>
            <p>
                <input type = 'submit' value = 'posting'>
            </p>
        </form>
    `;
    },
    loadReplyList:function(replys, loginId, feedId){
        var tag = ``;
        for(var i = 0 ; i < replys.length; i++){
            tag += `<li> [${replys[i].userName}] : ${replys[i].description}</li>`
        }
        return `
        <h3>[reply]</h3>
        <form action = '/reply_process/${loginId}/${feedId}'  method = 'post'>
            <input type = 'text' name = 'description' placeholder = 'description'>
            <input type = 'submit' value = 'reply'>
        </form>
        <ul>
            ${tag}
        <ul>
        `
    },
    search:function(loginId){
        return `
        <form action = '/search/${loginId}'  method  ='post'>
            <select name = "select">
                <option value = 'author'>author</option>
                <option value = 'title'>title</option>
                <option value = 'description'>description</option>
            </select>
            <input type = 'text' name = 'content' placeholder = 'content'>
            <input type = 'submit' value = 'search'>
        </form>
        `;
    },
    check_author:function(content_author, feeds){
        var list = [];
        for(var i = 0 ; i < feeds.length; i++){
            if(content_author == feeds[i].userName){
                list.push(feeds[i].id);
            }
        }
        return list;
    },
    loadSearchFeedLists:function(feeds, list,loginId){
        var tag = `
        <tr>
          <th>index</th> <th>author</th> <th>title</th> 
        </tr>
        `;
        var index = 0;

        for(var i = 0 ; i < feeds.length; i++){
            if(list[index] == feeds[i].id){
                tag += `
                <tr>
                  <th><a href = '/view/${loginId}/${feeds[i].id}'>${index+1}</a></th> <th>${feeds[i].userName}</th> <th>${feeds[i].title}</th>   
                </tr>
                `
                index += 1;
            }
            if(index == list.length){
                return `
                <table border="1">
                  ${tag}
                </table>
                `
            }
        }
    },
    check_title:function(content_title, feeds){
        var list = [];
        for(var i = 0 ; i < feeds.length; i++){
            var str = "";
            str += feeds[i].title.split(" ").join("");
            if(str.includes(content_title)){
                list.push(feeds[i].id)
            }
        }
        return list;
    },
    check_description:function(content_description, feeds){
        var list = [];
        for(var i = 0 ; i < feeds.length; i++){
            var str = "";
            str += feeds[i].description.split(" ").join("");
            if(str.includes(content_description)){
                list.push(feeds[i].id)
            }
        }
        return list;
    },
    
}
