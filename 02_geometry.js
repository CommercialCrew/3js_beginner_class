import * as THREE from '../build/three.module.js';
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js'
import { FontLoader } from "../examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "../examples/jsm/geometries/TextGeometry.js"

class App{
    constructor(){
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGL1Renderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));

    }

    _setupControls(){
        new OrbitControls(this._camera, this._divContainer);
    }

    _setupCamera(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 15;
        this._camera = camera;    
    }
    _setupLight(){
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }
    _setupModel(){
        const fontLoader = new FontLoader();
        async function loadFont(that){
            const url = "../examples/fonts/helvetiker_regular.typeface.json";
            const font = await new Promise((resolve, reject) => {
                fontLoader.load(url, resolve, undefined, reject);
            });

            const geometry = new TextGeometry("TEST", {
                font: font,
                size: 5,
                height: 1.5,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.7,
                bevelSize: .7,
                bevelSegments: 2
            });

        const fillMaterial = new THREE.MeshPhongMaterial({color: 0x515151});
        const cube = new THREE.Mesh(geometry, fillMaterial);

        const lineMaterial = new THREE.LineBasicMaterial({color: 0xffff00});
        const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry), lineMaterial);

        const group = new THREE.Group()
        group.add(cube);
        group.add(line);
        
        that._scene.add(group);
        that._cube = group;
        };
        
        loadFont(this);

        //const geometry = new THREE.CircleGeometry(0.9, 16,Math.PI/2, Math.PI);
        //const geometry = new THREE.ConeGeometry(0.5,1.6,16,9,true, 0, Math.PI);
        // const geometry = new THREE.CylinderGeometry(0.9, 0.9, 1.6, 32, 12, true, 0, Math.PI);
        //const geometry = new THREE.SphereGeometry(0.9, 32, 12, 0, Math.PI, 0, Math.PI/2);
        //const geometry = new THREE.RingGeometry(0.2, 1, 6, 2, 0, Math.PI);
        //const geometry = new THREE.PlaneGeometry(1, 1.4, 1, 1);
        //const geometry = new THREE.TorusGeometry(0.9, 0.4, 24, 32, Math.PI);
        //const geometry = new THREE.TorusKnotGeometry(0.6, 0.1, 64, 32, 3, 4);
        /*class CustomSinCurve extends THREE.Curve {
            constructor(scale) {
                super();
                this.scale = scale;
            }
            getPoint(t){
                const tx = t*3-1.5;
                const ty = Math.sin(2*Math.PI*t);
                const tz = 0;
                return new THREE.Vector3(tx,ty,tz).multiplyScalar(this.scale);
            }
        }

        const path = new CustomSinCurve(4);
        const geometry = new THREE.TubeGeometry(path, 40, 0.8, 8, true);*/
        /*const x = - 2.5, y = - 5;
        const shape = new THREE.Shape();
        shape.moveTo(x+2.5,y+2.5);
        shape.bezierCurveTo(x+2.5,y+2.5,x+2,y,x,y);
        shape.bezierCurveTo(x-3,y,x-3,y+3.5,x-3,y+3.5);
        shape.bezierCurveTo(x-3,y+5.5,x-1.5,y+7.7,x+2.5,y+9.5);
        shape.bezierCurveTo(x+6,y+7.7,x+8,y+4.5,x+8,y+3.5);
        shape.bezierCurveTo(x+8,y+3.5,x+8,y,x+5,y);
        shape.bezierCurveTo(x+3.5,y,x+2.5,y+2.5,x+2.5,y+2.5);

        const settings = {
            steps: 2,
            depth: 4,
            bevelEnabled: true,
            bevelThickness: 1.6,
            bevelSize: 1.7,
            bevelSegments: 5,
        };

        const geometry = new THREE.ExtrudeGeometry(shape, settings);*/

        


        
        
    }

    /*_setupModel(){
        class CustomSinCurve extends THREE.Curve{
            constructor(scale){
                super();
                this.scale = scale;
            }
            getPoint(t){
                const tx = t*3-1.5;
                const ty = Math.sin(2*Math.PI*t);
                const tz = 0;
                return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
            }
        }

        const path = new CustomSinCurve(4);

        const geometry = new THREE.BufferGeometry();
        const points = path.getPoints(30);
        geometry.setFromPoints(points);

        const material = new THREE.LineBasicMaterial({color: 0xffff00});
        const line = new THREE.Line(geometry, material);

        this._scene.add(line);
    }*/
    resize(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }
    render(time){
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }
    update(time){
        time *= 0.001;
        //this._cube.rotation.x = time;
        //this._cube.rotation.y = time;
    }
}

window.onload = function(){
    new App()
}