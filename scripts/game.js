
function greenMessage(msg){
    var t = new TextComponent(ChatColor.GREEN + msg);
    t.setColor(ChatColor.GREEN);
    return t;
}

var teamred = map.getTeam("teamred");
var teamblue = map.getTeam("teamblue");
var kills = map.getScoreboard().getObjective("kills");
var world = map.getWorld("default");

kills.setDisplayName("Player Kills");

var teamBluePlayers = teamblue.getPlayers();
for (var i = 0; i < teamBluePlayers.length; i++) {
	kills.set(teamBluePlayers[i].getName(), 0);
}
var teamRedPlayers = teamred.getPlayers();
for (var i = 0; i < teamRedPlayers.length; i++) {
	kills.set(teamRedPlayers[i].getName(), 0);
}

/*map.on("player_kill_player", function(event){
	kills.addScore(event.src.getUsername(), 1);
});*/

map.setUnreadyInterrupt(true);

teamred.setSubtitle(greenMessage("Please wait until the defenders are started"));
teamblue.setSubtitle(greenMessage("Counting down"));

teamblue.countdown(10);

teamred.setSubtitle(greenMessage("Giving the defenders 1 minute to get geared up"));
teamblue.setSubtitle(greenMessage("Invaders will be released within 1 minute"));

map.setUnreadyInterrupt(false);
map.setWinInterrupt(true);

//map.getScoreboard().setDisplay(kills, DisplayType.SIDEBAR);

teamblue.setSpawn(903,86,1192);
for (var i = 0; i < teamBluePlayers.length; i++) {
    var p = teamBluePlayers[i];
    p.clearInventory();
    p.setGamemode(GameMode.SURVIVAL);
    p.setHealth(20);
    p.setHunger(0);
    p.setLevel(0);
}
map.enableStat("startBlue");

world.setTime(12500);
world.setDifficulty(Difficulty.NORMAL);

sleep(20000);
teamblue.clearSubtitle();
sleep(30000);
teamred.countdown(10);

teamred.setSubtitle(greenMessage("Try to destroy the sponges in the castle"));
teamblue.setSubtitle(greenMessage("The invaders have been released"));

teamred.setSpawn(922,84,787);
for (var i = 0; i < teamRedPlayers.length; i++) {
    var p = teamRedPlayers[i];
    p.clearInventory();
    p.setGamemode(GameMode.SURVIVAL);
    p.setHealth(20);
    p.setHunger(0);
    p.setLevel(0);
}
map.enableStat("startRed");

var length = 20 * 60 * 1000;

sleep(60000);
length -= 60000;

map.clearSubtitle(); //Clear all subtitles

var minutesLeft = 19;
while(minutesLeft > 1){
    map.broadcastSubtitle(minutesLeft + " minutes left");
    sleep(60000);
    minutesLeft -= 1;
}
map.broadcastSubtitle("1 minute left");
sleep(50000);
map.countdown(10);

map.setWinner(teamblue);
world.setDifficulty(Difficulty.PEACEFUL);
