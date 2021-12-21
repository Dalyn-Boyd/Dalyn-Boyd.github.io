import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
    
		// Camera
		// field of view, aspect ratio of rendered view, near plane, far plane
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 100);
		// move camera back to 4 in the Z
		this.camera.position.set(0,0,4);

		// Scene
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0xB4A7D6 );

		// Renderer
		// need antialiasing to precent jagged edges
		this.renderer = new THREE.WebGLRenderer( {antialias: true});
		// important so things are blurry
		this.renderer.setPixelRatio(window.devicePixelRatio);
		// filling the window
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		// domElement is created
		container.appendChild(this.renderer.domElement);
		
		this.renderer.setAnimationLoop(this.render.bind(this));

        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){
        
    }
    
	render( ) {  
        this.renderer.render(this.scene, this.camera)
    }
}

export { App };