import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
    
		// Camera
		// field of view, aspect ratio of rendered view, near plane, far plane
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
		// move camera back to 4 in the Z
		this.camera.position.set( 0, 0, 4 );

		// Scene
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0xB4A7D6 );

		// hemisphere light has diff color for surfaces pointing down and up, intensity is 0.3
		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
		this.scene.add(ambient);

		// points from it's position to the origin, or a target object if one is assigned
		const light = new THREE.DirectionalLight();
		light.position.set( 0.2, 1, 1);
		this.scene.add(light);

		// Renderer
		// need antialiasing to precent jagged edges
		this.renderer = new THREE.WebGLRenderer({ antialias: true } );
		// important so things are blurry
		this.renderer.setPixelRatio( window.devicePixelRatio );
		// filling the window
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		// domElement is created
		container.appendChild( this.renderer.domElement );

		// an object you can see is usually a mesh instance

		// create a box, since there are no params it is 1 unit big
		const geometry = new THREE.BoxBufferGeometry();
		// assign a red material
        const material = new THREE.MeshStandardMaterial( { color: 0x7EEAE9 });
        
		this.mesh = new THREE.Mesh( geometry, material );

		this.scene.add(this.mesh);

		const controls = new OrbitControls( this.camera, this.renderer.domElement );

		this.renderer.setAnimationLoop(this.render.bind(this));

        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
    
	render( ) {  
		this.mesh.rotateY( 0.01 );
        this.renderer.render( this.scene, this.camera );
    }
}

export { App };