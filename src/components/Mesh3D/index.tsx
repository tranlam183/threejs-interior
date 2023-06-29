import { useCursor } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { memo, useMemo, useRef, useState } from "react";
import { useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type Mesh3DProps = {
  urlModel: string;
  scaleSize: number;
  rePosition: Array<number>;
  reRotation?: Array<number>;
  onHandleClick?: () => void;
  onHandlePointerOver?: () => void;
  onHandlePointerOut?: () => void;
  setIsDragging?: any;
  floorPlane?: any;
};

const Mesh3D = (props: Mesh3DProps) => {
  const {
    urlModel,
    scaleSize,
    rePosition,
    reRotation,
    onHandleClick,
    onHandlePointerOver,
    onHandlePointerOut,
    setIsDragging,
    floorPlane,
  } = props;

  const { scene } = useLoader(GLTFLoader, urlModel)
  const copiedScene = useMemo(() => scene.clone(), [scene])
  
  const [hovered, setHover] = useState(false);
  const ref: any = useRef();
  const [position, setPosition] = useState(rePosition && [0, 0, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  // useFrame(() => {
  //   ref.current.rotation.z += 0.01;
  //   ref.current.rotation.x += 0.01;
  // });


  let planeIntersectPoint = new THREE.Vector3();

  const [spring, api] = useSpring(() => ({
    // position: [0, 0, 0],
    position: position,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 10 },
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      const e = event as any;
      if (active) {
        e.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPosition([planeIntersectPoint.x, 0, planeIntersectPoint.z]);
      }

      setIsDragging(active);

      api.start({
        // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        position: position,
        scale: active ? 1.2 : 1,
        rotation: [y / aspect, x / aspect, 0],
      });
      return timeStamp;
    },
    { delay: true }
  );

  const handlePoiterOver = (event) => {
    setHover(true);
    onHandlePointerOver && onHandlePointerOver();
  };

  const handlePoiterOut = (event) => {
    setHover(false);
    onHandlePointerOut && onHandlePointerOut();
  };

  useCursor(hovered);

  return (
    <group
      {...props}
      ref={ref}
      {...(bind() as any)}
      dispose={null}
      onClick={(event) => onHandleClick && onHandleClick()}
      onPointerOver={(event) => handlePoiterOver(event)}
      onPointerOut={(event) => handlePoiterOut(event)}
      scale={scaleSize ?? 1}
      position={position}
      args={[1, 1, 1]}
      // rotation={reRotation ?? [0, 0, 0]}
    >
      {/* Hiển thị model */}
      <primitive object={copiedScene} position={position}/>
    </group>
  );
};

export default memo(Mesh3D);
