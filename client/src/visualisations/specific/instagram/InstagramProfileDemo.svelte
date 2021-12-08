
<div id="container">
  <img src="https://randomuser.me/api/portraits/women/73.jpg"></img>
<div id="text">
  
  <p id="name">Sarah Scott
  <span id="handle">@sarahsco</span></p>
  <p id="private">🔒 Private</p>
<p id="joined">📅 Joined on December 3, 2019</p>
<p id="bio"><span id="label">Bio: </span>Strong desire to travel the world and explore new places 🏀</p>
</div>
</div>

<style>
*{
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
img {
  border-radius: 50%;
  align-self: center;
  justify-self: center;
}

div#container{
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  width: 600px;
  background: #e7ebef;
  margin: 1rem;
  padding: 1rem;
  gap: 0.25rem;
}

div#container p{
  padding: 0;
  margin: 0;
}

#name{
  font-weight: bold;
}

#handle{
  opacity: 0.5;
  font-weight: 100;
}

#label{
  font-weight: bold;
  
}

#text{
  padding-top: 0.5rem;
}
</style>