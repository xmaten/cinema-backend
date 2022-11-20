- DB Config should come from .env
- Migrations

**if no payment after 30 min, free seats**

/reservations/delete -> free seats


1. user goes to next step where chooses ticket types
   - update each Ticket with proper type
2. user goes to payment, when it's successful seats are taken
   - ScreeningRoom table - move tickets from reserved to taken
   - change status of reservation to paid
   - change status of each ticket to taken 
