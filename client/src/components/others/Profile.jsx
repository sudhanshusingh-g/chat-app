import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
  Button,
  Avatar,
  Image,
  Text
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
function Profile({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<FaEye />}
          onClick={onOpen}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="1.4rem" textAlign="center">
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            border="1px"
            textAlign="center"
            margin="1rem auto"
            width="fit-content"
            borderRadius="50%"
            p={6}
          >
            <Image src={user.pic} alt={user.name} width="8rem" />
          </ModalBody>
          <Text textAlign="center" fontSize="xl" fontWeight="500" p={4}>Email: {user.email}</Text>
          
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile;
