import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import InputIcon from "@mui/icons-material/Input";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import {
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Input,
  InputBase,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { Float, OrbitControls, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Mesh3D from "components/Mesh3D";
import { useControls } from "leva";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import Room from "./room";

const MyThreeComponent: React.FC = () => {
  const [bad, set] = useState(false);

  const [formats, setFormats] = useState<Array<String>>([]);

  const [models, setModels] = useState(listModels);
  const [modelSelected, setModelSelected] = useState({
    selected: listModels[0],
    index: 0,
  });

  const [selectedState, setSelectedState] = useState(false);

  const [value, setValue] = React.useState<
    number | string | Array<number | string>
  >(0);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
  };

  const onSelectedModel = (model) => {
    setModels([...models, model]);
  };

  const handleSelectedModel = (model, index) => {
    setModelSelected({ selected: model, index });
    setSelectedState(true);
    setValue(model.reSize);
  };

  const { debug, enabled, samples, ...config } = useControls({
    debug: true,
    enabled: true,
    size: { value: 35, min: 0, max: 100, step: 0.1 },
    focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
    samples: { value: 16, min: 1, max: 40, step: 1 },
  });

  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  //Slider input

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const newValueModelSelected = {
      ...modelSelected.selected,
      reSize: newValue,
    };
    const newListModels = models.map((item, index) =>
      index === modelSelected.index ? newValueModelSelected : item
    );
    setModels(newListModels as any);
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValueModelSelected = {
      ...modelSelected.selected,
      reSize: Number(event.target.value),
    };
    const newListModels = models.map((item, index) =>
      index === modelSelected.index ? newValueModelSelected : item
    );
    setModels(newListModels as any);

    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if ((value as number) < 0) {
      setValue(0);
    } else if ((value as number) > 100) {
      setValue(100);
    }
  };

  return (
    <Stack width="100%" height="100%" position="relative">
      <Stack
        display="flex"
        direction="row"
        position="absolute"
        height="100vh"
        left={0}
        zIndex={10}
        sx={{
          backgroundColor: "rgb(5,8,22)",
        }}
      >
        <ToggleButtonGroup
          orientation="vertical"
          value={formats}
          aria-label="text formatting"
          onChange={handleFormat}
          sx={{ width: 60 }}
        >
          {Menus.map((menu, index) => {
            const isActive = formats.find((e) => e == menu.value);
            return (
              <ToggleButton
                value={menu.value}
                aria-label={menu.label}
                sx={{
                  my: menu.marginVertical,
                  color: isActive ? "white" : "rgba(255,255,255,.6)",
                  "&.Mui-selected": {
                    color: "white",
                  },
                }}
              >
                <Tooltip
                  title={isActive ? menu.labelActive : menu.label}
                  arrow
                  placement="right-start"
                  sx={{}}
                >
                  {isActive ? menu.activeIcon : menu.icon}
                </Tooltip>
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>

        {formats.find((e) => e == "Product") && (
          <Stack
            display="flex"
            direction="column"
            width={350}
            height="100vh"
            sx={{ backgroundColor: "white" }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              px={2}
              color="black"
            >
              <Typography fontSize={18} fontWeight="bold">
                Categories
              </Typography>
              <IconButton
                size="medium"
                color="inherit"
                aria-label="close"
                sx={{}}
                onClick={() =>
                  setFormats(formats.filter((e) => e !== "Product"))
                }
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>

            <Search sx={{ py: 2, my: 2 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Stack>
              <ImageList sx={{ width: 300, height: "auto" }} cols={2}>
                {listModels.map((item) => {
                  return (
                    <ImageListItem
                      key={item.preImage}
                      sx={{
                        m: 2,
                        p: 2,
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255,.25)",
                          border: "1px solid rgb(26,115,232)",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => onSelectedModel(item)}
                    >
                      <img
                        src={`${item.preImage}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.preImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        loading="lazy"
                      />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </Stack>
          </Stack>
        )}
      </Stack>
      {selectedState && (
        <Stack
          display="flex"
          direction="column"
          position="absolute"
          border="1px solid #ddd"
          right={0}
          width={350}
          zIndex={10}
          height="100vh"
          sx={{ backgroundColor: "white" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            px={2}
            mt={2}
            color="black"
          >
            <Typography fontSize={20} fontWeight="bold">
              {modelSelected?.selected?.name ?? ""}
            </Typography>
            <IconButton
              size="medium"
              color="inherit"
              aria-label="close"
              sx={{}}
              onClick={() => setSelectedState(false)}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Grid container spacing={2} alignItems="center" sx={{ px: 2, mt: 5 }}>
            <Grid item>
              <Typography
                id="input-slider"
                gutterBottom
                color="black"
                fontWeight="bold"
                fontSize="17px"
                mr={1}
              >
                Scale
              </Typography>
            </Grid>
            <Grid item xs width="80%">
              <Slider
                min={0.1}
                step={0.1}
                max={10}
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                sx={{ color: "#5396ee" }}
              />
            </Grid>
            <Grid item width="50px" color="black">
              <Input
                value={value}
                size="small"
                sx={{ color: "black" }}
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 0.1,
                  min: 0,
                  max: 10,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      )}
      <Canvas shadows style={{ width: "100%", height: "100vh" }} dpr={[1, 2]}>
        {enabled && (
          <SoftShadows
            {...config}
            samples={bad ? Math.min(6, samples) : samples}
          />
        )}
        <color attach="background" args={["#d0d0d0"]} />
        <fog attach="fog" args={["#d0d0d0", 8, 35]} />
        <ambientLight intensity={0.4} />
        <Light />
        <Room scale={0.5} position={[0, 0.8, 0]} />
        {models.map((e, i) => {
          return (
            <Mesh3D
              key={i}
              urlModel={e.urlModel}
              rePosition={e.rePosition}
              scaleSize={e.reSize}
              setIsDragging={setIsDragging}
              onHandleClick={() => handleSelectedModel(e, i)}
              floorPlane={floorPlane}
            />
          );
        })}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.1, 0]}
          receiveShadow
        >
          <planeBufferGeometry
            attach="geometry"
            args={[100, 100]}
            receiveShadow
          />
          <meshPhongMaterial
            attach="material"
            color="#ccc"
            side={THREE.DoubleSide}
            receiveShadow
          />
        </mesh>
        <planeHelper args={[floorPlane, 100, "black"]} />
        <Sphere />
        <Sphere position={[2, 4, -8]} scale={0.9} />
        <Sphere position={[-2, 2, -8]} scale={0.8} />
        {/* <Sky inclination={0.52} /> */}
        <OrbitControls
          minZoom={10}
          maxZoom={50}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
          enabled={!isDragging}
        />
      </Canvas>
    </Stack>
  );
};

export default MyThreeComponent;

function Light() {
  const ref = useRef();
  return (
    <group ref={ref}>
      <directionalLight
        position={[5, 5, -8]}
        castShadow
        intensity={5}
        shadow-mapSize={2048}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
        />
      </directionalLight>
    </group>
  );
}

function Sphere({
  color = "hotpink",
  floatIntensity = 15,
  position = [0, 5, -8],
  scale = 1,
}) {
  return (
    <Float
      floatIntensity={floatIntensity}
      key={undefined}
      attach={undefined}
      args={undefined}
      onUpdate={undefined}
      visible={undefined}
      type={undefined}
      isGroup={undefined}
      id={undefined}
      uuid={undefined}
      name={undefined}
      parent={undefined}
      modelViewMatrix={undefined}
      normalMatrix={undefined}
      matrixWorld={undefined}
      matrixAutoUpdate={undefined}
      matrixWorldAutoUpdate={undefined}
      matrixWorldNeedsUpdate={undefined}
      castShadow={undefined}
      receiveShadow={undefined}
      frustumCulled={undefined}
      renderOrder={undefined}
      animations={undefined}
      userData={undefined}
      customDepthMaterial={undefined}
      customDistanceMaterial={undefined}
      isObject3D={undefined}
      onBeforeRender={undefined}
      onAfterRender={undefined}
      applyMatrix4={undefined}
      applyQuaternion={undefined}
      setRotationFromAxisAngle={undefined}
      setRotationFromEuler={undefined}
      setRotationFromMatrix={undefined}
      setRotationFromQuaternion={undefined}
      rotateOnAxis={undefined}
      rotateOnWorldAxis={undefined}
      rotateX={undefined}
      rotateY={undefined}
      rotateZ={undefined}
      translateOnAxis={undefined}
      translateX={undefined}
      translateY={undefined}
      translateZ={undefined}
      localToWorld={undefined}
      worldToLocal={undefined}
      lookAt={undefined}
      add={undefined}
      remove={undefined}
      removeFromParent={undefined}
      clear={undefined}
      getObjectById={undefined}
      getObjectByName={undefined}
      getObjectByProperty={undefined}
      getObjectsByProperty={undefined}
      getWorldPosition={undefined}
      getWorldQuaternion={undefined}
      getWorldScale={undefined}
      getWorldDirection={undefined}
      raycast={undefined}
      traverse={undefined}
      traverseVisible={undefined}
      traverseAncestors={undefined}
      updateMatrix={undefined}
      updateMatrixWorld={undefined}
      updateWorldMatrix={undefined}
      toJSON={undefined}
      clone={undefined}
      copy={undefined}
      addEventListener={undefined}
      hasEventListener={undefined}
      removeEventListener={undefined}
      dispatchEvent={undefined}
    >
      <mesh castShadow position={position} scale={scale}>
        <sphereGeometry />
        <meshBasicMaterial color={color} roughness={1} />
      </mesh>
    </Float>
  );
}

export const listModels = [
  {
    name: "Bitcoin",
    urlModel: "/bitcoin.glb",
    reSize: 0.01,
    rePosition: [0, 0, 0],
    preImage:
      "https://th.bing.com/th/id/R.9a3c543fafe8f20af40857e36273e97e?rik=cR1E1zhpgA8R4Q&pid=ImgRaw&r=0",
  },
  {
    name: "Table",
    urlModel: "/table.glb",
    reSize: 0.3,
    rePosition: [0, 0, 0],
    preImage:
      "https://a.1stdibscdn.com/archivesE/upload/9304/02_13/Chapo_tafel_130_diameter_foto10/XXX_Chapo_tafel_130_diameter_foto1.jpg",
  },
  {
    name: "Chair",
    urlModel: "/chair2.glb",
    reSize: 1,
    rePosition: [0, 0, 0],
    preImage:
      "https://i.pinimg.com/originals/29/c5/ca/29c5ca5cbb072d9916b3272fb6019b6f.jpg",
  },
  {
    name: "Table 2",
    urlModel: "/table1.glb",
    reSize: 5,
    rePosition: [0, 0, 0],
    preImage:
      "https://w7.pngwing.com/pngs/174/738/png-transparent-table-desk-office-ikea-glass-table-glass-angle-kitchen-thumbnail.png",
  },
];
const Menus = [
  {
    value: "View",
    label: "Show 2D Floor Planner",
    labelActive: "Show 3D Floor Planner",
    marginVertical: 3,
    icon: <GridViewOutlinedIcon />,
    activeIcon: <ViewInArOutlinedIcon />,
  },
  {
    value: "Lock",
    label: "Lock Screen",
    labelActive: "Unlock Screen",
    marginVertical: 3,
    icon: <LockOutlinedIcon />,
    activeIcon: <LockOpenOutlinedIcon />,
  },
  {
    value: "Product",
    label: "Add Product",
    labelActive: "Add Product",
    marginVertical: 3,
    icon: <AddShoppingCartIcon />,
    activeIcon: <ShoppingCartCheckoutIcon />,
  },
  {
    value: "Import",
    label: "Import from set configurator",
    labelActive: "Import from set configurator",
    marginVertical: 3,
    icon: <InputIcon />,
    activeIcon: <InputIcon />,
  },
  {
    value: "Save",
    label: "Save",
    labelActive: "Save",
    marginVertical: 3,
    icon: <SaveIcon />,
    activeIcon: <SaveIcon />,
  },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  border: "1px solid rgba(0, 0, 0,.2)",
  borderRadius: "5px",
  backgroundColor: "rgba(255, 255, 255,.15)",
  marginLeft: 0,
  width: "100%",
  color: "black",
  height: 10,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255,.25)",
    border: "1px solid rgb(26,115,232)",
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  marginRight: theme.spacing(2),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "gray",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
