![All-Seeing Wizards](https://user-images.githubusercontent.com/1077405/212424854-229b01d2-e52f-4475-9acd-f7b24aa2536b.png)

All-Seeing Wizards is a digital board game where you and your friends play cards to move around the board and fire spells at each other. It takes strategy, skill, and a little bit of luck to come out on top.

## Local development

1. Make sure you have [Node.js](https://nodejs.org/) (tests are run with 18.x), [Yarn v1](https://classic.yarnpkg.com/lang/en/) and [MongoDB](https://www.mongodb.com) installed
2. Make sure MongoDB is started and listening on the default port (27017). Alternatively, create a `.env` file in the `api` directory and add the content `MONGO_URL=<your mongodb cluster URL>`
3. Run `yarn install` at the top level
4. Run `yarn dev` to start the development server

Open `http://localhost:8080` to see the game. To try creating a game and connecting as multiple players, you can open multiple browser tabs or windows.

## How to play

### Setting up

Start by hosting a game on a big screen. Note that "Max players" also determines the
board size; it is possible to play with a smaller number of players on a large board,
but tends to take longer and be less interesting.

Once you start hosting, you will get a code for players to join. It works best if
everyone joins on their phones.

<img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/how-to-play/host-join.png" width="600" />

### Playing cards

Once the game starts, turns are played until all but one player is defeated. During each
turn, each player is dealt 7 cards and chooses 4 of them to play that turn. These might
be attacks, movement cards, potions, shields, etc.

As you play cards, a preview of what will happen is shown on your player screen.

<img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/how-to-play/cards.png" width="300" />

When everyone has picked their cards, the turn will be played out on the host screen.
Each player's first picked card will activate first, and the effects of those cards will
happen simultaneously (the first "action"). Then each player's second card will
activate, and so on until all cards have activated.

<img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/how-to-play/host-playback.png" width="300" />

### Action order

The fact that different players' cards activate simultaneously might raise the question:
What happens if players' cards clash with each other? What if one player attacks while
another is moving out of the way?

To solve this problem, different card types have different precedence. Within each
action, cards will always activate in this order:

**Interrupt → Priority → Movement → Attacks**

**Interrupt** cards are ones which block other cards from having an effect.
These have a <img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/card-types/prevent-actions.png" width="16" height="16" /> symbol.

**Priority** cards are any cards which only affect the caster. These have
symbols such as <img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/card-types/heal.png" width="16" height="16" />, <img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/card-types/shield.png" width="16" height="16" /> and{" "}
<img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/card-types/power-up.png" width="16" height="16" />

**Movement** cards allow players to move around the map. These have a{" "}
<img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/card-types/move.png" width="16" height="16" /> symbol.

**Attack** cards cause damage and can knock back other players. These have
a <img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/card-types/attack.png" width="16" height="16" /> symbol.

In addition, if players attempt to move onto the same space in the same action, both
moves are cancelled.

### HP

HP is indicated by heart symbols. At the start of the game, all players have 5 HP. When
a player takes damage, they lose HP, and when their HP reaches zero they are defeated.

When a player is defeated, the area around them becomes "haunted". If any living player
ends their turn in a haunted area, they lose 1 HP.

### Terrain

On the game board there are a different types of terrain which affect players in
different ways.

<img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/tiles/rocks-0.png" width="64" />

**Rocks** cannot be moved through, but attacks will go through them.

<img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/tiles/water-0.png" width="64" />

**Water** reduces a player's movement speed by 1 - "Move 1" cards will only
turn the player and they must use a "Move 2" card to get out.

<img src="https://raw.githubusercontent.com/binary-koan/all-seeing-wizards/master/client/assets/tiles/lava-0.png" width="64" />

**Lava** damages a player for 1 HP if they end their turn in it.

## Deployment

All Seeing Wizards can be built as a single Docker image. The included fly.toml can be used for easy deployment to [Fly.io](https://fly.io).

When running the Docker image, you will need to specify the following environment variables

- `MONGO_URL` should point to a MongoDB cluster. You can try out a free shared cluster on [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- `HASHIDS_SALT` should be some random string to seed the game ID generator
