# friendface
Yes, I totally named this project after the site on IT Crowd that satirizes the social network we all know.

### live heroku link:
https://hidden-river-56114.herokuapp.com/

### Improvements
Currently, if two potential friends share the same difference score, the app will just return the first of these. Perhaps a way you could compare two users in that case would be to see if one had more of the same answers than the others (i.e., the difference between three answers of 0,0,4 and 1,1,2 would return the same overall difference of 4, but you could argue that the first might be a better match since they were exactly aligned on two answers. But we're running the risk of getting subjective here).