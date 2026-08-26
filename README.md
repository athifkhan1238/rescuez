# RescuEZ — Existing UI + Final Functionality Upgrade

The original RescuEZ visual design is preserved. This build focuses on functionality fixes and additions rather than redesigning the interface.

## Main functionality
- Victim and Admin portals remain separate.
- Victim SOS is persisted in the backend and appears in the Admin Command Center.
- Admin receives a popup emergency alert and vibration support for new SOS events.
- Victim can track SOS status/history after submission.
- Responder/volunteer onboarding stays in the Victim/Volunteer portal; Admin verifies applications and identity proof.
- Nearby available responders are preferred; busy teams are excluded; larger incidents can receive multiple teams.
- Resources can be added with name, quantity, unit and supplier/location.
- Notification bell opens all notifications without automatically marking them read.
- Overview map preserves its center/zoom when navigating away and returning.
- Routing Intelligence preserves incident/responder selection and route results during background polling.
- Routing Intelligence lets Admin select an incident and an available responder, then run A* or Dijkstra.
- Route result includes responder/incident endpoints and an interactive road map using OpenStreetMap/OSRM when available, with distance and ETA.
- Demo and Reset controls are not included.

## Localhost
1. Install Node.js 18+.
2. Extract the ZIP.
3. Open CMD in the extracted `rescuez` folder.
4. Run `node server.js`.
5. Open `http://localhost:3000/user.html` for the Victim/Volunteer portal.
6. Open `http://localhost:3000/admin.html` separately for the Admin Command Center.

No npm install is required for this zero-dependency Node prototype.

## Important production hardening
This is a hackathon prototype. For real deployment, replace local JSON storage with PostgreSQL/Supabase, add authenticated admin accounts and server-side authorization/RLS, private encrypted identity-proof storage, HTTPS, rate limiting, audit controls and a production-grade routing graph/service with live road closures.


Modified: original UI retained. Default admin password: RescuEZ@Admin123


## Responder resolution workflow
Assigned responders can mark an incident as RESOLVED from their portal. The server validates that the responder is assigned, records the resolution, changes the responder back to AVAILABLE, and the Admin Portal polling view receives the updated status.


## Latest fixes
Road blockage management now has an interactive map: add mode lets the admin click an exact point, while remove mode shows only existing blockage markers and removes the one selected. Resolved incidents are removed immediately from the responder screen. Textareas are constrained to their cards and can only resize vertically.
