import express from 'express';
import path from 'path';
import dns from 'dns';
import util from 'util';
const lookup = util.promisify(dns.lookup);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const port = process.env.PORT || 5000;
const app = express();
app.use(express.static(path.join(__dirname, '../build'), { index: false }));
app.use('/api/foo', (req, res) => {
    res.send("foo");
});
app.use('/api/dns', async (req, res) => {
    const hosts = ['mythreekit.com', 'clara.io', 'cloud.clara.io', 'bonnie.clara.io'];
    const results = await Promise.all(hosts.map(h => lookup(h)));
    const r = {};
    for (let i=0; i < hosts.length; i++) r[hosts[i]] = results[i].address;
    res.send(r);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
});

app.listen(port);
