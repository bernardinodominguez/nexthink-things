import React, { useState } from "react"; // import azureImg
import {
  Box,
  Flex,
  Grid,
  SortDescriptor,
  SummaryBanner,
  toast,
} from "@nexthink/apollo-components";
import { apolloSpaceInline2X } from "@nexthink/apollo-components/lib/tokens";
import Text from "@nexthink/apollo-components/lib/components/text";

const MAX_NUMBER_DEVICES = 3;

// Function to generate unique device names
const generateDevices = (count: number): string[] => {
  const devices: string[] = [];
  const generateRandomSuffix = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from(
      { length: 10 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  for (let i = 0; i < count; i++) {
    devices.push(`NXT-${generateRandomSuffix()}`);
  }

  return devices;
};

export interface DeviceProphecyItem {
  names: string[];
  failureDetails: string;
  raSuggested: string;
}

const deviceProphecyItems: DeviceProphecyItem[] = [
  {
    names: generateDevices(300), // Dynamic generation of devices
    failureDetails:
      "Windows 10 Version 1809 is installed, but the device has drivers designed for Windows 11, leading to incompatibilities.",
    raSuggested:
      "This script checks if the operating system version installed is compatible with the device’s drivers. It compares the OS version against known compatibility lists for hardware drivers",
  },
  {
    names: generateDevices(200),
    failureDetails:
      "An NVIDIA GeForce GTX 1080 Ti has an outdated driver version 452.06 which causes graphical glitches in games or crashes in video editing software.",
    raSuggested:
      "This script checks the installed GPU driver version against the latest available driver from the manufacturer and ensures there are no driver corruption issues. If outdated, it updates or reinstalls the GPU driver.",
  },
  {
    names: generateDevices(100),
    failureDetails:
      "Windows 11 (22H2) is installed but the system is using an outdated printer driver from 2019, which is causing crashes in printing applications",
    raSuggested:
      "This script compares the device's drivers against the latest operating system updates and identifies any conflicts or incompatibilities that could cause system instability. It also downloads the latest compatible drivers.",
  },
  {
    names: generateDevices(4),
    failureDetails:
      "Seagate Barracuda 2TB HDD starts throwing I/O errors or shows significant performance degradation, leading to slow system startup and file access.",
    raSuggested:
      "This Remote Action performs SMART (Self-Monitoring, Analysis, and Reporting Technology) checks on the hard disk and identifies any potential health issues such as read/write errors or bad sectors that could lead to crashes",
  },
  {
    names: generateDevices(2),
    failureDetails:
      "The system has mismatched RAM sticks 8GB DDR4 2133MHz and 16GB DDR4 2666MHz causing memory errors or instability.",
    raSuggested:
      "This script analyzes the memory configuration, including the total amount of installed RAM, the speed of each module, and whether mismatched RAM sticks are installed, which could lead to system instability or poor performance",
  },
];

const DeviceProphecyV3 = () => {
  const [collapsedStates, setCollapsedStates] = useState(
    deviceProphecyItems.map((item) => item.names.length > MAX_NUMBER_DEVICES)
  );

  const toggleCollapse = (index: number) => {
    setCollapsedStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const handleRunActionClick = (scriptName: string) => {
    toast.open({
      severity: "ok",
      duration: 3000,
      message: `Remote action "${scriptName}" launched successfully`,
    });
  };

  const handleAutomateActionClick = (scriptName: string) => {
    toast.open({
      severity: "ok",
      duration: 3000,
      message: `Automation "${scriptName}" created successfully`,
    });
  };

  const [active, setActive] = useState<string | string[] | undefined>("none");

  const [sort, setSort] = useState<SortDescriptor>({
    field: "names.length",
    dir: "desc",
  });
  // const [collapsed, setCollapsed] = useState<boolean>(true);
  // const contentLarge =
  //   deviceProphecyItems.map((item, index) => ({
  //     item.names.slice(0, MAX_NUMBER_DEVICES).map((name: {} | null | undefined) => (
  //         <div key={name} style={{marginBottom: "8px"}}>
  //           <label>
  //             <input type="checkbox"/>
  //             <a href="foo">{name}</a>
  //           </label>
  //         </div>
  //     ))
  //   });
  //
  // const contentSmall = <Text>
  //   Sollicitudin in aliquam leo integer. Porta odio neque nunc, nibh proin. Tristique vitae
  //   ullamcorper arcu
  //   habitant sit.
  // </Text>;

  const title = <Text variant={"displaySmall"}>Failure Prophecy</Text>;
  const additionalContent = (
    failureDetails: string,
    actionSuggested: string
  ): JSX.Element => (
    <>
      {/*<Text variant={"body"}>*/}
      {/*  {failureDetails}*/}
      {/*</Text>*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<Text variant={"displaySmall"}>Recommended Actions</Text>*/}
      {/*<br />*/}
      <Text variant={"bodyEmphasis"}>{actionSuggested}</Text>
    </>
  );
  // const theme = useContext(ThemeContext);
  return (
    <Flex flexDirection={"column"}>
      <Grid gridTemplateColumns="repeat(3,auto)" gap={"12px"}>
        {deviceProphecyItems.map((item) => (
          <Box mt={apolloSpaceInline2X}>
            <SummaryBanner
              title={`👁️‍🗨️ ${item.failureDetails}`}
              scores={[
                {
                  value: item.names.length,
                  type: "DEVICES_WITH_ISSUES",
                  // ratio: 100,
                },
              ]}
              additionalContent={additionalContent(
                item.failureDetails,
                item.raSuggested
              )}
            />
          </Box>
        ))}
      </Grid>
    </Flex>
  );
};

export default DeviceProphecyV3;
