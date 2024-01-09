/*eslint-disable*/
import MessageBox from "../MessageBox/MessageBox";
import { OpenAIModel } from "../../types/types";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Img,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdAutoAwesome, MdBolt, MdEdit, MdPerson } from "react-icons/md";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

interface HomeProps {
  apiKeyApp: string;
  color: string;
}

export default function Home(props: HomeProps) {
  const [inputOnSubmit, setInputOnSubmit] = useState<string>("");
  const [inputCode, setInputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");
  const [model, setModel] = useState<OpenAIModel>("gpt-3.5-turbo");
  const [loading, setLoading] = useState<boolean>(false);
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const inputColor = useColorModeValue("navy.700", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgIcon = useColorModeValue(
    "linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)",
    "whiteAlpha.200"
  );
  const brandColor = useColorModeValue("brand.500", "white");
  const buttonBg = useColorModeValue("white", "whiteAlpha.100");
  const gray = useColorModeValue("gray.500", "white");
  const buttonShadow = useColorModeValue(
    "14px 27px 45px rgba(112, 144, 176, 0.2)",
    "none"
  );
  const textColor = useColorModeValue("navy.700", "white");
  const placeholderColor = useColorModeValue(
    { color: "gray.500" },
    { color: "whiteAlpha.600" }
  );
  const handleTranslate = async () => {
    const apiKey = "your-api-key-here";
    setInputOnSubmit(inputCode);

    const maxCodeLength = model === "gpt-3.5-turbo" ? 700 : 700;

    if (!inputCode) {
      alert("Please enter your message.");
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters.z You are currently at ${inputCode.length} characters.`
      );
      return;
    }
    setOutputCode(" ");
    setLoading(true);

    try {
      const result = await runChat(inputCode, apiKey);
      setOutputCode(result.response.text());
    } catch (error) {
      setLoading(false);
      alert("Something went wrong while processing the request.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (Event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(Event.target.value);
  };

  async function runChat(userInput: string, apiKey: string) {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
    const MODEL_NAME = "gemini-pro";

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      { role: "user", parts: [{ text: userInput }] },
      { role: "model", parts: [{ text: "Your explanation text here." }] },
    ],
    });

    const result = await chat.sendMessage(userInput);
    return result;
    } catch (error) {
        console.error('Error in runChat:', error);
    throw new Error('Error in runChat');
    }
    
  }
  return (
    <Flex
      w="100%"
      pt={{ base: "70px", md: "0px" }}
      direction="column"
      position="relative"
    >
      <Img
        position={"absolute"}
        w="350px"
        left="50%"
        top="50%"
        transform={"translate(-50%, -50%)"}
      />
      <Flex
        direction="column"
        mx="auto"
        w={{ base: "100%", md: "100%", xl: "100%" }}
        minH={{ base: "75vh", "2xl": "85vh" }}
        maxW="1000px"
      >
        {/* Model Change */}
        <Flex direction={"column"} w="100%" mb={outputCode ? "20px" : "auto"}>
          <Flex
            mx="auto"
            zIndex="2"
            w="max-content"
            mb="20px"
            borderRadius="60px"
          >
            <Flex
              cursor={"pointer"}
              transition="0.3s"
              justify={"center"}
              align="center"
              bg={model === "gpt-3.5-turbo" ? buttonBg : "transparent"}
              w="174px"
              h="70px"
              boxShadow={model === "gpt-3.5-turbo" ? buttonShadow : "none"}
              borderRadius="14px"
              color={textColor}
              fontSize="18px"
              fontWeight={"700"}
              onClick={() => setModel("gpt-3.5-turbo")}
            >
              <Flex
                borderRadius="full"
                justify="center"
                align="center"
                bg={bgIcon}
                me="10px"
                h="39px"
                w="39px"
              >
                <Icon
                  as={MdAutoAwesome}
                  width="20px"
                  height="20px"
                  color={iconColor}
                />
              </Flex>
              GPT-3.5
            </Flex>
            <Flex
              cursor={"pointer"}
              transition="0.3s"
              justify={"center"}
              align="center"
              bg={model === "gpt-4" ? buttonBg : "transparent"}
              w="164px"
              h="70px"
              boxShadow={model === "gpt-4" ? buttonShadow : "none"}
              borderRadius="14px"
              color={textColor}
              fontSize="18px"
              fontWeight={"700"}
              onClick={() => setModel("gpt-4")}
            >
              <Flex
                borderRadius="full"
                justify="center"
                align="center"
                bg={bgIcon}
                me="10px"
                h="39px"
                w="39px"
              >
                <Icon
                  as={MdBolt}
                  width="20px"
                  height="20px"
                  color={iconColor}
                />
              </Flex>
              GPT-4
            </Flex>
          </Flex>

          <Accordion color={gray} allowToggle w="100%" my="0px" mx="auto">
            <AccordionItem border="none">
              <AccordionButton
                borderBottom="0px solid"
                maxW="max-content"
                mx="auto"
                _hover={{ border: "0px solid", bg: "none" }}
                _focus={{ border: "0px solid", bg: "none" }}
              >
                <Box flex="1" textAlign="left">
                  <Text color={gray} fontWeight="500" fontSize="sm">
                    No plugins added
                  </Text>
                </Box>
                <AccordionIcon color={gray} />
              </AccordionButton>
              <AccordionPanel mx="auto" w="max-content" p="0px 0px 10px 0px">
                <Text
                  color={gray}
                  fontWeight="500"
                  fontSize="sm"
                  textAlign={"center"}
                >
                  This is a cool text example.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
        {/* Main Box */}
        <Flex
          direction="column"
          w="100%"
          mx="auto"
          display={outputCode ? "flex" : "none"}
          mb={"auto"}
        >
          <Flex w="100%" align={"center"} mb="10px">
            <Flex
              borderRadius="full"
              justify="center"
              align="center"
              bg={"transparent"}
              border="1px solid"
              borderColor={borderColor}
              me="20px"
              h="40px"
              minH="40px"
              minW="40px"
            >
              <Icon
                as={MdPerson}
                width="20px"
                height="20px"
                color={brandColor}
              />
            </Flex>
            <Flex
              p="22px"
              border="1px solid"
              borderColor={borderColor}
              borderRadius="14px"
              w="100%"
              zIndex={"2"}
            >
              <Text
                color={textColor}
                fontWeight="600"
                fontSize={{ base: "sm", md: "md" }}
                lineHeight={{ base: "24px", md: "26px" }}
              >
                {inputOnSubmit}
              </Text>
              <Icon
                cursor="pointer"
                as={MdEdit}
                ms="auto"
                width="20px"
                height="20px"
                color={gray}
              />
            </Flex>
          </Flex>
          <Flex w="100%">
            <Flex
              borderRadius="full"
              justify="center"
              align="center"
              bg={"linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)"}
              me="20px"
              h="40px"
              minH="40px"
              minW="40px"
            >
              <Icon
                as={MdAutoAwesome}
                width="20px"
                height="20px"
                color="white"
              />
            </Flex>
            <MessageBox output={outputCode} />
          </Flex>
        </Flex>
        <Flex
          ms={{ base: "0px", xl: "60px" }}
          mt="20px"
          justifySelf={"flex-end"}
          position="sticky"
          bottom="0"
          bg="white"
          zIndex="3"
          borderTop="1px solid"
          borderColor={borderColor}
          py="10px"
          alignItems="center"
        >
          <Input
            minH="54px"
            h="100%"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="45px"
            p="15px 20px"
            me="10px"
            fontSize="sm"
            fontWeight="500"
            _focus={{ borderColor: "none" }}
            color={inputColor}
            _placeholder={placeholderColor}
            placeholder="Type your message here..."
            onChange={handleChange}
            value={inputOnSubmit}
          />
          <Button
            variant="primary"
            py="20px"
            px="16px"
            fontSize="sm"
            borderRadius="45px"
            colorScheme="facebook"
            ms="auto"
            w={{ base: "160px", md: "210px" }}
            h="54px"
            _hover={{
              boxShadow:
                "0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important",
              bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important",
              _disabled: {
                bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
              },
            }}
            onClick={handleTranslate}
            isLoading={loading ? true : false}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
