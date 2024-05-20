import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, FormControl, FormLabel } from "@chakra-ui/react";
import { VStack, Input, InputRightElement, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  //
  const handleSubmit = () => {};
  return (
    <VStack spacing={4}>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="Enter you email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? <FaEye /> : <FaEyeSlash />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="cyan"
        textColor="white"
        onClick={handleSubmit}
        width="100%"
      >
        Login
      </Button>

      <Button
        colorScheme="red"
        variant="solid"
        textColor="white"
        onClick={()=>{
            setEmail("guest@example.com");
            setpassword("123456");
        }}
        width="100%"
      >
        Guest user
      </Button>
    </VStack>
  );
}

export default Login;
