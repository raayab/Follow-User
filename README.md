# Follow-User

A client/server app that shows different content if the user is logged in or out.

If user is logged out (not saved to localstorage),render:
"Must be signed in"
for example:
![loggedOut](loggedOut.JPG)

If logged in,render list that includes all users. for example:
![loggedIn](loggedIn.JPG)

## Tables in DB:

users(id,name,group_id)
groups(id,name)
followings(id,user_id,following_user_id)

## Follow/Unfollow button logic:
"Follow" (orange) - if the logged in user is not currently following the corresponding user.
</br>
"Following" (green) - If the user already follows the corresponding user.</br>
"Unfollow" (red) - When hovering on "Following":</br>
![Unfollow](Unfollow.JPG)


When the button is clicked,store the new state in the DB.
If the request succeeded-change the button color accordingly, if failed-show an error message.
