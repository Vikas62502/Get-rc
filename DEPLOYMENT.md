# Deploy to Hostinger VPS with GitHub Actions

This project includes CI/CD in `.github/workflows/deploy.yml`.

## 1) Prepare your VPS

- Install and configure Nginx (or Apache) to serve your frontend directory.
- Create a deploy directory, for example:
  - `/var/www/get-rc`
- Make sure your SSH user can write to that folder.

Example:

```bash
sudo mkdir -p /var/www/get-rc
sudo chown -R your_user:your_user /var/www/get-rc
```

## 2) Add repository secrets in GitHub

Go to your GitHub repo -> `Settings` -> `Secrets and variables` -> `Actions` and add:

- `VPS_HOST`: your server IP or hostname
- `VPS_USER`: ssh username (for example `root` or `ubuntu`)
- `VPS_SSH_PRIVATE_KEY`: private SSH key for the above user
- `VPS_DEPLOY_PATH`: target path (for example `/var/www/get-rc`)
- `VITE_BASE_URL`: backend URL used at build time (for example `http://localhost:8080`)
- `VPS_POST_DEPLOY_COMMAND` (optional): command to run after upload
  - Example: `sudo systemctl reload nginx`

## 3) SSH key setup

Generate a deploy key pair locally:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ./hostinger-deploy-key
```

- Put `hostinger-deploy-key` (private key) in `VPS_SSH_PRIVATE_KEY` secret.
- Add `hostinger-deploy-key.pub` to `~/.ssh/authorized_keys` on VPS.

## 4) Deploy

- Push to `main` branch to trigger deployment automatically.
- Or run manually from `Actions` -> `CI/CD Deploy to Hostinger VPS` -> `Run workflow`.

## Notes

- The workflow runs lint + build first.
- Only the built `dist/` files are uploaded to your VPS.
- Existing files in deploy path are cleaned with `rsync --delete` to keep server in sync.
