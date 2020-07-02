import { AsyncStorage } from "react-native";
import { generateUID } from "./helper";

const FLASHCARDS_STORAGE_KEY = "flashcards_data";

function initialData() {
  return {
    "632mgp7hm68vzvg2amz1hq": {
      id: "632mgp7hm68vzvg2amz1hq",
      title: "React",
      questions: [
        {
          question: "What is ReactJS?",
          answer:
            "ReactJS is an open-source frontend JavaScript library which is used for building user interfaces, specifically for single page applications."
        },
        {
          question: "What is JSX?",
          answer:
            "JSX is a syntax notation for JavaScript XML(XML-like syntax extension to ECMAScript). It stands for JavaScript XML."
        },
        {
          question: "What is virtual DOM?",
          answer:
            "The virtual DOM (VDOM) is an in-memory representation of Real DOM."
        },
        {
          question: "What is Babel?",
          answer: "Babel is a JavaScript compiler"
        }
      ]
    },
    "724mgp7hm68vzvg2amz1hq": {
      id: "724mgp7hm68vzvg2amz1hq",
      title: "Corona",
      questions: [
        {
          question: "What is a coronavirus?",
          answer: "Coronaviruses are a large family of viruses that are known to cause illness ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS)"
        },
        {
          question: "What is a novel coronavirus?",
          answer: "A novel coronavirus (CoV) is a new strain of coronavirus that has not been previously identified in humans"
        },
        {
          question:
            "Is there a vaccine for a novel coronavirus?",
          answer: "When a disease is new, there is no vaccine until one is developed. It can take a number of years for a new vaccine to be developed."
        }
      ]
    },
    "636jgrwdbhf58lxznh9q79": {
      id: "636jgrwdbhf58lxznh9q79",
      title: "Idioms and Phrases",
      questions: [
        {
          question: "Something up one's sleeve",
          answer: "A profitable plan"
        },
        {
          question: "Cold comfort",
          answer:
            "Slight satisfaction"
        },
        {
          question: "All at sea",
          answer:
            "Completely confused"
        },
        {
          question: "Come down a peg",
          answer:
            "To be humiliated"
        }
      ]
    },
    sxbjgrwdbhf58lxznh9q79: {
      id: "sxbjgrwdbhf58lxznh9q79",
      title: "General Knowledge",
      questions: [
        {
          question: "What is the direction of rotation of earth?",
          answer: "West to East"
        },
        {
          question: "what is the full form of WTO?",
          answer: "World Trade Organization"
        },
        {
          question: "Which is the fastest animal?",
          answer: "Cheetah"
        },
        {
          question: "Christiana Ronaldo is related with which sport?",
          answer: "Football"
        },
        {
          question: "what is the full form of HTTP?",
          answer: "Hyper Text Transfer Protocol"
        }
      ]
    }
  };
}

export async function getDecks() {
  try {
    const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    if (results) {
      const data = JSON.parse(results);
      return data;
    } else {
      await AsyncStorage.setItem(
        FLASHCARDS_STORAGE_KEY,
        JSON.stringify(initialData())
      );
      return initialData();
    }
  } catch (error) {
    await AsyncStorage.setItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify(initialData())
    );
    return initialData();
  }
}

export async function saveDeckTitle(title) {
  const id = generateUID();
  const deck = {
    id: id,
    title: title,
    questions: []
  };

  await AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [id]: deck
    })
  );
  return deck;
}

export async function saveCardToDeck(deckId, card) {
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    const deck = data[deckId];
    deck.questions = deck.questions.concat([card]);
    await AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [deckId]: deck
      })
    );
    return card;
  }
}

export async function removeDeck(deckId) {
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    delete data[deckId];

    await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  return {};
}
