export default class Level1 extends Phaser.Scene {
	constructor() {
		super({
			key: 'Level1'
		});
	}

	preload() {
		this.load.spritesheet("dude", "./src/assets/sprites/dude.png", {
			frameWidth: 32,
			frameHeight: 48
		});

		this.load.image("platform_tiles", "./src/assets/tile_maps/cave_tileset.png");
		this.load.tilemapTiledJSON("map", "./src/assets/tile_maps/cave_map.json")
	}

	create() {
		const map = this.make.tilemap({
			key: "map"
		});

		const tileset = map.addTilesetImage("cave_tileset", "platform_tiles");

		const background = map.createStaticLayer("background", tileset, 0, 0);
		const terrain = map.createStaticLayer("terrain", tileset, 0, 0);

		terrain.setCollisionByProperty({collides: true});

		this.dude = this.physics.add.sprite(100, 100, "dude", 4);
		this.dude.setCollideWorldBounds(true);

		this.physics.add.collider(this.dude, terrain);

		this.anims.create({
			key: "dude_walk_left",
			frames: this.anims.generateFrameNumbers("dude", {
				start: 0,
				end: 3
			}),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: "dude_walk_right",
			frames: this.anims.generateFrameNumbers("dude", {
				start: 5,
				end: 8
			}),
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: "dude_still",
			frames: [{key: "dude", frame: 4}],
			frameRate: 5
		});

		this.cursorKeys = this.input.keyboard.createCursorKeys();
	}

	update(time, delta) {
		if (this.dude.body.blocked.down) {
			if (this.cursorKeys.left.isDown) {
				this.dude.body.setVelocityX(this.dude.body.velocity.x - 10);
			} else if (this.cursorKeys.right.isDown) {
				this.dude.body.setVelocityX(this.dude.body.velocity.x + 10);
			}
			if (this.cursorKeys.up.isDown) {
				this.dude.body.setVelocityY(this.dude.body.velocity.y - 250);
			}
		}

		if (this.dude.body.blocked.left && this.cursorKeys.up.isDown) {
			this.dude.body.setVelocityX(250);
			this.dude.body.setVelocityY(-250);
		} else if (this.dude.body.blocked.right && this.cursorKeys.up.isDown) {
			this.dude.body.setVelocityX(-250);
			this.dude.body.setVelocityY(-250);
		}
		
		if (this.cursorKeys.left.isDown) {
			this.dude.play("dude_walk_left", true);
		} else if (this.cursorKeys.right.isDown) {
			this.dude.play("dude_walk_right", true);
		} else {
			this.dude.play("dude_still");
		}
	}
}
