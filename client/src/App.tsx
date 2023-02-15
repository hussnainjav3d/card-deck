import { ReactEventHandler, SyntheticEvent, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { Layout } from "./components/Layout";

function App() {
  interface IDeck {
    title: string;
    _id: string;
    author: string;
  }
  const [decks, setAllDecks] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/deck`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setAllDecks(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const deleteDeck = (deckId: string) => {
    setLoading(true);
    fetch(`http://localhost:5000/deck/${deckId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setAllDecks((prev) =>
          prev.filter((deck: { _id: string }) => deck?._id !== res?.data?._id)
        );
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const createDeck = (deckId: object) => {
    console.log(`deck`, deckId);
    setLoading(true);
    fetch(`http://localhost:5000/deck`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(deckId),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    createDeck({
      title: `test`,
      author: `Hussnain`,
      Desc: `This is new task `,
    });
  };
  return (
    <>
      <Layout />
      <Box w="50">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input placeholder="First name" />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {decks.map((deck: IDeck, index) => (
              <GridItem
                h="40"
                w="40"
                borderRadius="10"
                border={`none`}
                position="relative"
                // bg="blue.500"
                cursor={`pointer`}
                key={index}
                className="flip-card"
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <Center h="inherit">{deck?.title}</Center>
                  </div>
                  <div className="flip-card-back">
                    <Button
                      position="absolute"
                      top="1"
                      right="2"
                      bg="transparent"
                      p="1"
                      w="4"
                      onClick={() => deleteDeck(deck?._id)}
                    >
                      x
                    </Button>
                    <Center h="inherit">{deck?.author}</Center>
                    {/* <Center h="inherit">{deck?.Desc}</Center> */}
                  </div>
                </div>
              </GridItem>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default App;
