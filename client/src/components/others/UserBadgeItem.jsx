import { Badge } from "@chakra-ui/react";
import { MdOutlineCancel } from "react-icons/md";

function UserBadgeItem({ user, handleFunction}) {
  return (
    <Badge
    display={"flex"}
    gap={"0.4rem"}
    alignItems={"center"}
    width={"fit-content"}
    p={2}
      borderRadius="md"
      fontSize={12}
      colorScheme="teal"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {/* {admin === user._id && <span> (Admin)</span>} */}
      <MdOutlineCancel style={{marginRight:"0.4rem"}}/>
    </Badge>
  );
}

export default UserBadgeItem