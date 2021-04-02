class GameScene extends Phaser.Scene {

    constructor() {
        super({key: 'gameScene'});
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('pizza', 'assets/pizza.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('witch', 'assets/witch.png', {frameWidth: 200, frameHeight: 200});
        this.load.spritesheet('ghost', 'assets/ghost.png', {frameWidth: 200, frameHeight: 200});
    }

    create() {

        this.add.image(400, 250, 'sky');


        this.anims.create({
            key: 'up',
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('witch', {start: 2, end: 6}), repeat: 0
        });
        this.anims.create({
            key: 'down',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('witch', {start: 7, end: 12}), repeat: 0
        });
        this.anims.create({
            key: 'fire',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('witch', {start: 13, end: 30}),repeat: 0
        });
        this.anims.create({
            key: 'fly',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('witch', {start: 0, end: 3}),repeat: -1
        });
        this.anims.create({
            key: 'spook',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('ghost', {start: 0, end: 3}),repeat: -1
        });
        this.anims.create({
            key: 'conjure',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('pizza', {start: 0, end: 3}),repeat: -1
        });

    

        // 👻 Ghost Object Pool
        this.ghostGroup = this.add.group({
            defaultKey: 'ghost',
            maxSize: 100,
            visible: false,
            active: false
        });

        this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                const x = Phaser.Math.Between(800, 900);
                const y = Phaser.Math.Between(50, 450);
                const ghost = this.ghostGroup.get(x, y);
                ghost
                    .setActive(true)
                    .setVisible(true)
                    .play('spook');

            }
        });

        // 🍕 Add some pizza ...       
        let Spell = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,    
            initialize: 
            function Spell (scene) {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'pizza');    
                this.speed = Phaser.Math.GetSpeed(400, 1);
            
            },
    
            fire: function (x, y) {
                this.setPosition(x, y); 
                this.setActive(true);
                this.setVisible(true);
            
            },
    
            update: function (time, delta) {
                this.x += this.speed * delta;  
                if (this.x > 800) {
                    this.setActive(false);
                    this.setVisible(false);
                }
                
            }
    
        });
        
    
        this.pizza = this.add.group({
            classType: Spell,
            maxSize: 50,
            runChildUpdate: true
        });



        // Add the witch
        this.witch = this.add.sprite(160, 250, 'witch').setDepth(1);
        this.witch.play('fly');      
        this.speed = Phaser.Math.GetSpeed(200, 1);

    }

    update() {
        Phaser.Actions.IncX(this.ghostGroup.getChildren(), -3);
        this.ghostGroup.getChildren().forEach(ghost => {
            if (ghost.active && ghost.x < -100) {
                this.ghostGroup.killAndHide(ghost);
            }
        });
        
        this.cursors = this.input.keyboard.createCursorKeys();
        let lastFired = 0;
        if (this.cursors.up.isDown && this.witch.y > 50) {
            this.witch.y += -4;
            this.witch.anims.play('up', true);
        }
        if (this.cursors.down.isDown && this.witch.y < 450) {
            this.witch.y += 4;
            this.witch.anims.play('down', true);
        }
        if (this.cursors.space.isDown) {
            this.witch.anims.play('fire', true); 
            let slice = this.pizza.get();
            if (slice) {
                slice.fire(this.witch.x, this.witch.y);
                lastFired = this.time + 100;
        
            }          
        };
     
    }
    
}

export default GameScene;