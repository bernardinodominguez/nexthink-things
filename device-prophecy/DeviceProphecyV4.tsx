import React, { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  SortDescriptor,
  toast,
} from "@nexthink/apollo-components";
import Text from "@nexthink/apollo-components/lib/components/text";
import Spinner from "@nexthink/apollo-components/lib/components/loader/Spinner";

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
  scriptName: string;
  failureDetails: string;
  raSuggested: string;
}

const deviceProphecyItems: DeviceProphecyItem[] = [
  {
    names: generateDevices(300), // Dynamic generation of devices
    scriptName: "CheckOSCompatibility.ps1",
    failureDetails:
      "Windows 10 Version 1809 is installed, but the device has drivers designed for Windows 11, leading to incompatibilities.",
    raSuggested:
      "This script checks if the operating system version installed is compatible with the device’s drivers. It compares the OS version against known compatibility lists for hardware drivers",
  },
  {
    names: generateDevices(200),
    scriptName: "",
    failureDetails:
      "An NVIDIA GeForce GTX 1080 Ti has an outdated driver version 452.06 which causes graphical glitches in games or crashes in video editing software.",
    raSuggested:
      "This script checks the installed GPU driver version against the latest available driver from the manufacturer and ensures there are no driver corruption issues. If outdated, it updates or reinstalls the GPU driver.",
  },
  {
    names: generateDevices(100),
    scriptName: "",
    failureDetails:
      "Windows 11 (22H2) is installed but the system is using an outdated printer driver from 2019, which is causing crashes in printing applications",
    raSuggested:
      "This script compares the device's drivers against the latest operating system updates and identifies any conflicts or incompatibilities that could cause system instability. It also downloads the latest compatible drivers.",
  },
  {
    names: generateDevices(4),
    scriptName: "",
    failureDetails:
      "Seagate Barracuda 2TB HDD starts throwing I/O errors or shows significant performance degradation, leading to slow system startup and file access.",
    raSuggested:
      "This Remote Action performs SMART (Self-Monitoring, Analysis, and Reporting Technology) checks on the hard disk and identifies any potential health issues such as read/write errors or bad sectors that could lead to crashes",
  },
  {
    names: generateDevices(2),
    scriptName: "",
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

  const [spinner, setSpinner] = useState<boolean>(false);

  const handleRunActionClick = (scriptName: string) => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
      toast.open({
        severity: "ok",
        duration: 3000,
        message: `Remote action "${scriptName}" launched successfully`,
      });
    }, 2000);
  };

  const handleAutomateActionClick = (scriptName: string) => {
    setSpinner(true);
    setTimeout(() => {
      toast.open({
        severity: "ok",
        duration: 3000,
        message: `Automation "${scriptName}" created successfully`,
      });
    }, 2000);
  };

  const handleCampaignActionClick = (scriptName: string) => {
    setSpinner(true);
    setTimeout(() => {
      toast.open({
        severity: "ok",
        duration: 3000,
        message: `Campaign "${scriptName}" created successfully`,
      });
    }, 2000);
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
  // @ts-ignore
  return (
    <>
      <Flex flexDirection={"column"}>
        {spinner && (
          <Box display="inherit">
            <Spinner size="body" />
          </Box>
        )}
        <Grid gridTemplateColumns="repeat(3,auto)" gap={"12px"}>
          {deviceProphecyItems.map((item) => (
            <div className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj gxCsXz">
              <div className="StyledContainer_APC-7290-NXT_TEAM_NAME-sc-2kzew6 edSrbR">
                <div
                  id="nx-summary-banner-525"
                  className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj StyledFlex_APC-7290-NXT_TEAM_NAME-sc-1k5rrh3 dwHpDi"
                >
                  <div className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj StyledFlex_APC-7290-NXT_TEAM_NAME-sc-1k5rrh3 hJbFAC">
                    <div
                      id="nx-summary-banner-525-title"
                      className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj dWtCKl"
                    >
                      <span className="StyledText_APC-7290-NXT_TEAM_NAME-sc-wm6i6k ixpaCC">
                        👁️‍🗨️ {item.failureDetails}
                      </span>
                    </div>
                    <div
                      id="nx-summary-banner-525_additional-content"
                      className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj gxCsXz"
                    >
                      <span className="StyledText_APC-7290-NXT_TEAM_NAME-sc-wm6i6k isRwkB">
                        {item.raSuggested}
                      </span>
                    </div>
                  </div>
                  <div className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj StyledFlex_APC-7290-NXT_TEAM_NAME-sc-1k5rrh3 kkFSri">
                    <div className="StyledSeparator_APC-7290-NXT_TEAM_NAME-sc-xgaio8 kglrEP"></div>
                    <div className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj fIbZpU">
                      <div
                        id="nx-summary-banner-525_score-devices-with-issues"
                        className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj StyledFlex_APC-7290-NXT_TEAM_NAME-sc-1k5rrh3 hfZq StyledContainer_APC-7290-NXT_TEAM_NAME-sc-17a1g9g hmedZi"
                      >
                        <div
                          id="nx-summary-banner-525_score-devices-with-issues-donut"
                          className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj StyledFlex_APC-7290-NXT_TEAM_NAME-sc-1k5rrh3 hfZq StyledCircle_APC-7290-NXT_TEAM_NAME-sc-1l8i830 kcFThF"
                        >
                          <svg width="64" height="68">
                            <svg viewBox="0 0 100 100" width="64" height="68">
                              <circle
                                cx="50"
                                cy="50"
                                r="50"
                                fill="#ffffff"
                              ></circle>
                            </svg>
                          </svg>
                          <div className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj StyledFlex_APC-7290-NXT_TEAM_NAME-sc-1k5rrh3 jKLllh">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="none"
                            >
                              <path
                                fill="#D9EAF5"
                                d="M3 21V7a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2v14"
                              ></path>
                              <path
                                stroke="#58627D"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 21V7a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2v14"
                              ></path>
                              <circle
                                cx="16"
                                cy="19.688"
                                r="3.688"
                                fill="#D9EAF5"
                              ></circle>
                              <path
                                stroke="#58627D"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19.445 21a3.969 3.969 0 0 1-6.89 0H1v2a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4v-2H19.445ZM6 24h2"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj StyledFlex_APC-7290-NXT_TEAM_NAME-sc-1k5rrh3 hfZq StyledKpiInformation_APC-7290-NXT_TEAM_NAME-sc-q8c83l iHoAeF">
                          <div className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj StyledFlex_APC-7290-NXT_TEAM_NAME-sc-1k5rrh3 iXnGSK">
                            <div className="StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj StyledFlex_APC-7290-NXT_TEAM_NAME-sc-1k5rrh3 eIRueE">
                              <span
                                title="300"
                                id="nx-summary-banner-525_score-devices-with-issues-value"
                                className="StyledText_APC-7290-NXT_TEAM_NAME-sc-wm6i6k fkCQZQ"
                              >
                                {item.names.length}
                              </span>
                            </div>
                          </div>

                          <span
                            id="nx-summary-banner-525_score-devices-with-issues-title"
                            role="none"
                            className="StyledText_APC-7290-NXT_TEAM_NAME-sc-wm6i6k gQDqak StyledTitle_APC-7290-NXT_TEAM_NAME-sc-1cec1os giuqbv"
                          >
                            Devices with issues
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="buttons-container">
                <button onClick={() => handleRunActionClick(item.raSuggested)}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#ffffff"
                    aria-hidden="true"
                    className="MenuIconBase-style__StyledMenuIcon-productShell__sc-d4d03199-2 hovNCj"
                  >
                    <title>Remote Actions</title>
                    <g id="icon-inactive">
                      <path
                        d="M12.6722 0.0809496C12.2561 0.128693 11.8179 0.186089 11.6984 0.208497C10.8634 0.365063 10.07 0.730541 9.38882 1.27245C9.26736 1.36906 8.60768 2.01616 7.28803 3.33317L5.36429 5.25304L5.17155 5.18793C4.39625 4.92608 3.99874 4.85482 3.40957 4.87208C2.92703 4.88621 2.54374 4.95699 2.08979 5.1158C1.4604 5.33598 0.967506 5.65286 0.445468 6.17289C0.223165 6.39433 0.153893 6.50287 0.0927808 6.7254C0.00725256 7.03677 0.107701 7.40324 0.341125 7.63165C0.474246 7.7619 0.510475 7.78831 0.628692 7.84127C0.684284 7.86617 1.21503 8.04755 1.80813 8.24437L2.88648 8.60219L4.13768 9.85094L5.38888 11.0997L5.76758 12.234C6.17967 13.4683 6.18473 13.4804 6.36357 13.6563C6.71285 13.9999 7.25821 14.0247 7.64836 13.7148C7.77369 13.6153 8.0587 13.3149 8.22144 13.1109C8.34711 12.9533 8.53036 12.675 8.62923 12.4916C8.98995 11.8223 9.18687 10.9034 9.12386 10.1832C9.08583 9.74843 9.03962 9.53485 8.87054 9.01242L8.74674 8.62986L10.6863 6.68797C12.7298 4.64194 12.7526 4.61773 13.0306 4.19328C13.4253 3.59072 13.6978 2.89567 13.8134 2.19642C13.8564 1.93649 14 0.626302 14 0.494074C14 0.393069 13.9923 0.353562 13.9602 0.289346C13.8724 0.114055 13.7209 0.0110713 13.5351 0.000293586C13.4706 -0.00342232 13.1301 0.0283961 12.6722 0.0809496ZM12.471 1.11981C12.6879 1.09455 12.8802 1.07311 12.8984 1.07215L12.9316 1.07039L12.8877 1.46272C12.829 1.98845 12.8164 2.0692 12.7504 2.3412C12.6085 2.92609 12.3191 3.50802 11.9346 3.98199C11.8484 4.08814 10.6892 5.25815 8.81465 7.13087L5.83178 10.1108L4.85807 9.13749L3.88437 8.16413L6.9102 5.14293C10.0067 2.05117 10.0373 2.02165 10.3742 1.804C10.6403 1.63214 10.9849 1.46507 11.2912 1.35951C11.6537 1.2346 11.88 1.18861 12.471 1.11981ZM3.19415 5.89664C3.36495 5.87708 3.81646 5.88947 4.00508 5.91889C4.15317 5.94199 4.53429 6.03375 4.55084 6.05027C4.55531 6.05475 4.21524 6.40199 3.7951 6.82189L3.03122 7.58535L2.08974 7.2717C1.5719 7.0992 1.13737 6.95373 1.12409 6.94845C1.07584 6.92929 1.49477 6.5671 1.76998 6.39005C2.17514 6.12941 2.67546 5.95607 3.19415 5.89664ZM2.59677 9.2606C2.31888 9.29597 2.00535 9.41425 1.76274 9.57524C1.34419 9.85298 1.06424 10.3151 0.651096 11.4102C0.401996 12.0705 0.0197101 13.2768 0.00218274 13.4579C-0.0288965 13.7789 0.277067 14.0554 0.591465 13.9905C0.723121 13.9633 1.36183 13.7685 1.81617 13.617C2.83807 13.2763 3.5399 12.9781 3.9407 12.7144C4.44088 12.3854 4.76463 11.7625 4.74222 11.1725C4.73487 10.9789 4.71097 10.9171 4.60165 10.8091C4.4929 10.7017 4.40555 10.6657 4.25455 10.6662C4.09735 10.6667 3.99288 10.7079 3.8962 10.8075C3.79494 10.9118 3.76043 10.9933 3.74608 11.1622C3.72913 11.3616 3.70838 11.4449 3.64412 11.5716C3.52017 11.816 3.35476 11.933 2.78187 12.1819C2.41691 12.3404 1.29228 12.7455 1.27237 12.7256C1.26343 12.7166 1.45627 12.1429 1.58629 11.7918C1.71263 11.4506 1.8829 11.0522 1.99874 10.8269C2.18845 10.4578 2.38749 10.3109 2.77379 10.2548C2.97674 10.2253 3.10302 10.1422 3.19303 9.97897C3.23482 9.90314 3.24001 9.87843 3.23949 9.75692C3.23883 9.59675 3.20434 9.50852 3.10058 9.40166C2.98085 9.27835 2.81716 9.23252 2.59677 9.2606ZM7.17643 10.2105C7.59654 9.79464 7.94551 9.45926 7.95191 9.46526C7.97256 9.48458 8.06001 9.85691 8.08471 10.0307C8.11697 10.2576 8.1164 10.7051 8.08358 10.9267C7.9986 11.5004 7.78459 12.0156 7.45006 12.4518C7.33836 12.5975 7.08388 12.8776 7.06327 12.8776C7.05575 12.8776 6.90626 12.4477 6.73108 11.9222L6.41257 10.9667L7.17643 10.2105Z"
                        fill="#272D36"
                      />
                    </g>
                    <g id="icon-active">
                      <path
                        d="M12.3811 0.370077C11.2519 0.500171 10.2027 1.00053 9.40325 1.80111L5.34619 5.86406L4.5068 5.58386C3.80731 5.35369 3.04786 5.31366 2.32838 5.48379C1.6089 5.65391 0.94938 6.02418 0.419764 6.54455L0.269872 6.69466C0.209916 6.75471 0.169945 6.82476 0.139967 6.91482C0.119981 6.99488 0.109988 7.08495 0.139967 7.165C0.159952 7.24506 0.199923 7.32512 0.25988 7.38516C0.319836 7.44521 0.389785 7.49524 0.469727 7.52527L2.87798 8.33585L5.70593 11.1679L6.51534 13.5797C6.54532 13.6597 6.58529 13.7298 6.65524 13.7898C6.72519 13.8499 6.79514 13.8899 6.87508 13.9099C6.95502 13.9299 7.04496 13.9299 7.1249 13.9099C7.20484 13.8899 7.28479 13.8398 7.34474 13.7798L7.50463 13.6297C8.03424 13.0993 8.39398 12.4388 8.56386 11.7183C8.73373 10.9978 8.70376 10.2372 8.46393 9.53673L8.18413 8.69611L12.2412 4.63317C13.0406 3.83259 13.5502 2.78183 13.6702 1.65101L13.83 0.209961L12.3911 0.370077H12.3811Z"
                        fill="#272D36"
                      />
                      <path
                        d="M4.00716 11.5282C4.00716 11.7283 3.96719 11.9185 3.89724 12.0986C3.8173 12.2787 3.70738 12.4488 3.56748 12.5889C2.97791 13.1794 0.0400391 14 0.0400391 14C0.0400391 14 0.869438 11.0478 1.44902 10.4674C1.70883 10.2072 2.04858 10.0571 2.40832 10.0271L4.00716 11.5282Z"
                        fill="#272D36"
                      />
                    </g>
                  </svg>
                  &nbsp; Remote Action
                </button>
                <button
                  onClick={() => handleAutomateActionClick(item.raSuggested)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#ffffff"
                    aria-hidden="true"
                    className="MenuIconBase-style__StyledMenuIcon-productShell__sc-d4d03199-2 hovNCj"
                  >
                    <title>Automate</title>
                    <g id="icon-inactive">
                      <path
                        d="M7.92 0.482486C7.55606 0.520342 7.15438 0.68791 6.87253 0.919478C6.80786 0.972614 5.5497 2.16148 4.07662 3.5614C2.60354 4.96133 1.34469 6.15036 1.27915 6.20369C0.798848 6.59458 0.538912 7.0678 0.479824 7.65887C0.39696 8.48761 0.856496 9.31461 1.608 9.68917C1.6696 9.71988 1.7864 9.76818 1.86755 9.79653C2.01163 9.84687 2.05939 9.87993 3.8955 11.2001L5.77592 12.5521L5.77595 13.5398L5.776 14.5276L3.388 14.5318L1 14.5361L0.908576 14.581C0.7392 14.6642 0.624 14.8468 0.624 15.0321C0.624 15.2174 0.7392 15.4 0.908576 15.4832L1 15.5281H8H15L15.0758 15.4931C15.1174 15.4738 15.1866 15.423 15.2295 15.3801C15.4707 15.1389 15.4005 14.7328 15.0914 14.581L15 14.5361L12.764 14.5318L10.528 14.5275L10.5277 13.0358C10.5274 11.4797 10.525 11.4163 10.4571 11.1558C10.3385 10.7008 10.072 10.27 9.72 9.96437C9.35203 9.64489 8.93053 9.45677 8.43555 9.39111C8.15472 9.35386 7.72877 9.39247 7.44866 9.48058L7.36568 9.50668L6.00138 8.49495L4.63707 7.48322L4.79453 7.32785C4.91406 7.20993 6.82949 5.34687 7.56178 4.63629L7.65955 4.54141L7.83378 4.56877C7.96573 4.58949 8.06235 4.59394 8.232 4.58705C8.55546 4.57393 8.78469 4.51719 9.06755 4.38023L9.1991 4.31655L9.61155 4.737C9.8384 4.96826 10.0228 5.16885 10.0214 5.18277C10.0199 5.19669 9.99344 5.26929 9.96251 5.34409C9.87741 5.54981 9.85085 5.69823 9.85085 5.96809C9.85085 6.24001 9.87598 6.37756 9.9695 6.61754C10.0362 6.78873 10.1489 6.97381 10.2791 7.12621C10.3687 7.23113 10.576 7.40271 10.6975 7.47269L10.7791 7.51962L10.7891 7.69388C10.8215 8.26169 11.0636 8.79287 11.4794 9.20873C11.7532 9.48258 12.0606 9.6709 12.432 9.79223C12.7191 9.88601 13.1384 9.93213 13.2988 9.88756C13.3913 9.86188 13.5059 9.77575 13.57 9.6837C13.7058 9.48853 13.676 9.21113 13.5014 9.04548C13.4032 8.95236 13.3262 8.92474 13.0996 8.90129C12.8588 8.87634 12.7479 8.85042 12.6021 8.78505C12.2104 8.60927 11.9309 8.27521 11.8259 7.85703C11.7894 7.71177 11.7935 7.69682 11.8697 7.69633C11.96 7.69575 12.1902 7.62271 12.3709 7.53733C12.8432 7.31418 13.2289 6.80437 13.3136 6.29145C13.3352 6.16087 13.3297 6.16377 13.485 6.20036C13.9692 6.31452 14.3746 6.72396 14.49 7.2154C14.5033 7.27221 14.5206 7.39754 14.5285 7.49391C14.5455 7.7038 14.5878 7.80553 14.6985 7.90298C14.9489 8.12337 15.3362 8.04661 15.4831 7.74751C15.5254 7.6614 15.5278 7.64493 15.5252 7.46409C15.5166 6.86097 15.2732 6.29505 14.8331 5.855C14.4144 5.43636 13.8916 5.19842 13.3031 5.15877L13.1422 5.14794L13.0763 5.04201C12.848 4.67514 12.4694 4.39551 12.04 4.27673C11.8923 4.23586 11.8578 4.23249 11.592 4.23273C11.346 4.23295 11.2854 4.23809 11.176 4.26801C11.0382 4.3057 10.8923 4.36018 10.7957 4.40997L10.7355 4.44106L10.3633 4.06458C10.1586 3.85751 9.97488 3.66933 9.95498 3.64642L9.9188 3.60476L9.98248 3.48642C10.3064 2.88434 10.2911 2.09769 9.94382 1.50405C9.65677 1.0133 9.19075 0.66191 8.65168 0.529702C8.40691 0.46967 8.18242 0.45519 7.92 0.482486ZM7.92 1.49591C8.07605 1.46081 8.32654 1.4742 8.48925 1.52633C8.80459 1.62737 9.07021 1.89929 9.17083 2.22409C9.21912 2.38001 9.22262 2.67522 9.17795 2.82409C9.06986 3.18417 8.76456 3.47631 8.408 3.56085C8.28181 3.59077 8.01523 3.59047 7.8993 3.56028C7.6011 3.4826 7.34149 3.27236 7.20757 3.00009C7.12872 2.8398 7.10285 2.72308 7.10288 2.52809C7.10294 2.21815 7.19298 2.00337 7.41547 1.78233C7.56283 1.63593 7.73694 1.53708 7.92 1.49591ZM4.62648 4.42751C5.79579 3.31703 6.13835 3.00002 6.14645 3.021C6.15221 3.03589 6.17651 3.10929 6.20046 3.18409C6.28358 3.44364 6.46517 3.74743 6.65502 3.94457C6.72776 4.02007 6.73757 4.03708 6.71853 4.05458C6.70614 4.06597 6.12549 4.63076 5.42819 5.30969C4.7309 5.9886 4.15418 6.54409 4.14659 6.54409C4.13901 6.54409 4.09576 6.50151 4.0505 6.44946C3.86042 6.23093 3.56098 6.02969 3.25048 5.91178L3.11696 5.86109L4.62648 4.42751ZM11.456 5.2341C11.5784 5.21425 11.5944 5.21417 11.712 5.23292C12.0744 5.29071 12.336 5.59876 12.336 5.96783C12.336 6.26324 12.1749 6.51943 11.9116 6.64263C11.6193 6.7794 11.294 6.72151 11.0653 6.49204C10.83 6.25591 10.7804 5.92209 10.9355 5.61695C11.0291 5.43257 11.2545 5.26677 11.456 5.2341ZM2.336 6.80033C2.43781 6.77919 2.72762 6.79348 2.832 6.82479C2.99755 6.87442 3.13666 6.95997 3.27254 7.09569C3.44406 7.26703 3.51669 7.39801 3.56946 7.63129C3.59334 7.73687 3.58827 7.99449 3.56016 8.10409C3.4851 8.39653 3.27162 8.65892 3 8.79252C2.8477 8.86743 2.72293 8.89674 2.552 8.8978C2.23203 8.89973 2.01069 8.81097 1.79074 8.59245C1.68098 8.48341 1.64003 8.42884 1.58643 8.32009C1.49795 8.14058 1.4664 7.98817 1.47717 7.79209C1.49456 7.47522 1.57379 7.31837 1.83981 7.07423C2.00682 6.92093 2.04318 6.89529 2.14664 6.8578C2.21118 6.83441 2.2964 6.80855 2.336 6.80033ZM4.38046 8.75362L4.456 8.60009L5.016 9.01476C5.324 9.24284 5.77582 9.57735 6.02006 9.75815L6.46414 10.0868L6.39453 10.1595C6.14064 10.4243 5.91002 10.8693 5.83658 11.2361L5.81494 11.3441L4.65322 10.509L3.49149 9.67391L3.60174 9.60593C3.94083 9.39687 4.20765 9.10484 4.38046 8.75362ZM7.8892 10.4005C8.01589 10.374 8.40886 10.3922 8.54126 10.4308C8.9761 10.5574 9.33528 10.9125 9.46992 11.349C9.5284 11.5386 9.53597 11.7466 9.53598 13.1641L9.536 14.5281H8.15946H6.78291L6.78816 13.0201C6.7941 11.3122 6.78517 11.4318 6.92824 11.1441C7.11626 10.7659 7.47678 10.4869 7.8892 10.4005Z"
                        fill="#272D36"
                      />
                    </g>
                    <g id="icon-active">
                      <path
                        d="M7.92 0.482486C7.55606 0.520342 7.15438 0.68791 6.87253 0.919478C6.80786 0.972614 5.5497 2.16148 4.07662 3.5614C2.60354 4.96133 1.34469 6.15036 1.27915 6.20369C0.798848 6.59458 0.538912 7.0678 0.479824 7.65887C0.39696 8.48761 0.856496 9.31461 1.608 9.68917C1.6696 9.71988 1.7864 9.76818 1.86755 9.79653C2.01163 9.84687 2.05939 9.87993 3.8955 11.2001L5.77592 12.5521L5.77595 13.5398L5.776 14.5276L3.388 14.5318L1 14.5361L0.908576 14.581C0.7392 14.6642 0.624 14.8468 0.624 15.0321C0.624 15.2174 0.7392 15.4 0.908576 15.4832L1 15.5281H8H15L15.0758 15.4931C15.1174 15.4738 15.1866 15.423 15.2295 15.3801C15.4707 15.1389 15.4005 14.7328 15.0914 14.581L15 14.5361L12.764 14.5318L10.528 14.5275L10.5277 13.0358C10.5274 11.4797 10.525 11.4163 10.4571 11.1558C10.3385 10.7008 10.072 10.27 9.72 9.96437C9.35203 9.64489 8.93053 9.45677 8.43555 9.39111C8.15472 9.35386 7.72877 9.39247 7.44866 9.48058L7.36568 9.50668L6.00138 8.49495L4.63707 7.48322L4.79453 7.32785C4.91406 7.20993 6.82949 5.34687 7.56178 4.63629L7.65955 4.54141L7.83378 4.56877C7.96573 4.58949 8.06235 4.59394 8.232 4.58705C8.55546 4.57393 8.78469 4.51719 9.06755 4.38023L9.1991 4.31655L9.61155 4.737C9.8384 4.96826 10.0228 5.16885 10.0214 5.18277C10.0199 5.19669 9.99344 5.26929 9.96251 5.34409C9.87741 5.54981 9.85085 5.69823 9.85085 5.96809C9.85085 6.24001 9.87598 6.37756 9.9695 6.61754C10.0362 6.78873 10.1489 6.97381 10.2791 7.12621C10.3687 7.23113 10.576 7.40271 10.6975 7.47269L10.7791 7.51962L10.7891 7.69388C10.8215 8.26169 11.0636 8.79287 11.4794 9.20873C11.7532 9.48258 12.0606 9.6709 12.432 9.79223C12.7191 9.88601 13.1384 9.93213 13.2988 9.88756C13.3913 9.86188 13.5059 9.77575 13.57 9.6837C13.7058 9.48853 13.676 9.21113 13.5014 9.04548C13.4032 8.95236 13.3262 8.92474 13.0996 8.90129C12.8588 8.87634 12.7479 8.85042 12.6021 8.78505C12.2104 8.60927 11.9309 8.27521 11.8259 7.85703C11.7894 7.71177 11.7935 7.69682 11.8697 7.69633C11.96 7.69575 12.1902 7.62271 12.3709 7.53733C12.8432 7.31418 13.2289 6.80437 13.3136 6.29145C13.3352 6.16087 13.3297 6.16377 13.485 6.20036C13.9692 6.31452 14.3746 6.72396 14.49 7.2154C14.5033 7.27221 14.5206 7.39754 14.5285 7.49391C14.5455 7.7038 14.5878 7.80553 14.6985 7.90298C14.9489 8.12337 15.3362 8.04661 15.4831 7.74751C15.5254 7.6614 15.5278 7.64493 15.5252 7.46409C15.5166 6.86097 15.2732 6.29505 14.8331 5.855C14.4144 5.43636 13.8916 5.19842 13.3031 5.15877L13.1422 5.14794L13.0763 5.04201C12.848 4.67514 12.4694 4.39551 12.04 4.27673C11.8923 4.23586 11.8578 4.23249 11.592 4.23273C11.346 4.23295 11.2854 4.23809 11.176 4.26801C11.0382 4.3057 10.8923 4.36018 10.7957 4.40997L10.7355 4.44106L10.3633 4.06458C10.1586 3.85751 9.97488 3.66933 9.95498 3.64642L9.9188 3.60476L9.98248 3.48642C10.3064 2.88434 10.2911 2.09769 9.94382 1.50405C9.65677 1.0133 9.19075 0.66191 8.65168 0.529702C8.40691 0.46967 8.18242 0.45519 7.92 0.482486ZM7.92 1.49591C8.07605 1.46081 8.32654 1.4742 8.48925 1.52633C8.80459 1.62737 9.07021 1.89929 9.17083 2.22409C9.21912 2.38001 9.22262 2.67522 9.17795 2.82409C9.06986 3.18417 8.76456 3.47631 8.408 3.56085C8.28181 3.59077 8.01523 3.59047 7.8993 3.56028C7.6011 3.4826 7.34149 3.27236 7.20757 3.00009C7.12872 2.8398 7.10285 2.72308 7.10288 2.52809C7.10294 2.21815 7.19298 2.00337 7.41547 1.78233C7.56283 1.63593 7.73694 1.53708 7.92 1.49591ZM7.8892 10.4005C8.01589 10.374 8.40886 10.3922 8.54126 10.4308C8.9761 10.5574 9.33528 10.9125 9.46992 11.349C9.5284 11.5386 9.53597 11.7466 9.53598 13.1641L9.536 14.5281H8.15946H6.78291L6.78816 13.0201C6.7941 11.3122 6.78517 11.4318 6.92824 11.1441C7.11626 10.7659 7.47678 10.4869 7.8892 10.4005Z"
                        fill="#272D36"
                      />
                    </g>
                  </svg>
                  &nbsp; Automate
                </button>
                <button
                  onClick={() => handleCampaignActionClick(item.raSuggested)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#ffffff"
                    aria-hidden="true"
                    className="MenuIconBase-style__StyledMenuIcon-productShell__sc-d4d03199-2 hovNCj"
                  >
                    <title>Campaigns</title>
                    <g id="icon-inactive">
                      <path
                        d="M1.70392 0.481539C1.5837 0.498883 1.35879 0.567875 1.26392 0.616531C1.05071 0.725859 0.84594 0.910963 0.704148 1.12256C0.605572 1.26968 0.561956 1.3697 0.506388 1.57608L0.471924 1.70408V4.24008C0.471924 6.65119 0.47338 6.78231 0.501524 6.90234C0.62386 7.42429 0.998276 7.8224 1.51271 7.97755C1.64373 8.01706 1.68482 8.02138 1.99527 8.0282L2.33461 8.03563L2.33927 9.24586L2.34392 10.4561L2.38573 10.5441C2.47504 10.7321 2.64199 10.8387 2.84802 10.8393C3.0641 10.8399 3.02258 10.8748 4.13836 9.75663C4.83932 9.05418 5.14344 8.73883 5.16888 8.68808C5.21845 8.58922 5.22916 8.41619 5.19255 8.30595C5.1584 8.20319 5.03943 8.06981 4.93373 8.01583C4.86892 7.98272 4.8332 7.97608 4.71992 7.97608C4.50152 7.97608 4.50204 7.9757 3.88392 8.58997L3.34392 9.12661V8.28352C3.34392 7.49011 3.34212 7.43565 3.31312 7.35936C3.26604 7.23543 3.18316 7.14559 3.05989 7.08488L2.95269 7.03208L2.36031 7.02408C1.82904 7.01692 1.76247 7.01311 1.71508 6.98724C1.64122 6.94692 1.54866 6.85072 1.5114 6.77556C1.48052 6.71327 1.47992 6.66605 1.47992 4.24808V1.78408L1.5153 1.71794C1.56034 1.63371 1.63356 1.5605 1.71778 1.51546L1.78392 1.48008L5.15935 1.47594C8.92402 1.47131 8.61751 1.46207 8.75642 1.58434C8.79746 1.62047 8.8436 1.68259 8.8657 1.73147L8.90392 1.81608L8.91192 2.87208C8.92082 4.04707 8.91424 3.97971 9.03303 4.1112C9.15528 4.24652 9.32154 4.30296 9.50048 4.26989C9.65716 4.24091 9.77807 4.14866 9.85983 3.99563L9.89592 3.92808V2.80008C9.89592 1.56387 9.89922 1.61162 9.79647 1.36008C9.62488 0.940099 9.26712 0.630275 8.81301 0.508403L8.67992 0.472675L5.23992 0.470195C3.34792 0.468819 1.75672 0.473923 1.70392 0.481539ZM7.32055 5.16973C7.16818 5.19216 7.05904 5.2282 6.88792 5.31258C6.4806 5.51344 6.18464 5.91079 6.11287 6.35312C6.08976 6.49549 6.08975 11.3761 6.11285 11.5201C6.17232 11.8909 6.41223 12.263 6.72559 12.4706C6.86613 12.5637 6.9846 12.6182 7.17012 12.6751L7.28792 12.7112L8.71192 12.7161L10.1359 12.7209L11.4959 14.0782C12.2439 14.8247 12.8811 15.4502 12.9119 15.4684C12.9427 15.4865 13.0121 15.5099 13.0661 15.5204C13.2912 15.5643 13.5113 15.4485 13.6141 15.2321L13.6559 15.1441L13.6606 13.9337L13.6652 12.7233L13.9966 12.7161C14.3818 12.7078 14.4931 12.6854 14.7279 12.5691C15.0518 12.4086 15.3181 12.1173 15.4383 11.7921C15.5327 11.5366 15.5264 11.7245 15.5321 9.02408C15.5357 7.29693 15.532 6.51176 15.5198 6.41824C15.4781 6.09978 15.3479 5.82536 15.1332 5.60335C14.9257 5.38877 14.7243 5.27247 14.4159 5.18906C14.3184 5.16267 14.0988 5.16077 10.8639 5.15832C8.95381 5.15687 7.37338 5.16196 7.32055 5.16973ZM7.38111 6.18629C7.43925 6.16568 7.88546 6.16247 10.8159 6.16151L14.1839 6.1604L14.2643 6.19781C14.3589 6.24191 14.4355 6.31421 14.4845 6.40594L14.5199 6.47208V8.93608C14.5199 11.3541 14.5193 11.4013 14.4885 11.4636C14.4512 11.5387 14.3586 11.6349 14.2848 11.6752C14.2375 11.701 14.1692 11.7051 13.6399 11.7134C13.2839 11.719 13.0275 11.7297 12.9968 11.7401C12.8636 11.7851 12.7393 11.9089 12.6857 12.0501C12.658 12.1229 12.6559 12.1885 12.6559 12.9718V13.8153L11.6519 12.8126C10.7625 11.9243 10.637 11.8047 10.5519 11.765L10.4559 11.7201L8.92792 11.7121L7.39992 11.7041L7.33484 11.6692C7.24728 11.6224 7.16298 11.5259 7.12618 11.4305C7.09698 11.3548 7.09592 11.2673 7.09592 8.92808V6.50408L7.13415 6.41948C7.17888 6.3205 7.28492 6.22037 7.38111 6.18629Z"
                        fill="#272D36"
                      ></path>
                    </g>
                    <g id="icon-active">
                      <path
                        d="M1.70392 0.481539C1.5837 0.498883 1.35879 0.567875 1.26392 0.616531C1.05071 0.725859 0.84594 0.910963 0.704148 1.12256C0.605572 1.26968 0.561956 1.3697 0.506388 1.57608L0.471924 1.70408V4.24008C0.471924 6.65119 0.47338 6.78231 0.501524 6.90234C0.62386 7.42429 0.998276 7.8224 1.51271 7.97755C1.64373 8.01706 1.68482 8.02138 1.99527 8.0282L2.33461 8.03563L2.33927 9.24586L2.34392 10.4561L2.38573 10.5441C2.47504 10.7321 2.64199 10.8387 2.84802 10.8393C3.0641 10.8399 3.02258 10.8748 4.13836 9.75663C4.83932 9.05418 5.14344 8.73883 5.16888 8.68808C5.21845 8.58922 5.22916 8.41619 5.19255 8.30595C5.1584 8.20319 5.03943 8.06981 4.93373 8.01583C4.86892 7.98272 4.8332 7.97608 4.71992 7.97608C4.50152 7.97608 4.50204 7.9757 3.88392 8.58997L3.34392 9.12661V8.28352C3.34392 7.49011 3.34212 7.43565 3.31312 7.35936C3.26604 7.23543 3.18316 7.14559 3.05989 7.08488L2.95269 7.03208L2.36031 7.02408C1.82904 7.01692 1.76247 7.01311 1.71508 6.98724C1.64122 6.94692 1.54866 6.85072 1.5114 6.77556C1.48052 6.71327 1.47992 6.66605 1.47992 4.24808V1.78408L1.5153 1.71794C1.56034 1.63371 1.63356 1.5605 1.71778 1.51546L1.78392 1.48008L5.15935 1.47594C8.92402 1.47131 8.61751 1.46207 8.75642 1.58434C8.79746 1.62047 8.8436 1.68259 8.8657 1.73147L8.90392 1.81608L8.91192 2.87208C8.92082 4.04707 8.91424 3.97971 9.03303 4.1112C9.15528 4.24652 9.32154 4.30296 9.50048 4.26989C9.65716 4.24091 9.77807 4.14866 9.85983 3.99563L9.89592 3.92808V2.80008C9.89592 1.56387 9.89922 1.61162 9.79647 1.36008C9.62488 0.940099 9.26712 0.630275 8.81301 0.508403L8.67992 0.472675L5.23992 0.470195C3.34792 0.468819 1.75672 0.473923 1.70392 0.481539ZM7.32055 5.16973C7.16818 5.19216 7.05904 5.2282 6.88792 5.31258C6.4806 5.51344 6.18464 5.91079 6.11287 6.35312C6.08976 6.49549 6.08975 11.3761 6.11285 11.5201C6.17232 11.8909 6.41223 12.263 6.72559 12.4706C6.86613 12.5637 6.9846 12.6182 7.17012 12.6751L7.28792 12.7112L8.71192 12.7161L10.1359 12.7209L11.4959 14.0782C12.2439 14.8247 12.8811 15.4502 12.9119 15.4684C12.9427 15.4865 13.0121 15.5099 13.0661 15.5204C13.2912 15.5643 13.5113 15.4485 13.6141 15.2321L13.6559 15.1441L13.6606 13.9337L13.6652 12.7233L13.9966 12.7161C14.3818 12.7078 14.4931 12.6854 14.7279 12.5691C15.0518 12.4086 15.3181 12.1173 15.4383 11.7921C15.5327 11.5366 15.5264 11.7245 15.5321 9.02408C15.5357 7.29693 15.532 6.51176 15.5198 6.41824C15.4781 6.09978 15.3479 5.82536 15.1332 5.60335C14.9257 5.38877 14.7243 5.27247 14.4159 5.18906C14.3184 5.16267 14.0988 5.16077 10.8639 5.15832C8.95381 5.15687 7.37338 5.16196 7.32055 5.16973Z"
                        fill="#272D36"
                      ></path>
                    </g>
                  </svg>
                  &nbsp; Campaign
                </button>
              </div>
            </div>
          ))}
        </Grid>
      </Flex>
      <style>
        {`
// .StyledBox_APC-7290-NXT_TEAM_NAME-sc-36rnoj.gxCsXz {
//   display: flex; /* Activa flexbox */
//   justify-content: space-between; /* Espacia los elementos horizontalmente */
//   align-items: center; /* Centra los elementos verticalmente */
//   padding: 10px; /* Ajusta según sea necesario */
// }
//
// .StyledText_APC-7290-NXT_TEAM_NAME-sc-wm6i6k.fkCQZQ {
//   margin-left: auto;
//   text-align: right;
// }

button {
  position: relative;
  width: 100%; /* O ajusta según lo necesario */
  height: auto; /* Asegura que la altura se ajuste al contenido */
  padding: 10px; /* Espaciado interno */
  display: inline-block; /* Garantiza un área clicable completa */
  cursor: pointer; /* Asegura que el cursor cambie al pasar por encima */
}

        .buttons-container {
  display: flex; /* Usamos flexbox para distribuir los botones */
  justify-content: space-between; /* Espacio uniforme entre los botones */
  width: 100%; /* Ocupa todo el ancho del contenedor padre */
  padding: 10px 0; /* Espaciado opcional */
}

.buttons-container button {
  flex: 1; /* Cada botón ocupa el mismo ancho */
  margin: 0 5px; /* Espaciado entre botones */
  padding: 10px; /* Ajusta el tamaño del botón */
  text-align: center; /* Centra el contenido del botón */
  border: none; /* Opcional: elimina bordes */
  background-color: #f0f0f0; /* Color de fondo del botón */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
}

.buttons-container button:hover {
  background-color: #e0e0e0; /* Efecto hover */
}
      `}
      </style>
    </>
  );
};

export default DeviceProphecyV3;
