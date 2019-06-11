var canvas = document.getElementById("renderCanvas")

var H_DIRECTION_UP = 0
var H_DIRECTION_DOWN = 1
var H_DIRECTION_LEFT = 2
var H_DIRECTION_RIGHT = 3

var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine)
    scene.ambientColor = new BABYLON.Color3(1,1,1)

    // Add a camera to the scene and attach it to the canvas
    // var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), scene)
    // var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);
    // camera.setTarget(BABYLON.Vector3.Zero())
    // camera.attachControl(canvas, true)

    // 参数:名字，位置，所属场景    
    var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), scene)
    // 相机与目标的距离
    camera.radius = 30
    // 相机超过目标局部坐标中心点的高度
    // camera.heightOffset = 10
    // 相机在目标局部坐标XY平面内环绕目标的旋转角度
    // camera.rotationOffset = 0
    // 加速度
    // camera.cameraAcceleration = 0.005
    // 最大速度 
    // camera.maxCameraSpeed = 10
    // 将相机与画布关联
    camera.attachControl(canvas, true)
    // 注意:这里的babylon.js版本为2.5，后续版本的写法可能会有改变
    // 创建目标网格
    // camera.lockedTarget = targetMesh

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene)
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene)

    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene)

    myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1)
    myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87)
    myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1)
    myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53)
    myMaterial.ambientTexture = new BABYLON.Texture("img/task_icon_05.png", scene)
    // myMaterial.alpha = 0.5
    myMaterial.ambientTexture.hasAlpha = true

    // mesh.material = myMaterial

    // Add and manipulate meshes in the scene
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2, diameterX:3}, scene)
    // sphere.isVisible = false

    // Move the sphere upward 1/2 of its height.
    sphere.position.y = 1
    sphere.scaling.z = 0.1

    sphere.material = myMaterial
    sphere.wireframe = true

    camera.lockedTarget = sphere

    // Create lines
    var linePoints = [
        new BABYLON.Vector3(1, 1, 0),
        new BABYLON.Vector3(1, 0, 0),
        new BABYLON.Vector3(0, 1, 1),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(1, 0, 0)
    ];
    var lineColor = new BABYLON.Color4(255,0,0,0.6)
    var lines = BABYLON.MeshBuilder.CreateLines("lines", {points:linePoints, updatable:true, colors:BABYLON.Color4.RED}, scene)
    // scene.hchangeLines = function () {
    //     print("===Test: change")
    //     var newLinePoints = [
    //         new BABYLON.Vector3(1, 1, 0),
    //         new BABYLON.Vector3(1, 0, 0),
    //         new BABYLON.Vector3(0, 1, 1),
    //         new BABYLON.Vector3(0, 1, 0),
    //         new BABYLON.Vector3(1, 1, 0)
    //     ];
    //     lines = BABYLON.MeshBuilder.CreateLines("lines", {points:newLinePoints, instance:lines}, scene)
    // };
    
    var alpha = 1
    var beta = 0
    var gamma = 0
    lines.rotation = new BABYLON.Vector3(alpha, beta, gamma)

    lines.addRotation(Math.PI / 2, 0, 0)

    // Create a plane
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:5, height:2}, scene)
    
    // Create a built-in "ground" shape.
    var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:6, width:4, subdivisions: 4}, scene)

    

    return scene

}

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene()

var changeLines = function () {
    var lines = scene.getNodeByName("lines")
    var newLinePoints = [
        new BABYLON.Vector3(1, 1, 0),
        new BABYLON.Vector3(1, 0, 0),
        new BABYLON.Vector3(0, 1, 1),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(1, 1, 0)
    ];
    lines = BABYLON.MeshBuilder.CreateLines("lines", {points:newLinePoints, instance:lines}, scene)
}

var rotateY = function () {
    var camera = scene.getNodeByName("Camera")
    // camera.
}

var moveBall = function (directionTo) {
    var ball = scene.getNodeByName("sphere")
    switch (directionTo) {
        case H_DIRECTION_UP:
            ball.position.z = ball.position.z - 0.1
            break;
        case H_DIRECTION_DOWN:
            ball.position.z = ball.position.z + 0.1
            break;
        case H_DIRECTION_LEFT:
            ball.position.x = ball.position.x + 0.1
            break;
        case H_DIRECTION_RIGHT:
            ball.position.x = ball.position.x - 0.1
            break;
        default:
            break;
    }
}

var shotGun = function () {
    var sphere = scene.getNodeByName("sphere")
    var torus = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 0.2}, scene);
    torus.position = new BABYLON.Vector3(sphere.position.x, sphere.position.y, -30)
    const animation = new BABYLON.Animation("anim", "position.z", 1, BABYLON.Animation.ANIMATIONTYPE_FLOAT, true);
    animation.setKeys([{ frame: 0, value: 1 }]);
    torus.animations.push(animation);
    scene.beginAnimation(torus, 0, 0, true);
    expect(box.position.x, "box.position.x").to.equal(1);
}

// Add keyboard observable.
scene.onKeyboardObservable.add(kbInfo => {
    if (kbInfo.type == BABYLON.KeyboardEventTypes.KEYUP) {
        if (kbInfo.event.keyCode == 67) {
            changeLines()
        }
    }
    if (kbInfo.type == BABYLON.KeyboardEventTypes.KEYDOWN) {
        switch (kbInfo.event.keyCode) {
            case 87:
                moveBall(H_DIRECTION_UP)
                break;
            case 83:
                moveBall(H_DIRECTION_DOWN)
                break;
            case 65:
                moveBall(H_DIRECTION_LEFT)
                break;
            case 68:
                moveBall(H_DIRECTION_RIGHT)
                break;
            case 74:
                shotGun()
                break;
            default:
                break;
        }
    }
  })

engine.runRenderLoop(function () {
    if (scene) {
        scene.render()
    }
})

// Resize
window.addEventListener("resize", function () {
    engine.resize()
})