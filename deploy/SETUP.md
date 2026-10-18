# Server setup (Ubuntu/Debian)

One-time steps to host this site on your own server. Commands assume you run
them from your laptop unless marked "on the server". Replace `SERVER_IP`,
`vizz`, and the domain with your own values.

## 1. DNS and firewall

- At your registrar, point `0xsamarth.xyz` (A record) and `www` (A or CNAME)
  at `SERVER_IP`. Wait for DNS to resolve: `dig +short 0xsamarth.xyz`.
- Open inbound ports `22`, `80`, and `443` in the server's firewall/security group.

## 2. Install packages and create directories (on the server)

```sh
sudo apt update && sudo apt install -y nginx rsync
sudo mkdir -p /var/www/0xsamarth.xyz/releases
sudo chown -R vizz:vizz /var/www/0xsamarth.xyz
```

The SSH user in step 4 must be able to write to that directory.

## 3. Create a deploy key (on your laptop)

```sh
ssh-keygen -t ed25519 -C "github-actions@0xsamarth.xyz" -f ~/.ssh/0xsamarth_deploy -N ""
ssh-copy-id -i ~/.ssh/0xsamarth_deploy.pub vizz@SERVER_IP
ssh -i ~/.ssh/0xsamarth_deploy vizz@SERVER_IP 'echo connected'
```

Use a passphrase-free key: GitHub Actions cannot answer a prompt.

## 4. Add GitHub secrets

Repository → Settings → Secrets and variables → Actions, or with `gh`:

```sh
gh secret set HOST --body "SERVER_IP"
gh secret set USER --body "vizz"
gh secret set SSH_KEY < ~/.ssh/0xsamarth_deploy   # the private key
# optional
gh secret set SSH_PORT --body "22"
gh secret set DEPLOY_PATH --body "/var/www/0xsamarth.xyz"
```

`DEPLOY_PATH` defaults to `/var/www/0xsamarth.xyz`; `SSH_PORT` defaults to `22`.
Optionally add a repository **variable** `SITE_URL` (e.g. `https://0xsamarth.xyz/`)
to override the smoke-test URL.

## 5. Enable nginx

Do this before the first deploy so the smoke test has something to hit. The
`root` points at `current/`, which does not exist until the first deploy — a
404 until then is expected.

```sh
sudo cp deploy/nginx.conf /etc/nginx/sites-available/0xsamarth.xyz
sudo ln -sf /etc/nginx/sites-available/0xsamarth.xyz /etc/nginx/sites-enabled/0xsamarth.xyz
sudo rm -f /etc/nginx/sites-enabled/default   # skip if you host other sites
sudo nginx -t && sudo systemctl reload nginx
```

If `DEPLOY_PATH` is not `/var/www/0xsamarth.xyz`, edit the `root` line first.

## 6. Deploy

```sh
git push origin main
```

Watch the run under the repository's **Actions** tab. The first deploy creates
`releases/<sha>` and the `current` symlink.

## 7. HTTPS

DNS must already point at the server; certbot validates over port 80.

```sh
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d 0xsamarth.xyz -d www.0xsamarth.xyz
```

Certbot edits the nginx config and installs a renewal timer. Note that after
this the live vhost on the server is certbot-managed and will differ from
`deploy/nginx.conf`.

## Rollback

Releases are plain directories and `current` is just a symlink:

```sh
cd /var/www/0xsamarth.xyz
ls -1dt releases/*/
ln -sfn releases/<older-sha> current.tmp && mv -Tf current.tmp current
```

The workflow keeps the newest 5 releases.
