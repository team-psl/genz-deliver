import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { memo } from "react";

export const UserAvatar = memo(
  ({ name, image }: { name: string; image: string }) => {
    return (
      <Avatar className="h-8 w-8 rounded-full">
        <AvatarImage src={image ?? ""} alt={name ?? ""} />
        <AvatarFallback className="rounded-lg">{name}</AvatarFallback>
      </Avatar>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.name === nextProps.name && prevProps.image === nextProps.image
    );
  }
);
