
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
var con = require('./db_connection');
const app = express();
app.use(cors());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



/*
  input: loggedInUser = logged In user id,
        user = user id to follow/unfollow,
        followStatus = follow/unfollow
  return: Success if update "followings" table,fail if not
  */
app.post('/following',(req,res)=>{
  let loggedInUser = req.body.loggedInUser;
  let user = req.body.user;
  let followStatus = req.body.followStatus;

  if (followStatus === 'Follow') {
    con.query(`insert into followings (user_id,following_user_id) values ("${loggedInUser}","${user}")`,(err,results)=>{
      if (err){
        res.status(400).send("Fail");
      } else {
        res.status(200).send("Success");
      }
      
    });
  } else {
    con.query(`delete from followings where user_id="${loggedInUser}" and following_user_id="${user}";`,(err,results)=>{
      if (err){
        res.status(400).send("Fail");
      } else {
        res.status(200).send("Success");
      }
    });
  }
})

/*
  input: user id
  return: user name
*/
app.get('/userId',(req,res)=> {
  let userId=req.query.loggedInUser;
  con.query(`select name from users where id=${userId}`,(err,results)=>{
    if (err){
      return res.send('user not exists');
    } else {
      return res.send(results);
    }
  });
})

/*
  input: user id
  return: all users. format:{user_name,group_name,follow_status,followers,user_id }
*/
app.get('/userRow',(req,res)=>{ 
  let loggedInUser = req.query.loggedInUser;
  con.query(`select name as user_name,group_name,follow_status,if (followers IS NULL,0,followers) as followers,a.user_id from
  (select ug.name,ug.user_id,ug.group_name,if (f.follow_status IS NULL,"Follow",f.follow_status) as 
  follow_status from ((select u.name as name ,u.id as user_id,g.name as group_name from users u join groups g on u.group_id=g.id) ug left join 
 (select distinct users.id as user_id,if (user_id IS NULL,"Follow","Following") as follow_status 
 from users left join followings on users.id=following_user_id
  where user_id=${loggedInUser} or user_id IS NULL) f on f.user_id=ug.user_id)) a
 left join (select count(*) as followers,following_user_id  from followings group by following_user_id)
 followers_count on a.user_id=followers_count.following_user_id where user_id <> ${loggedInUser} ORDER BY name ASC;
 `, function (err, result, fields) {
        if (err)
            return res.send(err);
        else {
          return res.send(result);
        }
      });
})

app.listen(4000, ()=> {
    
})

