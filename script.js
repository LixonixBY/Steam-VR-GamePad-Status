const SteamUser = require('steam-user');
const inquirer = require('inquirer');
const client = new SteamUser();
const argv = require('minimist')(process.argv.slice(2));

let i = 0;
let flags = [2048, 1337];
let finalflag = flags[i];
let accountName;
let password;

const logOnOptions = {
  accountName: accountName,
  password: password,
  flags: finalflag
};
console.log('\x1b[40m\x1b[37m\x1b[1m');
console.log("Welcome to VR-GamePad reverser.");
console.log('\x1b[32m');
console.log("Developer: Lix");
console.log("His Steam: http://steamcommunity.com/profiles/76561198134742054");
console.log('\x1b[35m');
console.log("Non-developer: Chocofishie - Did nothing. But cool glitcher and friend.");
console.log("Her Steam: http://steamcommunity.com/profiles/76561198271951717");
console.log('\x1b[0m');

//Flags Spammer
SteamUser.prototype.setPersona = function (state, name) {
	let spam = function () {
	//console.log('i = ', i,'finalflag = ', finalflag);
	flags = [2048, 1337];
	finalflag = flags[i];
		this._send(SteamUser.EMsg.ClientChangeStatus, {
			"persona_state": state,
			"persona_state_flags": finalflag,
			"player_name": name
		});
	if (i == 1) {i = 0} else {i++}
	}.bind(this);
	setInterval(spam, 650); //Script's Speed 1000 = 1 sec. Stable - 650. I use 500.
};

client.on('loggedOn', () => {
  console.log('\x1b[33m');
  console.log('Logged in');
  client.setPersona(SteamUser.Steam.EPersonaState.Max);
  //client.gamesPlayed(753); Steam-game idle hours.
});

//Getting Login function
function getLogin(callback) {
	if (argv.user && argv.pass) {		// command line. --user and -pass
		return Promise.resolve({
			accountName: argv.user,
			password: argv.pass
		});
	} else {						//prompt
		return inquirer.prompt([
			{
				name: 'accountName',
				message: 'Login:',
				type: 'input'
			},
			{
				name: 'password',
				message: 'Password:',
				type: 'password'
			}
		])
	}
}

getLogin().then(logOnOptions => {
client.logOn(logOnOptions);
});
