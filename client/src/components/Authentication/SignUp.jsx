import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormControl, FormLabel, InputRightElement } from "@chakra-ui/react";
import { Input, InputGroup } from "@chakra-ui/react";
import { VStack, Button } from "@chakra-ui/react";
import { useState } from "react";

function SignUp() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");


//   Handle Uploading pictures
const handleUpload=(picture)=>{
    setPicture(picture);
}


//
const handleSubmit=()=>{

}
  return (
    <VStack spacing={4}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter you name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
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
            placeholder="Enter a unique password"
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

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Re-enter your unique password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? <FaEye /> : <FaEyeSlash />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="picture">
        <FormLabel>Upload </FormLabel>
        <Input
          type="file"
          accept="image/*"
          value={picture}
          onChange={(e) => handleUpload(e.target.files[0])}
        />
      </FormControl>

      <Button colorScheme="cyan" textColor="white" onClick={handleSubmit} width="100%">Sign Up</Button>
    </VStack>
  );
}

export default SignUp;
