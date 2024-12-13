import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  apolloSpaceInline4X,
  Box,
  Button,
  Flex,
  H3,
  Message,
  Modal,
  orderBy,
  SortDescriptor,
  Table,
  TableActionColumn,
  TableActionItem,
  TableColumn,
} from "@nexthink/apollo-components";
import { StyledContainer } from "@app/widgets/main-panel/MainPanel.style";
import {
  apolloSpaceInline1X,
  apolloSpaceInline2X,
  apolloSpaceStack1X,
} from "@nexthink/apollo-components/lib/tokens";

export interface DeviceProphecyItem {
  name: string;
  failureProbability: number;
  // action: string;
}

const deviceProphecyItems: DeviceProphecyItem[] = [
  {
    name: "NXT-PXWX0M3YYK",
    failureProbability: 98.2,
  },
  {
    name: "NXT-GM036DJX",
    failureProbability: 85.4,
  },
  {
    name: "NXT-MDJ49PXQGL",
    failureProbability: 92.1,
  },
  {
    name: "NXT-L2KH4C14JF",
    failureProbability: 90.3,
  },
  {
    name: "NXT-5CG141BRV9",
    failureProbability: 88.7,
  },
  {
    name: "NXT-P7WHWFWVX3",
    failureProbability: 93.5,
  },
  {
    name: "NXT-FXJ905201H",
    failureProbability: 94.0,
  },
  {
    name: "NXT-5CG1251ZKZ",
    failureProbability: 87.6,
  },
  {
    name: "NXT-GM0A1S7L",
    failureProbability: 86.9,
  },
  {
    name: "NXT-NVJ0LV72QW",
    failureProbability: 91.2,
  },
  {
    name: "NXT-PC0XRE68",
    failureProbability: 84.3,
  },
];

const DeviceProphecy = () => {
  const [active, setActive] = useState<string | string[] | undefined>("none");
  const [sort, setSort] = useState<SortDescriptor>({
    field: "failureProbability",
    dir: "desc",
  });
  const [isModalMessageOpen, setModalMessageOpen] = useState(false);

  return (
    <StyledContainer
      isLoading={false}
      heading={
        "Act now to prevent failures! Click here to see devices at risk and recommended solutions"
      }
      variant={"blue"}
      inProgress={false}
    >
      {/*<Accordion*/}
      {/*  aria-label={"accordion"}*/}
      {/*  active={active}*/}
      {/*  activeChange={(a): void => {*/}
      {/*    setActive(a);*/}
      {/*  }}*/}
      {/*>*/}
        {/*<AccordionItem id={"table"}>*/}
          <Table
            data={orderBy(deviceProphecyItems, sort)}
            sort={sort}
            onSortChange={(e): void => setSort(e.sort)}
            variant="comfortable"
            width="100%"
          >
            <TableColumn field="name" title="Name" width="150px" />
            <TableColumn
                field="failureProbability"
                title="Failure Probability"
                width="150px"
            />
            <TableActionColumn kebab={false} title={"Actions"}>
              <TableActionItem
                id="run-action"
                title={"Update the collector to version 24.10"}
                aria-label={"run-action"}
                label="Run"
                iconName="remoteAction"
                onClick={() => {
                  setModalMessageOpen(true);
                }}
              />
            </TableActionColumn>
          </Table>
        {/*</AccordionItem>*/}
      {/*</Accordion>*/}
      <Modal
        id="run-remote-action"
        width={530}
        height={240}
        isOpen={isModalMessageOpen}
        onClose={(): void => setModalMessageOpen(false)}
      >
        <Flex
          alignItems="left"
          flexDirection="column"
          height="100%"
          width="100%"
        >
          <Box
            mt={apolloSpaceInline4X}
            ml={apolloSpaceInline4X}
            mb={apolloSpaceInline2X}
          >
            <H3>{"Run Remote Action"}</H3>
          </Box>
          <Box ml={apolloSpaceInline4X} mr={apolloSpaceInline4X}>
            <Message
              severity="warning"
              isShown
              message={"Are you sure you want to run this Remote Action?"}
            />
          </Box>
          <Box
            ml={apolloSpaceInline4X}
            mr={apolloSpaceInline4X}
            mt={apolloSpaceInline2X}
          >
            {/*<Text>{"delete_config_note"}</Text>*/}
          </Box>
          <Box
            ml={apolloSpaceInline4X}
            mr={apolloSpaceInline4X}
            mt={apolloSpaceInline1X}
          >
            <Flex flexDirection="row">
              <Box ml={"auto"}>
                <Button
                  id="run-action-proceed"
                  size="medium"
                  aria-label="Delete config"
                  onClick={() => {
                    // deleteConfigWithUid(configUidToBeDeleted);
                    // setNumberOfAvailableQueries(numberOfAvailableQueries + configQueriesToBeDeleted);
                  }}
                >
                  {"ok"}
                </Button>
              </Box>
              <Box ml={apolloSpaceStack1X}>
                <Button
                  id="delete-config-cancel"
                  size="medium"
                  variant={"secondary"}
                  aria-label="Cancel"
                  onClick={(): void => setModalMessageOpen(false)}
                >
                  {"cancel"}
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Modal>
    </StyledContainer>
  );
};

export default DeviceProphecy;
