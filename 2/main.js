var width = window.innerWidth;
var height = window.innerHeight;

var scene = new THREE.Scene;
var camera = new THREE.PerspectiveCamera(75, width / height, 0.5, 10000);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', ()=>{
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
});

controls = new THREE.OrbitControls(camera, renderer.domElement);

//create the shape
var cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
var cubeMaterials = [
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./../Ali.PNG'),
        side: THREE.DoubleSide
    }),//right side
    new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('./../Daud.PNG'),
        side: THREE.DoubleSide
    }),//left side
    new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./../Hassan.PNG'),
        side: THREE.DoubleSide
    }),//top side
    new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('./../Haris.PNG'),
        side: THREE.DoubleSide
    }),//bottom side
    new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./../Omer.jpg'),
        side: THREE.DoubleSide
    }),//fornt side
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./../Usman.jpg'),
        side: THREE.DoubleSide
    })//back side
];

//create a material, color or image textre
var material = new THREE.MeshFaceMaterial(cubeMaterials)
var cube = new THREE.Mesh(cubeGeometry, material);
cube.rotation.y = Math.PI * 45 / 180;
scene.add(cube);

// var edges = new THREE.EdgesHelper( cube, 0x0000ff);
// edges.material.linewidth = 2;
// scene.add(edges);

//camera.position.y = 0;
camera.position.z = 6;

// var light1= new THREE.PointLight(0xFFFFFF, 5.0);
// scene.add(light1);

// var light2 = new THREE.AmbientLight(0xFFFFFF, 0.3);
// scene.add(light2);

var light3 = new THREE.SpotLight(0x7FFF00, 4, 100);
light3.position.x = -10;
light3.position.z = 10;
light3.position.y = -10;
scene.add(light3);

var light4 = new THREE.SpotLight(0xFFFF00, 4, 100);
light4.position.x = 5;
light4.position.y = -3;
light4.position.z = 5;
scene.add(light4);

var light5 = new THREE.SpotLight(0x00FFFF, 4, 100);
light5.position.y = 5;
light5.position.x = 5;
scene.add(light5);

var light6 = new THREE.DirectionalLight(0xFFFFFF, 0.9);
light6.position.set(10, 0, -10);
scene.add(light6);

var light7 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
light7.position.set(-10, 0, 10);
scene.add(light7);

var floorGeometry = new THREE.CubeGeometry(3, 0.2, 3.2);
var floorMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, wireframe: false });
var floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
floorCube.position.y = -1.7;
scene.add(floorCube);

var ceilingGeometry = new THREE.CubeGeometry(3, 0.2, 3.2);
var ceilingMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, wireframe: false });
var ceilingCube = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceilingCube.position.y = 1.7;
scene.add(ceilingCube);

var leftWallGeometry = new THREE.CubeGeometry(0.2, 3.6, 3.2);
var leftWallMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000, wireframe: false });
var leftWallCube = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
leftWallCube.position.x = 1.6;
scene.add(leftWallCube);

var backWallGeometry = new THREE.CubeGeometry(3.2, 3.6, 0.2);
var backWallMaterial = new THREE.MeshLambertMaterial({ color: 0x0000FF, wireframe: false });
var backWallCube = new THREE.Mesh(backWallGeometry, backWallMaterial);
backWallCube.position.z = -1.7;
backWallCube.position.x = 0.1;
scene.add(backWallCube);

var geometry1= new THREE.SphereGeometry(1,1,1);
var material1= new THREE.MeshLambertMaterial({color:0x00FF00, wireframe:false});
var earth1= new THREE.Mesh(geometry1,material1);
// earth1.position.set(0,0,0);
scene.add(earth1);

var geometry2= new THREE.SphereGeometry(1,1,1);
var material2= new THREE.MeshLambertMaterial({color:0xFFFFFF, wireframe:false});
var earth2= new THREE.Mesh(geometry2,material2);
scene.add(earth2);

//game logic
var distance = 3.3;
var theta = 0;
var dTheta = 2 * Math.PI / 1000;
var update = () => {
    theta += dTheta;

    cube.rotation.x+=0.005;
    cube.rotation.y+=0.005;

    earth1.position.x= distance * Math.cos(theta*3);
    earth1.position.y= distance * Math.cos(theta*4);
    earth1.position.z  = distance * Math.sin(theta*4);
    
    earth2.position.x= distance * Math.cos(theta * 5);
	earth2.position.z  = distance * Math.sin(theta*5);
    
    var time = Date.now();

    light3.position.x = Math.sin(time * 0.007);
    light3.position.y = Math.cos(time * 0.008);
    light3.position.z = Math.cos(time * 0.0005);
    
    light4.position.x = Math.sin(time * 0.005);
    light4.position.y = Math.cos(time * 0.005);
    light4.position.z = Math.cos(time * 0.0005);
    
    light5.position.x = Math.cos(time * 0.0005);
    light5.position.y = Math.sin(time * 0.0005);
    light5.position.z = Math.cos(time * 0.0005);
    
};

//draw scene
var render = () => {
    renderer.render(scene, camera);
};

//run game loop (update, render, repeat)
var animate = function () {
    requestAnimationFrame( animate );
    update();
    render();
};

animate();