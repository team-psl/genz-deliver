import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { memo } from "react";

export const UserAvatar = memo(
  ({ name, image }: { name: string; image: string }) => {
    return (
      <Avatar className="h-8 w-8 rounded-lg ring-2 ring-primary/20">
        <AvatarImage
          src={image || "/placeholder-user.jpg"}
          alt={name || "User"}
        />
        <AvatarFallback className="rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
          {name}
        </AvatarFallback>
      </Avatar>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.name === nextProps.name && prevProps.image === nextProps.image
    );
  }
);
