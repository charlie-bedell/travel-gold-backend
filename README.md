# Travel Gold - Backend

<img width="267" alt="Screenshot 2024-01-19 at 10 39 23 PM" src="https://github.com/Shyan-spec/travel-gold-frontend/assets/150564873/91cf51f3-e70c-47d9-bbf2-efd4db97ad3f">


# Front-end / Back-end Deployment links

https://peaceful-pasca-8105c8.netlify.app/

[https://github.com/charlie-bedell/travel-gold-backend](https://travel-gold-backend-2516f34de16d.herokuapp.com/)



# Getting started: 
Account Creation: Begin your journey by creating a personalized account on Travel Gold. This simple and secure process ensures that you have a unique space to curate your travel experiences.

Search Itinerary: Once you've successfully logged in, you'll be directed to our intuitive search itinerary page. Here, input the dates of your upcoming travel, and get ready to embark on a hassle-free planning adventure.

Create Itinerary: Hit the "Search" button, and voila! You'll be redirected to our user-friendly "Create Itinerary" page. This is where the magic happens. Explore a world of possibilities as you search for places of interest to add to your itinerary. Once you click on "Add to place of interest" on the map of your desired location, this will add your itinerary. 

My Itineraries: In "My itineraries" you will be able to view all the itineraries that you have created once you click on the link in your list! 


# Contributors:

- https://github.com/charlie-bedell/
- https://github.com/Shyan-spec
- https://github.com/Kevelaz
- https://github.com/aldianahot14


# Attributions:
- Heroku


# Back-end
- Express
- CORS
- JSON
- JSON Web Token
- Bcrypt
- Google Maps SDK/API

# ERD

<img width="500" alt="Screenshot 2024-01-19 at 10 39 23 PM" src="https://github.com/charlie-bedell/travel-gold-backend/blob/main/assets/ERD.png">

# Routes 

| Route | Action | API Endpoint | Purpose | Name |
|-------|--------|--------------|---------|------|
| GET   | /      | Mainpage      | Route that loads in the main page | Index |
| POST  | /signup | Signup        | Route to signup, sends user input to the user schema which produces a unique id, hashes the password, and creates a profile for the user | Create |
| POST  | /login  | Login         | Route to login, sends user inputted username/password to the backend, then uses that login information to match to any existing profile | Verify |
| DELETE| /user   | Delete Profile| Route to delete profile | Delete |
| GET   | /itineraries | Fetch Itineraries | Route that fetches the user's saved itineraries | Show |
| GET   | /itineraries/:itinerary_id | Fetch Specific Itinerary | Route that fetches a specific itinerary and populates the itinerary with places of interest | Show |
| POST  | /itineraries | Create Itinerary | Route that creates a new itinerary for the user | Save |
| PUT   | /itineraries/:itinerary_id | Update Itinerary | Route for when a user updates their itinerary | Edit |
| DELETE| /itineraries/:itinerary_id | Delete Itinerary | Route for when a user deletes a portion or their entire itinerary | Delete |
| GET   | /:itinerary_id/poi/:place_id | Fetch POI | Route that sends a place id to the server and checks if it's in the POI table. If not, it fetches from the Google API, sends to the table, and returns it | Fetch |
| DELETE| /:itinerary_id/poi/:place_id | Delete POI | Route that deletes a POI from the itinerary | Delete |
| GET   | /nearbySearch/ | Nearby Search | Route that connects to the Google Maps API | Fetch |



## BACKEND Time-line

| Day        | Tasks                                                              |
|------------|--------------------------------------------------------------------|
| Monday     | - Authentication in REPO<br> - 50% Authentication set-up          |
| Tuesday    | - Finish Authentication<br> - 50% Routes done                     |
| Wednesday  | - 50% Controllers<br> - Deploy<br> - Have all data models done<br> - 50% Routes done |
| Thursday   | - Finish remaining 50% of Controllers                              |
| Friday     | - Clean up                                                          |
| Saturday/Sunday | - Testing and debugging                                       |




# MVP 
- User should be able to create an account on travel gold (salted password)
- User should be able to login to their account on travel gold
- User should be able to save an itinerary they created for later
- POI (points of interest) Collection



# Next-Step
- Implement a share feature 
- Explore other users itineraries 
- I want the user to see a budget for the itinerary they have built
- User be able to browse AirBnBs in the location they want to visit
- A user to get suggestions for activities based on seasonality


# Resources:
- https://developers.google.com/maps/documentation/places/web-service
- https://developers.google.com/maps/documentation/javascript/maptypes
- https://developers.google.com/maps/documentation/javascript/libraries-open-source
- https://visgl.github.io/react-google-maps/examples
- https://developers.google.com/maps/documentation/javascript/places#places_photos
- https://developers.google.com/maps/documentation/javascript/place-data-fields
- https://developers.google.com/maps/documentation/places/web-service/details#fields
- https://chat.openai.com/
