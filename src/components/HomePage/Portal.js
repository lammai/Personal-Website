import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { DoubleSide, Vector3, Plane } from 'three';
import { PerspectiveCamera } from '@react-three/drei';
import Hallway from '../models/Hallway';
import Deer from '../models/Deer';

const HallLight = ({ pos }) => {
    const ref = useRef();
    const { clock } = useThree();
    useFrame(() => {
        const z = Math.sin(clock.getElapsedTime() / 2) * 2000 + pos;
        ref.current.position.set(-10, -150, z);
    });
    return (
        <rectAreaLight
            ref={ref}
            color={'#0000ff'}
            intensity={450}
            position={[-10, -150, pos]}
            width={30}
            height={45}
        />
    );
};

const HallLights = ({ count = 10 }) => {
    let positions = new Array(count).fill([]);
    for (let i = 0; i < count; i++) {
        const z = 100 + i * 20 * (i + 1);
        positions[i] = {
            z: z,
        };
    }
    return (
        <>
            {positions.map((i) => (
                <HallLight pos={i.z} key={i.z} />
            ))}
        </>
    );
};

const WorldPortal = React.forwardRef((props, ref) => {
    return (
        <>
            <mesh
                ref={ref}
                position={props.position}
                rotation={props.rotation}
                raycast={props.raycast}
            >
                <meshBasicMaterial
                    attach="material"
                    // map={}
                    color="#444444"
                    side={DoubleSide}
                    opacity={0.5}
                />
                <planeGeometry attach="geometry" args={[30, 45]} />
            </mesh>
        </>
    );
});

const offsetX = -10;
const offsetY = -150;
const offsetZ = 0;

export const Viewcube = React.forwardRef((props, ref) => {
    const { gl, scene, camera } = useThree();

    const portalCamRef = useRef();
    // const meshRef = useRef();
    const portalAref = useRef();
    const portalBref = useRef();
    const mainMoverRef = useRef();
    const bCamMover = useRef();
    const camRef = useRef();

    useEffect(() => {
        portalAref.current.layers.set(1);
        portalBref.current.layers.set(2);
        mainMoverRef.current.add(camRef.current);
    }, []);

    useFrame(() => {
        // meshRef.current.rotation.y = clock.getElapsedTime();
        // meshRef.current.rotation.x = clock.getElapsedTime();

        //relatively align other cam with main cam
        let relativePos = portalAref.current.worldToLocal(
            mainMoverRef.current.position.clone()
        );
        bCamMover.current.position.copy(
            portalBref.current.localToWorld(relativePos)
        );

        let relativeRot = mainMoverRef.current.quaternion
            .clone()
            .multiply(portalAref.current.quaternion.clone().invert());
        bCamMover.current.quaternion.copy(
            relativeRot.multiply(portalBref.current.quaternion)
        );

        //keep cam in sync
        portalCamRef.current.rotation.x = camera.rotation.x;
        portalCamRef.current.rotation.y = camera.rotation.y;
        portalCamRef.current.rotation.z = camera.rotation.z;

        portalCamRef.current.position.x = camera.position.x;
        portalCamRef.current.position.y = camera.position.y;
        portalCamRef.current.position.z = camera.position.z;

        const ctx = gl.getContext();
        gl.clear(true, true, true);
        gl.autoClear = false;
        ctx.enable(ctx.STENCIL_TEST);

        //layer 1 contains only the first portal
        camera.layers.set(1);

        ctx.stencilFunc(ctx.ALWAYS, 1, 0xff);
        ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.REPLACE);
        ctx.stencilMask(0xff);

        // only write to stencil buffer (not color or depth)
        ctx.colorMask(false, false, false, false);
        ctx.depthMask(false);

        gl.render(scene, camera);

        //Second pass
        let portalToCamera = new Vector3().subVectors(
            mainMoverRef.current.position.clone(),
            portalAref.current.position.clone()
        );

        let normalPortal = new Vector3(0, 0, 1).applyQuaternion(
            portalAref.current.quaternion
        );

        let clipSide = -Math.sign(portalToCamera.dot(normalPortal));

        let clipNormal = new Vector3(0, 0, clipSide).applyQuaternion(
            portalBref.current.quaternion
        );
        let clipPoint = portalBref.current.position;
        let clipPlane = new Plane().setFromNormalAndCoplanarPoint(
            clipNormal,
            clipPoint
        );

        gl.clippingPlanes = [clipPlane];

        ctx.colorMask(true, true, true, true);
        ctx.depthMask(true);

        ctx.stencilFunc(ctx.EQUAL, 1, 0xff);
        ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);

        portalCamRef.current.layers.set(0);

        gl.render(scene, portalCamRef.current);

        // disable clipping planes
        gl.clippingPlanes = [];

        // Third Pass
        // finished with stencil
        ctx.disable(ctx.STENCIL_TEST);

        ctx.colorMask(false, false, false, false);
        ctx.depthMask(true);
        // need to clear the depth buffer, in case of occlusion
        gl.clear(false, true, false);
        gl.render(scene, camera);

        // FINAL PASS
        // goal: draw the rest of the scene

        ctx.colorMask(true, true, true, true);
        ctx.depthMask(true);

        camera.layers.set(0); // layer 0 contains everything but portals

        gl.render(scene, camera);
        gl.autoClear = true;
    }, 1);

    return (
        <>
            <group ref={mainMoverRef} position={[0, 0, 0]}>
                <PerspectiveCamera
                    ref={camRef}
                    makeDefault
                    fov={60}
                    position={[-72, 72, 72]}
                />
            </group>
            <group ref={bCamMover} position={[offsetX, offsetY, offsetZ]}>
                <PerspectiveCamera
                    ref={portalCamRef}
                    makeDefault={false}
                    fov={60}
                />
            </group>
            {/* {[...Array(5).keys()].map((i) => {
                return (
                    <>
                        <rectAreaLight
                            color={'#001eff'}
                            intensity={300 / (i + 1)}
                            position={[-10, -150, 96 * (i + 1)]}
                            width={30}
                            height={45}
                        />
                    </>
                );
            })} */}
            <HallLights />
            <Hallway
                position={[-9.88, -150.18, 1000]}
                scale={[15.09, 22.59, 1000]}
            />
            <ambientLight intensity={1} color="red" />
            {/* <mesh
                ref={meshRef}
                position={[offsetX, offsetY + 6, offsetZ + 600]}
            >
                <icosahedronGeometry args={[10, 0]} />
                <meshBasicMaterial wireframe />
            </mesh> */}
            <Deer position={[offsetX + 5, offsetY + 63.5, offsetZ + 240]} />
            <WorldPortal
                ref={portalAref}
                position={[-10, 23.01, -1]}
                rotation={[0, 0, 0]}
            />
            <WorldPortal
                ref={portalBref}
                position={[offsetX, offsetY, offsetZ]}
                rotation={[0, -Math.PI, 0]}
            />
        </>
    );
});
