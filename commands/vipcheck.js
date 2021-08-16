const axios = require('axios');
const _ = require("underscore")
const tools = require("../tools/tools.js");

module.exports = {
    name: "vipcheck",
    ping: true,
    execute: async (channel, user, input) => {
        try {
            let username = user.username;
            if (input[2]) {
                if (input[2].startsWith("@")) {
                    input[2] = input[2].substring(1)
                }
                username = input[2];
            }
            let vipcheck = await axios.get(`https://api.ivr.fi/twitch/modsvips/${channel}`)
            isvip = vipcheck.data["vips"]
            let vipresponse = ""
            await _.each(isvip, async function (viptatus) {
                if (viptatus.login == username) {
                    let vipdate = viptatus.grantedAt
                    const ms = new Date().getTime() - Date.parse(vipdate);
                    vipresponse = `that user has been a vip😬 since - (${tools.humanizeDuration(ms)})`
                }
            })
            if (vipresponse != "") {
                return vipresponse
            }
            else {
                return `That user is not a vip :)`
            }

        } catch (err) {
            console.log(err);
            return ` Error FeelsBadMan `;
        }
    }
}