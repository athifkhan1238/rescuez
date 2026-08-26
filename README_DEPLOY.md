# RescuEZ Owner-Only Deployment

## Windows without Docker
1. Install Node.js 20+.
2. Extract this ZIP.
3. Copy `.env.example` to `.env`.
4. Set `ADMIN_PASSWORD` to a long unique password.
5. Set `ADMIN_PATH` to a private route, e.g. `/my-private-command-portal`.
6. Optional but recommended: set `ADMIN_ALLOWED_IP` to the fixed LAN IP of your own admin device.
7. Run `run-local.bat`.
8. Victim portal: `http://SERVER-IP:3000/`
9. Responder portal: `http://SERVER-IP:3000/user.html`
10. Only use your private admin URL: `http://SERVER-IP:3000` + `ADMIN_PATH`. It first shows the admin login; enter your password.

## Important
- `/admin.html` and `/admin.js` intentionally return 404.
- If `ADMIN_ALLOWED_IP` is set, admin page and admin login work only from that IP. Keep your admin device on a fixed/reserved LAN IP.
- Do not share `.env`.
- Frontend code cannot be made completely invisible to someone who legitimately receives it in a browser. Secrets are kept server-side; viewing frontend files does not reveal the admin password or grant API access.
- For public internet exposure, place the server behind HTTPS and a firewall/reverse proxy.
