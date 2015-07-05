(function() {
    var width = window.innerWidth,
        height = window.innerHeight;
    var texture = new THREE.ImageUtils.loadTexture('images/text.png');

    //scene
    var scene = new THREE.Scene();

    //mesh
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(50, 50, 50),
        new THREE.MeshPhongMaterial({
            color: 0x87CEEB
        }));
        sphere.castShadow = true;
        scene.add(sphere);

    var cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 13, 30, 50),
        new THREE.MeshPhongMaterial({
            color: 0x87CEEB
        }));
        cylinder.castShadow = true;
        cylinder.position.set(0, -60, 0);
        cylinder.rotation.set(Math.PI, 0, 0);
        scene.add(cylinder);

    var plane =  new THREE.Mesh(
        new THREE.PlaneGeometry(300, 300, 1, 1),
        new THREE.MeshPhongMaterial({
            map: texture
        }));
        plane.receiveShadow = true;
        plane.position.set(0, -20, -300);
        plane.rotation.set(0, 10 / 180 * Math.PI, 0);
        scene.add(plane);

    //light
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.castShadow = true;
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;
    light.position.set(0, 0, 50);
    scene.add(light);

    //camera
    var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(350, 0, 300);

    //rendering
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 1);
    renderer.shadowMapEnabled = true;
    document.getElementById('stage').appendChild(renderer.domElement);

    //control
    var controls = new THREE.OrbitControls(camera, renderer.domElement)

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        controls.update();
    }
    render();
})();
