1. Before starting Stripe payment we must have to include the init.php in library folder(This file automatically includes the other Stripe files).

2. We can use following credentials for the patment in test mode

   Card Numbers
   ===============================
   4242424242424242(Normal Payment)
   4000000000000077(Instant Payment)

   Expiry Month
   =============================== 
   Any month after current month

   Expiry Year
   =============================== 
   Any month after current year

   CVV
   =======
   Any 3 digit number

3. For further reference, we must save the response and charge id in our database.