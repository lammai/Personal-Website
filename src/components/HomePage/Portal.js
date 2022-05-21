import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { DoubleSide, Vector3, Plane } from 'three';
import { PerspectiveCamera } from '@react-three/drei';
import Hallway from '../models/Hallway';
import { useControls } from 'leva';
import { LowpolySphere } from '../About';

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
                    color="#444444"
                    // side={DoubleSide}
                    opacity={0.5}
                />
                <planeGeometry attach="geometry" args={[120, 300]} />
            </mesh>
        </>
    );
});

export const Viewcube = React.forwardRef((props, ref) => {
    const { gl, scene, camera, clock } = useThree();

    const portalCamRef = useRef();
    const portalCamRef2 = useRef();
    const portalCamRef3 = useRef();

    const meshRef = useRef();

    const portalAref = useRef();
    const portalBref = useRef();
    const portalCref = useRef();
    const portalDref = useRef();

    const mainMoverRef = useRef();
    const bCamMover = useRef();
    const cCamMover = useRef();
    const dCamMover = useRef();

    const camRef = useRef();

    useEffect(() => {
        portalAref.current.layers.set(1);
        portalBref.current.layers.set(2);

        portalCref.current.layers.set(3);
        portalDref.current.layers.set(4);

        mainMoverRef.current.add(camRef.current);
    }, []);

    useFrame(() => {
        meshRef.current.rotation.y = clock.getElapsedTime();
        meshRef.current.rotation.x = clock.getElapsedTime();

        //relatively align other cam with main cam
        let relativePos = portalAref.current.worldToLocal(
            mainMoverRef.current.position.clone()
        );
        bCamMover.current.position.copy(
            portalBref.current.localToWorld(relativePos)
        );

        cCamMover.current.position.copy(
            portalCref.current.localToWorld(relativePos)
        );

        dCamMover.current.position.copy(
            portalDref.current.localToWorld(relativePos)
        );

        let relativeRot = mainMoverRef.current.quaternion
            .clone()
            .multiply(portalAref.current.quaternion.clone().invert());
        bCamMover.current.quaternion.copy(
            relativeRot.multiply(portalBref.current.quaternion)
        );

        cCamMover.current.quaternion.copy(
            relativeRot.multiply(portalCref.current.quaternion)
        );
        dCamMover.current.quaternion.copy(
            relativeRot.multiply(portalDref.current.quaternion)
        );

        //keep cam in sync
        portalCamRef.current.rotation.x = camera.rotation.x;
        portalCamRef.current.rotation.y = camera.rotation.y;
        portalCamRef.current.rotation.z = camera.rotation.z;

        portalCamRef.current.position.x = camera.position.x;
        portalCamRef.current.position.y = camera.position.y;
        portalCamRef.current.position.z = camera.position.z;

        portalCamRef2.current.rotation.x = camera.rotation.x;
        portalCamRef2.current.rotation.y = camera.rotation.y;
        portalCamRef2.current.rotation.z = camera.rotation.z;

        portalCamRef2.current.position.x = camera.position.x;
        portalCamRef2.current.position.y = camera.position.y;
        portalCamRef2.current.position.z = camera.position.z;

        portalCamRef3.current.rotation.x = camera.rotation.x;
        portalCamRef3.current.rotation.y = camera.rotation.y;
        portalCamRef3.current.rotation.z = camera.rotation.z;

        portalCamRef3.current.position.x = camera.position.x;
        portalCamRef3.current.position.y = camera.position.y;
        portalCamRef3.current.position.z = camera.position.z;

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

        let clipNormal2 = new Vector3(0, 0, clipSide).applyQuaternion(
            portalCref.current.quaternion
        );

        let clipNormal3 = new Vector3(0, 0, clipSide).applyQuaternion(
            portalDref.current.quaternion
        );

        let clipPoint = portalBref.current.position;
        let clipPoint2 = portalCref.current.position;
        let clipPoint3 = portalDref.current.position;

        let clipPlane = new Plane().setFromNormalAndCoplanarPoint(
            clipNormal,
            clipPoint
        );
        let clipPlane2 = new Plane().setFromNormalAndCoplanarPoint(
            clipNormal2,
            clipPoint2
        );
        let clipPlane3 = new Plane().setFromNormalAndCoplanarPoint(
            clipNormal3,
            clipPoint3
        );

        gl.clippingPlanes = [clipPlane, clipPlane2, clipPlane3];

        ctx.colorMask(true, true, true, true);
        ctx.depthMask(true);

        ctx.stencilFunc(ctx.EQUAL, 1, 0xff);
        ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);

        portalCamRef.current.layers.set(0);

        gl.render(scene, portalCamRef.current);
        gl.render(scene, portalCamRef2.current);
        gl.render(scene, portalCamRef3.current);

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

    const offsetX = -10;
    const offsetY = -150;
    const offsetZ = 0;

    const { x, y, z, rx, ry, rz } = useControls('Portal 1', {
        // position={[-10, 23.01, -1]}
        x: { value: 56, min: -100, max: 100, step: 0.01 },
        y: { value: 22, min: -100, max: 100, step: 0.01 },
        z: { value: 30, min: -100, max: 100, step: 0.01 },
        rx: { value: 0.39, min: -10, max: 10, step: 0.01 },
        ry: { value: 6.66, min: -10, max: 10, step: 0.01 },
        rz: { value: 6.66, min: -10, max: 10, step: 0.01 },
    });

    const { cX, cY, cZ, crX, crY, crZ } = useControls('Portal 2', {
        cX: { value: 0, min: -100, max: 100, step: 0.01 },
        cY: { value: 0.24, min: -100, max: 100, step: 0.01 },
        cZ: { value: 30, min: -100, max: 100, step: 0.01 },
        crX: { value: 0, min: -10, max: 10, step: 0.01 },
        crY: { value: 2 * Math.PI, min: -10, max: 10, step: 0.01 },
        crZ: { value: 0, min: -10, max: 10, step: 0.01 },
    });
    const { dX, dY, dZ, drX, drY, drZ } = useControls('Portal 3', {
        dX: { value: 0, min: -100, max: 100, step: 0.01 },
        dY: { value: 0.24, min: -100, max: 100, step: 0.01 },
        dZ: { value: 30, min: -100, max: 100, step: 0.01 },
        drX: { value: 0, min: -10, max: 10, step: 0.01 },
        drY: { value: 2 * Math.PI, min: -10, max: 10, step: 0.01 },
        drZ: { value: 0, min: -10, max: 10, step: 0.01 },
    });

    const { oX, oY, oZ } = useControls('OG Portal', {
        // position={[-10, 23.01, -1]}
        oX: { value: 0, min: -200, max: 200, step: 0.01 },
        oY: { value: 23.01, min: -200, max: 200, step: 0.01 },
        oZ: { value: -1, min: -200, max: 200, step: 0.01 },
    });

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
            <group ref={cCamMover} position={[offsetX, offsetY, offsetZ]}>
                <PerspectiveCamera
                    ref={portalCamRef2}
                    makeDefault={false}
                    fov={60}
                />
            </group>
            <group ref={dCamMover} position={[offsetX, offsetY, offsetZ]}>
                <PerspectiveCamera
                    ref={portalCamRef3}
                    makeDefault={false}
                    fov={60}
                />
            </group>

            <Hallway
                position={[-9.88, -150.18, 200]}
                scale={[15.09, 22.59, 200]}
            />
            <ambientLight intensity={1} color="red" />
            <mesh
                ref={meshRef}
                position={[offsetX - 1.5, offsetY + 1, offsetZ + 240]}
            >
                <icosahedronBufferGeometry args={[10, 0]} />
                <meshBasicMaterial wireframe />
            </mesh>
            <WorldPortal
                ref={portalAref}
                // position={[-10, 23.01, -1]}
                position={[oX, oY, oZ]}
                rotation={[0, 0, 0]}
            />
            <WorldPortal
                ref={portalBref}
                // position={[offsetX, offsetY, offsetZ]}
                position={[x, y, z]}
                // rotation={[0, -Math.PI, 0]}
                rotation={[rx, ry, rz]}
            />
            <WorldPortal
                ref={portalCref}
                // position={[offsetX, offsetY, offsetZ]}
                position={[x, cY, z]}
                // rotation={[0, -Math.PI, 0]}
                rotation={[crX, crY, rz / 4]}
            />
            <WorldPortal
                ref={portalDref}
                // position={[offsetX, offsetY, offsetZ]}
                position={[x, cY, z]}
                // rotation={[0, -Math.PI, 0]}
                rotation={[drX, drY, rz / 8]}
            />
        </>
    );
});
