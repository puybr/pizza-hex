class GameScene extends Phaser.Scene {

    constructor() {
        super({key: 'gameScene'});
    }

    preload() {

        this.load.spritesheet('pizza', 'assets/pizza.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('witch', 'assets/witch.png', {frameWidth: 200, frameHeight: 200});
        this.load.spritesheet('ghost', 'assets/ghost.png', {frameWidth: 150, frameHeight: 150});
    }

    create() {
        this.gameOver = false;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");

        this.anims.create({
            key: 'up',
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('witch', {start: 16, end: 23}), repeat: 0
        });
        this.anims.create({
            key: 'down',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('witch', {start: 0, end: 7}), repeat: 0
        });
        this.anims.create({
            key: 'fire',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('witch', {start: 24, end: 29}),repeat: 0
        });
        this.anims.create({
            key: 'fly',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('witch', {start: 8, end: 15}),repeat: -1
        });
        this.anims.create({
            key: 'spook',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('ghost', {start: 0, end: 8}),repeat: -1
        });
        this.anims.create({
            key: 'spell',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('pizza', {start: 1, end: 3}),repeat: -1
        });
        // 👻 Ghost Object Pool
        this.ghostGroup = this.physics.add.group({
            defaultKey: 'ghost',
            maxSize: 100,
            visible: false,
            active: false
        });
        


        this.time.addEvent({
            delay: 300,
            loop: true,
            callback: () => {
                if (this.gameOver) {
                    return;
                }
                const x = Phaser.Math.Between(800, 900);
                const y = Phaser.Math.Between(50, 450);
                const ghost = this.ghostGroup.get(x, y);
                ghost
                    .setActive(true)
                    .setVisible(true)
                    .play('spook')
                    .body.setSize(100, 60, true);     
            }
        });

        // 🍕 Add some pizza ...       
        let Spell = new Phaser.Class({
            Extends: Phaser.GameObjects.Sprite,    
            initialize: 
            function Spell (scene) {
                this.pizza = Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'pizza');  
                this.speed = Phaser.Math.GetSpeed(400, 1);
                this.anims.play('spell');
            },
    
            fire: function (x, y) {
                this.setPosition(x, y); 
                this.setActive(true);
                this.setVisible(true);
                this.body.setSize(20, 20, true);
            },
    
            update: function (time, delta) {
                this.x += this.speed * delta;  
                if (this.x > 800) {
                    this.setActive(false);
                    this.setVisible(false);
                    this.destroy();
                    
                }
                
            }, 
    
        });
    
        this.pizzaGroup = this.physics.add.group({
            defaultKey: 'pizza',
            classType: Spell,
            maxSize: 50,
            runChildUpdate: true
        });

        // 🧙‍♀️ Add the witch
        this.witch = this.physics.add.sprite(160, 250, 'witch').setDepth(1);
        this.witch.body.setSize(70, 80, true);
        this.physics.world.enable(this.witch);
        this.witch.play('fly');      
        this.speed = Phaser.Math.GetSpeed(200, 1);

        // 🧙‍♀️👻 Collision   
        this.physics.add.collider(this.witch, this.ghostGroup, (witch, ghost) => {
            this.gameOver = true;
            const ko = this.add.text(400, 250, 'You Died', { color: '#00FF00', fontSize: 32 }).setOrigin(0.5, 0);
            ko.setInteractive({useHandCursor: true});
            ko.on('pointerdown', () => this.scene.restart());
            if (this.cursors.space.isDown) {
                this.scene.restart();
                this.gameOver = false;
            }
        });
                   
        }// end create




    update() {
        this.witch.play('fly', true);
        if(this.gameOver)
        {
            return;
        }


        Phaser.Actions.IncX(this.ghostGroup.getChildren(), -3);
        this.ghostGroup.getChildren().forEach(ghost => {
            if (ghost.active && ghost.x < -100) {
                this.ghostGroup.killAndHide(ghost);
            }
        });
      
       
        let lastFired = 0;
    
        if (this.cursors.up.isDown && this.witch.y > 50) {
            this.witch.y += -4;
            this.witch.play('up', true);
        }
        if (this.cursors.down.isDown && this.witch.y < 450) {
            this.witch.y += 4;
            this.witch.play('down', true);
        }
        if (this.cursors.space.isDown) {
            this.witch.play('fire', true); 
            const slice = this.pizzaGroup.get(this.witch.x, this.witch.y);

            if (slice) {
                slice.add
                slice.fire(this.witch.x, this.witch.y);

                this.physics.add.collider(this.ghostGroup, slice, (enemyHit, bulletHit) =>
                {
                    console.log("Enemy hit !!!!");
                    enemyHit.setActive(false).setVisible(false).destroy();
                    // Destroy bullet
                    bulletHit.setActive(false).setVisible(false).destroy();
                });
                lastFired = this.time + 100;
        
            }          
        };

     
    }
}

export default GameScene;