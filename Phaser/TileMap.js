
var sprite1;
var cursors;
var map;
var layer;
var tiles;
var mode;

if( app.GetOSVersion() < 20 ) mode = Phaser.CANVAS;
else mode = Phaser.AUTO;

var game = new Phaser.Game(800, 600, mode, 'phaser-example', 
        { preload: preload, create: create, update: update});

function preload() 
{
    //Make the game fit the screen (use EXACT_FIT to stretch to full screen).
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    game.load.tilemap('map', 'Misc/ninja-tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ball', 'Img/shinyball.png');
    game.load.image('sky', 'Img/sky2.png');
    game.load.image('kenney', 'Img/kenney.png');
    
    //Create and start sensor object in Orientation mode.
    orient = app.CreateSensor( "Orientation" );
    orient.Start();
}

function create() 
{
    var sky = game.add.image(0, 0, 'sky');
    sky.fixedToCamera = true;

    //  Activate the Ninja physics system
    game.physics.startSystem(Phaser.Physics.NINJA);

    map = game.add.tilemap('map');

    map.addTilesetImage('kenney');
    
    layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();

    var slopeMap = { '32': 1, '77': 1, '95': 2, '36': 3, '137': 3, '140': 2 };

    tiles = game.physics.ninja.convertTilemap(map, layer, slopeMap);

    sprite1 = game.add.sprite(50, 50, 'ball');

    game.physics.ninja.enableCircle(sprite1, sprite1.width / 2);

    //  A little more bounce
    sprite1.body.bounce = 0.5;

    game.camera.follow(sprite1);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() 
{
    for (var i = 0; i < tiles.length; i++)
    {
        sprite1.body.circle.collideCircleVsTile(tiles[i].tile);
    }

    if (cursors.left.isDown || orient.GetPitch() < -5 )
    {
        sprite1.body.moveLeft(20);
    }
    else if (cursors.right.isDown || orient.GetPitch() > 5 )
    {
        sprite1.body.moveRight(20);
    }

    if (cursors.up.isDown || game.input.activePointer.isDown )
    {
        sprite1.body.moveUp(20);
    }
    else if (cursors.down.isDown)
    {
        sprite1.body.moveUp(20);
    }
}

