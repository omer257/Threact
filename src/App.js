import React from 'react';
import logo from './logo.svg';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



class App extends React.Component { 
  componentDidMount() {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( renderer.domElement );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    // instantiate a loader
    var loader = new GLTFLoader();
    var mapHeight = new THREE.TextureLoader().load( "funny.jpg" );

    var material = new THREE.MeshPhongMaterial( {
      color: 0x552811,
      specular: 0x222222,
      shininess: 25,
      bumpMap: mapHeight,
      bumpScale: 12
    } );

    loader = new GLTFLoader();
    loader.load( "snowonly.glb", function ( gltf ) {
console.log(gltf.scene)
if ('geometry' in gltf)
{
  console.log('Found');
}
      let mesh = new THREE.Mesh( gltf.scene.children[ 0 ].geometry, material );

    mesh.position.y = 0;
    mesh.scale.set( 1000, 1000, 1000   );
      scene.add( mesh );

      // createScene( gltf.scene.children[ 0 ].geometry, 100, material );

    } );

  function createScene( geometry, scale, material ){

    let mesh = new THREE.Mesh( geometry, material );

    mesh.position.y = - 50;
    mesh.scale.set( scale, scale, scale );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );

  }


    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
  }


  render(){
    return (
      <div ref={ref => (this.mount = ref)} /> 
    );
  }
}

export default App;
