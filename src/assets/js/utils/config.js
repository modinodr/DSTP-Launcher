/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
 */

const pkg = require('../package.json');
const fetch = require("node-fetch")
let url = pkg.user ? `${pkg.url}/${pkg.user}` : pkg.url

// Quitar slash final si lo hay para evitar doble barra
url = url.replace(/\/$/, '');

const LAUNCHER_TOKEN = pkg.server_token;
const authHeaders = { 'X-Launcher-Token': LAUNCHER_TOKEN };

let config = `${url}/launcher/config-launcher/config.json`;
let news = `${url}/launcher/news-launcher/news.json`;

class Config {
    GetConfig() {
        return new Promise((resolve, reject) => {
            fetch(config, { headers: authHeaders }).then(res => {
                return resolve(res.json());
            }).catch(error => {
                return reject(error);
            })
        })
    }

    async GetNews() {
        let rss = await fetch(news, { headers: authHeaders });
        if (rss.status === 200) {
            try {
                let news = await rss.json();
                return news;
            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    }
}

export default new Config;
export { authHeaders, LAUNCHER_TOKEN };