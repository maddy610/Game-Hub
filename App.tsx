import { Box, Flex, Grid, GridItem, Show, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button } from '@chakra-ui/react';
import { useState } from "react";
import GameGrid from "./components/GameGrid";
import GameHeading from "./components/GameHeading";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import { Platform } from "./hooks/useGames";
import { Genre } from "./hooks/useGenres";


export interface GameQuery { 
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '250px 1fr'
      }}
    >
      <GridItem area="nav">
        <NavBar onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })} />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList selectedGenre={gameQuery.genre} onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre})} />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          {/* MOBILE GENRE DRAWER */}
        <Show below="lg">
          <Button onClick={onOpen} marginBottom={3} colorScheme="blue">
            Select Genre
          </Button>
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Genres</DrawerHeader>
              <DrawerBody>
                <GenreList 
                  selectedGenre={gameQuery.genre} 
                  onSelectGenre={(genre) => {
                    setGameQuery({ ...gameQuery, genre });
                    onClose(); // Automatically closes menu when they pick one
                  }} 
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Show>
        {/* END OF MOBILE GENRE DRAWER */}
          <GameHeading gameQuery={gameQuery} />
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector selectedPlatform={gameQuery.platform} onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform}) } />
            </Box>
            <SortSelector sortOrder={gameQuery.sortOrder} onSelectSortOrder={(sortOrder) => setGameQuery({ ...gameQuery, sortOrder })} />
          </Flex>
        </Box>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
