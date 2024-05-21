import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Input,
  InputGroup,
  VStack,
  Button,
  FormControl,
  FormLabel,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { cloudName, uploadPreset } from "../../env/cloudData";
import {useNavigate} from "react-router-dom";

function SignUp() {
  const toast = useToast();
  const navigate=useNavigate();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [loading,setLoading]=useState(false);

  // Handle Uploading pictures
  const handleUpload = (e) => {
    const pic = e.target.files[0];
    setLoading(true);
    if(!pic){
      setLoading(false);
      toast({
        title:"Please select an image!",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top-right"
      })
      return;
    }

    if(pic.type === "image/jpeg" || pic.type=== "image/png"){
      const data=new FormData();
      data.append("file",pic);
      data.append("upload_preset",uploadPreset);
      data.append("cloud_name", cloudName);

      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPicture(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    else{
      setLoading(false);
      toast({
        title: "Please select a JPEG or PNG image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

  };

  // Handle form submission
  const handleSubmit = async() => {
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
      toast({
        title: "Please fill all the required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    if(password !== confirmPassword){
      toast({
        title: "Passwords do not match.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      const config={
        headers:{
          "Content-type":"application/json",
        },
      };

      const {data}=await axios.post("/api/user",{name,email,password,picture},config);
      toast({
        title: "Registration successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      localStorage.setItem("user",JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
      

    } catch (error) {
      toast({
        title: "Something bad happened!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }

  };

  return (
    <VStack spacing={4}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl  isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl  isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter a unique password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <FormLabel>Upload Picture</FormLabel>
        <Input type="file" accept="image/*" onChange={handleUpload} />
      </FormControl>

      <Button
        colorScheme="cyan"
        textColor="white"
        onClick={handleSubmit}
        width="100%"
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp;
