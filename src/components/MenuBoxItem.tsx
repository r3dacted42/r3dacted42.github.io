import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

function MenuBoxItem(props: ThreeElements['mesh']) {
    const meshRef = useRef<Mesh>(null!);
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((_state, _deltaTime) => {
        //
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(_e) => setActive(!active)}
            onPointerOver={(_e) => setHover(true)}
            onPointerOut={(_e) => setHover(false)}
        >
            <boxGeometry args={[1, 1, 10]} />
            <meshStandardMaterial color={hover ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

export default MenuBoxItem;