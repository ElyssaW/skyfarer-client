# SKYFARER

A play-by-post app where the user can create new characters and games, and play Skyfarer online with their friends in a real-time Socket.io based chat.

## Tech Stack

* React
* MongoDB/Mongoose
* Express
* Socket.io

## ERD

![ERD](https://raw.githubusercontent.com/ElyssaW/skyfarer-client/main/public/erd.png)

## MVP

- [x] User can create new account
- [x] User can create new character/game
- [x] User can message with other players in a real-time chat
- [x] User can roll dice with their stats added, using chat commands such as !veils
- [x] Full CRUD functionality on chat messages
- [x] Characters will "die" when their peril is capped, and players can reduce peril by spending tenacity
- [ ] Players can level up their characters, and GM can assign level ups
- [ ] GMs/Players can create ships, and track their traits/values for use in game
- [x] Players can whipser messages to the GM by using the !gm command
- [x] Players can write OOC messages by using the !ooc command

## Stretch

- [ ] Users can see a list of games, and send a request to join to the GM via private message
- [ ] Chat has an "online users" list and a "user is typing" functionality
- [ ] Chat has support for italics/bold/description

## Super Stretch
These are goals that aren't necessarily central to the project or its idea, but that personally interest me as something to pursue

- [ ] Chatbot gm/player - it'll suck to play with, but it'll be fun
- [ ] Adding a "crew morale" value, that the GM can lower or raise, which sets a floor for the players' peril (i.e., the crew will mutiny if they're unhappy with leadership)
- [ ] Random event generation, allowing the GM to type !event and throw up a random scenario, for days when they just don't know what to throw at people

## Roadblocks

* The complexity of the relations - users can have multiple characters and games, and messages need to be associated with all three. Navigating so much information along with React could be difficult. When should I make database calls? How much info should I give to the user at any given time?

* A chat command parser. Will it be difficult to create the parser, and intelligently connect it to database calls/chat events?

* Coordinating information across multiple users - it's important the all players haved a common understanding, which means when data is updated on one user, it needs to cascade to all others in the chat.

* I don't even know where to begin with the chatbot.
